import { createApp } from 'vue';
import VConsole from 'vconsole';
import App from './App.vue';
import router from '@/router';
import '@/styles/index.less';
import '@/setups/getImg';
import store from '@/store';

// 开发环境 并且需要 VConsole
if (import.meta.env.VITE_VCONSOLE && import.meta.env.MODE !== 'production') {
    const vConsole = new VConsole();
}

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
