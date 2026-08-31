export interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null; // for strIngredient1-20, strMeasure1-20
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  imageUrl: string;
  tags: string[];
  youtubeUrl: string | null;
  ingredients: Ingredient[];
  isUserCreated: boolean;
}