<template>
    <div class="tips-c" v-show="showTips">
        <div class="mantle-c">

        </div>
        <div class="tips-main">
            {{props.message}}
        </div>
    </div>
</template>

<script setup lang="ts">
    // 不要使用 createApp 来得到组件的实例
    import { ref, onUnmounted, onMounted } from 'vue';
    import { useStore } from '@/store';

    interface Props {
        message: string
    }
    const props = withDefaults(defineProps<Props>(), {
        message: '信息!!!',
    });

    const showTips = ref(false);

    function hide() {
        showTips.value = false;
    }
    function show() {
        showTips.value = true;
    }

    function show222() {

    }

    defineExpose({
        hide,
        show,
    });
</script>

<style scoped lang="less">
    .tips-c {
        .mantle-c {
            background-color: rgba(0,0,0 0.3);
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 999;
        }

        .tips-main {
            padding: 10px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%);
            background-color: #fff;
            z-index: 1200;
            color: #ccc;
        }
    }
</style>
