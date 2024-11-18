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
			searchQuery: "",
			realEstates: [],
			filteredRealEstates: [],
			loading: false,
			error: null,
			radius: 20,
			minRooms: 1,
			coordinates: null,
			services: [],
			activeServices: [],
			canScrollLeft: false,
			canScrollRight: false,
			minPrice: 0,
			maxPrice: 1000,
			propertyType: "",
			propertyTypes: [
				"appartamento",
				"villa",
				"casa indipendente",
				"villetta a schiera",
				"loft",
				"attico",
				"monolocale",
				"bilocale",
				"trilocale",
				"rustico",
				"cottage",
				"baita",
				"mansarda",
				"bungalow",
			],
			showOnlyAvailable: false,
		};
	},
	methods: {
		getRealEstates(city = "") {
			this.loading = true;
			this.error = null;

			let url = "http://127.0.0.1:8000/api/real-estates";
			if (city) {
				url += `?city=${city}`;
			}

			axios
				.get(url)
				.then((response) => {
					this.realEstates = response.data;
					this.filteredRealEstates = [...this.realEstates];
				})
				.catch((error) => {
					this.error = "Errore durante il caricamento dei dati.";
				})
				.finally(() => {
					this.loading = false;
				});
		},
		getServices() {
			this.loading = true;
			this.error = null;

			axios
				.get("http://127.0.0.1:8000/api/services")
				.then((response) => {
					if (response.data.success) {
						this.services = response.data.data;
					} else {
						this.error = "Nessun servizio trovato.";
					}
				})
				.catch((error) => {
					this.error = "Errore durante il caricamento dei servizi.";
				})
				.finally(() => {
					this.loading = false;
				});
		},
		filterRealEstates(coordinates) {
			this.coordinates = coordinates;

			// Filtra prima per coordinate e stanze
			let filtered = this.realEstates;

			if (coordinates) {
				const { lat, lon } = coordinates;
				filtered = filtered.filter((realEstate) => {
					const distance = this.calculateDistance(
						lat,
						lon,
						realEstate.latitude,
						realEstate.longitude
					);
					return distance <= this.radius;
				});
			}

			// Filtra per numero minimo di stanze
			filtered = filtered.filter(
				(realEstate) => realEstate.rooms >= this.minRooms
			);

			// Filtra per servizi selezionati
			if (this.activeServices.length > 0) {
				filtered = filtered.filter((realEstate) => {
					return this.activeServices.every((serviceId) =>
						realEstate.services.some((service) => service.id === serviceId)
					);
				});
			}

			// Filtra per prezzo
			if (this.minPrice > 0 || this.maxPrice > 0) {
				filtered = filtered.filter((realEstate) => {
					const price = realEstate.price;
					return price >= this.minPrice && price <= this.maxPrice;
				});
			}

			// Filtra per tipologia immobile
			if (this.propertyType) {
				filtered = filtered.filter(
					(realEstate) => realEstate.structure_types === this.propertyType
				);
			}

			// Filtra per disponibilità
			if (this.showOnlyAvailable) {
				filtered = filtered.filter(
					(realEstate) => realEstate.availability === 1
				);
			}

			this.filteredRealEstates = filtered;
		},
		calculateDistance(lat1, lon1, lat2, lon2) {
			const R = 6371;
			const dLat = this.degreesToRadians(lat2 - lat1);
			const dLon = this.degreesToRadians(lon2 - lon1);
			const a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(this.degreesToRadians(lat1)) *
					Math.cos(this.degreesToRadians(lat2)) *
					Math.sin(dLon / 2) *
					Math.sin(dLon / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			return R * c;
		},
		degreesToRadians(degrees) {
			return (degrees * Math.PI) / 180;
		},
		toggleService(serviceId) {
			const index = this.activeServices.indexOf(serviceId);
			if (index === -1) {
				this.activeServices.push(serviceId);
			} else {
				this.activeServices.splice(index, 1);
			}
			this.filterRealEstates(this.coordinates);
		},
		checkScroll() {
			const element = this.$refs.servicesScroll;
			this.canScrollLeft = element.scrollLeft > 0;
			this.canScrollRight =
				element.scrollLeft < element.scrollWidth - element.clientWidth;
		},
		scrollServices(direction) {
			const element = this.$refs.servicesScroll;
			const scrollAmount = 200; // Puoi modificare questo valore

			if (direction === "left") {
				element.scrollBy({
					left: -scrollAmount,
					behavior: "smooth",
				});
			} else {
				element.scrollBy({
					left: scrollAmount,
					behavior: "smooth",
				});
			}
		},
	},
	watch: {
		searchQuery(newQuery) {
			if (newQuery === "") {
				this.getRealEstates();
			} else {
				this.getRealEstates(newQuery);
			}
		},
		radius() {
			this.filterRealEstates(this.coordinates);
		},
		minRooms() {
			this.filterRealEstates(this.coordinates);
		},
		activeServices() {
			this.filterRealEstates(this.coordinates);
		},
		minPrice() {
			this.filterRealEstates(this.coordinates);
		},
		maxPrice() {
			this.filterRealEstates(this.coordinates);
		},
		propertyType() {
			this.filterRealEstates(this.coordinates);
		},
		showOnlyAvailable() {
			this.filterRealEstates(this.coordinates);
		},
	},
	created() {
		this.getRealEstates();
		this.getServices();
	},
	mounted() {
		this.checkScroll();
		// Aggiungi un listener per il resize della finestra
		window.addEventListener("resize", this.checkScroll);
	},
	beforeUnmount() {
		// Rimuovi il listener quando il componente viene distrutto
		window.removeEventListener("resize", this.checkScroll);
	},
};
</script>

