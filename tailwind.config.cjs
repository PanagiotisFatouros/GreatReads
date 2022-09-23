/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					1: `rgb(238, 238, 238)`,
					2: `rgb(255, 149, 83)`,
					3: `rgb(66, 76, 85)`
				},
				secondary: `rgb(21, 176, 151)`,
				accent: `rgb(255, 102, 99)`
			},
			fontFamily: {
				logo: ['Crete Round', 'serif'],
				heading: ['Quicksand', 'sans-serif'],
				body: ['Nunito', 'sans-serif']
			},
			width: {
				34: '8.5rem',
				114: '28.5rem'
			},
			fontSize: {
				heading1: '1.85rem',
				heading2: '1.3rem',
				heading3: '1.1rem',
				body1: '1.1rem',
				body2: '0.9rem'
			},
			spacing: {
				coverHeight: '29.375rem',
				coverWidth: '18.359rem'
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')],
	variants: {
		backgroundColor: ['checked'],
		border: ['checked'],
		width: ['checked'],
		height: ['checked'],
		ring: ['checked'],
		extend: {
			boxShadow: ['active']
		}
	}
};
