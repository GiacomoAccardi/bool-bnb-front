import { createRouter, createWebHistory } from 'vue-router';
import PageHome from './components/PageHome.vue';
import RealEstateDetail from './components/RealEstateDetail.vue';

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;