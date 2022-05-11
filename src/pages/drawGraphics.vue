<template>
    <div id="map_container">
        <div class="wrap_btn">
            <el-button type="primary" @click="drawByType('Point')"
                >点</el-button
            >
            <el-button type="primary" @click="drawByType('LineString')"
                >线</el-button
            >
            <el-button type="primary" @click="drawByType('Polygon')"
                >面</el-button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initMap } from '@/mapLibs/initMap';
import { getDrawInter } from '@/mapLibs/getDrawInter';
let drawByType = ref();
onMounted(() => {
    const map = initMap('map_container');
    drawByType.value = getDrawInter(map);
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
