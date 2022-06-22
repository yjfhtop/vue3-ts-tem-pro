import { defineStore } from 'pinia';
import {
    UserStoreState,
} from '@/store/types';

export const UserModuleName = 'UserModuleName';

export const DeviceStore = defineStore({
    id: UserModuleName,
    state: ():UserStoreState => ({
        token: '',
    }),
});
