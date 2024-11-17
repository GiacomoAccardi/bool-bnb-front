<script>
import AppNavbar from "./AppNavbar.vue";
export default {
	components: {
		AppNavbar,
	},
	computed: {
		// Controlla se l'utente si trova nella home
		isHomePage() {
			return this.$route.name === "home"; // Cambia 'home' con il nome corretto della tua route
		},
	},
};
</script>

<template>
	<header class="app-header">
		<div class="container-fluid"></div>
		<div class="container position-relative">
			<AppNavbar class="fixed-top pt-3" />
			<div class="centered-text" v-if="isHomePage">
				Benvenuto su Bool BNB<br />
				Scopri quanto è facile trovare la casa che fa per te
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.container-fluid {
	background-image: url("../assets/bg_2.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center -150px;
	position: absolute;
	background-attachment: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 750px;
	overflow: hidden;

	@media (max-width: 992px) {
		height: 0px;
		background-position: center 0px;
	}

	/* Aggiungi un overlay sfumato dalla parte inferiore */
	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%; /* Modifica questa altezza per il grado di sfumatura */
		background: linear-gradient(to top, white, transparent);
		pointer-events: none; /* Evita che l'overlay interferisca con il contenuto */
	}
}
.container {
	width: 100%;
	height: 650px;

	@media (max-width: 992px) {
		height: 0px;
	}
}

.content {
	position: relative;
	z-index: 10;
}

ul.list-unstyled li a {
	color: #000000;
	font-size: 18px;
	text-transform: uppercase;
	transition: color 0.3s ease;
}

.centered-text {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #000;
	font-size: 2rem;
	text-align: center;
	font-weight: bold;
	z-index: 2;

	@media screen and (max-width: 992px) {
		display: none;
	}
}

ul.list-unstyled li a:active {
	border: 1px solid black;
	padding: 5px;
}

.active-link {
	border: 2px solid black;
	padding: 5px;
}

.sticky {
	position: fixed;
	top: 0;
	width: 100%;
}

.rainbow3 {
	display: none;
	background: linear-gradient(
		114deg,
		rgba(2, 0, 36, 1) 21%,
		rgba(1, 0, 255, 1) 45%
	);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
}
</style>
