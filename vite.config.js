// @ts-nocheck

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'

import VueConfig from './vue.config'
import PWAConfig from './pwa.config'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(VueConfig),
        Components(),
        VitePWA(PWAConfig),
    ],
})
