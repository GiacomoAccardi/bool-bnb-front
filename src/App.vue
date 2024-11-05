<script>
import AppHeader from './components/AppHeader.vue';
import AppHome from './components/AppHome.vue';
export default {
  components: {
    AppHeader,
    AppHome
  }
}
</script>
<template>
  <AppHeader />
  <AppHome />
</template>


<style lang="scss">
@import './styles/generals.scss';
</style>
