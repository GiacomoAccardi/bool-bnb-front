<script>
import axios from "axios";
import BestLocations from "./BestLocations.vue";

export default {
  data() {
    return {
      searchQuery: {
        query: "",    // Testo della query di ricerca (nome immobile)
        city: "",     // Città
        rooms: "",    // Numero di stanze
        radius: 0,    // Raggio di ricerca iniziale (km)
      },
      realEstates: [],           // Lista completa di immobili
      filteredRealEstates: [],   // Lista filtrata che verrà mostrata
      services: [],              // Lista completa di servizi
      activeServices: [],        // Lista dei servizi attivi (servizi selezionati)
    };
  },
  components: {
    BestLocations,
  },
  methods: {
    // Funzione per eseguire la ricerca (GET)
    async onSearch() {
      try {
        // Prepara i parametri di ricerca
        const params = {
          city: this.searchQuery.city,
          rooms: this.searchQuery.rooms,
          radius: this.searchQuery.radius,  // Aggiungi il raggio ai parametri di ricerca
        };

        // Fai una richiesta GET al back-end con i parametri di ricerca
        const response = await axios.get("http://127.0.0.1:8000/api/real-estates", { params });
        const service = await axios.get("http://127.0.0.1:8000/api/services");

        // Salva i risultati nella variabile 'realEstates'
        this.realEstates = response.data;
        this.services = service.data.data;

        // Dopo aver ottenuto i dati, applica i filtri
        this.applyFilters();
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
      }
    },

    // Funzione per applicare i filtri agli immobili
    applyFilters() {
      let filtered = this.realEstates;

      // Filtro per la ricerca in base alla query (ricerca per nome o città)
      if (this.searchQuery.query) {
        const queryLower = this.searchQuery.query.toLowerCase();
        filtered = filtered.filter(
          (estate) =>
            estate.title.toLowerCase().includes(queryLower) ||
            estate.city.toLowerCase().includes(queryLower)
        );
      }

      // Filtro per i servizi attivi
      if (this.activeServices.length > 0) {
        filtered = filtered.filter((estate) =>
          this.activeServices.every((serviceId) =>
            estate.services.some((service) => service.id === serviceId)
          )
        );
      }

      // Filtro per la città
      if (this.searchQuery.city) {
        const cityLower = this.searchQuery.city.toLowerCase();
        filtered = filtered.filter((estate) =>
          estate.city.toLowerCase().includes(cityLower)
        );
      }

      // Filtro per il numero di stanze
      if (this.searchQuery.rooms) {
        filtered = filtered.filter(
          (estate) => estate.rooms == this.searchQuery.rooms
        );
      }

      // Filtro per il raggio di ricerca
      if (this.searchQuery.radius > 0) {
        filtered = filtered.filter((estate) => {
          const distance = this.calculateDistance(estate);
          return distance <= this.searchQuery.radius;
        });
      }

      // Salvo il risultato filtrato
      this.filteredRealEstates = filtered;
    },

    // Metodo per calcolare la distanza (deve essere implementato in base ai dati disponibili)
    calculateDistance(estate) {
      // Supponiamo che gli immobili abbiano latitudine e longitudine
      // Aggiungere una logica per calcolare la distanza in km tra l'utente e l'immobile
      const userLat = 45.0703; // Esempio di latitudine dell'utente
      const userLon = 7.6869; // Esempio di longitudine dell'utente

      const estateLat = estate.latitude;
      const estateLon = estate.longitude;

      // Formula per calcolare la distanza tra due punti sulla Terra (Haversine)
      const R = 6371; // Raggio della Terra in km
      const dLat = this.deg2rad(estateLat - userLat);
      const dLon = this.deg2rad(estateLon - userLon);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(userLat)) *
          Math.cos(this.deg2rad(estateLat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distanza in km

      return distance;
    },

    // Metodo di supporto per la conversione da gradi a radianti
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },

    // Metodo per gestire la selezione/deselezione del servizio
    toggleService(serviceId) {
      if (this.activeServices.includes(serviceId)) {
        // Se il servizio è già attivo, rimuovilo
        this.activeServices = this.activeServices.filter(
          (id) => id !== serviceId
        );
      } else {
        // Altrimenti, aggiungi il servizio attivo
        this.activeServices.push(serviceId);
      }
      // Applica i filtri dopo la selezione
      this.applyFilters();
    },
  },
  watch: {
    // Creo un Watch per il cambiamento della query di ricerca
    "searchQuery.query": function () {
      this.applyFilters();
    },
    "searchQuery.city": function () {
      this.applyFilters();
    },
    "searchQuery.rooms": function () {
      this.applyFilters();
    },
    "searchQuery.radius": function () {
      this.applyFilters(); // Applicare i filtri quando cambia il raggio
    },
  },
  mounted() {
    // Carica inizialmente tutti gli immobili
    this.onSearch();
  },
};
</script>

