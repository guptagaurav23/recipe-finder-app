<script lang="ts">
  import { getFavorites, toggleFavorite, isFavorite } from '$lib/stores/favorites.svelte';
</script>

<div class="container mt-4">
  <h1 class="mb-4">My Favorites</h1>

  {#if getFavorites().length === 0}
    <p class="text-muted">You haven't favorited any recipes yet.</p>
    <a href="/" class="btn btn-primary btn-sm">Browse Recipes</a>
  {:else}
    <div class="row g-3">
      {#each getFavorites() as recipe (recipe.id)}
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