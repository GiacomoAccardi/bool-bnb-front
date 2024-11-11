import { createRouter, createWebHistory } from 'vue-router';

import PageHome from './components/PageHome.vue';


const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
