<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <div class="app-logo">WeatherPal</div>
    <nav class="app-nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style>

.app-header {
  background-image: url("@/assets/wp-header-bg.webp");
  background-size: cover;
  height: 60px;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: #002255;
}
.app-nav {
  flex-grow: 2;
}
.app-nav a {
  margin-right: 10pt;
  color: #002255;
  font-weight: bold;
}
a.router-link-active {
  color: #00225580;
}
.app-logo {
  flex-grow: 1;
  display: inline-block;
  font-family: LeckerliOne;
  font-size: 2.6em;
  padding-left: 5pt;
}
</style>
