<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';
  import { updateUserRecipe } from '$lib/stores/userRecipes.svelte';
  import { validateRecipe, type ValidationErrors } from '$lib/util/validateRedipe';

  let { data }: { data: PageData } = $props();

  let title = $state(data.recipe.title);
  let category = $state(data.recipe.category);
  let area = $state(data.recipe.area);
  let imageUrl = $state(data.recipe.imageUrl);
  let instructions = $state(data.recipe.instructions);
  let ingredients = $state(
    data.recipe.ingredients.length > 0
      ? [...data.recipe.ingredients]
      : [{ name: '', measure: '' }]
  );

  let errors = $state<ValidationErrors>({});

  function addIngredientRow() {
    ingredients = [...ingredients, { name: '', measure: '' }];
  }

  function removeIngredientRow(index: number) {
    ingredients = ingredients.filter((_, i) => i !== index);
  }

  function handleSubmit(e: Event) {
    e.preventDefault();

    const formData = { title, category, area, imageUrl, instructions, ingredients };
    errors = validateRecipe(formData);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const cleanIngredients = ingredients.filter((i) => i.name.trim() !== '');

    updateUserRecipe(data.recipe.id, {
      title,
      category,
      area,
      imageUrl,
      instructions,
      ingredients: cleanIngredients,
      tags: data.recipe.tags,
      youtubeUrl: data.recipe.youtubeUrl
    });

    goto(`/recipe/${data.recipe.id}`);
  }
</script>

<div class="container mt-4">
  <h1 class="mb-4">Edit Recipe</h1>

  <form onsubmit={handleSubmit} novalidate>
    <div class="mb-3">
      <label class="form-label" for="title">Recipe Title</label>
      <input
        id="title"
        type="text"
        class="form-control"
        class:is-invalid={errors.title}
        bind:value={title}
      />
      {#if errors.title}
        <div class="invalid-feedback">{errors.title}</div>
      {/if}
    </div>

    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label" for="category">Category</label>
        <input
          id="category"
          type="text"
          class="form-control"
          class:is-invalid={errors.category}
          bind:value={category}
        />
        {#if errors.category}
          <div class="invalid-feedback">{errors.category}</div>
        {/if}
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label" for="area">Cuisine / Area</label>
        <input id="area" type="text" class="form-control" bind:value={area} />
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label" for="imageUrl">Image URL</label>
      <input
        id="imageUrl"
        type="text"
        class="form-control"
        class:is-invalid={errors.imageUrl}
        bind:value={imageUrl}
      />
      {#if errors.imageUrl}
        <div class="invalid-feedback">{errors.imageUrl}</div>
      {/if}
    </div>

    <div class="mb-3">
      <label class="form-label" for="instructions">Instructions</label>
      <textarea
        id="instructions"
        class="form-control"
        class:is-invalid={errors.instructions}
        rows="5"
        bind:value={instructions}
      ></textarea>
      {#if errors.instructions}
        <div class="invalid-feedback">{errors.instructions}</div>
      {/if}
    </div>

    <div class="mb-3">
      <label class="form-label">Ingredients</label>
      {#if errors.ingredients}
        <div class="text-danger small mb-2">{errors.ingredients}</div>
      {/if}

      {#each ingredients as ingredient, i}
        <div class="row g-2 mb-2">
          <div class="col-md-6">
            <input type="text" class="form-control" placeholder="Ingredient name" bind:value={ingredient.name} />
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" placeholder="Measure" bind:value={ingredient.measure} />
          </div>
          <div class="col-md-2">
            <button
              type="button"
              class="btn btn-outline-danger w-100"
              onclick={() => removeIngredientRow(i)}
              disabled={ingredients.length === 1}
            >
              Remove
            </button>
          </div>
        </div>
      {/each}

      <button type="button" class="btn btn-outline-secondary btn-sm mt-1" onclick={addIngredientRow}>
        + Add Ingredient
      </button>
    </div>

    <button type="submit" class="btn btn-primary mt-3">Update Recipe</button>
  </form>
</div>