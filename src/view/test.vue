<template>
    <div>
        <h1>测试</h1>
        <div>
            <h1 class="one-px">1px</h1>
        </div>

        <div class="test-item">
            <div class="test-title">
                图片测试
            </div>
            <div class="test-main">
                <img :src="path">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useStore } from '@/store';
    import { getThemeImg } from '@/setups/getImgPath';

    const store = useStore();

    const path = getThemeImg('d1.png');
</script>

<style scoped lang="less">
    .one-px {
        padding-top: 1px;
    }
    .test-item {
        margin-bottom: 5px;
        .test-title {
            padding: 3px;
            font-size: 16px;
        }
    }
</style>
