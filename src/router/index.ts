import { createRouter, RouteRecordRaw, createWebHistory, createWebHashHistory } from 'vue-router';

import Layout from '@/layout/index.vue';
import Home from '@/view/home.vue';

export enum RouterNames {
    Home = 'Home',
    Login = 'Login',
    Test = 'Test',
    NotFound = 'NotFound',
}

const routerArr: RouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: {
            title: '',
        },
        children: [
            {
                path: '/home',
                component: Home,
                name: RouterNames.Home,
                meta: {
                    title: '',
                },
            },
        ],
    },
    {
        path: '/test',
        component: () => import('@/view/test.vue'),
        name: RouterNames.Test,
        meta: {
            title: '测试页',
        },
    },
    {
        path: '/.*',
        component: () => import('@/view/404.vue'),
        name: RouterNames.NotFound,
        meta: {
            title: '404',
        },
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes: routerArr,
});

// 生产环境去除测试页面
// if (import.meta.env.MODE === 'production') {
//     router.removeRoute(RouterNames.Test);
// }

router.beforeEach((to, from, next) => {
    // if (to.name === RouterNames.Login && store.state.user.token) {
    //     // 如果已经登录, 回到主页
    //     next({ name: RouterNames.Home });
    //     return;
    // }
    next();
});
router.afterEach((to, from) => {
    const { title = '' } = to.meta;
    // 设置 title
    document.title = title + import.meta.env.VITE_TITLE;
});

export default router;
