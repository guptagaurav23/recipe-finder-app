<script lang="ts">
  import { onMount } from 'svelte';
  import { searchRecipes, filterByCategory, getAllCategories } from '$lib/api/mealdb';
  import { isFavorite, toggleFavorite } from '$lib/stores/favorites.svelte';
  import type { Recipe } from '$lib/types/recipe';

  let recipes = $state<Recipe[]>([]);
  let loading = $state(true);
  let searchQuery = $state('');
  let categories = $state<string[]>([]);
  let selectedCategory = $state('');

  onMount(async () => {
    categories = await getAllCategories();
    recipes = await searchRecipes('chicken');
    loading = false;
  });

  async function handleSearch(e: Event) {
    e.preventDefault();
    loading = true;
    selectedCategory = '';
    recipes = searchQuery.trim() ? await searchRecipes(searchQuery.trim()) : await searchRecipes('chicken');
    loading = false;
  }

  async function handleCategoryChange() {
    loading = true;
    searchQuery = '';
    if (selectedCategory) {
      recipes = await filterByCategory(selectedCategory);
    } else {
      recipes = await searchRecipes('chicken');
    }
    loading = false;
  }
</script>

<div class="container mt-4">
  <h1 class="mb-4">Recipe Finder</h1>

  <form class="row g-2 mb-4" onsubmit={handleSearch}>
    <div class="col-md-6">
      <input
        type="text"
        class="form-control"
        placeholder="Search recipes (e.g. pasta, chicken, cake)"
        bind:value={searchQuery}
      />
    </div>
    <div class="col-md-3">
      <select class="form-select" bind:value={selectedCategory} onchange={handleCategoryChange}>
        <option value="">All Categories</option>
        {#each categories as cat}
          <option value={cat}>{cat}</option>
        {/each}
      </select>
    </div>
    <div class="col-md-3">
      <button type="submit" class="btn btn-primary w-100">Search</button>
    </div>
  </form>

  {#if loading}
    <p>Loading recipes...</p>
  {:else if recipes.length === 0}
    <p class="text-muted">No recipes found. Try a different search.</p>
  {:else}
    <div class="row g-3">
      {#each recipes as recipe (recipe.id)}
        <div class="col-md-4">
          <recipe-card
            recipe-title={recipe.title}
            image-url={recipe.imageUrl}
            category={recipe.category}
            is-favorite={isFavorite(recipe.id)}
            onfavoriteToggled={() => toggleFavorite(recipe)}
          >
            <a slot="actions" href={`/recipe/${recipe.id}`} class="btn btn-sm btn-primary">
              View Recipe
            </a>
          </recipe-card>
        </div>
      {/each}
    </div>
  {/if}
</div>