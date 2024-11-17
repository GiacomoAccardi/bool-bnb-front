<template>
	<div class="container-fluid px-5">
		<div class="d-flex justify-content-center mb-5">
			<div class="w-50">
				<AppSearch @search-coordinates="filterRealEstates" />
			</div>
		</div>
		<div class="real-estate-list">
			<div v-if="loading">Caricamento in corso...</div>
			<div v-else-if="error">{{ error }}</div>
			<div v-else>
				<div class="row g-5">
					<real-estate-card
						v-for="realEstate in filteredRealEstates"
						:key="realEstate.id"
						:real-estate="realEstate"
						@view-details="viewDetails"
						class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import RealEstateCard from "./RealEstateCard.vue";
import AppSearch from "./AppSearch.vue";

export default {
	components: {
		RealEstateCard,
		AppSearch,
	},
	data() {
		return {
			searchQuery: "", // Aggiungi searchQuery per monitorare l'input dell'utente
			realEstates: [], // Lista di tutti gli immobili
			filteredRealEstates: [], // Lista degli immobili filtrati
			loading: false, // Stato di caricamento
			error: null, // Messaggio di errore
		};
	},
	methods: {
		getRealEstates(city = "") {
			this.loading = true;
			this.error = null;

			let url = "http://127.0.0.1:8000/api/real-estates"; // URL base
			if (city) {
				url += `?city=${city}`; // Aggiungi un filtro se c'è una città
			}

			axios
				.get(url)
				.then((response) => {
					this.realEstates = response.data; // Ottieni tutti gli immobili (con o senza filtro)
					this.filteredRealEstates = this.realEstates; // All'inizio, mostra tutti gli immobili
					console.log("Real estates loaded:", this.realEstates); // Log dei dati
				})
				.catch((error) => {
					this.error = "Errore durante il caricamento dei dati.";
				})
				.finally(() => {
					this.loading = false;
					console.log("Loading finished:", this.loading); // Log di completamento caricamento
				});
		},
		filterRealEstates(coordinates) {
			console.log("Coordinates received:", coordinates); // Log per le coordinate
			if (coordinates) {
				const { lat, lon } = coordinates;
				// Filtra gli immobili nel raggio di 20 km dalle coordinate selezionate
				this.filteredRealEstates = this.realEstates.filter((realEstate) => {
					const distance = this.calculateDistance(
						lat,
						lon,
						realEstate.latitude,
						realEstate.longitude
					);
					return distance <= 20; // Filtra per distanza
				});
			} else {
				this.filteredRealEstates = this.realEstates; // Se non ci sono coordinate, mostra tutti gli immobili
			}
		},
		calculateDistance(lat1, lon1, lat2, lon2) {
			const R = 6371; // Raggio della Terra in km
			const dLat = this.degreesToRadians(lat2 - lat1);
			const dLon = this.degreesToRadians(lon2 - lon1);
			const a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(this.degreesToRadians(lat1)) *
					Math.cos(this.degreesToRadians(lat2)) *
					Math.sin(dLon / 2) *
					Math.sin(dLon / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			return R * c; // Distanza in km
		},
		degreesToRadians(degrees) {
			return (degrees * Math.PI) / 180;
		},
	},
	watch: {
		// Aggiungi un watcher per searchQuery
		searchQuery(newQuery) {
			if (newQuery === "") {
				// Se la barra di ricerca è vuota, carica tutti gli immobili
				this.getRealEstates();
			} else {
				// Se la barra di ricerca non è vuota, filtra per città
				this.getRealEstates(newQuery);
			}
		},
	},
	created() {
		this.getRealEstates(); // Carica tutti gli immobili all'inizio
	},
};
</script>

<style scoped>
.real-estate-list {
	padding: 16px;
}
.container-fluid {
	margin-top: 100px;
}
</style>
