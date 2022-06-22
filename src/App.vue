<script lang="ts" setup>
    import { computed, watch } from 'vue';
    import { UserModuleName, useStore } from '@/store';
    import i18n from '@/i18n';

    const store = useStore();

    const showLang = computed(() => store[UserModuleName].showLang);

    watch(showLang, (v) => {
        i18n.global.locale = v;
    });
</script>

<template>
    <router-view />
</template>

<style>
#app {
}
</style>
