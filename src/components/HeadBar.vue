<template>
  <view class="flex flex-col relative pb-20rpx" :style="{ backgroundColor: color }">
    <view :style="{ height: setting.topH + 'rpx' }"></view>
    <view :style="{ height: setting.capsuleH + 'rpx' }">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/setting';

const prop = defineProps({
  color: {
    type: String,
    default: 'white'
  }
})
const setting = useSettingStore()
</script>
