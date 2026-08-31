# Recipe finder and Meal Planner

A recipe app for discovering and meal planning built with Svelte 5, SvelteKit and StencilJs.

#Website resources
- Website URL : https://yum-recipie.netlify.app/
- npm package: https://www.npmjs.com/package/@gauravgupta14/recipe-ui

# GitHub urls:
-Svelte kit app: https://github.com/guptagaurav23/recipe-finder-app
-Stencil components: https://github.com/guptagaurav23/recipe-ui-stencil

This stencil components which are reusable are : recipe-card, rating, day planner.

# How to run on local?
- Take pull of both the repos.
- open cmd in SvelteKit app home directory. 
	1) npm install
	2) npm run dev
	3) Hit the url after running npm run preview.

# How to run Stencil components:
	1)cd recipe-ui-stencil
	2)npm install
	3)npm start 

# Publishing nom package
	1)npm version patch --no-git-tag-version
	2)npm run build
	3)npm publish --access public