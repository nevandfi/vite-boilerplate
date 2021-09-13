/** @type {RouteRecordRawLayout[]} */
const baseRoutes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('/src/pages/index.vue'),
        layout: 'header-layout',
    },
    {
        path: '/404',
        name: 'Error:404',
        component: () => import('/src/pages/404.vue'),
    }
];

export default baseRoutes;