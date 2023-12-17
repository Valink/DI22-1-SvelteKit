<script>
    import  {themeStore, themes} from "$lib/themeStore";
</script>

<div>
    {#each themes as theme, i}
        <button on:click={() => (themeStore.set(theme))}>{theme}</button>
    {/each}
</div>
<img class="bg-cover bg-center" src="/images/theme/{$themeStore}.jpg" alt="Background" />

<a class="bg-blue-500 text-white px-4 py-2 rounded" href="game">Jouer</a>

<style>
    div {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 20px;
        max-width: 400px;
    }
 
    button {
        display: inline-block;
        padding: 15px 55px;
        font-size: 24px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        outline: none;
        color: #fff;
        background-color: #0d6b49;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #888585;
    }
</style>