<script setup lang="ts">
import type { IPlace } from '@/interface/internal';
import { showWeather, useWeatherStore } from '@/services/weather';
import { useHistoryStore } from '@/services/history';

const wstore = useWeatherStore();
const hstore = useHistoryStore();
const props = defineProps<{item: IPlace}>();

function doSearch(evt:MouseEvent) {
    if(props.item) {
        showWeather(props.item)
        .then(result => {
            if(result) {
                hstore.addItem(props.item);
                wstore.setCurrent(result);
            }
        });
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