<template>
    <el-menu
        active-text-color="#409eff"
        background-color="#ecf5ff"
        text-color="#333"
        :router="true"
        :default-active="activeMenu"
    >
        <el-menu-item
            v-for="item in menuData"
            :key="item.name"
            :index="item.path"
        >
            <span>{{ item.meta.menuName }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import menu from '@/router/menu';
import { ref } from 'vue-demi';
let activeMenu = ref('');
const menuData = menu.filter((item) => {
    return item.path;
});
</script>

<style lang="scss" scoped>
::v-deep(.el-menu-item:hover) {
    background-color: #c9e4ff;
    color: #409eff;
}
</style>
