import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const http = axios.create(); // Request interceptors

http.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // do something
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    },
); // Response interceptors

http.interceptors.response.use(
    async (response: AxiosResponse) => {
        // do something
    },
    (error: any) => {
        // do something
        return Promise.reject(error);
    },
);

const config = {
    /**
     * get请求
     * @param {String} url
     * @param {Object} params
     */
    get(url: string, params = {}, options = {}, isOrigin = false) {
        console.log(options);
        return new Promise((resolve, reject) => {
            http.get(url, {
                params: {
                    ...params,
                },
                ...options,
            })
                .then((response) => {
                    const _res = isOrigin ? response : response?.data;
                    resolve(_res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    /**
     * post请求
     * @param {String} url
     * @param {Object} data
     */
    post(url: string, data = {}, options = {}, isOrigin = false) {
        return new Promise((resolve, reject) => {
            http.post(url, data, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                ...options,
            })
                .then((response) => {
                    const _res = isOrigin ? response : response?.data;
                    resolve(_res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

export default config;
