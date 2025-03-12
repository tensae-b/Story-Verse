import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Actions } from './$types';
import { PUBLIC_GEMINI_KEY } from '$env/static/public';

function convertTextToArray(text) {
	let trimmedText = text.trim().slice(1, -1);

	trimmedText = trimmedText.replace(/"([^"]+)"/g, '\\"$1\\"');

	let items = trimmedText.split(',').map((item) => item.trim());

	let formattedArray = items.map((item) => {
		if (item.startsWith('"') || item.startsWith("'")) {
			return item;
		}
		return `"${item}"`;
	});

	return JSON.parse(`[${formattedArray.join(',')}]`);
}

export const load = async () => {
	const genAI = new GoogleGenerativeAI(PUBLIC_GEMINI_KEY);
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
	//   const basicPrompts = [
	//     "give me a list of celebrities.",
	//     "give me a list of settings for a story.",
	//     "give me a list of story genres."
	// ];

	const prompt1 = ' give me a list of celebrities as one list. []';
	const prompt2 = 'give me a list of settings for a story as one list. []';
	const prompt3 = 'give me a list of story genres as one list. [] ';

	const engineeredPrompts = [
		'Provide a diverse list of 20 popular celebrities, including actors, musicians, and influencers, formatted as a JavaScript array.',
		'List 20 unique and creative story settings, such as futuristic cities, ancient civilizations, or underwater worlds, formatted as a JavaScript array.',
		'Provide a list of 20 story genres, including traditional and hybrid genres like fantasy, science fiction, or dystopian romance, formatted as a JavaScript array.'
	];

	const celebrities = await model.generateContent(prompt1);
	const settings = await model.generateContent(prompt2);
	const genres = await model.generateContent(prompt3);
	const trial = await model.generateContent(engineeredPrompts);

	const celebrityData = convertTextToArray(celebrities.response.text());
	const settingsData = convertTextToArray(settings.response.text());
	const genresData = convertTextToArray(genres.response.text());
	const trialData = trial.response.text();

	console.log(trialData);

	return {
		celebrity: celebrityData,
		setting: settingsData,
		genre: genresData
	};
};

export const actions = {
	ask: async ({ request }) => {
		const data = await request.formData();
		const celebrity = data.get('celebrity');
		const setting = data.get('setting');
		const genre = data.get('genre');

		const genAI = new GoogleGenerativeAI('AIzaSyDuBMYodryxeXvsKGgYgYWhWnHUvD7r82w');
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

		const prompt1 = `write a story with ${celebrity} as the main character in ${setting} setting and in ${genre} genre based on the recent news involving ${celebrity}. and use simple vocabulary`;
		const engineeredPrompt = `Write a captivating short story where ${celebrity} is the main character. The story should take place in a ${setting} setting, exploring the unique atmosphere and challenges of this environment. The genre is ${genre}, so incorporate elements typical of this genre. Use simple vocabulary and ensure the narrative is engaging for readers aged 12 to 18.`;

		const stories = await model.generateContent(prompt1);
		const story = stories.response.text();

		return {
			story: story
		};
	}
} satisfies Actions;
