import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index'
import Store from './store/index'

const app = createApp(App);

app.use(Router);
app.use(Store);

app.mount('#app');
