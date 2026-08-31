<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@gauravgupta14/recipe-ui/recipe-card';
  import '@gauravgupta14/recipe-ui/rating-star';
  import '@gauravgupta14/recipe-ui/day-planner';

  let { children } = $props();
</script>

<nav class="navbar navbar-expand navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="/">Recipe Finder</a>
    <div class="navbar-nav">
      <a class="nav-link" href="/">Browse</a>
      <a class="nav-link" href="/favorites">Favorites</a>
      <a class="nav-link" href="/planner">Meal Planner</a>
      <a class="nav-link" href="/my-recipes">My Recipes</a>
    </div>
  </div>
</nav>

{@render children()}