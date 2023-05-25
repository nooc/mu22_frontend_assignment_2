import axios from 'axios';
import {computed, ref} from 'vue';
import type { IPlace } from '@/interface/internal';
import type { ForecastResponse } from '@/interface/openweathermap';
import { defineStore } from 'pinia';

export const geolocation = ref<GeolocationCoordinates>();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((results) => {
        geolocation.value = results.coords;
    });
}

export async function findPlace(query:string): Promise<IPlace> {
    if(query=='') {
        if(geolocation.value) {
            return {name:query, lat:geolocation.value.latitude, lon:geolocation.value.longitude};
        } else throw Error("No location");
    }
    // google geocode api
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyBwFiJoC8MYq9xhlcyfkon8swuBUnvBj5o`)
    .then(result => {
        if(result.data.status==='OK' && result.data.results.length>0) {
            let d = result.data.results[0];
            return {name:query,lat:d.geometry.location.lat,lon:d.geometry.location.lng};
        }
        throw Error("Not Found");
    });
}

export async function showWeather(place:IPlace): Promise<ForecastResponse> {
    // openweathermap current weather api
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&cnt=4&lat=${place.lat}&lon=${place.lon}&appid=e0144d5acdad3b680298494b264c5216`)
    .then(result => result.data);
}

// history api
export const useWeatherStore = defineStore('weather', () => {
    // history reference
    const forecastRef = ref<ForecastResponse>();
    
    /**
     * Set forecast.
     * @param forecast Search term.
     */
    function setCurrent(forecast:ForecastResponse) {
        forecastRef.value = forecast;
    }

    // Get forecast.
    const current = computed(() => forecastRef.value);
    // expoerts
    return { forecastRef, setCurrent, current }
  });
  