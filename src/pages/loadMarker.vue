<template>
    <div id="map_container">
        <el-button type="primary" @click="clickToShowInfo"
            >点击要素获取对应要素信息</el-button
        >
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initMap } from '@/mapLibs/initMap';
import { marker } from '@/mapLibs/marker';
let clickToShowInfo = ref();
onMounted(() => {
    const map = initMap('map_container');
    const coords = [
        [117.57054, 35.34],
        [117.94, 36.181],
        [119.9039, 36.7616],
        [118.754, 33.6899],
    ];
    clickToShowInfo.value = marker(map, coords);
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
