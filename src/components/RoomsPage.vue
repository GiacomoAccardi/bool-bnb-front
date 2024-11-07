<script>
export default {
    
}
</script>
<template>
    <div class="container-sm">
        <div class="row">
            <div class="col-12 text-center mt-3 mb-3">
                <div class="search-bar">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-search"></i></span>
                        <input type="text" class="form-control" placeholder="Dove vuoi andare?" aria-label="Search">
                        <input type="number" class="form-control" placeholder="Prezzo Min" aria-label="Prezzo Min">
                        <input type="number" class="form-control" placeholder="Prezzo Max" aria-label="Prezzo Max">
                        <input type="number" class="form-control" placeholder="Numero Stanze" aria-label="Numero Stanze">
                        <button class="btn btn-primary">Cerca</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row g-0"> <!-- 'g-0' per rimuovere lo spazio tra le colonne -->
            <div class="col-8">
                <div class="card mb-3 mt-3" style="width: 740px;">
                    <div class="row g-0">
                        <div class="col-lg-4">
                            <img src="../assets/napoli.jpg" class="rounded-start card-img" alt="...">
                        </div>
                        <div class="col-lg-8">
                            <div class="card-body">
                                <h5 class="card-title">Villa Napoli</h5>
                                <p class="card-text">due persone.</p>
                                <p class="card-text">30 metri quadrati</p>
                                <p class="card-text text-end me-3">prezzo</p>
                                <p class="card-text text-end me-3">250 &euro;</p>
                                <p class="card-text"><small class="text-body-secondary"> <a class="text-decoration-none text-black" href="#">Dettagli</a></small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card mb-3 mt-3" style="max-width: 440px;">
                            <div class="card-body text-center">
                                <h5 class="card-title text-center">La tua prenotazione</h5>
                                <p class="card-text"> 1 notte, due persone.</p>
                                <p class="card-text">30 metri quadrati</p>
                                <p class="card-text">nome della casa scelto</p>
                                <p class="card-text">prezzo</p>
                                <p class="card-text">250 &euro;</p>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Codice sconto">
                                    <button class="btn btn-primary">aggiungi</button>
                                </div>
                                <p class="card-text">totale</p>
                                <button class="btn btn-primary">continua</button>
                            </div>
                       </div>
                 </div>
             </div>
         </div>
    
</template>
<style lang="scss" scoped>
.container-sm{
    margin-top: 380px;
  }

  .card-img{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .col-8, .col-4 {
    padding-left: 0;
    padding-right: 0;
}

/* Imposta margine negativo tra le colonne per avvicinarle */
.col-8 {
    margin-right: -55px;
}

.col-4 {
    margin-left: -55px;
}
</style>