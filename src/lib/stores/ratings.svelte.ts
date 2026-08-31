function loadRatings(): Record<string, number> {
  if (typeof localStorage === 'undefined') return {};
  const stored = localStorage.getItem('ratings');
  return stored ? JSON.parse(stored) : {};
}

let ratings = $state<Record<string, number>>(loadRatings());

function saveRatings() {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('ratings', JSON.stringify(ratings));
}

export function getRating(recipeId: string): number {
  return ratings[recipeId] ?? 0;
}

export function setRating(recipeId: string, value: number) {
  ratings[recipeId] = value;
  saveRatings();
}