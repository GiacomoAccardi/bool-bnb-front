<script>
import axios from "axios";

export default {
	data() {
		return {
			searchQuery: "",
			suggestions: [],
			loading: false,
			error: null,
		};
	},
	methods: {
		async onInputChange() {
			this.suggestions = [];
			this.error = null;

			if (this.searchQuery.length > 2) {
				this.loading = true;
				try {
					// Prima cerca nel tuo backend
					const backendResponse = await axios.get("/api/real-estates", {
						params: {
							search: this.searchQuery,
						},
					});
					this.suggestions = backendResponse.data;

					// Se il backend non restituisce risultati, usa TomTom come fallback
					if (this.suggestions.length === 0) {
						const tomtomApiKey = "9Yq5kH65us12yazEXv9SX8bGsAYxX1fL"; // Inserisci la tua chiave API
						const tomtomResponse = await axios.get(
							`https://api.tomtom.com/search/2/autocomplete.json`,
							{
								params: {
									key: tomtomApiKey,
									query: this.searchQuery,
									typeahead: true,
									limit: 5,
									language: "it-IT",
								},
							}
						);
						this.suggestions = tomtomResponse.data.results.map((result) => ({
							address: result.address.freeformAddress,
							latitude: result.position.lat,
							longitude: result.position.lon,
							source: "TomTom",
						}));
					}
				} catch (error) {
					this.error = "Errore durante il caricamento dei suggerimenti.";
					console.error(error);
				} finally {
					this.loading = false;
				}
			}
		},

		selectSuggestion(suggestion) {
			// Popola il campo di ricerca con il valore selezionato
			this.searchQuery =
				suggestion.address || `${suggestion.latitude}, ${suggestion.longitude}`;
			this.suggestions = [];
			this.$emit("property-selected", suggestion); // Emesso al componente genitore
		},
	},
};
</script>

<template>
	<div class="search-bar">
		<input
			type="text"
			v-model="searchQuery"
			@input="onInputChange"
			placeholder="Cerca un immobile (indirizzo o città)..." />
		<div v-if="loading" class="loading-indicator">Caricamento...</div>
		<ul v-if="!loading && suggestions.length > 0">
			<li
				v-for="(suggestion, index) in suggestions"
				:key="index"
				@click="selectSuggestion(suggestion)">
				{{
					suggestion.address ||
					"Coordinate: " + suggestion.latitude + ", " + suggestion.longitude
				}}
				<span v-if="suggestion.source">({{ suggestion.source }})</span>
			</li>
		</ul>
		<div v-if="error" class="error-message">{{ error }}</div>
	</div>
</template>

<style scoped>
.search-bar {
	position: relative;
}

.loading-indicator {
	color: gray;
	font-size: 14px;
	margin-top: 5px;
}

ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
	position: absolute;
	background: white;
	border: 1px solid #ccc;
	width: 100%;
	max-height: 150px;
	overflow-y: auto;
	z-index: 1000;
}

li {
	padding: 8px;
	cursor: pointer;
}

li:hover {
	background: #f0f0f0;
}

.error-message {
	color: red;
	font-size: 14px;
	margin-top: 5px;
}
</style>
