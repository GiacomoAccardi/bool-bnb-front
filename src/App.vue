<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import PageHomeTwo from "./components/PageHomeTwo.vue";

export default {
	components: {
		AppHeader,
		AppFooter,
		PageHomeTwo,
	},
};
</script>

<template>
	<body>
		<AppHeader />
		<main>
			<router-view class="main-section-container"></router-view>
		</main>
		<!-- <PageHomeTwo /> -->
		<AppFooter class="footer-section" />
	</body>
</template>

<style lang="scss">
@import "./styles/generals.scss";
body {
	height: 100vh;
}
main {
	min-height: 54.5vh;
}
.main-section-container {
	margin-bottom: 50px;
}
</style>
