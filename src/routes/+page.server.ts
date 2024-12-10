import {GoogleGenerativeAI} from "@google/generative-ai"
import type { Actions } from './$types';
import { PUBLIC_GEMINI_KEY } from '$env/static/public';

function convertTextToArray(text) {
    // Remove the brackets at the start and end
  let trimmedText = text.trim().slice(1, -1);
  
  // Escape quotes inside names (e.g., Dwayne "The Rock" Johnson -> Dwayne \"The Rock\" Johnson)
  trimmedText = trimmedText.replace(/"([^"]+)"/g, '\\"$1\\"');
  
  // Split the text by commas, handling extra spaces
  let items = trimmedText.split(",").map(item => item.trim());

  // Ensure each item is properly wrapped in quotes
  let formattedArray = items.map(item => {
    if (item.startsWith('"') || item.startsWith("'")) {
      return item; // Preserve existing quotes
    }
    return `"${item}"`; // Add quotes if missing
  });

  // Parse the string as JSON to get the actual array
  return JSON.parse(`[${formattedArray.join(",")}]`);
  }
  

export const load = async () => {

    const genAI = new GoogleGenerativeAI(PUBLIC_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt1 =' give me a list of celebrities as one list. []'
    const prompt2="give me a list of settings for a story as one list. []";
    const prompt3="give me a list of story genres as one list. [] ";
    
    const celebrities = await model.generateContent(prompt1);
    const settings = await model.generateContent(prompt2);
    const genres = await model.generateContent(prompt3);

   const celebrityData= convertTextToArray(celebrities.response.text())
   const settingsData= convertTextToArray(settings.response.text())
   const genresData= convertTextToArray(genres.response.text())
   
    // console.log(result.response.text());
   
	return {
		celebrity: celebrityData,
        setting: settingsData,
        genre:genresData
	};
};

export const actions = {

	ask: async ({request}) => {
        const data = await request.formData();
        const celebrity= data.get('celebrity');
        const setting= data.get('setting');
        const genre= data.get('genre');

        const genAI = new GoogleGenerativeAI("AIzaSyDuBMYodryxeXvsKGgYgYWhWnHUvD7r82w");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt1 =`write a story with ${celebrity} as the main character in ${setting} setting and in ${genre} genre based on the recent news involving ${celebrity}. and use simple vocabulary`
        const stories= await model.generateContent(prompt1)
        const story=stories.response.text()
       

      return{
        story:story
      }
	},
	
} satisfies Actions;
