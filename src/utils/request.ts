import axios, { AxiosRequestConfig } from 'axios';

import { Toast } from 'vant';

export type Custom = AxiosRequestConfig['custom']

// const store = useStore();

// 一般处理方式
const service = axios.create({
    baseURL: import.meta.env.VITE_REQ_BASE_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000, // request timeout
    // 因为axios 过滤了 非200 的请求，导致不好判断是否显示错误
    validateStatus() {
        return true;
    },
});

// eslint-disable-next-line max-len
// custom = {loading: boole = f, useFormData: boole = f, hideErrInfo: bool = f, noCheckServerCode = f, orgData: f }
// loading 是否显示loading   def:f
// useFormData 是否显示是否使用表单上传 def: f
// hideErrInfo 请求错误是否隐藏 def: f
// noCheckServerCode 不校验后台返回的状态码（非http状态码） def: f
// orgData: 后台返回 的数据直接返回
// noCheckRepeat: 不检查重复请求。 def: f
const defCustom: Custom = {
    loading: false,
    useFormData: false,
    hideErrInfo: false,
    noCheckServerCode: false,
    orgData: false,
    noCheckRepeat: false,
    originalData: undefined,
};

// url + 请求方式 + params + data 为key
const RepeatMap: Record<string, boolean> = {};

// 重复 请求的 错误
export type RepeatErr = Error & { isRepeatErr?: boolean, conf?: AxiosRequestConfig }

function generateRepeatErr(conf: AxiosRequestConfig) : RepeatErr {
    const err: RepeatErr = new Error('您的手速太快了');
    err.isRepeatErr = true;
    err.conf = conf;
    return err;
}

function getKey(conf: AxiosRequestConfig) {
    const key = (conf.baseURL || '') + conf.url + conf.method + JSON.stringify(conf.params)
        + JSON.stringify(conf.custom?.originalData || conf.data);
    return key;
}

// request interceptor
service.interceptors.request.use(
    (config) => {
        if (!config.headers) {
            config.headers = {};
        }
        console.log(config.custom, 'config--------bef');
        // 添加数据 s
        config.headers.userName = 'hilink';
        config.headers.passWord = 'hilink';
        if (!config.data) {
            config.data = {};
        }
        if (!config.params) {
            config.params = {};
        }
        // 添加数据 e
        console.log(config, 'config---------------');
        // 防止取值错误
        if (!config.custom) {
            config.custom = { ...defCustom };
        } else {
            config.custom = { ...defCustom, ...config.custom };
        }
        // 重复请求检查
        if (!config.custom.noCheckRepeat) {
            const key = getKey(config);
            console.log(key, 'key------------');
            // 重复了
            if (RepeatMap[key]) {
                // 这里的 return 会在 response  reject回调
                return Promise.reject(generateRepeatErr(config));
            }
            RepeatMap[key] = true;
            config.custom.key = key;
        }

        // 如果是使用使用表单上传， 对请求头 和 data 做处理
        if (config.custom.useFormData) {
            // 保留原始数据， 以供 重复请求检查 使用
            // eslint-disable-next-line no-underscore-dangle
            config.custom.originalData = config.data;
            config.headers['Content-Type'] = 'multipart/form-data';
            const formData = new FormData();
            const data = config.data || {};
            Object.keys(data)
                .forEach((key) => {
                    formData.append(key, data[key]);
                });
            config.data = formData;
        }

        // 判断是否 显示Loading
        if (config.custom.loading) {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
            });
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// response interceptor
service.interceptors.response.use(
    (response) => {
        let errStr = '';
        const { config } = response;
        const HttpCode = response.status;
        const ServerCode = response.data && response.data.code ? response.data.code : '';
        const res = response.data;
        // 判断是否 隐藏Loading
        if (config.custom?.loading) {
            // 关闭 loading 代码
            Toast.caller();
        }

        // 重复请求 s
        const key = config.custom?.key;
        if (key) {
            delete RepeatMap[key];
        }

        console.log(RepeatMap);
        // 重复请求 e

        if ((HttpCode >= 200 && HttpCode < 300) || HttpCode === 304) {
            // 这里的200 是与后台 约定
            if (ServerCode !== 200 && !response.config.custom?.noCheckServerCode) {
                errStr = res.msg || 'Service error';
            }
        } else {
            errStr = `Err Code： ${HttpCode}`;
        }

        if (errStr) {
            // 判断是否弹出错误提示
            if (!response.config.custom?.hideErrInfo) {
                // toast.showTips({
                //     txt: errStr,
                //     iconName: '',
                //     duration: 5 * 1000,
                // });
                Toast({
                    message: errStr,
                    duration: 5 * 1000,
                });
            }
            return Promise.reject(errStr);
        }
        // 后台返回什么，原样返回
        if (response.config.custom?.orgData) {
            return res;
        }
        // 因为 后台返回的数据套了一层， 所以为了防止每次都需要  res.data l来取值，所以这里直接返回需要的值
        return res.data;
    },
    (error) => {
        console.log(error, 'error----------这里应该不会进入了, 除了重复请求--');
        // 这里应该不会进入了, 除了重复请求
        console.log(error?.config?.custom?.hideErrInfo, 'error.conf.custom.hideErrInfo----------');

        // 重复请求 s
        const key = error?.config?.custom?.key;
        console.log(key, 'key------------------');
        if (key) {
            delete RepeatMap[key];
        }
        console.log(RepeatMap, 'RepeatMap');
        // 重复请求 e

        if (error.config && error.config?.custom?.hideErrInfo) {
            // pass
        } else {
            Toast({
                message: error.message,
                duration: 5 * 1000,
            });
        }
        return Promise.reject(error);
    },
);

export default service;

// jsonp 简单封装
export function jsonp(url: string, data: Record<string, any>) {
    return new Promise((resolve, reject) => {
        // 初始化url
        const dataString = url.indexOf('?') === -1 ? '?' : '&';
        const callbackName = `jsonpCB_${Date.now()}`;
        url += `${dataString}callback=${callbackName}`;
        if (data) {
            // 有请求参数，依次添加到url
            // eslint-disable-next-line guard-for-in,no-restricted-syntax
            for (const k in data) {
                url += `&${k}=${data[k]}`;
            }
        }
        const jsNode = document.createElement('script');
        jsNode.src = url;
        // 触发callback，触发后删除js标签和绑定在window上的callback
        // @ts-ignore
        window[callbackName] = (result) => {
            // @ts-ignore
            delete window[callbackName];
            document.body.removeChild(jsNode);
            if (result) {
                resolve(result);
            } else {
                reject(new Error('没有返回数据'));
            }
        };
        // js加载异常的情况
        jsNode.addEventListener(
            'error',
            () => {
                // @ts-ignore
                delete window[callbackName];
                document.body.removeChild(jsNode);
                reject(new Error('JavaScript资源加载失败'));
            },
            false,
        );
        // 添加js节点到document上时，开始请求
        document.body.appendChild(jsNode);
    });
}
