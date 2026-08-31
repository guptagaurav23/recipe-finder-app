import { getRecipeById } from '$lib/api/mealdb';
import { getUserRecipeById } from '$lib/stores/userRecipes.svelte';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  if (params.id.startsWith('user-')) {
    const recipe = getUserRecipeById(params.id);
    if (!recipe) throw error(404, 'Recipe not found');
    return { recipe };
  }

  const recipe = await getRecipeById(params.id);
  if (!recipe) throw error(404, 'Recipe not found');
  return { recipe };
};