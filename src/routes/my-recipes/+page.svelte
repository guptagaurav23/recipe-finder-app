<script lang="ts">
  import { getUserRecipes, deleteUserRecipe } from '$lib/stores/userRecipes.svelte';
</script>

<div class="container mt-4">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1>My Recipes</h1>
    <a href="/my-recipes/new" class="btn btn-primary">+ Add New Recipe</a>
  </div>

  {#if getUserRecipes().length === 0}
    <p class="text-muted">You haven't created any recipes yet.</p>
  {:else}
    <div class="row g-3">
      {#each getUserRecipes() as recipe (recipe.id)}
        <div class="col-md-4">
          <div class="card">
            <img src={recipe.imageUrl} alt={recipe.title} class="card-img-top" style="height: 180px; object-fit: cover;" />
            <div class="card-body">
              <h5 class="card-title">{recipe.title}</h5>
              <p class="card-text text-muted">{recipe.category}</p>
              <div class="d-flex gap-2">
                <a href={`/recipe/${recipe.id}`} class="btn btn-sm btn-outline-primary">View</a>
                <a href={`/my-recipes/${recipe.id}/edit`} class="btn btn-sm btn-outline-secondary">Edit</a>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  onclick={() => deleteUserRecipe(recipe.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>