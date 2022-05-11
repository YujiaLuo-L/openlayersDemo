import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import menuData from './menu';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '首页',
        },
        component: () => import('@/pages/index.vue'),
        children: [...menuData],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
