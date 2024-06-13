<script lang="ts">
  import Router from './router/Router.svelte';
  import AuthContext from './stores/AuthContext.svelte';
  import "smelte/src/tailwind.css";
</script>

<AuthContext>
  <Router />
</AuthContext>

<!-- <Home />
<SidePanel /> -->
<style>
</style>
