

import { resolve } from 'path';
import FastGlob from 'fast-glob';
import { generateCode } from './generateCode';

/**
 * @type {GenerateLayoutRouteConfig}
 * @const
 */

const defaultOptions = {
    defaultLayout: null,
    componentNameHandler: null,
    layoutsDir: 'src/layouts'
}

/**
 * Vite Vue Dynamic Layouts Plugin Setup
 * 
 * @param {GenerateLayoutRouteConfig} options 
 */

function vueDynamicLayoutsPlugin(options = defaultOptions) {

    const pluginOptions = {
        ...defaultOptions,
        ...options,
    }

    let vueDynamicLayoutsID = "@vue-dynamic-layouts";
    let config = null;

    return {
        name: 'vue-dynamic-layouts',
        configResolved(_config) {
            config = _config;
        },
        resolveId(id) {
            if (id === vueDynamicLayoutsID) {
                return vueDynamicLayoutsID;
            }
        },
        async load(id) {
            if (id === vueDynamicLayoutsID) {

                let { layoutsDir } = pluginOptions;

                const layoutsPath = resolve(config.root, layoutsDir).replace(/\\/g, '/');
                
                const files = await FastGlob('**/*.vue', {
                    ignore: ['node-modules', '.git', '**/__*__/*'],
                    onlyFiles: true,
                    cwd: layoutsPath
                });

                return generateCode(files, pluginOptions);
            }
        },
    }

}

export default vueDynamicLayoutsPlugin;