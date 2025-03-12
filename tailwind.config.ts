import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				cinzel: ['Cinzel', 'sans'],
				exo: ['exo', 'sans'],
				creepster: ['creepster', 'sans'],
				elite: ['elite', 'sans'],
				fairDisplay: ['fairDisplay', 'sans'],
				courier: ['courier', 'sans'],
				chewy: ['Chewy', 'sans']
			}
		}
	},

	plugins: [typography]
} satisfies Config;