<template>
	<div class="container-fluid px-5">
		<div
			class="d-flex justify-content-center flex-column align-items-center mb-5">
			<div class="custom-width-search">
				<AppSearch @search-coordinates="filterRealEstates" />
			</div>
			<div class="custom-width-search mb-3">
				<div class="accordion w-100" id="accordionExample">
					<div class="accordion-item">
						<h2 class="accordion-header" id="headingOne">
							<button
								class="accordion-button text-center"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseOne"
								aria-expanded="false"
								aria-controls="collapseOne">
								Filtri di ricerca
							</button>
						</h2>
						<div
							id="collapseOne"
							class="accordion-collapse collapse"
							aria-labelledby="headingOne"
							data-bs-parent="#accordionExample">
							<div class="accordion-body">
								<div class="row">
									<!-- Slider raggio - ora condizionale -->
									<div v-if="coordinates" class="mb-4 col-12">
										<label for="radius-slider" class="form-label text-center">
											Raggio
										</label>
										<div class="range-slider">
											<input
												type="range"
												min="20"
												max="150"
												step="1"
												v-model="radius"
												class="range" />
											<span id="rangeValue">{{ radius }}km</span>
										</div>
									</div>

									<!-- Slider numero stanze -->
									<div class="mb-4 col-12 col-md">
										<label for="rooms-slider" class="form-label text-center">
											Numero minimo di stanze
										</label>
										<div class="range-slider">
											<input
												type="range"
												min="1"
												max="10"
												step="1"
												v-model="minRooms"
												class="range" />
											<span id="roomsValue">{{ minRooms }}</span>
										</div>
									</div>

									<!-- Filtro per prezzo -->
									<div class="mb-4 col-12 col-md-6">
										<label class="form-label text-center">Prezzo</label>
										<div class="d-flex gap-2">
											<div class="input-group">
												<span class="input-group-text">€</span>
												<input
													type="number"
													class="form-control"
													v-model="minPrice"
													min="0"
													placeholder="Min" />
											</div>
											<div class="input-group">
												<span class="input-group-text">€</span>
												<input
													type="number"
													class="form-control"
													v-model="maxPrice"
													min="0"
													value="1000"
													placeholder="Max" />
											</div>
										</div>
										<div class="text-center mt-2 text-muted">
											<small>Prezzo: {{ minPrice }}€ - {{ maxPrice }}€</small>
										</div>
									</div>

									<!-- Filtro per tipologia immobile -->
									<div class="mb-4 col-12">
										<label class="form-label text-center d-block"
											>Tipologia Immobile</label
										>
										<div class="d-flex flex-wrap gap-2 justify-content-center">
											<button
												v-for="type in propertyTypes"
												:key="type"
												class="btn btn-outline-primary btn-sm"
												:class="{ active: propertyType === type }"
												@click="
													propertyType = propertyType === type ? '' : type
												">
												{{ type.charAt(0).toUpperCase() + type.slice(1) }}
											</button>
										</div>
									</div>

									<!-- Toggle switch per la disponibilità -->
									<div class="mb-4 col-12">
										<div
											class="form-check form-switch d-flex justify-content-center align-items-center gap-2">
											<input
												class="form-check-input"
												type="checkbox"
												role="switch"
												id="availabilitySwitch"
												v-model="showOnlyAvailable" />
											<label class="form-check-label" for="availabilitySwitch">
												Mostra solo disponibili
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- servizi -->
			<div class="w-75 position-relative">
				<!-- Freccia sinistra -->
				<div
					class="scroll-arrow scroll-left"
					v-show="canScrollLeft"
					@click="scrollServices('left')">
					<i class="fas fa-chevron-left"></i>
				</div>

				<!-- Container dei servizi -->
				<div
					class="text-center w-100 d-flex justify-content-center"
					ref="servicesContainer">
					<div
						class="d-flex justify-content-start overflow-scroll services-wrapper"
						ref="servicesScroll"
						@scroll="checkScroll">
						<div
							v-for="service in services"
							:key="service.id"
							class="btn border-0 service-btn">
							<div
								class="service-icon d-flex justify-content-center align-items-center"
								@click="toggleService(service.id)"
								:class="{
									'not-active': !activeServices.includes(service.id),
									active: activeServices.includes(service.id),
								}">
								<i :class="service.icon + ' fa'"></i>
							</div>
							<div class="service-title">{{ service.name }}</div>
						</div>
					</div>
				</div>

				<!-- Freccia destra -->
				<div
					class="scroll-arrow scroll-right"
					v-show="canScrollRight"
					@click="scrollServices('right')">
					<i class="fas fa-chevron-right"></i>
				</div>
			</div>
		</div>

		<div class="real-estate-list">
			<div v-if="loading">Caricamento in corso...</div>
			<div v-else-if="error">{{ error }}</div>
			<div v-else>
				<div class="row g-5 position-relative">
					<real-estate-card
						v-for="realEstate in filteredRealEstates"
						:key="realEstate.id"
						:real-estate="realEstate"
						class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

