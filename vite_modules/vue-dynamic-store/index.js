import FastGlob from 'fast-glob';
import { resolve } from 'path';
import { generateCode } from './generateCode';

/**
 * @type {GenerateStoreConfig}
 * @const
 */

const defaultOptions = {
    storeDir: 'src/store',
}

/**
 * Vite Vue Dynamic Store Plugin Setup
 * 
 * @param {GenerateStoreConfig} options 
 */

function vueDynamicStorePlugin(options = defaultOptions) {

    const pluginOptions = {
        ...defaultOptions,
        ...options,
    }

    let vueDynamicStoreID = "@vue-dynamic-store";
    let config = null;

    return {
        name: 'vue-dynamic-store',
        configResolved(_config) {
            config = _config;
        },
        resolveId(id) {
            if (id === vueDynamicStoreID) {
                return vueDynamicStoreID;
            }
        },
        async load(id) {
            if (id === vueDynamicStoreID) {

                const { storeDir } = pluginOptions;

                const storePath = resolve(config.root, storeDir).replace(/\\/g, '/');

                const files = await FastGlob('**/index.js', {
                    ignore: ['node-modules', '.git', '**/__*__/*'],
                    onlyFiles: true,
                    cwd: storePath
                });

                return generateCode(files, pluginOptions);

            }
        },
    }

}

export default vueDynamicStorePlugin;