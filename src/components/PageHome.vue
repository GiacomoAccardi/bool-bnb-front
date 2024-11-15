<script>
import axios from "axios";
import BestLocations from "./BestLocations.vue";

export default {
  data() {
    return {
      searchQuery: {
        query: "",  // Testo della query di ricerca (nome immobile)
        city: "",   // Città
        rooms: "",  // Numero di stanze
        radius: 0,  // Raggio di ricerca in km (inizialmente a zero)
      },
      realEstates: [], // Lista completa di immobili
      filteredRealEstates: [], // Lista filtrata che verrà mostrata
      services: [], // Lista completa di servizi
      activeServices: [], // Lista dei servizi attivi (servizi selezionati)
      userLatitude: null,  // Posizione dell'utente (latitudine)
      userLongitude: null, // Posizione dell'utente (longitudine)
    };
  },
  components: {
    BestLocations,
  },
  methods: {
    // Funzione per eseguire la ricerca (GET)
    async onSearch() {
      try {
        const params = {
          city: this.searchQuery.city,
          rooms: this.searchQuery.rooms,
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/api/real-estates",
          { params }
        );
        const service = await axios.get("http://127.0.0.1:8000/api/services");

        this.realEstates = response.data;
        this.services = service.data.data;

        this.applyFilters();
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
      }
    },

    // Funzione per calcolare la distanza tra due coordinate (Haversine formula)
    calculateDistance(lat1, lon1) {
      const lat2 = this.userLatitude;
      const lon2 = this.userLongitude;
      const R = 6371; // Raggio della Terra in km
      const dLat = this.degreesToRadians(lat2 - lat1);
      const dLon = this.degreesToRadians(lon2 - lon1);
      
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distanza in km
    },

    // Converte gradi in radianti
    degreesToRadians(degrees) {
      return degrees * (Math.PI / 180);
    },

    // Funzione per applicare i filtri agli immobili
    applyFilters() {
      let filtered = this.realEstates;

      if (this.searchQuery.query) {
        const queryLower = this.searchQuery.query.toLowerCase();
        filtered = filtered.filter(
          (estate) =>
            estate.title.toLowerCase().includes(queryLower) ||
            estate.city.toLowerCase().includes(queryLower)
        );
      }

      if (this.activeServices.length > 0) {
        filtered = filtered.filter((estate) =>
          this.activeServices.every((serviceId) =>
            estate.services.some((service) => service.id === serviceId)
          )
        );
      }

      if (this.searchQuery.city) {
        const cityLower = this.searchQuery.city.toLowerCase();
        filtered = filtered.filter((estate) =>
          estate.city.toLowerCase().includes(cityLower)
        );
      }

      if (this.searchQuery.rooms) {
        filtered = filtered.filter(
          (estate) => estate.rooms == this.searchQuery.rooms
        );
      }

      // Filtro per il raggio
      if (this.searchQuery.radius > 0 && this.userLatitude && this.userLongitude) {
        filtered = filtered.filter((estate) => {
          const distance = this.calculateDistance(
            estate.latitude,
            estate.longitude
          );
          return distance <= this.searchQuery.radius;
        });
      }

      this.filteredRealEstates = filtered;
    },

    // Metodo per gestire la selezione/deselezione del servizio
    toggleService(serviceId) {
      if (this.activeServices.includes(serviceId)) {
        this.activeServices = this.activeServices.filter((id) => id !== serviceId);
      } else {
        this.activeServices.push(serviceId);
      }
      this.applyFilters();
    },

    // Funzione per ottenere la posizione dell'utente
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLatitude = position.coords.latitude;
            this.userLongitude = position.coords.longitude;
            // Applica i filtri con la posizione dell'utente
            this.applyFilters();
          },
          (error) => {
            console.error("Errore nella geolocalizzazione:", error.message);
          }
        );
      } else {
        console.error("Geolocalizzazione non supportata dal browser.");
      }
    }
  },
  watch: {
    // Per ogni cambio nella query di ricerca, aggiorna i filtri
    "searchQuery.query": "applyFilters",
    "searchQuery.city": "applyFilters",
    "searchQuery.rooms": "applyFilters",
    "searchQuery.radius": "applyFilters", // Aggiunto watch per il raggio
  },
  mounted() {
    // Carica inizialmente tutti gli immobili
    this.onSearch();

    // Ottieni la posizione dell'utente
    this.getUserLocation();
  },
};
</script>