<template>
	<!-- sezione per la ricerca -->
	<div class="container-fluid">
		<div class="search-bar mb-5">
			<div class="input-group">
				<span class="input-group-text mt-5"><i class="fas fa-search"></i></span>
				<input
					type="text"
					class="form-control mt-5"
					v-model="searchQuery.query"
					placeholder="Dove vuoi andare?"
					aria-label="Search" />
				<input
					type="number"
					class="form-control mt-5"
					v-model="searchQuery.rooms"
					placeholder="Numero Stanze"
					aria-label="Numero Stanze"
					min="0" />
					<div class="mt-4">
						<label for="radius" class="form-label ms-5">Raggio di ricerca (km): {{ searchQuery.radius }}</label>
						<input
						  type="range"
						  class="form-range"
						  id="radius"
						  v-model="searchQuery.radius"
						  min="0"
						  max="20"
						  step="1"
						/>
					  </div>			</div>
		</div>

		<!-- sezione filtro avanzato per i servizi -->
		<div class="text-center w-100 d-flex justify-content-center">
			<div class="d-flex justify-content-start overflow-scroll">
				<div v-for="service in services" :key="service.id" class="btn">
					<!-- Contenitore per ogni icona -->
					<div
						class="service-icon d-flex justify-content-center align-items-center"
						style="height: 40px; width: 35px"
						@click="toggleService(service.id)"
						:class="{
							'not-active': !activeServices.includes(service.id),
							active: activeServices.includes(service.id),
						}">
						<!-- Mostra l'icona del servizio -->
						<i :class="service.icon + ' fa'"></i>
					</div>
				</div>
			</div>
		</div>
		<!-- sezione che cicla i miei appartamenti -->
		<div class="">
			<div class="row">
				<div
					v-for="realEstate in filteredRealEstates"
					:key="realEstate.id"
					class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
					<router-link
						:to="{
							name: 'realEstateDetail',
							params: { id: realEstate.id },
						}"
						class="btn hover_card">
						<div
							class="card mb-3 mt-3"
							:class="{ 'border-wow': realEstate.subscriptions.length > 0 }">
							<!-- Verifica se subscriptions contiene almeno un elemento -->
							<div class="row">
								<div class="col-12">
									<div
										class="adv-badge"
										v-if="realEstate.subscriptions.length > 0">
										<p class="m-0">Sponsorizzato</p>
									</div>
									<img
										:src="
											'http://127.0.0.1:8000/storage/' +
											realEstate.portrait +
											'?v=' +
											new Date().getTime()
										"
										class="card-img-cu"
										alt="Immobile" />
								</div>

								<div class="col-12">
									<div class="card-body">
										<h5 class="card-title">{{ realEstate.title }}</h5>
										<p class="card-text">
											{{ realEstate.address }}, {{ realEstate.city }}
										</p>
										<p class="card-text">€ {{ realEstate.price }}</p>
									</div>
								</div>
							</div>
						</div>
					</router-link>
				</div>
				<!-- <BestLocations /> -->
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
		background: rgba(0, 0, 0, 0); /* Colore del thumb al passaggio del mouse */
	}

	&::-webkit-scrollbar-track {
		background: transparent; /* Colore del track (sfondo della barra di scorrimento) */
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
	background-color: gray;
	border-radius: 20px;
}
.content-place img {
	width: 100%;
	border-radius: 20px;
}

.bg {
	background: rgb(219, 219, 219);
	overflow: hidden;
}

.fa {
	font-size: 1.35rem;
	transition: all 0.3s ease-in-out;
	&:hover {
		font-size: 1.45rem;
		color: blue;
	}
	&:active {
		color: blue;
		font-size: 1.45rem;
	}
}
.not-active {
	color: rgb(65, 65, 65);
}

.active {
	color: blue;
}

.content-place {
	cursor: pointer;
	position: relative;
	padding: 10px 24px;
	background-color: transparent;
	font-weight: 600;
	transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
	overflow: hidden;
	margin-bottom: 30px;
}

.content-place::before {
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

.content-place:hover::before {
	scale: 3;
}

.content-place:hover {
	color: #212121;
	scale: 1.1;
	box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
}

.content-place:active {
	scale: 1;
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
		background: linear-gradient(
			114deg,
			rgb(38, 38, 159) 4%,
			rgba(128, 234, 255, 1) 92%
		);
		color: white;
		padding: 10px;
		border-radius: 4px; // Opzionale, per un aspetto più elegante
	}
}

.card-img-cu {
	width: 100%;
	object-fit: fill;
	height: 300px;
}

.hover_card {
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
}

.border-wow {
	border: 4px solid transparent;
	border-image: linear-gradient(
			114deg,
			rgb(38, 38, 159) 4%,
			rgba(128, 234, 255, 1) 92%
		)
		1;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.415);
}
</style>
