import { defineStore } from 'pinia'
import { ref } from 'vue'

const key = "user"
export const useUserStore = defineStore('user', () => {
  
  let user = ref<User>(uni.getStorageSync(key) || {})

  const saveLoginRes = (value: User) => {
    user.value = value
    uni.setStorageSync(key, value)
  }

  const loginVerify = () => {
    return user.value && user.value.token
  }

  return { user, saveLoginRes, loginVerify }
})
