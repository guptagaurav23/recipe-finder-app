<script lang="ts">
  import { onMount } from 'svelte';
  import { searchRecipes } from '$lib/api/mealdb';
  import { getFavorites } from '$lib/stores/favorites.svelte';
  import { DAYS, getMealPlan, assignMeal, removeMeal } from '$lib/stores/mealPlan.svelte';
  import type { Recipe } from '$lib/types/recipe';

  let availableRecipes = $state<Recipe[]>([]);
  let selectedDay = $state<string | null>(null);

  onMount(async () => {
    const favs = getFavorites();
    const searched = await searchRecipes('chicken');
    const combined = [...favs, ...searched];
    // de-duplicate by id
    const seen = new Set<string>();
    availableRecipes = combined.filter((r) => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    });
  });

  function openPicker(day: string) {
    selectedDay = day;
  }

  function pickRecipe(recipe: Recipe) {
    if (selectedDay) {
      assignMeal(selectedDay, recipe);
      selectedDay = null;
    }
  }

  function closePicker() {
    selectedDay = null;
  }
</script>

<div class="container mt-4">
  <h1 class="mb-4">Weekly Meal Planner</h1>

  <div class="row g-3">
    {#each DAYS as day}
      {@const meal = getMealPlan()[day]}
      <div class="col-md-3">
        {#if meal}
          <day-planner
            day-label={day}
            recipe-title={meal.title}
            image-url={meal.imageUrl}
            onmealRemoved={() => removeMeal(day)}
          ></day-planner>
        {:else}
          <day-planner day-label={day}>
            <button
              slot="assign-action"
              type="button"
              class="btn btn-sm btn-outline-primary"
              onclick={() => openPicker(day)}
            >
              Assign Recipe
            </button>
          </day-planner>
        {/if}
      </div>
    {/each}
  </div>
</div>

{#if selectedDay}
  <div class="modal d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Assign a recipe to {selectedDay}</h5>
          <button type="button" class="btn-close" onclick={closePicker}></button>
        </div>
        <div class="modal-body">
          <div class="row g-2">
            {#each availableRecipes as recipe (recipe.id)}
              <div class="col-md-4">
                <button
                  type="button"
                  class="btn btn-outline-secondary w-100 text-start p-2"
                  onclick={() => pickRecipe(recipe)}
                >
                  <img src={recipe.imageUrl} alt={recipe.title} class="img-fluid rounded mb-1" style="height: 80px; object-fit: cover; width: 100%;" />
                  <div class="small">{recipe.title}</div>
                </button>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}