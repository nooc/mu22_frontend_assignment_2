<script setup lang="ts">
import HistoryBar from './HistoryBar.vue';
import SearchBar from './SearchBar.vue';
import CurrentWeather from './CurrentWeather.vue';
import HourlyForecast from './HourlyForecast.vue';
import { useWeatherStore, SetInitialWeather } from '@/services/weather';

// state store
const wstore = useWeatherStore();
// try getting initial location from browser
SetInitialWeather(wstore);
</script>

<template>
  <HistoryBar />
  <SearchBar />
  <CurrentWeather />
  <HourlyForecast />
</template>
