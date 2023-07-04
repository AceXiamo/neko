import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecordStore = defineStore('record', () => {
  
  let data = ref<BillRecord>({})
  let today = ref<BillDayData>({
    day: '',
    out: 0,
    in: 0,
    details: []
  })
  let lastDay = ref<BillDayData>({
    day: '',
    out: 0,
    in: 0,
    details: []
  })

  return { data, today, lastDay }
})
