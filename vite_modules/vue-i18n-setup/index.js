import FastGlob from 'fast-glob';
import { resolve } from 'path';
import { generateCode } from './generateCode';
import { generateTranslationCode } from './generateTranslationCode';

/**
 * @type {GenerateI18nSetupConfig}
 * @const
 */

const defaultOptions = {
    localesDir: 'src/locales',
    defaultLocale: 'en',
}

/**
 * Vite Vue Dynamic Store Plugin Setup
 * 
 * @param {GenerateI18nSetupConfig} options 
 */

function vueI18nSetupPlugin(options = defaultOptions) {

    const pluginOptions = {
        ...defaultOptions,
        ...options,
    }

    let vueDynamicStoreID = "@vue-i18n-setup";
    let localeTranslationID = `${vueDynamicStoreID}:localeTranslation`;
    let config = null;

    return {
        name: 'vue-i18n-setup',
        configResolved(_config) {
            config = _config;
        },
        resolveId(id) {
            if (id === vueDynamicStoreID) {
                return vueDynamicStoreID;
            } 
            
            if (id === localeTranslationID) {
                return localeTranslationID;
            }
        },
        async load(id) {

            if (id !== vueDynamicStoreID && id !== localeTranslationID) return;

            const { localesDir } = pluginOptions;

            const localesPath = resolve(config.root, localesDir).replace(/\\/g, '/');

            const files = await FastGlob('**/*.json', {
                ignore: ['node-modules', '.git', '**/__*__/*'],
                onlyFiles: true,
                cwd: localesPath
            });

            if (id === vueDynamicStoreID) {
                return generateCode(files, pluginOptions);
            } 
            
            if (id === localeTranslationID) {
                return generateTranslationCode(files, config.root, pluginOptions);
            }
        },
    }

}

export default vueI18nSetupPlugin;