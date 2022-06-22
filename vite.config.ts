import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import viteSvgIcons from 'vite-plugin-svg-icons';

const path = require('path');

// 获取环境变量
const config = loadEnv('development', './');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteSvgIcons({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(__dirname, 'src/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',
        }),
    ],
    server: {
        open: true,
        host: true,
        port: 8022,
        proxy: {
            [config.VITE_REQ_BASE_URL]: {
                target: config.VITE_REQ_BASE_URL_PROXY,
                changeOrigin: true,
                // eslint-disable-next-line no-shadow
                rewrite: (path) => {
                    const target = path.replace(new RegExp(`^${config.VITE_REQ_BASE_URL}`), '');
                    return target;
                },
            },
        },
    },
    // 这里一定要注意， vite vue 模板没有做路径别名 和 extensions 为vue 的处理....
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.ts', '.vue', '.mjs', '.js', '.jsx', '.tsx', '.json'],
    },
    css: {
        preprocessorOptions: {
            // 导入变量
            less: {
                additionalData: `@import "${path.resolve(__dirname, 'src/styles/var.less')}";`,
                javascriptEnabled: true,
            },
        },
    },
});
