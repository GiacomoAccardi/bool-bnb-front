<script>
import axios from "axios";

export default {
	data() {
		return {
			searchQuery: {
				query: "", // Testo della query di ricerca (nome immobile)
				city: "", // Città
				rooms: "", // Numero di stanze
			},
			realEstates: [], // Lista completa di immobili
			filteredRealEstates: [], // Lista filtrata che verrà mostrata
			services: [], // Lista completa di servizi
			activeServices: [], // Lista dei servizi attivi (servizi selezionati)
		};
	},
	methods: {
		// Funzione per eseguire la ricerca (GET)
		async onSearch() {
			try {
				// Prepara i parametri di ricerca
				const params = {
					city: this.searchQuery.city,
					rooms: this.searchQuery.rooms,
				};

				// Fai una richiesta GET al back-end con i parametri di ricerca e i servizi
				const response = await axios.get(
					"http://127.0.0.1:8000/api/real-estates",
					{ params }
				);
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

			// Salvo il risultato filtrato
			this.filteredRealEstates = filtered;
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
	},
	mounted() {
		// Carica inizialmente tutti gli immobili
		this.onSearch();
	},
};
</script>

<template>
	<!-- sezione per la ricerca -->
	<div class="container-sm">
		<div class="search-bar mb-5 mt-5">
			<div class="input-group mt-5">
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
					aria-label="Numero Stanze" />
			</div>
		</div>

		<!-- sezione filtro avanzato per i servizi -->
		<div class="text-center mb-4">
			<div v-for="service in services" :key="service.id" class="btn">
				<!-- Contenitore per ogni icona -->
				<div
					class="service-icon d-flex justify-content-center align-items-center"
					style="height: 40px; width: 35px"
					@click="toggleService(service.id)"
					:style="{
						color: activeServices.includes(service.id) ? 'blue' : 'initial',
					}">
					<!-- Mostra l'icona del servizio -->
					<i :class="service.icon + ' fa-2x'"></i>
				</div>
			</div>
		</div>
		<!-- sezione che cicla i miei appartamenti -->
		<div class="container">
			<div class="row">
				<div
					v-for="realEstate in filteredRealEstates"
					:key="realEstate.id"
					class="col-12 col-sm-6 col-md-6 col-lg-4">
					<div class="card mb-3 mt-3">
						<div class="row">
							<!-- Immagine: occupa 12 colonne su mobile, 6 su tablet, 8 su desktop -->
							<div class="col-12">
								<img
									:src="
										'http://127.0.0.1:8000/storage/' +
										realEstate.portrait +
										'?v=' +
										new Date().getTime()
									"
									class="card-img"
									alt="Immobile" />
							</div>
							<!-- Dettagli: occupa 12 su mobile, 6 su tablet, 4 su desktop -->
							<div class="col-12">
								<div class="card-body">
									<h5 class="card-title">{{ realEstate.title }}</h5>
									<p class="card-text">
										{{ realEstate.address }}, {{ realEstate.city }}
									</p>
									<p class="card-text">€ {{ realEstate.price }}</p>
									<router-link
										:to="{
											name: 'realEstateDetail',
											params: { id: realEstate.id },
										}"
										class="btn btn-primary"
										>Scopri di più</router-link
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- sezione per le card dove andremo a inserire la show con gli appartamenti per quella determinata città -->
	<div class="container-fluid bg">
		<div class="row">
			<div class="col-12 text-center mt-5">
				<h1>Le migliori destinazioni per il tuo soggiorno al Bool BNB</h1>
			</div>

			<!-- Roma -->
			<div class="col-12 col-md-6 col-lg-4">
				<div class="content-place mt-5">
					<img src="../assets/roma.webp" alt="roma" class="img-fluid" />
					<h2 class="text-center">Roma</h2>
					<p class="p-2">
						Scopri la capitale d'Italia con il nostro accogliente B&B situato
						nel cuore di Roma. A pochi passi dai monumenti storici, offriamo
						camere eleganti e una colazione tipica romana per un soggiorno
						indimenticabile.
					</p>
					<div class="p-2">
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
					</div>
					<a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
				</div>
			</div>

			<!-- Firenze -->
			<div class="col-12 col-md-6 col-lg-4">
				<div class="content-place mt-5">
					<img src="../assets/firenze.jpeg" alt="firenze" class="img-fluid" />
					<h2 class="text-center">Firenze</h2>
					<p class="p-2">
						Vivi l'arte e la cultura rinascimentale di Firenze. Il nostro B&B ti
						accoglierà in un ambiente raffinato, a pochi passi dalle gallerie e
						musei più importanti, con una colazione preparata con ingredienti
						freschi e locali.
					</p>
					<div class="p-2">
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
					</div>
					<a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
				</div>
			</div>

			<!-- Venezia -->
			<div class="col-12 col-md-6 col-lg-4">
				<div class="content-place mt-5">
					<img src="../assets/venezia.webp" alt="venezia" class="img-fluid" />
					<h2 class="text-center">Venezia</h2>
					<p class="p-2">
						Scopri il fascino della città dei canali. Il nostro B&B ti offrirà
						un'esperienza unica, con camere accoglienti e una vista mozzafiato
						sulla città più romantica del mondo, ideale per esplorare la laguna
						e i suoi dintorni.
					</p>
					<div class="p-2">
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
					</div>
					<a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
				</div>
			</div>

			<!-- Milano -->
			<div class="col-12 col-md-6 col-lg-4">
				<div class="content-place mt-5">
					<img src="../assets/milano.jpg" alt="milano" class="img-fluid" />
					<h2 class="text-center">Milano</h2>
					<p class="p-2">
						Esplora Milano, la capitale della moda e del design. Il nostro B&B
						ti offre camere moderne e confortevoli, situato a pochi minuti dalle
						principali attrazioni culturali e dalle vie dello shopping.
					</p>
					<div class="p-2">
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
					</div>
					<a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
				</div>
			</div>

			<!-- Napoli -->
			<div class="col-12 col-md-6 col-lg-4">
				<div class="content-place mt-5">
					<img src="../assets/napoli.jpg" alt="napoli" class="img-fluid" />
					<h2 class="text-center">Napoli</h2>
					<p class="p-2">
						Vivi il calore e il gusto di Napoli, la città della pizza e delle
						tradizioni. Il nostro B&B ti accoglierà con il calore tipico
						napoletano, camere confortevoli e colazione con i sapori autentici
						della Campania.
					</p>
					<div class="p-2">
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
					</div>
					<a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
				</div>
			</div>

			<!-- Costiera Amalfitana -->
			<div class="col-12 col-md-6 col-lg-4">
				<div class="content-place mt-5">
					<img
						src="../assets/amalfi.jpg"
						alt="costiera amalfitana"
						class="img-fluid" />
					<h2 class="text-center">Costiera Amalfitana</h2>
					<p class="p-2">
						Scopri la magia della Costiera Amalfitana, con i suoi panorami
						mozzafiato e i pittoreschi villaggi a picco sul mare. Il nostro B&B
						ti offre una vista spettacolare, camere raffinate e una colazione
						all'insegna dei sapori mediterranei.
					</p>
					<div class="p-2">
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
						<i class="fa-solid fa-star" style="color: #ffd43b"></i>
					</div>
					<a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center mt-5">
					Resta aggiornato per scoprire le nostre offerte
				</h1>
			</div>
		</div>
		<div class="row mt-5 mb-5 g-0">
			<div class="col-9 position-relative">
				<img
					class="offerte dark-image img-fluid"
					src="../assets/offerte.jpg"
					alt="Firenze" />
				<div class="offer-text position-absolute top-0 start-0 m-3">
					<h4 class="text-white font-weight-bold">
						Scopri le migliori offerte
					</h4>
				</div>
				<div class="position-absolute bottom-0 end-0 mb-5 me-2">
					<p class="text-white font-weight-bold">
						utilizza il codice promozionale!
					</p>
				</div>
				<div class="position-absolute bottom-0 end-0 m-3">
					<a href="#" class="btn btn-primary rounded-4">winter 2024</a>
				</div>
			</div>
			<div
				class="col-3 bg-yellow d-flex justify-content-center align-items-center">
				<div class="text-center">
					<p class="text-white">Sconto del</p>
					<h2 class="text-white">50%</h2>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.container-sm {
	margin-top: 380px;
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

.card-img {
	width: 100%;
	object-fit: cover;
	height: 200px;
}
</style>
