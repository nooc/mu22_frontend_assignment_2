<script setup lang="ts">
import { ref } from 'vue';
import { useHistoryStore } from '@/services/history';
import { findPlace, getWeather, getForecast, useWeatherStore } from '@/services/weather';

// state stores
const wstore = useWeatherStore();
const hstore = useHistoryStore();
// timer ref
const timerId = ref<number>(0);
// input ref
const placeQuery = ref();

/**
 * Execute actual search using wearher service.
 */
function doSearch ():void {
  let value = placeQuery.value.value.trim() ?? '';
  if(value.length > 1) {
    findPlace(value)
    .then(place => {
        // add history if not already present
        hstore.addItem(place);
        return Promise.allSettled([
          getWeather(place).then(wstore.setWeather),
          getForecast(place).then(wstore.setForecast)
        ]);
    })
    .then(() => placeQuery.value.value='')
    .catch(() => {/* don't do anything*/ });
  }
}

/**
 * Handle blur event on input.
 * Clear any timer and executes search.
 * @param event 
 */
function handleBlur (event:Event):void {
  if(timerId.value != 0) { clearTimeout(timerId.value); }
  doSearch();
}

/**
 * Handle character input on input.
 * Clear any timer and start a new one.
 * When timeout reached, execute search.
 * @param event 
 */
function handleInput(event:Event) {
  if(timerId.value != 0) { clearTimeout(timerId.value); }
  timerId.value = setTimeout(doSearch, 2000);
}

/**
 * Handle submit.
 * Clear any timer and executes search.
 * @param event 
 */
function handleSubmit(event:Event) {
  if(timerId.value != 0) { clearTimeout(timerId.value); }
  doSearch();
}
</script>

<template>
  <form class="app-block" v-on:submit.prevent="handleSubmit">
    <span class="query-label">Loopup wearther:</span> <input ref="placeQuery" @blur="handleBlur" @input="handleInput" @submit="handleSubmit" placeholder="city" />
  </form>
</template>

<style scoped>
input {
  background-color: var(--color-background-soft);
  color: var(--color-text-clear);
  font-size: 1.3em;
  padding: 4px;
  border: 1px solid var(--color-border);
}
.query-label {
  font-weight: bold;
  color: var(--color-text-clear);
}
</style>
