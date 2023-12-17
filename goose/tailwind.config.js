/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: { backgroundImage: {
			'ground-pattern': "url('https://i.ibb.co/8K3YTWZ/bg1.png')",
		  }
		}
	},
	plugins: []
};
