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
			showFireworks: false,
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

				// Mostra la modale di successo e i fuochi d'artificio
				this.showSuccessModal = true;
				this.showFireworks = true;

				// Aumentato il timeout a 5000ms (5 secondi)
				setTimeout(() => {
					this.showSuccessModal = false;
					this.showFireworks = false;
				}, 5000);

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
	<div class="container">
		<div
			v-if="realEstate"
			class="detail-card"
			:class="{ 'sponsored-detail': realEstate.subscriptions?.length > 0 }">
			<div class="row mb-3">
				<div class="col-12 col-lg-6 py-3 px-4">
					<div class="info-container">
						<!-- Header section -->
						<div class="property-header">
							<div class="d-flex align-items-center mb-3">
								<router-link to="/" class="go-back">
									<i class="fas fa-arrow-left"></i>
								</router-link>
								<h2 class="property-title mb-0">{{ realEstate.title }}</h2>
								<div
									v-if="realEstate.subscriptions?.length > 0"
									class="sponsored-badge ms-3">
									<i class="fas fa-star me-1"></i>
									Sponsorizzato
								</div>
								<div
									class="availability ms-3"
									:class="{
										'availability-available': realEstate.availability,
										'availability-unavailable': !realEstate.availability,
									}"></div>
							</div>
							<h4 class="property-price">€ {{ realEstate.price }}</h4>
							<p class="property-address">
								{{ realEstate.address }}, {{ realEstate.city }}
							</p>
						</div>

						<!-- Description -->
						<div class="property-description">
							<p>{{ realEstate.description }}</p>
						</div>

						<hr class="divider" />

						<!-- Details Grid -->
						<div class="row">
							<div class="col-6">
								<div class="property-features">
									<div class="feature-item">
										<i class="fas fa-house"></i>
										<span>{{ realEstate.rooms }} Stanze</span>
									</div>
									<div class="feature-item">
										<i class="fas fa-bath"></i>
										<span>{{ realEstate.bathrooms }} Bagni</span>
									</div>
									<div class="feature-item">
										<i class="fas fa-bed"></i>
										<span>{{ realEstate.beds }} Letti</span>
									</div>
									<div class="feature-item">
										<i class="fas fa-ruler-combined"></i>
										<span>{{ realEstate.square_meter }} m²</span>
									</div>
									<div class="feature-item">
										<i class="fas fa-building"></i>
										<span>{{ realEstate.structure_types }}</span>
									</div>
									<div class="feature-item">
										<div
											class="small-availability me-2"
											:class="{
												'availability-available': realEstate.availability,
												'availability-unavailable': !realEstate.availability,
											}"></div>
										<span>{{
											realEstate.availability
												? "Disponibile"
												: "Non Disponibile"
										}}</span>
									</div>
								</div>
							</div>

							<div class="col-6">
								<div class="property-services">
									<h5 class="services-title">Servizi disponibili:</h5>
									<ul class="services-list">
										<li
											v-for="service in realEstate.services"
											:key="service.id"
											class="service-item">
											<i :class="service.icon"></i>
											<span>{{ service.name }}</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 mt-5 mt-md-0 py-4">
					<img
						:src="'http://127.0.0.1:8000/storage/' + realEstate.portrait"
						class="detail-img rounded-1"
						alt="Immobile" />
				</div>
			</div>

			<div class="row mt-lg-5">
				<div class="col-12 col-lg-6">
					<TomTomMap
						apiKey="9Yq5kH65us12yazEXv9SX8bGsAYxX1fL"
						:latitude="realEstate.latitude"
						:longitude="realEstate.longitude"
						:zoom="12" />
				</div>

				<div class="col-12 col-lg-6 mt-3 mt-lg-0">
					<div class="contact-form">
						<h2 class="form-title">Chiedi più informazioni!</h2>
						<form @submit.prevent="submitForm">
							<div class="form-group">
								<input
									type="text"
									id="name"
									v-model="formData.name"
									class="form-control"
									:class="{ 'is-invalid': errors.name }"
									placeholder="Nome" />
								<div v-if="errors.name" class="invalid-feedback">
									{{ errors.name[0] }}
								</div>
							</div>

							<div class="form-group">
								<input
									type="text"
									id="surname"
									v-model="formData.surname"
									class="form-control"
									:class="{ 'is-invalid': errors.surname }"
									placeholder="Cognome" />
								<div v-if="errors.surname" class="invalid-feedback">
									{{ errors.surname[0] }}
								</div>
							</div>

							<div class="form-group">
								<input
									type="email"
									id="email"
									v-model="formData.email"
									class="form-control"
									:class="{ 'is-invalid': errors.email }"
									placeholder="Email" />
								<div v-if="errors.email" class="invalid-feedback">
									{{ errors.email[0] }}
								</div>
							</div>

							<div class="form-group">
								<input
									type="tel"
									id="phone"
									v-model="formData.phone"
									class="form-control"
									:class="{ 'is-invalid': errors.phone }"
									placeholder="Telefono" />
								<div v-if="errors.phone" class="invalid-feedback">
									{{ errors.phone[0] }}
								</div>
							</div>

							<div class="form-group">
								<textarea
									id="message"
									v-model="formData.message"
									class="form-control"
									:class="{ 'is-invalid': errors.message }"
									placeholder="Il tuo messaggio..."
									rows="4"></textarea>
								<div v-if="errors.message" class="invalid-feedback">
									{{ errors.message[0] }}
								</div>
							</div>

							<button type="submit" class="submit-btn">Invia richiesta</button>
						</form>
					</div>
				</div>
			</div>

			<!-- Modale di Successo con Fuochi d'Artificio -->
			<div v-if="showSuccessModal" class="modal-overlay">
				<div v-if="showFireworks" class="fireworks-container">
					<div class="firework"></div>
					<div class="firework"></div>
					<div class="firework"></div>
				</div>

				<div
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
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
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
	aspect-ratio: 1/1;
	border-radius: 10px;
	object-fit: cover;
	@media (min-width: 768px) {
		height: 100%;
	}
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
	position: relative;
	z-index: 1001;
	margin-top: 0;
	height: auto;
}

