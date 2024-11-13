import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import tt from '@tomtom-international/web-sdk-maps';





createApp(App)
    .use(router)
    .mount('#app');