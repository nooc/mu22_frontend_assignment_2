<script setup lang="ts">

import HistoryItem from './HistoryItem.vue'
import { useHistoryStore } from '@/services/history';

const hstore = useHistoryStore();

</script>

<template>
  <div class="app-block">
    <h2>History</h2>
    <div class="hist-list">
      <HistoryItem v-for="hItem in hstore.items"
        :item=hItem />
    </div>
  </div>
</template>

<style scoped>
.hist-list {
  width: 100%;
  display: flex;
  gap: 20px;
}
</style>
