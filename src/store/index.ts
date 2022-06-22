import { createPinia } from 'pinia';
import { UserModuleName, UserStore } from '@/store/modules/user';
import { DeviceModuleName, DeviceStore } from '@/store/modules/device';

export { UserModuleName, UserStore } from '@/store/modules/user';
export { DeviceModuleName, DeviceStore } from '@/store/modules/device';

const store = createPinia();
store.use((data) => {
    if (import.meta.env.MODE === 'development') {
        data.store.$subscribe(() => {
            // 在存储变化的时候执行
            console.log('%c next-store', 'color:#1661ab', store.state.value);
        });
    }
});

export function useStore() {
    return {
        [UserModuleName]: UserStore(),
        [DeviceModuleName]: DeviceStore(),
    };
}

export default store;
