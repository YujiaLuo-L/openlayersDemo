export default [
    {
        path: 'initMap',
        name: 'initMap',
        component: () => import('@/pages/initMap.vue'),
        meta: {
            menuName: '初始化地图',
        },
    },
    {
        path: 'mapMask',
        name: 'mapMask',
        component: () => import('@/pages/mapMask.vue'),
        meta: {
            menuName: '实现地图遮罩',
        },
    },
    {
        path: 'drawGraphics',
        name: 'drawGraphics',
        component: () => import('@/pages/drawGraphics.vue'),
        meta: {
            menuName: '图形绘制',
        },
    },
    {
        path: 'wmsOperate',
        name: 'wmsOperate',
        component: () => import('@/pages/wmsOperate.vue'),
        meta: {
            menuName: '加载wms和feature查询',
        },
    },
    {
        path: 'loadWfs',
        name: 'loadWfs',
        component: () => import('@/pages/loadWfs.vue'),
        meta: {
            menuName: '加载wfs',
        },
    },
    {
        path: 'loadMarker',
        name: 'loadMarker',
        component: () => import('@/pages/loadMarker.vue'),
        meta: {
            menuName: '渲染marker点',
        },
    },
];
