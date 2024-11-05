<script>
export default {
    
}
</script>
<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-2">
          <img class="logo" src="../assets/BOOL-BNB-DB.png" alt="">
        </div>
        <div class="col-10">
            <div class="content">
                <ul class="list-unstyled mt-3 d-flex justify-content-end">
                    <li class="mx-3"><a class="text-decoration-none text-black" href="#">Home</a></li>
                    <li class="mx-3"><a class="text-decoration-none text-black" href="#">Chi siamo</a></li>
                    <li class="mx-3"><a class="text-decoration-none text-black" href="#">Contatti</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="centered-text">
        Trova la casa ideale con bool bnb!
    </div>
  </div>
</template>
<style lang="scss" scoped>
    .logo{
        height: 60px;
        position: relative;
        z-index: 10;
    }



    .container-fluid {
        background-image: url('../assets/landing-page.jpg'); 
        background-size: cover; /* Assicura che l'immagine copra tutto lo spazio */
    background-position: center; /* Centra l'immagine */
    background-attachment: fixed; /* Fissa lo sfondo mentre si scorre */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 500px; /* Altezza dell'immagine */
    z-index: -1; /* Assicura che l'immagine stia sotto il contenuto */
    overflow: hidden;
    }

    .container-fluid::before {
        content: ''; /* Creiamo un elemento vuoto */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.4);  /* Overlay scuro con trasparenza (puoi regolare il valore) */
        z-index: 1; /* Deve essere sopra l'immagine ma sotto il contenuto */
    }

    .content {
        position: relative;
        z-index: 10; /* Assicura che il menu sia sopra l'overlay */
    }
    
    ul.list-unstyled li a {
        color: #000000; /* Colore più scuro per il testo (grigio scuro) */
        font-size: 18px;
        text-transform: uppercase;
        transition: color 0.3s ease;
        
    }

    .centered-text {
        position: absolute; /* Posiziona la scritta sopra l'immagine di sfondo */
        top: 50%; /* Posiziona verticalmente al centro */
        left: 50%; /* Posiziona orizzontalmente al centro */
        transform: translate(-50%, -50%); /* Centra esattamente usando il traslamento */
        color: #000; /* Colore del testo (nero, ma puoi cambiarlo) */
        font-size: 3rem; /* Dimensione del testo */
        text-align: center; /* Allineamento del testo */
        font-weight: bold; /* Aggiunge grassetto alla scritta */
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Aggiunge ombra al testo per migliorare la visibilità */
        z-index: 2; /* Assicura che la scritta stia sopra l'overlay */
    }

    ul.list-unstyled li a:active {
       border: 1px solid black;
       padding: 5px; /* Cambia colore al passaggio del mouse (nero) */
    }
</style>