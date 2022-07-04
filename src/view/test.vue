<template>
    <div>
        <h1>测试</h1>
        <div>
            <h1 class="one-px">1px</h1>
        </div>

        <div class="test-item">
            <div class="test-title">图片测试</div>
            <div class="test-main">
                <img :src="path" />
            </div>
            <div>
                <SvgIcon name="loading"></SvgIcon>
            </div>
        </div>

        <div class="test-item">
            <div class="test-title">语言 和 主题切换</div>
            <div class="test-main">
                <div>
                    {{ $t('test') }}
                </div>
                <button @click="changeLang">点我切换语言</button>

                <button @click="changeTheme">点我切换主题</button>
            </div>
        </div>

        <div class="test-item">
            <div class="test-title">vant</div>
            <div class="test-main">
                <van-button type="primary">主要按钮</van-button>
                <button @click="showToast">点击显示 toast</button>
            </div>
        </div>

        <div class="test-item">
            <div class="test-title">自己的组件</div>
            <div class="test-main">
                <button @click="showMytips">showTips</button>
                <Tips
                    style="margin-left: 300px"
                    message="While part of the CSS Logical Properties specification, it does not define logical offsets. It defines physical offsets, regardless of the element's writing mode, directionality, and text orientation."
                ></Tips>
            </div>
        </div>

        <div class="test-item">
            <div class="test-title"></div>
            <div class="test-main"></div>
        </div>

        <div style="width: 90vw">
            <van-slider v-model="slidreV" range :min="1" :max="8" />
        </div>

        <div class="" style="height: 1000px"></div>
    </div>
</template>

<script setup lang="ts">
    import { Button, Toast, Slider } from 'vant';
    import { ref } from 'vue';
    import { UserModuleName, useStore } from '@/store';
    import { getThemeImg } from '@/setups/getImgPath';
    import { Lang, ThemeMode } from '@/store/types';
    import { TipsComponent } from '@/components/ExampleGlobal/TipsCom';
    import Tips from '@/components/Tips/Tips.vue';

    const store = useStore();
    const slidreV = ref<[number, number]>([1, 8]);

    const path = getThemeImg('1.png');

    function changeLang() {
        const nowLang = store[UserModuleName].showLang;
        if (nowLang === Lang.zhCN) {
            store[UserModuleName].userLang = Lang.enUK;
        } else {
            store[UserModuleName].userLang = Lang.zhCN;
        }
    }

    function changeTheme() {
        const nowTheme = store[UserModuleName].showThemeMode;
        // eslint-disable-next-line no-undef
        if (nowTheme === ThemeMode.light) {
            store[UserModuleName].userThemeMode = ThemeMode.dark;
        } else {
            store[UserModuleName].userThemeMode = ThemeMode.light;
        }
    }

    function showToast() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
        });
    }

    function showMytips() {
        TipsComponent.show({ message: 'sdfdsf' });
        setTimeout(() => {
            TipsComponent.hide();
        }, 1000);
    }
</script>

<style scoped lang="less">
    .one-px {
        padding-top: 1px;
    }
    .test-item {
        margin-bottom: 10px;
        border: 1px solid #000;
        padding: 5px;
        border-radius: 3px;
        .test-title {
            padding: 3px;
            font-size: 16px;
        }
        button {
            padding: 3px 4px;
            border: 1px solid var(--border-color-base);
            border-radius: 3px;
            margin-left: 3px;
            &:first-child {
                margin-left: 0;
            }
        }
    }
</style>
