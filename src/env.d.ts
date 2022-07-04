/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// eslint-disable-next-line no-unused-vars
interface ImportMetaEnv {
    // 请求地址
    readonly VITE_REQ_BASE_URL: string;
    // # 将 /api 代理的 实际请求地址, 仅dev 环境需要
    readonly VITE_REQ_BASE_URL_PROXY: string;
    // # zego appid
    readonly VITE_ZEGO_APPID: string;
    // # socket 地址
    readonly VITE_ZEGO_URL: string;
    // 是否加载 vconsole 用于调试 '' 未不加载
    readonly VITE_VCONSOLE: string;
    // vconsole cdn 地址
    readonly VITE_VCONSOLE_CDN: string;
    // 用于 网页标题
    readonly VITE_TITLE: string;
}
