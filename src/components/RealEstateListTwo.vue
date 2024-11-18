<template>
	<div class="container margin">
		<div class="section-header">
			<h1 class="gradient-text">Appartamenti a {{ city }}</h1>
			<div class="location-badge">
				<i class="fas fa-map-marker-alt"></i>
				<span>{{ city }}</span>
			</div>
		</div>

		<div class="results-counter" v-if="filteredRealEstates.length">
			<span class="counter">{{ filteredRealEstates.length }}</span>
			immobili trovati
		</div>

		<div class="row animate-cards">
			<div
				v-for="realEstate in filteredRealEstates"
				:key="realEstate.id"
				class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
				<router-link
					:to="{
						name: 'realEstateDetail',
						params: { id: realEstate.id },
					}"
					class="btn hover_card">
					<div
						class="card mb-3 mt-3"
						:class="{ 'border-wow': realEstate.subscriptions.length > 0 }">
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
									<p class="m-1">{{ realEstate.city }}</p>
									<p class="m-1">€ {{ realEstate.price }}</p>
								</div>
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>

		<div v-if="!filteredRealEstates.length" class="no-results">
			<i class="fas fa-home"></i>
			<h3>Nessun immobile disponibile a {{ city }}</h3>
			<p>Prova a cercare in un'altra città</p>
		</div>
	</div>
</template>
<script>
import axios from "axios";

export default {
	data() {
		return {
			realEstates: [], // Lista di appartamenti
			city: this.$route.params.city, // Ottieni la città dalla rotta
			loading: true, // Stato di caricamento
			error: null, // Gestione errori
		};
	},
	computed: {
		filteredRealEstates() {
			// Filtra gli appartamenti per città
			return this.realEstates.filter(
				(realEstate) => realEstate.city === this.city
			);
		},
	},
	async created() {
		try {
			// Recupera gli appartamenti dall'API
			const response = await axios.get(
				"http://127.0.0.1:8000/api/real-estates"
			);

			// Salva i dati degli appartamenti nel data
			this.realEstates = response.data;
			this.loading = false;
		} catch (error) {
			// Gestione degli errori
			this.error = "Errore nel caricamento degli appartamenti!";
			this.loading = false;
		}
	},
};
</script>
<style lang="scss" scoped>
.margin {
	margin-top: 200px;
}

.card {
	max-height: 100%;
	position: relative;
	border: none !important;
	transition: all 0.3s ease-in-out;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	margin: 15px 0;

	&:hover {
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.515);
		transform: scale(1.025);
	}

	.card-title {
		overflow: hidden;
		padding: 0 5px;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 1.2rem;
	}

	.adv-badge {
		position: absolute;
		top: 10px;
		right: 10px;
		background: rgba(255, 255, 255, 0.9);
		color: #2626a0;
		padding: 8px 15px;
		border-radius: 20px;
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
}

.card-img-cu {
	width: 100%;
	aspect-ratio: 1/1;
	overflow: hidden;
	object-fit: cover;
	border-radius: 5px 5px 0 0;
}

.card-body {
	padding: 15px;
}

.border-wow {
	border: 2px solid #2626a0 !important;
	border-radius: 8px !important;
	position: relative;

	&::before {
		content: "";
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(114deg, #2626a0 4%, #80eaff 92%);
		border-radius: 8px;
		z-index: -1;
		opacity: 0.1;
	}
}

.hover_card {
	text-decoration: none;
	display: block;
	opacity: 1;
}

.section-header {
	position: relative;
	margin-bottom: 2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.gradient-text {
		background: linear-gradient(114deg, #2626a0 4%, #80eaff 92%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-size: 2.5rem;
		font-weight: 700;
		text-transform: capitalize;
	}
}

.location-badge {
	background: linear-gradient(114deg, #2626a0 4%, #80eaff 92%);
	color: white;
	padding: 0.8rem 1.5rem;
	border-radius: 50px;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	box-shadow: 0 4px 15px rgba(38, 38, 160, 0.2);

	i {
		font-size: 1.2rem;
	}

	span {
		font-weight: 600;
		text-transform: capitalize;
	}
}

.results-counter {
	margin-bottom: 2rem;
	font-size: 1.1rem;
	color: #666;

	.counter {
		background: linear-gradient(114deg, #2626a0 4%, #80eaff 92%);
		color: white;
		padding: 0.2rem 0.8rem;
		border-radius: 15px;
		margin-right: 0.5rem;
		font-weight: 600;
	}
}

.animate-cards {
	.col-12 {
		opacity: 0;
		transform: translateY(20px);
		animation: fadeInUp 0.6s ease forwards;

		@for $i from 1 through 20 {
			&:nth-child(#{$i}) {
				animation-delay: #{$i * 0.1}s;
			}
		}
	}
}

.no-results {
	text-align: center;
	padding: 4rem 0;
	color: #666;

	i {
		font-size: 4rem;
		color: #2626a0;
		margin-bottom: 1rem;
	}

	h3 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 1.1rem;
		color: #888;
	}
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.border-wow {
	&:hover {
		.adv-badge {
			background: linear-gradient(114deg, #2626a0 4%, #80eaff 92%);
			color: white;
			transform: scale(1.05);
		}

		&::before {
			opacity: 0.2;
		}
	}
}

::-webkit-scrollbar {
	width: 8px;
}

::-webkit-scrollbar-track {
	background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
	background: linear-gradient(114deg, #2626a0 4%, #80eaff 92%);
	border-radius: 4px;

	&:hover {
		background: #2626a0;
	}
}
</style>
