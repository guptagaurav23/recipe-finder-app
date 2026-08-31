import type { Recipe } from '$lib/types/recipe';

let favorites = $state<Recipe[]>(loadFavorites());

function loadFavorites(): Recipe[] {
  if (typeof localStorage === 'undefined') return [];
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites() {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function isFavorite(recipeId: string): boolean {
  return favorites.some((r) => r.id === recipeId);
}

export function toggleFavorite(recipe: Recipe) {
  if (isFavorite(recipe.id)) {
    favorites = favorites.filter((r) => r.id !== recipe.id);
  } else {
    favorites = [...favorites, recipe];
  }
  saveFavorites();
}

export function getFavorites(): Recipe[] {
  return favorites;
}