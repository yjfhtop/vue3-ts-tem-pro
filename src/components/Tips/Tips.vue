<template>
    <div class="tips-com" ref="tipsComDom" @click.stop="showTipsFun">
        <slot>
            <div class="basics-c">
                <SvgIcon name="loading"></SvgIcon>
            </div>
        </slot>

        <teleport to="body">
            <transition name="fade">
                <div v-show="showTips" ref="showTipsDom" class="tips-main" :style="tipCStyle">
                    <div class="tip-c">
                        {{ props.message }}
                    </div>
                    <div ref="symbolDom" class="symbol" :style="symbolStyle"></div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUpdated, onUnmounted, nextTick, watch } from 'vue';
    import { onBeforeRouteLeave } from 'vue-router';

    interface Props {
        message: string;
        spacing?: number;
        xMin?: number;
    }

    const props = withDefaults(defineProps<Props>(), {
        spacing: 0,
        xMin: 5,
    });

    const tipsComDom = ref<HTMLDivElement>();
    const showTipsDom = ref<HTMLDivElement>();
    const symbolDom = ref<HTMLDivElement>();
    const showTips = ref(false);
    const tipCStyle = ref<any>();
    const symbolStyle = ref<any>();

    function calcStyle() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const tipsComDomW = tipsComDom.value?.offsetWidth as number;
        const tipsComDomH = tipsComDom.value?.offsetHeight as number;
        const tipsComDomRect = tipsComDom.value?.getBoundingClientRect() as DOMRect;
        const tipsComDomPageTop = scrollTop + tipsComDomRect.top;
        const tipsComDomPageLeft = tipsComDomRect.left;
        const tipsComDomPageRight = tipsComDomRect.right;
        const tipsComDomPageXCenter = tipsComDomPageLeft + tipsComDomW / 2;
        const tipsComDomPageYCenter = tipsComDomPageLeft + tipsComDomH / 2;
        const viewW = window.innerWidth;
        const viewH = window.innerHeight;

        const showTipsDomRect = showTipsDom.value?.getBoundingClientRect();
        const showTipsDomH = showTipsDom.value?.offsetHeight as number;
        const showTipsDomW = showTipsDom.value?.offsetWidth as number;
        const symbolDomH = symbolDom.value?.offsetHeight as number;
        const symbolDomW = symbolDom.value?.offsetWidth as number;
        const tipCStyleObj: Partial<CSSStyleDeclaration> = {};
        const symbolStyleObj: Partial<CSSStyleDeclaration> = {};
        if (tipsComDomPageXCenter < viewW / 2) {
            // 向左靠
            tipCStyleObj.left = `${Math.max(
                props.xMin,
                tipsComDomPageXCenter - showTipsDomW / 2,
            )}px`;
            symbolStyleObj.left = `${
                tipsComDomPageXCenter - parseFloat(tipCStyleObj.left) - symbolDomW / 2
            }px`;
        } else {
            // 向右靠
            tipCStyleObj.right = `${Math.max(
                props.xMin,
                viewW - (tipsComDomPageXCenter + showTipsDomW / 2),
            )}px`;
            symbolStyleObj.right = `${
                viewW - tipsComDomPageXCenter - parseFloat(tipCStyleObj.right) - symbolDomW / 2
            }px`;
        }
        if (tipsComDomRect.top > showTipsDomH + props.spacing + symbolDomH) {
            // 在上
            tipCStyleObj.top = `${tipsComDomPageTop - showTipsDomH - props.spacing - symbolDomH}px`;
            symbolStyleObj.bottom = `${-symbolDomH}px`;
        } else {
            // 在下
            tipCStyleObj.top = `${tipsComDomPageTop + tipsComDomH + props.spacing + symbolDomH}px`;
            symbolStyleObj.top = `${-symbolDomH}px`;
            symbolStyleObj.transform = 'rotateZ(180deg)';
        }
        console.log(tipCStyleObj, symbolStyleObj);
        tipCStyle.value = tipCStyleObj;
        symbolStyle.value = symbolStyleObj;
    }

    function showTipsFun() {
        showTips.value = true;
        nextTick(() => {
            calcStyle();
        });
    }

    function hideTipsFun() {
        showTips.value = false;
    }

    function initEvent() {
        window.addEventListener('click', hideTipsFun);
    }
    function relieveEvent() {
        window.removeEventListener('click', hideTipsFun);
    }

    onMounted(() => {
        calcStyle();
        initEvent();
    });
    onUpdated(() => {
        calcStyle();
    });
    onUnmounted(() => {
        relieveEvent();
    });

    // watch()
    onBeforeRouteLeave(() => {
        hideTipsFun();
    });
</script>

<style scoped lang="less">
    .tips-com {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        .basics-c {
            //font-size: var(--txt-size-content1);
            display: flex;
            align-items: center;
            justify-content: center;
            //font-size: 0.8em;
        }
    }

    .tips-main {
        //position: fixed;
        position: absolute;
        background-color: var(--tips-bg);
        color: var(--txt-color-reverse-1);
        font-size: var(--txt-size-content1);
        padding: 8px 16px;
        border-radius: 16px;
        max-width: 48vw;
        z-index: 500;
        left: auto;
        top: auto;
        right: auto;
        bottom: auto;
        .tip-c {
            word-wrap: break-word;
        }
        .symbol {
            position: absolute;
            //top: -8px;
            //left: 50%;
            //transform: translateX(-50%);
            width: 0;
            height: 0;
            border-top: 8px solid var(--tips-bg);
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
        }
    }
</style>
