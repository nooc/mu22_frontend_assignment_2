<script setup lang="ts">
import { useWeatherStore } from '@/services/weather';

const wstore = useWeatherStore();
</script>

<template>
    <div class="app-block" v-if="wstore.current">
        <h2>Hourly Forecast</h2>
        <div class="hourly-row" v-for="(item,index) in wstore.current.list">
            <template v-if="index != 0">
                <p>{{ item.dt_txt }}</p>
                <p>{{ item.main.temp }} C</p>
            </template>
        </div>
    </div>
</template>

<style scoped>
.hourly-row {
    width: 100%;
}
</style>