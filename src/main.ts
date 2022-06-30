import { createApp } from 'vue';
import 'virtual:svg-icons-register';
// 函数组件不适用于自动引入s
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
// 函数组件不适用于自动引入e
import VConsole from 'vconsole';
import App from './App.vue';
import router from '@/router';
import '@/setups/getImgPath';
import store from '@/store';
import i18n from '@/i18n';
import '@/styles/index.less';

// import SvgIcon from '@/components/SvgIcon/index.vue';

// 开发环境 并且需要 VConsole
if (import.meta.env.VITE_VCONSOLE && import.meta.env.MODE !== 'production') {
    const vConsole = new VConsole();
}

const app = createApp(App);
// app.component('SvgIcon', SvgIcon);
app.use(router);
app.use(i18n);
app.use(store);
app.mount('#app');
