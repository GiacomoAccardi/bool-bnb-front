import { createRouter, createWebHistory } from 'vue-router';

import PageHome from './components/PageHome.vue';
import RoomsPage from './components/RoomsPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome,
    },
    {
        path: '/rooms',
        name: 'rooms',
        component: RoomsPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
