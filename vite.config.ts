import adapter from '@sveltejs/adapter-netlify';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	],
	optimizeDeps: {
		exclude: ['@gauravgupta14/recipe-ui']
	},
	server: {
		fs: {
			strict: false
		}
	},
	ssr: {
		noExternal: ['@gauravgupta14/recipe-ui']
	}
});