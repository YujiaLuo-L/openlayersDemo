<template>
    <header>openlayers demo合集</header>
    <div class="container">
        <Menu></Menu>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<script setup lang="ts">
import Menu from '@/components/menu.vue';
</script>

<style lang="scss" scoped>
header {
    background-color: #f8fcfe;
    color: #333;
    font-size: 18px;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 8%);
}
.container {
    display: flex;
    height: calc(100% - 60px);
    main {
        flex: 1;
    }
}
::v-deep(.el-menu) {
    width: 250px;
}
</style>
