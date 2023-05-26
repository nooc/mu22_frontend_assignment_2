<script setup lang="ts">
import { useWeatherStore } from '@/services/weather';

// state store
const wstore = useWeatherStore();

function showTime(epoc:number) {
    return new Date(epoc*1000).toLocaleTimeString();
}
</script>

<template>
    <div class="app-block" v-if="wstore.forecast">
        <h2>Hourly Forecast</h2>
        <template v-for="(item,index) in wstore.forecast.list">
            <div class="hourly-forecast" :style="index % 2 === 0 ? 'background-color: #00000020':''">
                <div class="fc-time fc-center" v-html="showTime(item.dt)"></div>
                <img class="fc-image fc-center" :src="'https://openweathermap.org/img/wn/' + item.weather[0].icon + '.png'" alt="icon" />
                <div class="fc-temp fc-center">{{ item.main.temp.toFixed(1) }} ℃</div>
                <div class="fc-desc fc-center">{{ item.weather[0].description.toUpperCase() }}</div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.hourly-forecast {
    width: 100%;
    display:grid;
    justify-items: center;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    line-height: 1em;
}
.fc-center {
    display: flex;
    align-items: center;
}
.fc-time {
    grid-column: 1;
}
.fc-image {
    grid-column: 2;

}
.fc-temp {
    grid-column: 3;

}
.fc-desc {
    grid-column: 4;
    justify-self: left;
    font-size: medium;
}
</style>