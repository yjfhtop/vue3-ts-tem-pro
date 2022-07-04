import { tryStrParse } from '@/utils/tools';
import { LocalStorageKey } from '@/utils/publicKey';
// 这里对 localStorage 做一下扩展， 解决h5 setItem 无法存入 引用类型

export { localStorageKeyMap } from './publicKey';

/**
 * 获取 本地存储
 * @param key
 * @param tryPares  获取后是否尝试将获取的数据通过  JSON.parse() 处理
 * @returns {any}
 */
export function localGetItem<T = any>(key: LocalStorageKey, tryPares = true): T {
    if (key) {
        const str = localStorage.getItem(key);
        if (str === null) return null as any;
        if (tryPares) {
            return tryStrParse(str);
        }
        return str as any;
    }
    return null as any;
}

/**
 * 设置本地存储，
 * @param key
 * @param value
 * @param toStr 在写入之前，是否将数据 通过 JSON.stringify 处理后写入
 */
export function localSetItem(key: LocalStorageKey, value: any, toStr = true) {
    const saveValue = toStr ? JSON.stringify(value) : value;
    localStorage.setItem(key, saveValue);
}
