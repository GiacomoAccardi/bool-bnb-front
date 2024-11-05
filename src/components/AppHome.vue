<template>
    <div class="container-sm">
        <div class="row">
            <div class="col-12 text-center mt-3">
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
            <div class="col-12 mt-5 text-center">
                <h2>Scopri quanto è facile affittare il tuo appartamento preferito.</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="content text-center">
                    <img class="search-img mt-5" src="../assets/search.png">
                    <p class="mt-3">puoi cercare l'appartamento giusto per te <br> in modo facile e veloce </p>
                </div>
            </div>
            <div class="col-4">
                <div class="content text-center">
                    <img class="search-img mt-5" src="../assets/travel-agency.png">
                    <p class="mt-3">Confronta centinaia di prezzi e scopri l'offerta<br> più adatta a te</p>
                </div>
            </div>
            <div class="col-4">
                <div class="content text-center">
                    <img class="search-img mt-5" src="../assets/money.png">
                    <p class="mt-3">Risparmia alla grande e scopri le nostre offerte per prenotare l'appartamento dei tuoi sogni</p>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12"></div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AppHome",
  };
  </script>
  
  <style lang="scss" scoped>
  
  .container-sm{
    margin-top: 380px;
  }
  .search-img {
    width: 150px;
}
  
  </style>
  
  