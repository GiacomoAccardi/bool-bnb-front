<template>
	<header class="app-header">
		<div class="container position-relative">
			<AppNavbar />
			<div class="centered-text">
				Benvenuto su Bool BNB Scopri quanto è facile trovare la casa che fa per
				te
			</div>
		</div>
	</header>
</template>

<script>
import AppNavbar from "./AppNavbar.vue";
export default {
	components: {
		AppNavbar,
	},
};
</script>

<style lang="scss" scoped>
.logo {
	height: 60px;
	position: relative;
	z-index: 10;
}

.container {
	background-image: url("../assets/bg_2.jpg");
	background-size: cover;
	background-position: center;
	position: absolute;
	background-attachment: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 700px;
	overflow: hidden;
}

.container::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.4);
	z-index: 1;
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
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	z-index: 2;
}

ul.list-unstyled li a:active {
	border: 1px solid black;
	padding: 5px;
}

.app-header {
	top: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	padding: 10px 20px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	z-index: 1000;
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
