import { createRouter, createWebHistory } from 'vue-router';
import PageHome from './components/PageHome.vue';
import RealEstateDetail from './components/RealEstateDetail.vue';
import RealEstateList from './components/RealEstateList.vue';


const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome,
    },
    {
        path: '/real-estate/:id',
        name: 'realEstateDetail',
        component: RealEstateDetail,
        props: true,
    },
    {
        path: '/real-estate/:city',  // Aggiungi il parametro city nella rotta
        name: 'realEstateList',
        component: RealEstateList,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;