import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index'
import Store from '@vue-dynamic-store'
import I18n from '@vue-i18n-setup'
import Anime from '@vue-anime-setup';

import '@purge-icons/generated'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
})

const app = createApp(App);

app.use(Router);
app.use(Store);
app.use(I18n);
app.use(Anime);

app.mount('#app');