import { defineComponent, reactive } from 'vue';
import { createComponent, unmountComponent } from './utils';
import ToastCom from './Toast.vue';

interface ToastProps {
    message?: string;
}

const componentConstructor = defineComponent(ToastCom as any);
const toastProps = reactive<ToastProps>({});
// 创建一个变量接收创建的组件实例
let instance: any;
function show(options: ToastProps) {
    Object.assign(toastProps, options);
    // 创建组件实例对象
    instance = createComponent(componentConstructor, toastProps, null);
    // 添加到body
    document.body.appendChild(instance.vnode.el);
    instance.exposed.show();
    return instance;
}

function hide() {
    instance && instance.exposed.hide();
    // if (instance) {
    //     unmountComponent(instance);
    // }
}

export const Toast = {
    show,
    hide,
};
