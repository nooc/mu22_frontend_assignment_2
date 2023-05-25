/**
 * Weather service using axios to call google api and openweather api.
 */
import axios from 'axios';
import { computed, ref } from 'vue';
import type { IPlace } from '@/interface/internal';
import type { ForecastResponse, WeatherResponse } from '@/interface/openweathermap';
import { defineStore } from 'pinia';

// browser location
const geolocation = ref<GeolocationCoordinates>();

/**
 * ind a place by query string.
 * Uses Google.
 * 
 * @param query Place query, eg. city and or street etc.
 * 
 * @returns Place promise.
 */
export async function findPlace(query: string): Promise<IPlace> {
    if (query == '') {
        if (geolocation.value !== undefined) {
            return { name: query, lat: geolocation.value.latitude, lon: geolocation.value.longitude };
        } else throw Error("No location");
    }
    // google geocode api
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${import.meta.env.VITE_GOOGLE_APIS_KEY}`)
        .then(result => {
            if (result.data.status === 'OK' && result.data.results.length > 0) {
                let d = result.data.results[0];
                return { name: query, lat: d.geometry.location.lat, lon: d.geometry.location.lng };
            }
            throw Error("No Results.");
        }).catch(reason => {console.log(reason); throw Error(reason);});
}

/**
 * Get forecast for given place.
 * Uses OpenWeather.
 * 
 * @param place Place to get forecast for.
 * @returns Forecast promise
 */
export async function getWeather(place: IPlace): Promise<WeatherResponse> {
    // openweathermap current weather api
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&cnt=4&lat=${place.lat}&lon=${place.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        .then(result => result.data)
        .catch(reason => console.log(reason));
}
export async function getForecast(place: IPlace): Promise<ForecastResponse> {
    // openweathermap current weather api
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&cnt=4&lat=${place.lat}&lon=${place.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        .then(result => result.data)
        .catch(reason => console.log(reason));
}

/**
 * Weather store.
 * Pinia store for global sharing of weather among components.
 */
export const useWeatherStore = defineStore('weather', () => {
    // history reference
    const weatherRef = ref<WeatherResponse>();
    const forecastRef = ref<ForecastResponse>();
    /**
     * Set weather instance.
     * @param forecast Search term.
     */
    function setWeather(weather: WeatherResponse) {
        weatherRef.value = weather;
    }
    /**
     * Set forecast instance.
     * @param forecast Search term.
     */
    function setForecast(forecast: ForecastResponse) {
        forecastRef.value = forecast;
    }
    // Getters
    const weather = computed(() => weatherRef.value);
    const forecast = computed(() => forecastRef.value);
    // Expoerts
    return { setWeather, setForecast, weather, forecast }
});

export function SetInitialWeather(store:any):void {

    // Get browser location if available.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((results) => {
            geolocation.value = results.coords;
            findPlace('')
            .then(place => {
                return Promise.allSettled([
                    getWeather(place).then(store.setWeather),
                    getForecast(place).then(store.setForecast)
                ]);
            })
            .catch(()=>{});
        });
    }
}