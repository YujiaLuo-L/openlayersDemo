<template>
    <div id="map_container">
        <div class="wrap_btn">
            <el-button type="primary" @click="changeType('normal')"
                >读取需要遮蔽的蒙版外的Geojson文件</el-button
            >
            <el-button type="primary" @click="changeType('reverse')"
                >根据返回的区域出蒙版的范围</el-button
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import coverJson from '@/data/mapCover.json';
import { regionData } from '@/data/regionData';
import { onMounted } from 'vue';
import { addMask } from '@/mapLibs/addMask';
import { initMap } from '@/mapLibs/initMap';
let map: Record<string, any>;
let layer: Record<string, any>;
const { getDataByJson, getDataBydata } = addMask();
onMounted(() => {
    map = initMap('map_container');
});
function changeType(type: string) {
    // type: normal 按照蒙版范围 reverse：根据区域反选推算范围
    if (layer) {
        map.removeLayer(layer);
    }
    layer =
        type === 'normal'
            ? getDataByJson(coverJson)
            : getDataBydata(regionData.data);
    map.addLayer(layer);
}
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
