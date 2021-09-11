import { createRouter, createWebHistory } from "vue-router";
import { generateLayoutRoute } from '/src/modules/dynamic_layout';
import { kebabToPascal } from "/src/modules/utils";

/**
 * @type {RouteRecordRawLayout[]}
 */
const baseRoute = [
    {
        path: '/',
        name: 'Home',
        component: () => import('/src/pages/index.vue'),
        layout: 'header-layout'
    },
    {
        path: '/404',
        name: 'Error:404',
        component: () => import('/src/pages/404.vue')
    }
];

const routes = generateLayoutRoute(baseRoute, null, kebabToPascal);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeResolve((to, _, next) => {

    if (to.matched.length < 1) {
        next({ path: '/404' });
        return;
    }

    next();

});

export default router;