<template>
  <view :class="[
    `fixed flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 z-9 transition-all duration-300`,
    `opaciry-0 pointer-events-none`
  ]" :style="{ opacity: open ? '1' : '0' }">
    <view class="px-28rpx py-18rpx bg-white rounded-md text-26rpx flex items-center gap-10rpx">
      <u-icon v-if="message.type" :name="message.type === 'success' ? 'checkmark' : 'error-circle-fill'" :color="color(message.type)"></u-icon>
      <text>{{ message.text }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let message = ref<Message>({})
let open = ref<boolean>(false)
let timeout= ref()

type Message = {
  text?: string
  type?: 'success' | 'error' | 'warning' | 'info',
}

const show = (msg: string | Message) => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
  message.value = typeof msg === 'string' ? { text: msg } : msg
  open.value = true

  timeout.value = setTimeout(() => {
    open.value = false
  }, 2000)
}

const color = (type: string) => {
  if (type === 'success') {
    return '#22c55e'
  } else if (type === 'error') {
    return '#ef4444'
  } else if (type === 'warning') {
    return '#f97316'
  } else if (type === 'info') {
    return '#64748b'
  }
}

defineExpose({
  show
})
</script>
