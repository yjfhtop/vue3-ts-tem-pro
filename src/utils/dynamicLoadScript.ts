// 参考 https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/Tinymce/dynamicLoadScript.js
interface CallbacksMap {
    [key: string]: Array<any>;
}
const callbacksMap: CallbacksMap = {};

// isOverFun 示例
// function loadedTinymce() {
//   return window.tinymce
// }

/**
 * 动态加载cnd 脚本
 * @param src cdn 地址
 * @param isOverFun 判断 脚本 是否加载完毕
 * @param callback 加载完毕后的回调函数
 */
const dynamicLoadScript = (
    src: string,
    isOverFun: () => boolean,
    // eslint-disable-next-line no-unused-vars
    callback: (...items: any[]) => void,
) => {
    const existingScript = document.getElementById(src);
    // eslint-disable-next-line func-names
    const cb = callback || function () {};

    let callbacks = callbacksMap[src];
    if (!callbacks) {
        callbacksMap[src] = [];
        callbacks = callbacksMap[src];
    }

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = src;
        script.id = src;
        document.body.appendChild(script);
        callbacks.push(cb);
        // eslint-disable-next-line no-use-before-define
        const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd;
        onEnd(script);
    }

    if (existingScript && cb) {
        // 判断有没有加载完毕
        if (isOverFun()) {
            cb();
        } else {
            callbacks.push(cb);
        }
    }

    function stdOnEnd(script: HTMLScriptElement) {
        // eslint-disable-next-line func-names
        script.onload = function () {
            // this.onload = null here is necessary
            // because even IE9 works not like others
            // eslint-disable-next-line no-multi-assign
            this.onerror = this.onload = null;
            // eslint-disable-next-line no-restricted-syntax,no-shadow
            for (const cb of callbacks) {
                cb(null, script);
            }
            callbacks = [];
        };
        // eslint-disable-next-line func-names
        script.onerror = function () {
            // eslint-disable-next-line no-multi-assign
            this.onerror = this.onload = null;
            cb(new Error(`Failed to load ${src}`), script);
        };
    }

    function ieOnEnd(script: any) {
        // eslint-disable-next-line func-names
        script.onreadystatechange = function () {
            if (this.readyState !== 'complete' && this.readyState !== 'loaded') return;
            this.onreadystatechange = null;
            // eslint-disable-next-line no-restricted-syntax,no-shadow
            for (const cb of callbacks) {
                cb(null, script); // there is no way to catch loading errors in IE8
            }
            callbacks = [];
        };
    }
};

export default dynamicLoadScript;

/**
 * 加载 VConsole, 注意,由于加载等是异步方法,会导致在加载之前的打印无法出现, 这里暂不使用
 * @param cbk
 */
// eslint-disable-next-line no-unused-vars
export function loadVConsole(cbk: (...items: any[]) => void) {
    if (import.meta.env.VITE_VCONSOLE) {
        dynamicLoadScript(import.meta.env.VITE_VCONSOLE_CDN, () => window.VConsole, cbk);
    }
}
