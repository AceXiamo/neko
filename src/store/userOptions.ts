import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const userOptionsStore = defineStore('userOptions', () => {

  let hasAiSay = ref<boolean>(!!uni.getStorageSync('hasAiSay'))

  watch(hasAiSay, (newVal, _) => {
    uni.setStorageSync('hasAiSay', newVal)
  })

  return { hasAiSay }
})
