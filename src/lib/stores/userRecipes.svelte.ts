import type { Recipe } from '$lib/types/recipe';

function loadUserRecipes(): Recipe[] {
  if (typeof localStorage === 'undefined') return [];
  const stored = localStorage.getItem('userRecipes');
  return stored ? JSON.parse(stored) : [];
}

let userRecipes = $state<Recipe[]>(loadUserRecipes());

function saveUserRecipes() {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
}

export function getUserRecipes(): Recipe[] {
  return userRecipes;
}

export function getUserRecipeById(id: string): Recipe | undefined {
  return userRecipes.find((r) => r.id === id);
}

export function addUserRecipe(recipe: Omit<Recipe, 'id' | 'isUserCreated'>) {
  const newRecipe: Recipe = {
    ...recipe,
    id: `user-${Date.now()}`,
    isUserCreated: true
  };
  userRecipes = [...userRecipes, newRecipe];
  saveUserRecipes();
  return newRecipe;
}

export function updateUserRecipe(id: string, updates: Omit<Recipe, 'id' | 'isUserCreated'>) {
  userRecipes = userRecipes.map((r) =>
    r.id === id ? { ...updates, id, isUserCreated: true } : r
  );
  saveUserRecipes();
}

export function deleteUserRecipe(id: string) {
  userRecipes = userRecipes.filter((r) => r.id !== id);
  saveUserRecipes();
}