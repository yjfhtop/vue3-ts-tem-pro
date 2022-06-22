// 存储公共的key值， 比如 localStorage 或者是其他的值, 主要是避免魔法字符串

export interface LocalStorageKeyMap {
    token: 'Token',
    userInfo: 'UserInfo',
}
// localStorage 使用的key 值
export const localStorageKeyMap: LocalStorageKeyMap = {
    token: 'Token',
    userInfo: 'UserInfo',
};

export type LocalStorageKey = LocalStorageKeyMap [keyof LocalStorageKeyMap]
