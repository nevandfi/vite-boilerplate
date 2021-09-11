// @ts-nocheck

import { defineConfig } from 'vite'
import VueConfig from './vue.config'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(VueConfig),
        Components(),
    ],
})
