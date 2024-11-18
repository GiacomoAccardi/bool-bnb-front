<template>
	<div class="container margin">
		<h1>Appartamenti a {{ city }}</h1>
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
						style="height: 320px"
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
	height: 120px;
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
</style>
