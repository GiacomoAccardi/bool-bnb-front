<script>
import tt from "@tomtom-international/web-sdk-maps";

export default {
	name: "TomTomMap",
	props: {
		apiKey: {
			type: String,
			required: true,
		},
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
		zoom: {
			type: Number,
			default: 12,
		},
	},
	data() {
		return {
			map: null,
			marker: null,
		};
	},
	mounted() {
		this.initMap();
	},
	methods: {
		initMap() {
			// Inizializza la mappa
			this.map = tt.map({
				key: this.apiKey,
				container: this.$refs.map,
				center: [this.longitude, this.latitude],
				zoom: this.zoom,
			});

			// Aggiungi il marker dopo che la mappa è completamente caricata
			this.map.on("load", () => {
				this.addMarker();
			});
		},
		addMarker() {
			// Se esiste già un marker, rimuovilo per evitare duplicati
			if (this.marker) {
				this.marker.remove();
			}

			// Aggiungi un nuovo marker alla mappa
			this.marker = new tt.Marker()
				.setLngLat([this.longitude, this.latitude])
				.addTo(this.map);

			// Centra la mappa sulle coordinate del marker
			this.map.setCenter([this.longitude, this.latitude]);
		},
	},
	watch: {
		// Aggiorna il marker se le coordinate cambiano
		latitude(newVal, oldVal) {
			if (newVal !== oldVal) this.updateMarker();
		},
		longitude(newVal, oldVal) {
			if (newVal !== oldVal) this.updateMarker();
		},
	},
	beforeDestroy() {
		// Pulisci la mappa e il marker al distruggere il componente
		if (this.map) this.map.remove();
		if (this.marker) this.marker.remove();
	},
};
</script>

<template>
	<div class="map-container">
		<div ref="map" class="map"></div>
	</div>
</template>

<style>
.map-container {
	width: 100%;
	height: 100%;
	position: relative;
}

.map {
	width: 100%;
	height: 100%;
}
</style>
