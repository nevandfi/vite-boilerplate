import { parse } from 'path';

export function generateCode (files, options) {

    const { defaultLayout, componentNameHandler, layoutsDir } = options;
    
    const imports = [];

    [...files].forEach(file => {
        const path = `/${layoutsDir}/${file}`;
        const parsed = parse(path);
        imports.push(`${parsed.name}: () => import('${path}'),`);
    });
    
    return `
const layouts = {
    ${imports.join('\n')}
}

// Plugin Options

const defaultLayout = ${defaultLayout};
const componentNameHandler = ${componentNameHandler};

/**
* Add a layout wrapper around each route 
* 
* @param {RouteRecordRawLayout[]} baseRoute - Normal route configuration
* @returns {RouteRecordRaw[]} Base route with layout component wrapper as its parent route
*/

export const generateLayoutRoute = (baseRoute) => {

// Generate Layout

const layoutRoute = [...baseRoute].map(route => {

    const targetRoute = route;

    if (!targetRoute.layout && !defaultLayout) return targetRoute;

    if (!targetRoute.layout && defaultLayout) targetRoute.layout = defaultLayout;

    if (componentNameHandler) targetRoute.layout = componentNameHandler(targetRoute.layout);

    const { path, layout } = targetRoute;
    targetRoute.path = '';

    return {
        path,
        component: layouts[layout],
        children: [targetRoute],
    }

});

return layoutRoute;
}
    `;
}