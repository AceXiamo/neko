<template>
  <view
    class="recording-view fixed flex flex-col justify-end top-0 left-0 right-0 bg-black bg-opacity-50 z-2 transition-all duration-300"
    :style="{
      opacity: show ? '1' : '0',
      pointerEvents: show ? 'auto' : 'none',
      bottom: height > 0 ? `${height}rpx` : `0`
    }" @click="closeHandle">
    <view :class="[
      `bg-gray-100 flex flex-col pt-20rpx transition-all duration-300`,
    ]" :style="{
  paddingBottom: setting.isAppleAndHasLine ? 'env(safe-area-inset-bottom)' : '20rpx',
  transform: show ? 'translateY(0)' : 'translateY(100%)'
}" @click.stop>
      <view class="relative flex w-full justify-center items-center">
        <view class="absolute left-20rpx" @click="closeHandle">
          <u-icon name="close" color="#64748b"></u-icon>
        </view>
        <text class="text-30rpx">记一笔 🪶</text>
      </view>
      <view class="border-1 border-gray-300 border-solid rounded-md mx-20rpx mt-50rpx p-20rpx">
        <textarea placeholder="虽然 Don't save your money, 但是记账是个好习惯捏 👍" @focus="inputFocus" @blur="inputBlur"
          class="text-24rpx h-100rpx w-full"></textarea>
      </view>
      <view class="flex flex-col mx-20rpx mt-30rpx gap-10rpx">
        <view class="flex items-center">
          <text class="text-26rpx">🍥 tips:</text>
        </view>
        <view class="flex items-center gap-5rpx">
          <text>.</text>
          <text class="text-24rpx text-gray-500">告诉 AI 你花钱做了什么</text>
        </view>
        <view class="flex items-center gap-5rpx">
          <text>.</text>
          <text class="text-24rpx text-gray-500">就像 ` 买了一瓶可乐花了3块 `</text>
        </view>
        <view class="flex items-center gap-5rpx">
          <text>.</text>
          <text class="text-24rpx text-gray-500">或者 ` 今天买彩票中了 500w 😱 `</text>
        </view>
      </view>
      <view class="flex justify-end mt-60rpx mx-20rpx">
        <view class="px-40rpx py-15rpx rounded-sm bg-emerald-600 bg-opacity-30">
          <text class="text-26rpx text-emerald-600">提交</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/setting';
import { ref, onMounted } from 'vue';

const setting = useSettingStore()

let monthArr = ref<Month[]>([])
let show = ref<boolean>(false)

const showHandle = () => {
  show.value = true
}

const emit = defineEmits(['close'])

const closeHandle = () => {
  show.value = false
  emit('close')
}

let height = ref(0)

const inputFocus = (e: any) => {
  height.value = e.detail.height - 20
}

const inputBlur = () => {
  height.value = 0
}

defineExpose({
  showHandle: showHandle
})
</script>
