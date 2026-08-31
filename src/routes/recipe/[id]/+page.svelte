<script lang="ts">
  import type { PageData } from './$types';
  import { isFavorite, toggleFavorite } from '$lib/stores/favorites.svelte';
  import { getRating, setRating } from '$lib/stores/ratings.svelte';

  let { data }: { data: PageData } = $props();
  let recipe = $derived(data.recipe);

  function handleRatingChanged(e: CustomEvent<{ rating: number }>) {
    setRating(recipe.id, e.detail.rating);
  }
</script>
<div class="container mt-4">
  <a href="/" class="btn btn-outline-secondary btn-sm mb-3">&larr; Back</a>

  <div class="row">
    <div class="col-md-5">
      <img src={recipe.imageUrl} alt={recipe.title} class="img-fluid rounded shadow-sm" />
    </div>

    <div class="col-md-7">
      <div class="d-flex justify-content-between align-items-start">
        <h1>{recipe.title}</h1>
        <button
          type="button"
          class="btn btn-outline-danger btn-sm"
          onclick={() => toggleFavorite(recipe)}
        >
          {isFavorite(recipe.id) ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>
<rating-star
  rating={getRating(recipe.id)}
  max-rating={5}
  onratingChanged={handleRatingChanged}
></rating-star>
      <p class="text-muted">
        {recipe.category} &middot; {recipe.area}
      </p>

      {#if recipe.tags.length > 0}
        <div class="mb-3">
          {#each recipe.tags as tag}
            <span class="badge bg-secondary me-1">{tag}</span>
          {/each}
        </div>
      {/if}

      <h4 class="mt-4">Ingredients</h4>
      <ul class="list-group list-group-flush mb-4">
        {#each recipe.ingredients as ing}
          <li class="list-group-item">
            <strong>{ing.measure}</strong> {ing.name}
          </li>
        {/each}
      </ul>

      <h4>Instructions</h4>
      <p style="white-space: pre-line;">{recipe.instructions}</p>

      {#if recipe.youtubeUrl}
        <a href={recipe.youtubeUrl} target="_blank" rel="noopener noreferrer" class="btn btn-danger mt-2">
          Watch on YouTube
        </a>
      {/if}
    </div>
  </div>
</div>