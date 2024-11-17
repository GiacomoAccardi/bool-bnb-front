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
	<AppHeader />
	<router-view></router-view>
	<!-- <PageHomeTwo /> -->
	<AppFooter />
</template>

<style lang="scss">
@import "./styles/generals.scss";
</style>
