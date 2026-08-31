export interface RecipeFormData {
  title: string;
  category: string;
  area: string;
  imageUrl: string;
  instructions: string;
  ingredients: { name: string; measure: string }[];
}

export interface ValidationErrors {
  title?: string;
  category?: string;
  imageUrl?: string;
  instructions?: string;
  ingredients?: string;
}

export function validateRecipe(data: RecipeFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!data.category.trim()) {
    errors.category = 'Category is required';
  }

  if (!data.imageUrl.trim()) {
    errors.imageUrl = 'Image URL is required';
  } else if (!isValidUrl(data.imageUrl)) {
    errors.imageUrl = 'Please enter a valid URL';
  }

  if (!data.instructions.trim() || data.instructions.trim().length < 20) {
    errors.instructions = 'Instructions must be at least 20 characters';
  }

  const validIngredients = data.ingredients.filter((i) => i.name.trim() !== '');
  if (validIngredients.length === 0) {
    errors.ingredients = 'At least one ingredient is required';
  }

  return errors;
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}