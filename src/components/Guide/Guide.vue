<template>
    <div
        class="guide-com"
        @click="nextStep"
        @touchmove.stop.prevent="touchmoveFun"
        @mousewheel.stop.prevent="touchmoveFun"
    >
        <div class="canvas-c">
            <canvas ref="canvasRefDom"></canvas>
        </div>
        <div class="step-c">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    // 引导页 canvas 实现
    // dom 实现参考 https://www.zhangxinxu.com/study/201112/radius-mask.html
    import { ref, computed, onMounted, nextTick } from 'vue';
    import { useStore } from '@/store';

    interface StepItem {
        // 矩形 尚未实现
        shape?: 'circular' | 'rectangle';
        r?: number;
        // 圆心, 相当于视口
        c?: { x: number; y: number };
        w?: number;
        h?: number;
    }

    interface Props {
        modelValue: number;
        steps: StepItem[];
        bgc?: string;
    }
    const props = withDefaults(defineProps<Props>(), {
        bgc: `rgba(0,0,0, 0.4)`,
    });
    const emit = defineEmits(['update:modelValue']);

    const canvasRefDom = ref<HTMLCanvasElement>();
    const elW = ref(0);
    const elH = ref(0);
    // 当前步骤  slot 里面的内容需要根据 modelValue 自己控制
    const nowStep = computed<number>({
        get() {
            return props.modelValue;
        },
        set(v) {
            emit('update:modelValue', v);
        },
    });

    function nextStep() {
        nowStep.value += 1;
    }

    function getCanvasHW() {
        const el = canvasRefDom.value as HTMLCanvasElement;
        elW.value = el.offsetWidth;
        elH.value = el.offsetHeight;
        el.width = elW.value;
        el.height = elH.value;
    }

    function touchmoveFun() {}

    // 绘制背景
    function drawBG() {
        getCanvasHW();
        const nowItem = props.steps[props.modelValue - 1];
        if (nowItem) {
            const el = canvasRefDom.value as HTMLCanvasElement;
            const ctx = el.getContext('2d');
            const elW = el.offsetWidth;
            const elH = el.offsetHeight;
            if (ctx) {
                ctx.save();
                ctx.fillStyle = props.bgc;
                // ctx.fillRect(0, 0, elW, elH);
                ctx.rect(0, 0, elW, elH);
                if (ctx && nowItem.shape === 'circular') {
                    const { c } = nowItem;
                    if (c) {
                        ctx.arc(c.x, c.y, nowItem.r as number, 0, Math.PI * 2, true);
                        ctx.fill();
                    }
                }
                ctx.restore();
                // todo 矩形待实现
            }
        }
    }

    onMounted(() => {
        nextTick(() => {
            drawBG();
        });
    });
</script>

<style scoped lang="less">
    .guide-com {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        .canvas-c {
            width: 100%;
            height: 100%;
            canvas {
                width: 100%;
                height: 100%;
            }
        }
        .step-c {
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 20;
        }
    }
</style>
