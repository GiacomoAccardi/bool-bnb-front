<script>
import tt from "@tomtom-international/web-sdk-maps";

export default {
	props: {
		apiKey: {
			type: String,
		},
		latitude: {
			type: Number,
		},
		longitude: {
			type: Number,
		},
		zoom: {
			type: Number,
		},
	},
	mounted() {
		this.initMap();
	},
	methods: {
		initMap() {
			// Crea la mappa
			this.map = tt.map({
				key: this.apiKey,
				container: this.$refs.map,
				center: [this.longitude, this.latitude],
				zoom: this.zoom,
			});

			// Aggiungi un marker alla mappa
			this.addMarker(this.latitude, this.longitude);
		},

		addMarker(latitude, longitude) {
			// Crea un marker con le coordinate
			const marker = new tt.Marker()
				.setLngLat([longitude, latitude]) // Imposta le coordinate del marker
				.addTo(this.map); // Aggiungi il marker alla mappa
		},
	},
	beforeDestroy() {
		if (this.map) {
			this.map.remove(); // Pulisce la mappa quando il componente viene distrutto
		}
	},
};
</script>

<template>
	<div class="map-container">
		<div ref="map" class="map"></div>
	</div>
</template>

<style scoped>
.map-container {
	width: 100%;
	height: 100%;
}

.map {
	width: 100%;
	height: 100%;
}
</style>
