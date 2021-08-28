import { createRouter, createWebHistory } from "vue-router";

import home from '/src/pages/index.vue';

const routes = [
    {
        name: 'home',
        path: '/',
        component: home
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;