<template>
	<div class="container-fluid">
		<div class="search-bar mb-5">
			<div class="input-group input-group-lg">
			  <span class="input-group-text bg-primary text-white border-0">
				<i class="fas fa-search"></i>
			  </span>
			  <input
				type="text"
				class="form-control border-0 rounded-3 shadow-sm"
				v-model="searchQuery.query"
				placeholder="Dove vuoi andare?"
				aria-label="Search"
			  />
			</div>
			
			<div class="mt-4 d-flex align-items-center justify-content-between">
			  <label for="radius" class="text-muted">Raggio (km):</label>
			  <div class="d-flex align-items-center w-100">
				<input
				  id="radius"
				  type="range"
				  min="0"
				  max="500"
				  step="1"
				  v-model="searchQuery.radius"
				  class="form-range"
				  aria-label="Raggio in chilometri"
				/>
				<span class="ml-3 text-muted">{{ searchQuery.radius }} km</span>
			  </div>
			</div>
		  </div>
  
	  <!-- Sezione filtro avanzato per i servizi -->
	  <div class="text-center w-100 d-flex justify-content-center">
		<div class="d-flex justify-content-start overflow-scroll">
		  <div v-for="service in services" :key="service.id" class="btn">
			<div
			  class="service-icon d-flex justify-content-center align-items-center"
			  style="height: 40px; width: 35px"
			  @click="toggleService(service.id)"
			  :class="{
				'not-active': !activeServices.includes(service.id),
				active: activeServices.includes(service.id),
			  }"
			>
			  <i :class="service.icon + ' fa'"></i>
			</div>
		  </div>
		</div>
	  </div>
  
	  <!-- Sezione che cicla i miei appartamenti -->
	  <div class="">
		<div class="row">
		  <div
			v-for="realEstate in filteredRealEstates"
			:key="realEstate.id"
			class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
		  >
			<router-link
			  :to="{
				name: 'realEstateDetail',
				params: { id: realEstate.id },
			  }"
			  class="btn hover_card"
			>
			  <div
				class="card mb-3 mt-3"
				:class="{ 'border-wow': realEstate.subscriptions.length > 0 }"
			  >
				<div class="row">
				  <div class="col-12">
					<div
					  class="adv-badge"
					  v-if="realEstate.subscriptions.length > 0"
					>
					  <p class="m-0">Sponsorizzato</p>
					</div>
					<img
					  :src="'http://127.0.0.1:8000/storage/' + realEstate.portrait + '?v=' + new Date().getTime()"
					  class="card-img-cu"
					  alt="Immobile"
					/>
				  </div>
  
				  <div class="col-12">
					<div class="card-body">
					  <h5 class="card-title">{{ realEstate.title }}</h5>
					  <p class="card-text">{{ realEstate.address }}, {{ realEstate.city }}</p>
					  <p class="card-text">€ {{ realEstate.price }}</p>
					</div>
				  </div>
				</div>
			  </div>
			</router-link>
		  </div>
		</div>
	  </div>
	</div>
  </template>



  <style lang="scss" scoped>
  /* Contenitore per la barra di scorrimento */
  .overflow-scroll {
    scrollbar-width: thin; /* Per browser compatibili con lo standard (Firefox) */
    scrollbar-color: rgba(0, 0, 0, 0) transparent; /* Colore del thumb e del background */

    &::-webkit-scrollbar {
      width: 6px; /* Larghezza della barra di scorrimento */
      height: 3px; /* Altezza della barra di scorrimento */
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0); /* Colore del thumb (parte interattiva) */
      border-radius: 10px; /* Arrotondamento del thumb */
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.1); /* Colore del thumb al passaggio del mouse */
    }

    &::-webkit-scrollbar-track {
      background: transparent; /* Colore della traccia della scrollbar */
    }
  }

  .container-fluid {
    margin-top: 150px;
    @media screen and (max-width: 768px) {
      margin-top: 0px;
    }
  }

  .search-img {
    width: 150px;
  }

  .content-place {
    background-color: transparent;
    border-radius: 20px;
    cursor: pointer;
    position: relative;
    padding: 10px 24px;
    font-weight: 600;
    transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
    margin-bottom: 30px;

    & img {
      width: 100%;
      border-radius: 20px;
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      margin: auto;
      width: 50px;
      height: 50px;
      border-radius: inherit;
      scale: 0;
      z-index: -1;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }

    &:hover {
      color: #212121;
      scale: 1.1;
      box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
      &::before {
        scale: 3;
      }
    }

    &:active {
      scale: 1;
    }
  }

  .fa {
    font-size: 1.35rem;
    transition: all 0.3s ease-in-out;

    &:hover,
    &:active {
      font-size: 1.45rem;
      color: blue;
    }
  }

  .not-active {
    color: rgb(65, 65, 65);
  }

  .active {
    color: blue;
  }

  .bg {
    background: rgb(219, 219, 219);
    overflow: hidden;
  }

  .img-fluid {
    height: 300px;
  }

  .offerte {
    width: 100%;
    object-fit: cover;
    height: 200px;
  }

  .bg-yellow {
    background-color: rgb(255, 179, 0);
  }

  .dark-image {
    filter: brightness(50%);
  }

  .card {
    position: relative;

    .adv-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: linear-gradient(114deg, rgb(38, 38, 159) 4%, rgba(128, 234, 255, 1) 92%);
      color: white;
      padding: 10px;
      border-radius: 4px;
    }
  }

  .card-img-cu {
    width: 100%;
    object-fit: fill;
    height: 300px;
  }

  .hover_card {
    display: block;
    text-decoration: none;
    opacity: 1;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.025);
      opacity: 1;
    }

    &:active {
      transform: scale(0.975);
      opacity: 1;
      border: 0;
    }
  }

  .border-yellow {
    border: 2px solid #ffd700;
  }

  .bg-gray {
    background-color: rgb(200, 199, 199);
  }

  .search-bar {
    width: 900px;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      max-width: 600px;
    }
  }

  .border-wow {
    border: 4px solid transparent;
    border-image: linear-gradient(114deg, rgb(38, 38, 159) 4%, rgba(128, 234, 255, 1) 92%) 1;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.415);
  }

  .form-control-range {
    width: 100%;
    margin: 0 10px;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 5px;
    outline: none;

    &:focus {
      background: #ccc;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: #007bff;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background: #0056b3;
      }
    }
  }

  .service-icon {
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 50%;
    transition: background-color 0.3s;
  }

  .input-group-text {
    background-color: #f8f9fa;
  }

  .form-control {
    border-radius: 5px;
  }

  .card-img-top {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }



  .search-bar {
    max-width: 500px;
    margin: 0 auto;
  }

  .input-group-text {
    background-color: #007bff;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.2rem;
  }

  .form-control {
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-control:focus {
    box-shadow: 0 0 0 0.2rem rgba(38, 38, 159, 0.25);
    border-color: #007bff;
  }

  .form-range {
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 50px;
    -webkit-appearance: none;
    appearance: none;
    transition: background 0.3s ease;
  }

  .form-range:focus {
    outline: none;
    background: #0056b3;
  }

  .form-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .form-range::-webkit-slider-thumb:hover {
    background: #0056b3;
  }
</style>
