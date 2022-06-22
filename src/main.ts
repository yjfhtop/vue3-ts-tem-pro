import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import '@/styles/index.less';
import { loadVConsole } from '@/utils/dynamicLoadScript';
import '@/setups/getImg';
import store from '@/store';

loadVConsole(() => {
    const _ = new window.VConsole();
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
