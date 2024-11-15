import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import tt from '@tomtom-international/web-sdk-maps';

// Importa il CSS di TomTom per la mappa
import '@tomtom-international/web-sdk-maps/dist/maps.css';



createApp(App)
    .use(router)
    .mount('#app');