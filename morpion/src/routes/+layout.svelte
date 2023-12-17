<script >
 import "../app.css";
 let src = '/images/logo.png';


</script>

<div class="flex flex-col min-h-screen">
  <header class="bg-black text-white p-3 text-center h-25">
    <a href="/">
      <img {src} alt="logo" class="mx-auto my-auto w-10 md:w-1/3 lg:w-1/4 xl:w-1/4 object-cover" height="30px" />
    </a>  
  </header>
   
  <main class="grow flex flex-1 justify-center">
    <!-- Le contenu principal de votre application va ici -->
    <slot/>
  </main>
</div>