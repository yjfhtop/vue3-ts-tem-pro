<script lang="ts" setup>
    import { computed, watch } from 'vue';
    import { UserModuleName, useStore } from '@/store';
    import i18n from '@/i18n';
    import { setTheme } from '@/utils/operationDom';

    const store = useStore();

    const showLang = computed(() => store[UserModuleName].showLang);
    const showThemeMode = computed(() => store[UserModuleName].showThemeMode);

    watch(showLang, (v) => {
        i18n.global.locale = v;
    });

    watch(showThemeMode, (v) => {
        setTheme(v);
    });
</script>

<template>
    <router-view />
</template>

<style>
    #app {
    }
</style>
