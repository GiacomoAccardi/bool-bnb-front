<script>
import axios from "axios";

export default {
	data() {
		return {
			realEstate: null,
			formData: {
				name: "",
				surname: "",
				email: "",
				phone: "",
				message: "",
				real_estate_id: this.$route.params.id, // Aggiungi dinamicamente l'id dell'immobile
			},
			errors: {}, // Per memorizzare gli errori di validazione
		};
	},
	async created() {
		const id = this.$route.params.id;
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/api/real-estates/${id}`
			);
			this.realEstate = response.data;
		} catch (error) {
			console.error("Errore nel caricamento dell'immobile:", error);
		}
	},
	methods: {
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
				// Puoi anche mostrare un messaggio di successo per l'utente
				alert("Messaggio inviato con successo!");
				// Reset del form
				this.formData = {
					name: "",
					surname: "",
					email: "",
					phone: "",
					message: "",
					real_estate_id: this.$route.params.id,
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
	},
};
</script>

<template>
	<div class="container">
		<div v-if="realEstate" class="detail-card">
			<img
				:src="'http://127.0.0.1:8000/storage/' + realEstate.portrait"
				class="detail-img"
				alt="Immobile" />
			<h2>{{ realEstate.title }}</h2>
			<p>{{ realEstate.address }}, {{ realEstate.city }}</p>
			<p>€ {{ realEstate.price }}</p>
			<p>{{ realEstate.description }}</p>

			<div class="row">
				<div class="col-6">
					<div class="property-details">
						<p><strong>Camere:</strong> {{ realEstate.rooms }}</p>
						<p><strong>Bagni:</strong> {{ realEstate.bathrooms }}</p>
						<p><strong>Letti:</strong> {{ realEstate.beds }}</p>
						<p>
							<strong>Metri Quadri:</strong> {{ realEstate.square_meter }} m²
						</p>
						<p>
							<strong>Tipo di Struttura:</strong>
							{{ realEstate.structure_types }}
						</p>
						<p>
							<strong>Disponibilità:</strong>
							{{ realEstate.availability ? "Disponibile" : "Non Disponibile" }}
						</p>
					</div>
					<div class="services">
						<h4>Servizi disponibili:</h4>
						<ul>
							<li v-for="service in realEstate.services" :key="service.id">
								{{ service.name }}
							</li>
						</ul>
					</div>
				</div>

				<div class="col-6">
					<div class="contact-form">
						<form @submit.prevent="submitForm">
							<!-- Nome -->
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

							<!-- Cognome -->
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

							<!-- Email -->
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

							<!-- Telefono -->
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

							<!-- Messaggio -->
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

							<!-- ID Immobile (nascosto) -->
							<input type="hidden" v-model="formData.real_estate_id" />

							<button type="submit" class="btn btn-primary mt-3">Invia</button>
						</form>
					</div>
				</div>
			</div>

			<router-link to="/" class="btn btn-secondary mt-3"
				>Torna alla lista</router-link
			>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin-top: 450px;
	margin-bottom: 75px;
}

.detail-card {
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 10px;
}

.detail-img {
	width: 100%;
	max-height: 400px;
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
</style>
