<template>
    <div class="tips-c" v-show="showTips">
        <div class="mantle-c"></div>
        <div class="tips-main" @click="updateLang">
            {{ props.message }}
            <SvgIcon name="loading"></SvgIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
    // 不要使用 createApp 来得到组件的实例
    import { ref } from 'vue';
    import { DeviceModuleName, useStore } from '@/store';
    import { Lang } from '@/store/types';

    const Store = useStore();

    interface Props {
        message: string;
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

    function updateLang() {
        Store[DeviceModuleName].lang = Lang.enUK;
    }

    console.log(Store[DeviceModuleName].lang, '--------');

    defineExpose({
        hide,
        show,
    });
</script>

<style scoped lang="less">
    .tips-c {
        .mantle-c {
            background-color: rgba(0, 0, 0 0.3);
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
            color: #000;
        }
    }
</style>
