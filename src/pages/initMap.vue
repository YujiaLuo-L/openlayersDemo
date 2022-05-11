<template>
    <div id="map_container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { initMap } from '@/mapLibs/initMap';
onMounted(() => {
    const map = initMap('map_container');
});
</script>

<style lang="scss" scoped>
#map_container {
    width: 100%;
    height: 100%;
}
</style>
