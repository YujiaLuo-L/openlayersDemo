<template>
    <div id="map_container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { initMap } from '@/mapLibs/initMap';
import { marker } from '@/mapLibs/marker';
onMounted(() => {
    const map = initMap('map_container');
    const coords = [
        [117.57054, 35.34],
        [117.94, 36.181],
        [119.9039, 36.7616],
        [118.754, 33.6899],
    ];
    marker(map, coords);
});
</script>

<style lang="scss" scoped>
#map_container {
    width: 100%;
    height: 100%;
}
</style>
