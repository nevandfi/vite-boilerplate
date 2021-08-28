import { defineConfig } from 'vite'
import VueConfig from './vue.config'
import vue from '@vitejs/plugin-vue'
import VitePluginComponents from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(VueConfig),
        VitePluginComponents(),
    ],
})
