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

        <div class="test-item">
            <div class="test-title">
                i18n测试
            </div>
            <div class="test-main">
                <div>
                    {{$t('test')}}
                </div>
                <button @click="changeLang">
                    点我切换语言
                </button>
            </div>
        </div>

        <div class="test-item">
            <div class="test-title">
                vant
            </div>
            <div class="test-main">
                <van-button type="primary">主要按钮</van-button>
                <button @click="showToast"> 点击显示 toast </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Toast, Button } from 'vant';
    import { UserModuleName, useStore } from '@/store';
    import { getThemeImg } from '@/setups/getImgPath';
    import { Lang } from '@/store/types';

    const store = useStore();

    const path = getThemeImg('1.png');

    function changeLang() {
        const nowLang = store[UserModuleName].showLang;
        if (nowLang === Lang.zhCN) {
            store[UserModuleName].userLang = Lang.enUK;
        } else {
            store[UserModuleName].userLang = Lang.zhCN;
        }
    }

    function showToast() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
        });
    }
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
