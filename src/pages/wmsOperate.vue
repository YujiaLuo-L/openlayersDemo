<template>
    <div id="map_container">
        <div class="wrap_btn">
            <el-button type="primary" @click="selectFeature">选择</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { initMap } from '@/mapLibs/initMap';
import { wmsOperate } from '@/mapLibs/wmsOperate';
let map: Record<string, any>;
let wmsLayer: Record<string, any>;
const { loadWmsLayer, handleWmsSelect, removeClick } = wmsOperate();
onMounted(() => {
    map = initMap('map_container');
    wmsLayer = loadWmsLayer('final_hdao');
    map.addLayer(wmsLayer);
});
function selectFeature() {
    const soure = wmsLayer.getSource();
    handleWmsSelect(map, soure);
}
onBeforeUnmount(() => {
    removeClick();
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