.modal-dialog {
	max-width: 500px;
	width: 100%;
}

.go-back {
	font-size: 15px;
	padding: 5px 10px;
	margin-right: 0.5rem;
	border-radius: 5px;
	color: rgb(125, 125, 125);
	background-color: #cccccc;

	transition: color 0.3s ease;
	&:hover {
		background-color: #0d6efd;
		color: white;
	}
}

.availability {
	border-radius: 50%;
	width: 25px;
	height: 25px;
}

.small-availability {
	width: 15px;
	height: 15px;
	border-radius: 50%;
}

.availability-available {
	background-color: green;
}

.availability-unavailable {
	background-color: red;
}

/* Overlay e Modale */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(
		0,
		0,
		0,
		0.8
	); // Overlay più scuro per far risaltare i fuochi
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
}

.fireworks-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.firework,
.firework::before,
.firework::after {
	--initialSize: 0.5vmin;
	--finalSize: 45vmin;
	--particleSize: 0.2vmin;
	--color1: yellow;
	--color2: khaki;
	--color3: white;
	--color4: lime;
	--color5: gold;
	--color6: mediumseagreen;
	--y: -30vmin;
	--x: -50%;
	--initialY: 60vmin;
	content: "";
	animation: firework 3s infinite;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, var(--y));
	width: var(--initialSize);
	aspect-ratio: 1;
	background: radial-gradient(
				circle,
				var(--color1) var(--particleSize),
				#0000 0
			)
			50% 0%,
		radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 50%,
		radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 50% 100%,
		radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 0% 50%,
		radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 80% 90%,
		radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 95% 90%,
		radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 90% 70%;
	background-size: var(--initialSize) var(--initialSize);
	background-repeat: no-repeat;
}

@keyframes firework {
	0% {
		transform: translate(var(--x), var(--initialY));
		width: var(--initialSize);
		opacity: 1;
	}
	50% {
		width: 0.5vmin;
		opacity: 1;
	}
	100% {
		width: var(--finalSize);
		opacity: 0;
	}
}

.firework:nth-child(2) {
	--x: 30vmin;
	animation-delay: -0.5s;
}

.firework:nth-child(2),
.firework:nth-child(2)::before,
.firework:nth-child(2)::after {
	--color1: pink;
	--color2: violet;
	--color3: fuchsia;
	--color4: orchid;
	--color5: plum;
	--color6: lavender;
	--finalSize: 40vmin;
	left: 30%;
	top: 60%;
}

.firework:nth-child(3) {
	--x: -30vmin;
	--y: -50vmin;
	animation-delay: -0.8s;
}

.firework:nth-child(3),
.firework:nth-child(3)::before,
.firework:nth-child(3)::after {
	--color1: cyan;
	--color2: lightcyan;
	--color3: lightblue;
	--color4: PaleTurquoise;
	--color5: SkyBlue;
	--color6: lavender;
	--finalSize: 35vmin;
	left: 70%;
	top: 60%;
}

