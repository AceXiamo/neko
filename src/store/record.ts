import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecordStore = defineStore('record', () => {
  
  let data = ref<BillRecord>({})

  return { data }
})
