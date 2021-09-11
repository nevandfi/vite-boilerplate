
/**
 * Add a layout wrapper around each route 
 * 
 * @param {RouteRecordRawLayout[]} baseRoute - Normal route configuration
 * @param {String} defaultLayout - Default layout component as a string
 * @param {Function} componentNameHandler - Handler function to handle layout component names 
 * @returns {RouteRecordRaw[]} Base route with layout component wrapper as its parent route
 */

function generateLayoutRoute(baseRoute, defaultLayout, componentNameHandler) {
    if (typeof baseRoute !== 'object') return baseRoute;

    const layoutRoute = [...baseRoute].map(route => {

        let targetRoute = route;

        if (!targetRoute.layout && !defaultLayout) return targetRoute;

        if (!targetRoute.layout && defaultLayout) targetRoute.layout = defaultLayout;

        if (componentNameHandler) targetRoute.layout = componentNameHandler(targetRoute.layout);

        const { path, layout } = targetRoute;
        targetRoute.path = '';
        const layoutComponentPath = `/src/layouts/${layout}.vue`;

        return {
            path,
            component: () => import(layoutComponentPath  /* @vite-ignore */),
            children: [targetRoute],
        }
        
    });

    return layoutRoute;
}

export { generateLayoutRoute };