.form-title {
	font-size: 1.8rem;
	font-weight: 300;
	margin-bottom: 2rem;
	color: #333;
}

.contact-form {
	background: #fff;
	padding: 2rem;
	border-radius: 12px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
	margin-bottom: 1.5rem;
	position: relative;
}

.form-control {
	width: 100%;
	padding: 12px 16px;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	font-size: 1rem;
	transition: all 0.3s ease;
	background-color: #f8f9fa;

	&:focus {
		outline: none;
		border-color: #0d6efd;
		box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
		background-color: #fff;
	}

	&::placeholder {
		color: #adb5bd;
	}

	&.is-invalid {
		border-color: #dc3545;
		background-color: #fff;

		&:focus {
			box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
		}
	}
}

textarea.form-control {
	resize: vertical;
	min-height: 120px;
}

.invalid-feedback {
	font-size: 0.875rem;
	color: #dc3545;
	margin-top: 0.5rem;
	padding-left: 0.5rem;
}

.submit-btn {
	width: 100%;
	padding: 14px 24px;
	background-color: #0d6efd;
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background-color: #0b5ed7;
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(13, 110, 253, 0.2);
	}

	&:active {
		transform: translateY(0);
		box-shadow: none;
	}
}

// Responsive adjustments
@media (max-width: 768px) {
	.contact-form {
		padding: 1.5rem;
	}

	.form-title {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}
}

.info-container {
	background: #fff;
	padding: 2rem;
	border-radius: 12px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	height: 100%;
}

.property-header {
	margin-bottom: 1.5rem;
}

.property-title {
	font-size: 1.8rem;
	font-weight: 500;
	color: #333;
	margin-right: 1rem;
}

.property-price {
	font-size: 1.5rem;
	font-weight: 600;
	color: #0d6efd;
	margin-bottom: 0.5rem;
}

.property-address {
	color: #666;
	font-size: 1rem;
	margin-bottom: 1rem;
}

.property-description {
	color: #555;
	line-height: 1.6;
	margin-bottom: 1.5rem;
}

.divider {
	border-color: #e0e0e0;
	margin: 1.5rem 0;
}

.property-features {
	.feature-item {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		color: #555;

		i {
			width: 24px;
			margin-right: 10px;
			color: #0d6efd;
		}

		span {
			font-size: 0.95rem;
		}
	}
}

.property-services {
	.services-title {
		font-size: 1rem;
		font-weight: 500;
		color: #333;
		margin-bottom: 1rem;
	}

	.services-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.service-item {
		display: flex;
		align-items: center;
		margin-bottom: 0.75rem;
		color: #555;

		i {
			width: 24px;
			margin-right: 10px;
			color: #0d6efd;
		}

		span {
			font-size: 0.95rem;
		}
	}
}

.go-back {
	font-size: 15px;
	padding: 8px 12px;
	margin-right: 1rem;
	border-radius: 8px;
	color: #666;
	background-color: #f0f0f0;
	text-decoration: none;
	transition: all 0.3s ease;

	&:hover {
		background-color: #0d6efd;
		color: white;
	}
}

.availability,
.small-availability {
	border-radius: 50%;

	&.availability-available {
		background-color: #28a745;
	}

	&.availability-unavailable {
		background-color: #dc3545;
	}
}

.availability {
	width: 20px;
	height: 20px;
}

.small-availability {
	width: 12px;
	height: 12px;
}

// Responsive adjustments
@media (max-width: 768px) {
	.info-container {
		padding: 1.5rem;
	}

	.property-title {
		font-size: 1.5rem;
	}

	.property-price {
		font-size: 1.3rem;
	}
}

.sponsored-detail {
	position: relative;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 10px;
		background: linear-gradient(114deg, #2626a0 4%, #80eaff 92%);
		opacity: 0.05;
		pointer-events: none;
	}
}

.sponsored-badge {
	background: linear-gradient(114deg, #2626a0 4%, #80eaff 92%);
	color: white;
	padding: 8px 15px;
	border-radius: 20px;
	font-size: 0.9rem;
	font-weight: 600;
	display: flex;
	align-items: center;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	animation: pulse 2s infinite;

	i {
		color: #ffd700;
	}
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
	100% {
		transform: scale(1);
	}
}

.info-container {
	&.sponsored {
		border: 2px solid transparent;
		background-image: linear-gradient(white, white),
			linear-gradient(114deg, #2626a0 4%, #80eaff 92%);
		background-origin: border-box;
		background-clip: content-box, border-box;
	}
}
</style>
