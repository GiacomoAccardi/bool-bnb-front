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
		<div class="container-fluid position-relative">
			<div class="blob-container">
				<div class="blob"></div>
			</div>
		</div>
		<div class="container position-relative">
			<AppNavbar class="fixed-top pt-3" />
			<div class="centered-text" v-if="isHomePage">
				<span class="title-header-custom">Benvenuto su Bool BNB</span><br />
				<span class="subtitle-header-custom"
					>Scopri quanto è facile trovare la casa che fa per te</span
				>
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.title-header-custom {
	font-size: 3rem;
}
.subtitle-header-custom {
	font-size: 2rem;
}

.blob-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 700px;
	overflow: hidden;
	background: #1166ef;

	@media (max-width: 992px) {
		height: 0px;
	}

	/* Per gestire overlay sfumato */
	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, rgb(255, 255, 255), transparent);
		pointer-events: none;
	}
}

.blob {
	position: absolute;
	width: 400px;
	height: 400px;
	background: linear-gradient(135deg, rgba(215, 109, 214, 1) 38%, #f4b09e);
	border-radius: 50%;
	animation: blob-animation 30s infinite ease-in-out;

	@media (max-width: 992px) {
		width: 300px;
		height: 300px;
	}
}

/* Animazione del blob che cambia forma, posizione e si muove su tutta la sezione */
@keyframes blob-animation {
	0% {
		transform: translate(300%, -75%) scale(1) rotate(0deg);
		border-radius: 50%;
	}
	20% {
		transform: translate(150%, -10%) scale(1.2) rotate(30deg);
		border-radius: 60% 40% 50% 30%;
	}
	40% {
		transform: translate(25%, 50%) scale(1.3) rotate(60deg);
		border-radius: 50% 60% 30% 40%;
	}
	60% {
		transform: translate(350%, 120%) scale(1.4) rotate(90deg);
		border-radius: 40% 50% 70% 30%;
	}
	80% {
		transform: translate(-100%, -35%) scale(1.5) rotate(120deg);
		border-radius: 30% 60% 40% 50%;
	}
	100% {
		transform: translate(300%, -75%) scale(1) rotate(150deg);
		border-radius: 50%;
	}
}

.container {
	width: 100%;
	height: 650px;

	@media (max-width: 992px) {
		height: 0px;
	}
}

.centered-text {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #fff;
	font-size: 2rem;
	text-align: center;
	font-weight: bold;
	z-index: 2;

	@media screen and (max-width: 992px) {
		display: none;
	}
}
</style>
