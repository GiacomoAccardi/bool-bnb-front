<script>
import axios from "axios";
import TomTomMap from "./TomTomMap.vue";

export default {
	components: {
		TomTomMap,
	},
	data() {
		return {
			realEstate: null,
			formData: {
				name: "",
				surname: "",
				email: "",
				phone: "",
				message: "",
				real_estate_id: this.$route.params.id,
				user_ip: "", // Aggiungi il campo per l'IP
			},
			errors: {},
			showSuccessModal: false,
		};
	},
	async created() {
		const id = this.$route.params.id;
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/real-estates/${id}`
			);
			this.realEstate = response.data;

			// Ottieni l'IP dell'utente e aggiorna il formData
			await this.getUserIP();
		} catch (error) {
			console.error("Errore nel caricamento dell'immobile:", error);
		}
	},
	methods: {
		async getUserIP() {
			try {
				// Fai una richiesta per ottenere l'IP dell'utente
				const response = await axios.get("https://api.ipify.org?format=json");
				// Aggiorna il campo `user_ip` nel formData
				this.formData.user_ip = response.data.ip;
			} catch (error) {
				console.error("Errore nel recuperare l'IP:", error);
				alert("Non è stato possibile ottenere l'indirizzo IP.");
			}
		},
		async submitForm() {
			// Resetta gli errori prima di inviare
			this.errors = {};

			try {
				// Invia i dati del form tramite POST
				const response = await axios.post(
					"http://127.0.0.1:8000/api/messages",
					this.formData
				);
				// Gestisci la risposta, ad esempio, mostra un messaggio di successo
				console.log("Messaggio inviato con successo:", response.data);

				// Mostra la modale di successo
				this.showSuccessModal = true;

				// Reset del form
				this.formData = {
					name: "",
					surname: "",
					email: "",
					phone: "",
					message: "",
					real_estate_id: this.$route.params.id,
					user_ip: "", // Reset dell'IP
				};
			} catch (error) {
				if (error.response && error.response.data.errors) {
					// Salva gli errori nella variabile errors per mostrarli nel form
					this.errors = error.response.data.errors;
				} else {
					console.error("Errore sconosciuto:", error);
					alert("Si è verificato un errore durante l'invio del messaggio.");
				}
			}
		},
		// Funzione per chiudere la modale
		closeModal() {
			this.showSuccessModal = false;
		},
	},
};
</script>

<template>
	<div class="container-fluid">
		<div v-if="realEstate" class="detail-card">
			<div class="row mb-3">
				<div class="col-6 py-3 px-4 custom-height">
					<h2>{{ realEstate.title }}</h2>
					<h4 class="price fw-light">€ {{ realEstate.price }}</h4>
					<p>{{ realEstate.address }}, {{ realEstate.city }}</p>
					<p>{{ realEstate.description }}</p>
					<hr />
					<div class="row">
						<div class="col-6">
							<div class="property-details">
								<p><strong>Camere:</strong> {{ realEstate.rooms }}</p>
								<p><strong>Bagni:</strong> {{ realEstate.bathrooms }}</p>
								<p><strong>Letti:</strong> {{ realEstate.beds }}</p>
								<p>
									<strong>Metri Quadri:</strong>
									{{ realEstate.square_meter }} m²
								</p>
								<p>
									<strong>Tipo di Struttura:</strong>
									{{ realEstate.structure_types }}
								</p>
								<p>
									<strong>Disponibilità:</strong>
									{{
										realEstate.availability ? "Disponibile" : "Non Disponibile"
									}}
								</p>
							</div>
						</div>
						<div class="col-6">
							<div class="property-details">
								<div class="services">
									<p><strong>Servizi disponibili:</strong></p>
									<ul class="list-unstyled">
										<li
											v-for="service in realEstate.services"
											:key="service.id">
											<i :class="service.icon"></i> {{ service.name }}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-6">
					<img
						:src="'http://127.0.0.1:8000/storage/' + realEstate.portrait"
						class="detail-img rounded-1"
						alt="Immobile" />
				</div>
			</div>

			<div class="row">
				<div class="col-6">
					<TomTomMap
						apiKey="9Yq5kH65us12yazEXv9SX8bGsAYxX1fL"
						:latitude="realEstate.latitude"
						:longitude="realEstate.longitude"
						:zoom="12" />
				</div>

				<div class="col-6">
					<h2>Chiedi più informazioni!</h2>
					<div class="contact-form">
						<form @submit.prevent="submitForm">
							<div class="form-group">
								<label for="name">Nome</label>
								<input
									type="text"
									id="name"
									v-model="formData.name"
									class="form-control"
									:class="{ 'is-invalid': errors.name }" />
								<div v-if="errors.name" class="invalid-feedback">
									{{ errors.name[0] }}
								</div>
							</div>

							<div class="form-group">
								<label for="surname">Cognome</label>
								<input
									type="text"
									id="surname"
									v-model="formData.surname"
									class="form-control"
									:class="{ 'is-invalid': errors.surname }" />
								<div v-if="errors.surname" class="invalid-feedback">
									{{ errors.surname[0] }}
								</div>
							</div>

							<div class="form-group">
								<label for="email">Email</label>
								<input
									type="email"
									id="email"
									v-model="formData.email"
									class="form-control"
									:class="{ 'is-invalid': errors.email }" />
								<div v-if="errors.email" class="invalid-feedback">
									{{ errors.email[0] }}
								</div>
							</div>

							<div class="form-group">
								<label for="phone">Telefono</label>
								<input
									type="text"
									id="phone"
									v-model="formData.phone"
									class="form-control"
									:class="{ 'is-invalid': errors.phone }" />
								<div v-if="errors.phone" class="invalid-feedback">
									{{ errors.phone[0] }}
								</div>
							</div>

							<div class="form-group">
								<label for="message">Messaggio</label>
								<textarea
									id="message"
									v-model="formData.message"
									class="form-control"
									:class="{ 'is-invalid': errors.message }"></textarea>
								<div v-if="errors.message" class="invalid-feedback">
									{{ errors.message[0] }}
								</div>
							</div>

							<input type="hidden" v-model="formData.real_estate_id" />

							<button type="submit" class="btn btn-primary mt-3">Invia</button>
						</form>
					</div>
				</div>
			</div>

			<!-- Modale di Successo -->
			<div
				v-if="showSuccessModal"
				class="modal show"
				id="successModal"
				tabindex="-1"
				aria-labelledby="successModalLabel"
				aria-hidden="true"
				style="display: block"
				@click="closeModal">
				<div class="modal-dialog">
					<div class="modal-content" @click.stop>
						<div class="modal-header">
							<h5 class="modal-title" id="successModalLabel">Successo</h5>
							<button
								type="button"
								class="btn-close"
								aria-label="Close"
								@click="showSuccessModal = false"></button>
						</div>
						<div class="modal-body">
							Il messaggio è stato inviato con successo!
						</div>
						<div class="modal-footer"></div>
					</div>
				</div>
			</div>

			<router-link to="/" class="btn btn-secondary mt-3"
				>Continua la ricerca</router-link
			>
		</div>
	</div>
</template>

<style scoped>
.container-fluid {
	margin-top: 250px;
	margin-bottom: 350px;
	@media screen and (max-width: 992px) {
		margin-top: 75px;
	}
}

.detail-card {
	padding: 20px;
	border-radius: 10px;
}

.custom-height {
	height: 400px;
}

.detail-img {
	width: 100%;
	height: 400px;
	border-radius: 10px;
	object-fit: cover;
}

.property-details p {
	margin: 5px 0;
}

.invalid-feedback {
	color: red;
}

.is-invalid {
	border-color: red;
}

/* Modale */
.modal.show {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

.modal-dialog {
	max-width: 500px;
	width: 100%;
}
</style>
