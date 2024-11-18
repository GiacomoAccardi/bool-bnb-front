import { createRouter, createWebHistory } from 'vue-router';
import PageHomeTwo from './components/PageHomeTwo.vue';
import RealEstateDetail from './components/RealEstateDetail.vue';
import RealEstateList from './components/RealEstateList.vue';
import RealEstateListTwo from './components/RealEstateListTwo.vue';


const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHomeTwo,
    },
    {
        path: '/real-estate/:id',
        name: 'realEstateDetail',
        component: RealEstateDetail,
        props: true,
    },
    {
        path: '/real-estate/:city',  
        name: 'realEstateList',
        component: RealEstateListTwo,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;