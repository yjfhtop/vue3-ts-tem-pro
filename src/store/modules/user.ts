import { defineStore } from 'pinia';
import { Lang, ThemeMode, UserStoreState } from '@/store/types';
import { DeviceStore } from '@/store/modules/device';

export const UserModuleName = 'UserModuleName';

export const UserStore = defineStore({
    id: UserModuleName,
    state: (): UserStoreState => ({
        token: '',
        userLang: Lang.system,
        userThemeMode: ThemeMode.system,
    }),
    getters: {
        // 界面使用的lang
        showLang: (state) => {
            if (state.userLang === Lang.system) {
                const deviceStore = DeviceStore();
                return deviceStore.lang;
            }
            return state.userLang;
        },
        showThemeMode: (state) => {
            if (state.userThemeMode === ThemeMode.system) {
                const deviceStore = DeviceStore();
                return deviceStore.themeMode;
            }
            return state.userThemeMode;
        },
    },
});
