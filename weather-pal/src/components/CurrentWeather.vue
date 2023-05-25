<script setup lang="ts">
import { useWeatherStore } from '@/services/weather';

// state store
const wstore = useWeatherStore();
// shown extras with unit map
const extras = new Map<String,String>([['feels_like','℃'], ['pressure','hPa'],['humidity','%']]);
</script>

<template>
    <div class="app-block" v-if="wstore.weather">
        <h2>Current weather in {{ wstore.weather.name }}, {{ wstore.weather.sys.country }}</h2>
        <div class="current-weather">
            <img class="cw-image cw-center" :src="'https://openweathermap.org/img/wn/' + wstore.weather.weather[0].icon + '@2x.png'" alt="icon" />
            <div class="cw-temp cw-center">{{ wstore.weather.main.temp.toFixed(1) }} ℃</div>
            <div class="cw-desc cw-center">{{ wstore.weather.weather[0].description.toUpperCase() }}</div>
            <div class="cw-extra" v-for="(value, propertyName) in wstore.weather.main">
                <template v-if="extras.has(propertyName)">
                    <div class="extra-label">{{ propertyName }}:</div><div class="extra-value">{{ value.toFixed(0) }} {{ extras.get(propertyName) }}</div>
                </template>
            </div>

        </div>
    </div>
</template>

<style scoped>
.current-weather {
    width: 100%;
    display:grid;
    justify-items: center;
    grid-template-columns: repeat(4, minmax(0, 1fr));
}
.cw-center {
    display: flex;
    align-items: center;
}
.cw-image {
    grid-column: 1;
    grid-row: 1;

}
.cw-temp {
    grid-column: 2;
    grid-row: 1;
    font-size: xx-large;
}
.cw-desc {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row: 1;
    font-size: x-large;
}
.cw-extra {
    border-radius: 25px;
    grid-column-start: 3;
    grid-column-end: 5;
    font-size: large;
    display: grid;
    width: 100%;
    grid-template-columns: 0.5fr 0.5fr;
    background-color: #00000020;
}
.extra-label {
    grid-column: 1;
    text-align: end;
    margin-right: 10pt;
}
.extra-value {
    grid-column: 2;
}
</style>
