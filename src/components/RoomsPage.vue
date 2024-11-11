<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: {
        query: '',
        city: '',
        rooms: '',
      },
      realEstates: [],
    };
  },
  methods: {
    // Funzione per eseguire la ricerca
    async onSearch() {
      try {
        // Prepara i parametri di ricerca
        const params = {
          // query: this.searchQuery.query,
          city: this. realEstates.city,
          rooms: this.searchQuery.rooms,
        };

        // Fai una richiesta GET al back-end con i parametri di ricerca
        const response = await axios.get('http://127.0.0.1:8000/api/real-estates');

        // Salva i risultati nella variabile 'realEstates'
        this.realEstates = response.data;
      } catch (error) {
        console.error('Errore durante la ricerca:', error);
      }
    },
  },
  mounted() {
    // Carica inizialmente tutti gli immobili
    this.onSearch();
  }
};
</script>
<template>
    <div class="container-sm">
      <div class="row">
        <div class="col-12 text-center mt-3 mb-3">
          <div class="search-bar">
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
              <input 
                v-model=" realEstates.city" 
                type="text" 
                class="form-control" 
                placeholder="Cerca per titolo, città..." 
                aria-label="Search"
              >
              <!-- <input 
                v-model="searchQuery.minPrice" 
                type="number" 
                class="form-control" 
                placeholder="Prezzo Min" 
                aria-label="Prezzo Min"
              >
              <input 
                v-model="searchQuery.maxPrice" 
                type="number" 
                class="form-control" 
                placeholder="Prezzo Max" 
                aria-label="Prezzo Max"
              > -->
              <input 
                v-model="searchQuery.rooms" 
                type="number" 
                class="form-control" 
                placeholder="Numero Stanze" 
                aria-label="Numero Stanze"
              >
              <button @click="onSearch" class="btn btn-primary">Cerca</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="container">
        <div class="row g-0">
          <!-- Loop per visualizzare le card -->
          <div v-for="realEstate in realEstates" :key="realEstate.id" class="col-8">
            <div class="card mb-3 mt-3" style="width: 740px;">
              <div class="row g-0">
                <div class="col-lg-4">
                  <img :src="realEstate.portrait || 'https://placehold.co/600x400?text=Immagine+non+disponibile'" class="card-img" alt="Immobile">
                </div>
                <div class="col-lg-8">
                  <div class="card-body">
                    <h5 class="card-title">{{ realEstate.title }}</h5>
                    <p class="card-text">{{ realEstate.address }}, {{ realEstate.city }}</p>
                    <p class="card-text">€ {{ realEstate.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  .container-sm {
    margin-top: 380px;
  }
  
  .card-img {
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
  