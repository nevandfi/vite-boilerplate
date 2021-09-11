
/**
 * Add a layout wrapper around each route 
 * 
 * @param {RouteRecordRawLayout[]} baseRoute - Normal route configuration
 * @param {GenerateLayoutRouteConfig} options - Default layout component as a string
 * @returns {RouteRecordRaw[]} Base route with layout component wrapper as its parent route
 */

 export const generateLayoutRoute = (baseRoute, options) => {

    const { defaultLayout, componentNameHandler } = options;

    const layoutRoute = [...baseRoute].map(route => {

        const targetRoute = route;

        if (!targetRoute.layout && !defaultLayout) return targetRoute;

        if (!targetRoute.layout && defaultLayout) targetRoute.layout = defaultLayout;

        if (componentNameHandler) targetRoute.layout = componentNameHandler(targetRoute.layout);

        const { path, layout } = targetRoute;
        targetRoute.path = '';

        return {
            path,
            component: () => import(`./../../layouts/${layout}.vue`),
            children: [targetRoute],
        }
        
    });

    return layoutRoute;
}