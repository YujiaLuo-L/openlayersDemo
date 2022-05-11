<template>
    <div id="map_container">
        <div class="wrap_btn">
            <el-button type="primary" @click="measureByType('distance')"
                >测距</el-button
            >
            <el-button type="primary" @click="measureByType('area')"
                >测面积</el-button
            >
            <el-button type="primary" @click="measureByType('clear')"
                >清除</el-button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initMap } from '@/mapLibs/initMap';
import { measure } from '@/mapLibs/measure';
let measureByType = ref();
onMounted(() => {
    const map = initMap('map_container');
    measureByType.value = measure(map);
});
</script>

<style lang="scss" scoped>
#map_container {
    width: 100%;
    height: 100%;
    position: relative;
    .wrap_btn {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 3;
    }
}
</style>
