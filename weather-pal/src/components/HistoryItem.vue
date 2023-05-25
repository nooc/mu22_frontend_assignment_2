<script setup lang="ts">
import type { IPlace } from '@/interface/internal';
import { getWeather, getForecast, useWeatherStore } from '@/services/weather';
import { useHistoryStore } from '@/services/history';

// state stores
const wstore = useWeatherStore();
const hstore = useHistoryStore();
// item props
const props = defineProps<{item: IPlace}>();

/**
 * Execute history button search. 
 * @param evt 
 */
function doSearch(evt:MouseEvent) {
    if(props.item) {
        getWeather(props.item)
        .then(result => {
                hstore.addItem(props.item);
                wstore.setWeather(result);
        });
        getForecast(props.item)
        .then(wstore.setForecast);
    }
}
</script>

<template>
    <button class="hist-item" @click="doSearch">{{ item.name }}</button>
</template>

<style scoped>
.hist-item {
    width: calc((100% / 3) - 60px);
    display: inline;
    padding: 0.3em;
    border: 1px solid var(--color-border);
    text-align: center;
}
</style>