.real-estate-list {
	padding: 16px;
	margin-top: 10px;
}

.container-fluid {
	margin-top: 150px;
}

.range-slider {
	position: relative;
	width: 100%;
}

.custom-width-search {
	width: 100%;
	@media (min-width: 576px) {
		width: 75%;
	}
	@media (min-width: 992px) {
		width: 50%;
	}
}

.range-slider input {
	-webkit-appearance: none;
	width: 100%;
	height: 15px;
	background: #fff;
	outline: none;
	border-radius: 15px;
	overflow: hidden;
	box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.8);
}

.range-slider input::-webkit-slider-thumb {
	-webkit-appearance: none;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background: #1166ef;
	cursor: pointer;
	border: 4px solid #333;
	box-shadow: -407px 0 0 400px #1166ef;
}

.range-slider input::-moz-range-thumb {
	width: 7.5px;
	height: 7.5px;
	border-radius: 50%;
	background: #000;
	cursor: pointer;
	border: 4px solid #000;
	box-shadow: -407px 0 0 400px #1166ef;
}

.range-slider input::-ms-thumb {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #fff;
	cursor: pointer;
	border: 4px solid #333;
	box-shadow: -407px 0 0 400px #fff;
}

.range-slider__progress {
	position: absolute;
	height: 5px;
	background-color: #1166ef;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	width: calc(100% * var(--value) / 150);
}

#rangeValue {
	display: block;
	text-align: center;
	font-size: 1.5rem;
	color: #000;
	margin-top: 0px;
}

/* Accordion styles */
.accordion-button {
	border-radius: 0px 0px 10px 10px !important;
	border-top: none !important;
	background-color: white !important;
}

.accordion-button:not(.collapsed) {
	background-color: white !important;
	color: black;
	box-shadow: none;
}

.accordion-button:focus {
	box-shadow: none;
	border-top: none;
	border-color: rgba(0, 0, 0, 0.125);
}

.accordion-item {
	background-color: white;
}

.accordion-body {
	background-color: white;
}

/* Aggiungi questi stili per le icone dei servizi */
.service-icon {
	z-index: 1000;
	cursor: pointer;
	transition: all 0.3s ease;
	padding: 8px;
	border-radius: 8px;
	&:focus {
		border: none;
	}
}

.service-icon.not-active {
	color: #666;
	background-color: #f5f5f5;
}

.service-icon.active {
	color: white;
	background-color: #1166ef;
}

.service-icon:hover {
	transform: scale(1.05);
}

.services-wrapper {
	-ms-overflow-style: none;
	scrollbar-width: none;
	position: relative;
}

.services-wrapper::-webkit-scrollbar {
	display: none; /* Chrome, Safari e Opera */
}

.scroll-arrow {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 30px;
	height: 30px;
	background-color: white;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	z-index: 1000;
	transition: all 0.3s ease;
}

.scroll-arrow:hover {
	background-color: #f5f5f5;
}

.scroll-left {
	left: -15px;
}

.scroll-right {
	right: -15px;
}

.scroll-arrow i {
	color: #1166ef;
}

.btn-outline-primary {
	&.active {
		background-color: #1166ef;
		color: white;
	}
	&:hover {
		background-color: #1166ef;
		color: white;
	}
}

.service-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
}

.service-title {
	font-size: 0.8rem;
	color: #666;
	text-align: center;
	max-width: 80px; // Limita la larghezza del testo
	overflow-wrap: break-word;
}

.service-icon {
	height: 35px;
	width: 35px;
	// ... mantieni gli altri stili esistenti ...
}
</style>
