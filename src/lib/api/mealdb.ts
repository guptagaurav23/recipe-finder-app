import type { MealDBRecipe, Recipe, Ingredient } from '$lib/types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

function transformMeal(meal: MealDBRecipe): Recipe {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim() !== '') {
      ingredients.push({ name: name.trim(), measure: (measure ?? '').trim() });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    imageUrl: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(',').map((t) => t.trim()) : [],
    youtubeUrl: meal.strYoutube,
    ingredients,
    isUserCreated: false
  };
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!data.meals) return [];
  return data.meals.map(transformMeal);
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  if (!data.meals) return null;
  return transformMeal(data.meals[0]);
}

export async function filterByCategory(category: string): Promise<Recipe[]> {
  const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await res.json();
  if (!data.meals) return [];
  return data.meals.map((m: any) => ({
    id: m.idMeal,
    title: m.strMeal,
    imageUrl: m.strMealThumb,
    category,
    area: '',
    instructions: '',
    tags: [],
    youtubeUrl: null,
    ingredients: [],
    isUserCreated: false
  }));
}

export async function getAllCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/list.php?c=list`);
  const data = await res.json();
  return data.meals.map((m: { strCategory: string }) => m.strCategory);
}

