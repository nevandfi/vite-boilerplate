import { createRouter, createWebHistory } from "vue-router";
// import { generateLayoutRoute } from '/src/modules/dynamic_layout';
import baseRoutes from '/src/router/routes';
import { generateLayoutRoute } from '@vue-dynamic-layouts';

// const routes = generateLayoutRoute(baseRoutes, { componentNameHandler: kebabToPascal });
const routes = generateLayoutRoute(baseRoutes);

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