/**
 * Search history service using pinia.
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IPlace } from '@/interface/internal';

const STORE_KEY = 'HistoryStore';
// history api
export const useHistoryStore = defineStore('history', () => {
  // history reference
  const historyRef = ref(new Array<IPlace>());
  // get saved state
  let jsonState = localStorage.getItem(STORE_KEY);
  if(jsonState != null) {
    let savedSearches = JSON.parse(jsonState);
    historyRef.value.push(...savedSearches);
  }

  /**
   * Add history.
   * No duplicates and max 3 items.
   * @param search Search term.
   */
  function addItem(item:IPlace) {
    for(let existing of historyRef.value) {
      if(item.name === existing.name) {
        return;
      }
    }
    // insert at 0
    historyRef.value.splice(0, 0, item);
    // trim to 3
    if(historyRef.value.length>3) {
      historyRef.value.splice(3, historyRef.value.length-3);
    }
    // persist history
    localStorage.setItem(STORE_KEY,JSON.stringify(historyRef.value));
  }
  // get history
  const items = computed(() => historyRef.value);
  // expoerts
  return { historyRef, addItem, items }
});
