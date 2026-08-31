import { getUserRecipeById } from '$lib/stores/userRecipes.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const recipe = getUserRecipeById(params.id);
  if (!recipe) throw error(404, 'Recipe not found');
  return { recipe };
};