<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import HistoryBar from './HistoryBar.vue';
import SearchBar from './SearchBar.vue';
import CurrentWeather from './CurrentWeather.vue';
import HourlyForecast from './HourlyForecast.vue';
import { findPlace, showWeather, useWeatherStore } from '@/services/weather';

const wstore = useWeatherStore();

onMounted(() => {
  findPlace('').then(showWeather).then(result => {
    wstore.setCurrent(result);
  }).catch(() => {
    console.log('no location');
  });
});
</script>

<template>
  <HistoryBar />
  <SearchBar />
  <CurrentWeather />
  <HourlyForecast />
</template>
