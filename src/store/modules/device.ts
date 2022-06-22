import { defineStore } from 'pinia';
import { DeviceStoreState, Lang, ThemeMode } from '@/store/types';

export const DeviceModuleName = 'DeviceModuleName';

export const DeviceStore = defineStore({
    id: DeviceModuleName,
    state: ():DeviceStoreState => ({
        lang: Lang.zhCN,
        themeMode: ThemeMode.light,
    }),
});
