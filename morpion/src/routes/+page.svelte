
<script>
	import { goto } from '$app/navigation';
  
    function jouer() {
      goto('/Game');
    }
  </script>
  
  <div class="menu-container grow">
    <button class="play-button"on:click={() =>jouer()}>
      Jouer
    </button>
  </div>

    <style>
    /* Styles du menu */
    .menu-container {
        background-image: url('/images/image1.jpg'); /* Utilisez des slash inclinés */
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
    .play-button {
      position: relative; /* Ajustez la valeur selon votre besoin de déplacement horizontal */
      padding: 25px;
      font-size: 22px;
      background-color: #4CAF50; /* Couleur de fond du bouton "Jouer" */
      color: white; /* Couleur du texte du bouton "Jouer" */
      border: none;
      border-radius: 50px;
      cursor: pointer;
      width: 300px;
    }
  
    .play-button:hover {
      background-color: #45a049; /* Couleur de fond du bouton "Jouer" au survol */
    }
  </style>
