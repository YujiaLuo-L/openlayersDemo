import config from './axios';

// 登录接口
export const getMapData = (
    data: Record<string, any>,
    header: Record<string, any>,
) => {
    return config.get('/acqforjs/userinfo/findUserinfo', data, header);
};

export const wmsLayerUrl =
    'http://172.16.11.33:8080/geoserver/smartacqforjs/wms';
