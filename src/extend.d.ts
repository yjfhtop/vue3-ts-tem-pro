// 来扩展一些 模块
import axios, { AxiosRequestHeaders } from 'axios';

// 扩展axios 的配置项
declare module 'axios' {
    export interface AxiosRequestConfig {
        custom?: {
            // loading 是否显示loading   def:f
            loading?: boolean;
            // useFormData 是否显示是否使用表单上传 def: f
            useFormData?: boolean;
            // hideErrInfo 请求错误是否隐藏 def: f
            hideErrInfo?: boolean;
            // noCheckServerCode 不校验后台返回的状态码（非http状态码） def: f
            noCheckServerCode?: boolean;
            // orgData: 后台返回 的数据直接返回
            orgData?: boolean;
            // originalData  请求 原始数据
            originalData?: any;
            // noCheckRepeat 不检测 重复, def: f
            noCheckRepeat?: boolean;
            key?: string;
        };
    }
}
