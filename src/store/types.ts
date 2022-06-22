// 客户端平台(android, iOS)
export enum Platform {
    android = 'android',
    iOS = 'iOS',
}

// "zhCN"代表中文，"enUK"代表英文，具体请查询国家语言代码表。
export enum Lang {
    zhCN = 'zhCN',
    enUK = 'enUK',
    system = 'system',
}

// 1表示正常模式，2表示深色模式。 3 跟随系统系统
export enum ThemeMode {
    light = 'light',
    dark = 'dark',
    system = 'system',
}

export interface DeviceStoreState {
    lang: Lang;
    // 主题模式， 系统的主题, 并不是页面的主题, // 真正使用的话 是使用 getters 的 useTheme
    themeMode: ThemeMode;
}

export interface UserStoreState {
    token: string,
    userLang: Lang,
    userThemeMode: ThemeMode
}
