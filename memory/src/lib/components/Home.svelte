<!-- Home.svelte -->
<script>
    import { navigate } from 'svelte-routing';
  </script>
  
  <main class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-4">Bienvenue sur Memory Origin</h1>
    <button on:click={() => navigate('/game')} class="bg-blue-500 text-white px-4 py-2 rounded">Commencer le jeu</button>
  </main>
  