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
				<div class="blob blob-2"></div>
				<div class="blob blob-3"></div>
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

	&.blob-2 {
		width: 350px;
		height: 350px;
		background: linear-gradient(135deg, #f9bbf9 0%, #ab04ab 100%);
		opacity: 0.8;
		animation: blob-animation-2 28s infinite ease-in-out;
		filter: blur(2px);
	}

	&.blob-3 {
		width: 300px;
		height: 300px;
		background: linear-gradient(135deg, #7243e9 0%, #2c0ccb 100%);
		opacity: 0.7;
		animation: blob-animation-3 32s infinite ease-in-out;
		filter: blur(1px);
	}
}

@keyframes blob-animation {
	0% {
		transform: translate(300%, -75%) scale(1) rotate(0deg);
		border-radius: 60% 40% 30% 70%;
	}
	20% {
		transform: translate(150%, -10%) scale(1.4) rotate(90deg);
		border-radius: 30% 60% 70% 40%;
	}
	40% {
		transform: translate(25%, 50%) scale(1.2) rotate(180deg);
		border-radius: 80% 30% 50% 60%;
	}
	60% {
		transform: translate(350%, 120%) scale(1.6) rotate(270deg);
		border-radius: 40% 80% 30% 50%;
	}
	80% {
		transform: translate(-100%, -35%) scale(1.3) rotate(360deg);
		border-radius: 70% 40% 60% 30%;
	}
	100% {
		transform: translate(300%, -75%) scale(1) rotate(720deg);
		border-radius: 60% 40% 30% 70%;
	}
}

@keyframes blob-animation-2 {
	0% {
		transform: translate(-100%, -75%) scale(0.8) rotate(0deg);
		border-radius: 70% 30% 50% 40%;
	}
	25% {
		transform: translate(50%, 10%) scale(1.5) rotate(180deg);
		border-radius: 20% 80% 50% 40%;
	}
	50% {
		transform: translate(200%, 50%) scale(1.2) rotate(360deg);
		border-radius: 80% 20% 70% 30%;
	}
	75% {
		transform: translate(150%, 120%) scale(1.7) rotate(540deg);
		border-radius: 30% 90% 40% 60%;
	}
	100% {
		transform: translate(-100%, -75%) scale(0.8) rotate(720deg);
		border-radius: 70% 30% 50% 40%;
	}
}

@keyframes blob-animation-3 {
	0% {
		transform: translate(0%, 0%) scale(1) rotate(0deg);
		border-radius: 40% 60% 70% 30%;
	}
	20% {
		transform: translate(250%, 50%) scale(1.6) rotate(240deg);
		border-radius: 90% 40% 30% 70%;
	}
	40% {
		transform: translate(100%, 150%) scale(1.4) rotate(480deg);
		border-radius: 30% 90% 50% 40%;
	}
	60% {
		transform: translate(-50%, 100%) scale(1.8) rotate(720deg);
		border-radius: 60% 30% 80% 40%;
	}
	80% {
		transform: translate(150%, -50%) scale(1.3) rotate(960deg);
		border-radius: 40% 80% 30% 90%;
	}
	100% {
		transform: translate(0%, 0%) scale(1) rotate(1080deg);
		border-radius: 40% 60% 70% 30%;
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
