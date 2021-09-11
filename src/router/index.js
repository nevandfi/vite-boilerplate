import { createRouter, createWebHistory } from "vue-router";
import { generateLayoutRoute } from '/src/modules/dynamic_layout';
import { kebabToPascal } from "/src/utils";
import baseRoutes from '/src/router/routes';

const routes = generateLayoutRoute(baseRoutes, { componentNameHandler: kebabToPascal });

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