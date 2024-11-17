<script>
import axios from "axios";

export default {
	data() {
		return {
			searchQuery: "", // La query di ricerca
			suggestions: [], // Le suggestioni per l'autocompletamento
			coordinates: null, // Coordinate della posizione selezionata
			selectedIndex: -1, // Indice dell'elemento selezionato tramite tastiera
			realEstates: [], // Lista degli immobili
			loading: false, // Stato di caricamento
			error: null, // Messaggio di errore
		};
	},
	methods: {
		// Funzione chiamata ad ogni cambiamento dell'input
		onInputChange() {
			console.log("onInputChange called with:", this.searchQuery);

			if (this.searchQuery.length === 0) {
				// Reset everything when search is emptied
				this.suggestions = [];
				this.coordinates = null;
				this.$emit("search-coordinates", null);
				return;
			}

			if (this.searchQuery.length > 2) {
				// Se la query ha più di 2 caratteri, esegui la ricerca su TomTom
				this.fetchSuggestions();
			} else {
				// Se la query è vuota o ha pochi caratteri, ricarica tutti gli immobili
				console.log("Search query is empty or short, loading all real estates");
				this.getRealEstates(); // Ricarica tutti gli immobili
			}
		},
		// Funzione per chiamare l'API di TomTom per ottenere le suggestioni
		async fetchSuggestions() {
			const tomtomApiKey = "9Yq5kH65us12yazEXv9SX8bGsAYxX1fL"; // Sostituisci con la tua chiave API di TomTom
			const url = `https://api.tomtom.com/search/2/search/${this.searchQuery}.json?key=${tomtomApiKey}&typeahead=true&limit=5&language=it-IT`;

			console.log("Fetching suggestions for:", this.searchQuery); // Log per tracciare la richiesta API

			try {
				const response = await axios.get(url);
				console.log("Suggestions response:", response.data); // Log per vedere la risposta delle suggestioni
				this.suggestions = response.data.results;
				this.selectedIndex = -1; // Resetta l'indice selezionato dopo una nuova ricerca
			} catch (error) {
				console.error("Errore durante la ricerca", error);
			}
		},
		// Funzione per caricare gli immobili (sia filtrati che tutti)
		getRealEstates(city = null) {
			console.log("Getting real estates for city:", city); // Log per tracciare la richiesta degli immobili

			this.loading = true;
			this.error = null;

			let url = "http://127.0.0.1:8000/api/real-estates";

			if (city && city.length > 0) {
				console.log("Applying city filter:", city); // Log per tracciare quando si applica un filtro per città
				url += `?city=${city}`; // Aggiungi il filtro per la città se fornito
			}

			axios
				.get(url)
				.then((response) => {
					console.log("Real estate response:", response.data); // Log per vedere la risposta dell'API degli immobili
					this.realEstates = response.data; // Carica gli immobili (filtrati o totali)
				})
				.catch((error) => {
					this.error = "Errore durante il caricamento dei dati.";
					console.error("Errore durante il caricamento degli immobili", error);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		// Funzione per selezionare una suggestione al click
		selectSuggestion(suggestion) {
			console.log("Selected suggestion:", suggestion); // Log per tracciare quale suggestione viene selezionata

			// Al click su una suggestione, salva le coordinate
			this.coordinates = {
				lat: suggestion.position.lat,
				lon: suggestion.position.lon,
			};
			this.searchQuery = suggestion.address.freeformAddress; // Imposta l'indirizzo selezionato come query
			this.suggestions = []; // Pulisce le suggestioni
			this.selectedIndex = -1; // Resetta l'indice selezionato
			this.$emit("search-coordinates", this.coordinates); // Emesso evento al componente genitore con le coordinate
			this.getRealEstates(suggestion.address.city); // Chiamata alla funzione con il nome della città
		},
		// Funzione per muoversi verso l'alto nella lista delle suggestioni
		moveUp() {
			console.log("Moving up, selected index:", this.selectedIndex); // Log per tracciare il movimento verso l'alto
			if (this.selectedIndex > 0) {
				this.selectedIndex--; // Spostati verso l'alto
			}
		},
		// Funzione per muoversi verso il basso nella lista delle suggestioni
		moveDown() {
			console.log("Moving down, selected index:", this.selectedIndex); // Log per tracciare il movimento verso il basso
			if (this.selectedIndex < this.suggestions.length - 1) {
				this.selectedIndex++; // Spostati verso il basso
			}
		},
		// Funzione per selezionare una suggestione tramite tastiera
		selectSuggestionByKey() {
			if (this.selectedIndex !== -1) {
				// Se un elemento è selezionato con la tastiera, selezionalo
				this.selectSuggestion(this.suggestions[this.selectedIndex]);
			}
		},
		// Funzione per nascondere le suggestioni se clicchi fuori
		handleClickOutside(event) {
			const searchInput = this.$refs.searchInput;
			if (searchInput && !searchInput.contains(event.target)) {
				this.suggestions = []; // Nascondi le suggestioni
			}
		},
	},
	created() {
		this.getRealEstates(); // Carica tutti gli immobili al caricamento della pagina

		// Aggiungi un listener per i click fuori dal campo di ricerca
		document.addEventListener("click", this.handleClickOutside);
	},
	destroyed() {
		// Rimuovi il listener quando il componente viene distrutto
		document.removeEventListener("click", this.handleClickOutside);
	},
};
</script>

<template>
	<div class="search-container">
		<input
			type="text"
			v-model="searchQuery"
			@input="onInputChange"
			@keydown.up="moveUp"
			@keydown.down="moveDown"
			@keydown.enter="selectSuggestionByKey"
			placeholder="Cerca un immobile..."
			ref="searchInput"
			class="SearchInput" />
		<ul v-if="suggestions.length > 0" class="autocomplete-suggestions">
			<li
				v-for="(suggestion, index) in suggestions"
				:key="index"
				:class="{ highlighted: index === selectedIndex }"
				@click="selectSuggestion(suggestion)">
				{{ suggestion.address.freeformAddress }}
			</li>
		</ul>
	</div>
</template>

<style scoped>
.search-container {
	position: relative;
}
.SearchInput {
	width: 100%;
	padding: 10px;
	border: 1px solid #e9e9e9;
	border-radius: 10px 10px 0px 0px;
	box-sizing: border-box;
	font-size: 16px;
	transition: all 0.3s ease-in-out;

	&:hover {
		border: 1px solid #bbb;
	}

	&:focus {
		outline: none;
		border-color: #0077cc;
		box-shadow: 0 0 0 2px rgba(0, 119, 204, 0.3);
	}
}

.autocomplete-suggestions {
	list-style-type: none;
	margin: 0;
	padding: 0;
	position: absolute;
	background: white;
	border: 1px solid #ccc;
	width: 100%;
	max-height: 200px;
	overflow-y: auto;
	z-index: 10;
}

.autocomplete-suggestions li {
	padding: 8px;
	cursor: pointer;
}

.autocomplete-suggestions li:hover {
	background: #f0f0f0;
}

.autocomplete-suggestions .highlighted {
	background-color: #ddd; /* Colore di sfondo per l'elemento selezionato */
}
</style>
