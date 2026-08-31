import type { Recipe } from '$lib/types/recipe';

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

type MealPlan = Record<string, Recipe | null>;

function loadPlan(): MealPlan {
  if (typeof localStorage === 'undefined') return emptyPlan();
  const stored = localStorage.getItem('mealPlan');
  return stored ? JSON.parse(stored) : emptyPlan();
}

function emptyPlan(): MealPlan {
  const plan: MealPlan = {};
  for (const day of DAYS) {
    plan[day] = null;
  }
  return plan;
}

let mealPlan = $state<MealPlan>(loadPlan());

function savePlan() {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
}

export function getMealPlan(): MealPlan {
  return mealPlan;
}

export function assignMeal(day: string, recipe: Recipe) {
  mealPlan[day] = recipe;
  savePlan();
}

export function removeMeal(day: string) {
  mealPlan[day] = null;
  savePlan();
}