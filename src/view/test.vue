<template>
    <div>
        <h1>测试</h1>
        <div>
            <h1 class="one-px">1px</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useStore } from '@/store';

    const store = useStore();
</script>

<style scoped lang="less">
.one-px {
    padding-top: 1px;
}
</style>
