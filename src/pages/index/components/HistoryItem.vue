<template>
  <view class="mx-20rpx rounded-md overflow-hidden bg-white flex flex-col">
    <view class="flex items-center bg-gray-100 p-20rpx">
      <text class="text-30rpx">{{ day.day }}</text>
      <view class="ml-auto flex gap-20rpx">
        <view class="flex items-center">
          <view class="w-26rpx h-26rpx rounded-sm text-green-500 border-1 border-solid flex justify-center items-center">
            <text class="text-22rpx">出</text>
          </view>
          <view>
            <text class="ml-10rpx text-20rpx">¥</text>
            <text class="ml-5rpx text-24rpx">200</text>
          </view>
        </view>
        <view class="flex items-center">
          <view class="w-26rpx h-26rpx rounded-sm text-red-500 border-1 border-solid flex justify-center items-center">
            <text class="text-22rpx">入</text>
          </view>
          <view>
            <text class="ml-10rpx text-20rpx">¥</text>
            <text class="ml-5rpx text-24rpx">200</text>
          </view>
        </view>
      </view>
    </view>
    <view class="bg-white flex flex-col p-20rpx gap-30rpx">
      <view class="flex items-start" v-for="(item, i) in day.detail" :key="i">
        <text class="rounded-sm px-12rpx py-6rpx bg-emerald-500 text-24rpx text-white">12:00</text>
        <view class="flex flex-col gap-5rpx mx-20rpx">
          <view class="flex gap-10rpx items-center">
            <text class="text-26rpx">{{ item.icon }}</text>
            <text class="text-26rpx">{{ item.desc }}</text>
          </view>
          <view class="text-22rpx text-gray-400">
            <text>{{ item.ai_say }}</text>
          </view>
          <view class="h-1rpx bg-gray-200 mt-30rpx" v-if="i < (day.detail.length - 1)"></view>
        </view>
        <view class="ml-auto text-28rpx">
          <text>¥</text>
          <text class="ml-5rpx">{{ item.price }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref } from 'vue'

type Day = {
  day: string
  detail: {
    icon: string
    price: string
    desc: string
    ai_say: string
    time: string
  }[]
}

const prop = defineProps({
  day: {
    type: Object as PropType<Day>,
    default: () => []
  }
})
</script>

