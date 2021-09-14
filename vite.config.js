// @ts-nocheck
import path from 'path';

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import VueConfig from './config/vue.config'

import Components from 'unplugin-vue-components/vite'
import vueDynamicLayoutsPlugin from './vite_modules/vue-dynamic-layouts'
import vueDynamicStorePlugin from './vite_modules/vue-dynamic-store'
import vueI18nSetupPlugin from './vite_modules/vue-i18n-setup';
import vueAnimeSetup from './vite_modules/vue-anime-setup';

import ViteFonts from 'vite-plugin-fonts'
import FontsConfig from './config/fonts.config'

import PurgeIcons from 'vite-plugin-purge-icons'

import { VitePWA } from 'vite-plugin-pwa'
import PWAConfig from './config/pwa.config'

import { kebabToPascal } from "/src/utils";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(VueConfig),
        VitePWA(PWAConfig),
        Components(),
        vueDynamicLayoutsPlugin({
            componentNameHandler: kebabToPascal,
        }),
        vueDynamicStorePlugin(),
        vueI18nSetupPlugin(),
        vueAnimeSetup(),
        ViteFonts(FontsConfig),
        PurgeIcons(),
    ],
})
