import { defineComponent } from 'vue';
import { createComponent, unmountComponent } from './utils';
import TipsCom from './TipsCom.vue';

const componentConstructor = defineComponent(TipsCom as any);
// 创建一个变量接收创建的组件实例
let instance: any;
function show(options: any) {
    // 创建组件实例对象
    instance = createComponent(componentConstructor, options, null);
    // 添加到body
    document.body.appendChild(instance.vnode.el);
    console.log(instance, 'instance');
    instance.exposed.show();
    return instance;
}

function hide() {
    // eslint-disable-next-line no-unused-expressions
    instance && instance.exposed.hide();
}

export const TipsComponent = {
    show,
    hide,
};
