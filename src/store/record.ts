import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useRecordStore = defineStore('record', () => {

  let data = ref<BillRecord>({})
  let images = ref<string[]>([])

  watch(data, (newVal, _) => {
    images.value = newVal.images ? JSON.parse(newVal.images) : []
  }, { deep: true })

  return { data, images }
})
