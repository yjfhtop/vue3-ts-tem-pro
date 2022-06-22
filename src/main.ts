import { createApp } from 'vue';
import VConsole from 'vconsole';
import App from './App.vue';
import router from '@/router';
import '@/styles/index.less';
import '@/setups/getImgPath';
import store from '@/store';
import i18n from '@/i18n';

// 开发环境 并且需要 VConsole
if (import.meta.env.VITE_VCONSOLE && import.meta.env.MODE !== 'production') {
    const vConsole = new VConsole();
}

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(store);
app.mount('#app');
