<script setup lang="ts">
import { useWeatherStore } from '@/services/weather';

const wstore = useWeatherStore();
</script>

<template>
    <div class="app-block" v-if="wstore.current">
        <h2>Current Weather</h2>
        <div class="current-weather">
            <p>{{ wstore.current.city.name }}</p>
            <p>{{ wstore.current.message }}</p>
        </div>
    </div>
</template>

<style scoped>
.current-weather {
    width: 100%;
}
</style>
