<script setup lang="ts">
import { ref } from 'vue';
import { useHistoryStore } from '@/services/history';
import { findPlace, showWeather, useWeatherStore } from '@/services/weather';

const wstore = useWeatherStore();
const hstore = useHistoryStore();
const timerId = ref<number>(0);
const placeQuery = ref();

function doSearch ():void {
  let value = placeQuery.value.value.trim() ?? '';
  if(value.length > 1) {
    findPlace(value).then(place => {
      if(place!=null) {
        hstore.addItem(place);
        return showWeather(place);
      }
    }).then(result => {
      if(result) {
        wstore.setCurrent(result);
        placeQuery.value.value='';
      }
    }).catch(() => {
      // don't do anything
    });
  }
}

function handleBlur (event:Event):void {
  if(timerId.value != 0) { clearTimeout(timerId.value); }
  doSearch();
}

function handleInput(event:Event) {
  if(timerId.value != 0) { clearTimeout(timerId.value); }
  timerId.value = setTimeout(doSearch, 2000);
}

function handleSubmit(event:Event) {
  if(timerId.value != 0) { clearTimeout(timerId.value); }
  doSearch();
}
</script>

<template>
  <form class="app-block" v-on:submit.prevent="handleSubmit">
    Search for city: <input ref="placeQuery" @blur="handleBlur" @input="handleInput" @submit="handleSubmit" placeholder="city" />
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
</style>
