<template>
  <view class="fixed top-0 bottom-0 left-0 right-0 z-10 transition-all duration-300 flex flex-col justify-center items-center"
    :style="{
      opacity: show ? '1' : '0',
      pointerEvents: show ? 'auto' : 'none',
      backgroundColor: '#FCFCFF'
    }">
    <image class="h-400rpx w-400rpx -rotate-90" mode="aspectFit"
      src="https://image.qwq.link/images/2023/07/02/twitter___rizuNM__20230618-043915_1670290053376139271_gif.gif">
    </image>
  </view>
</template>

<script lang="ts" setup>
const prop = defineProps({
  show: {
    type: Boolean,
    default: true
  }
})
</script>

