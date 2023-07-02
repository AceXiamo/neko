<template>
  <view class="flex flex-col bg-white gap-10rpx p-20rpx rounded-sm mx-20rpx">
    <view class="flex items-center gap-5rpx">
      <text class="text-28rpx">🌈</text>
      <text class="text-30rpx">Today</text>
    </view>

    <view class="grid grid-cols-3 gap-10rpx">
      <view class="flex flex-col items-center gap-10rpx bg-gray-100 rounded-sm py-10rpx">
        <text class="text-26rpx text-gray-600">支出</text>
        <view class="">
          <text class="text-22rpx text-green-400">¥</text>
          <text class="text-26rpx text-green-500 ml-5rpx">56</text>
        </view>
      </view>

      <view class="flex flex-col items-center gap-10rpx bg-gray-100 rounded-sm py-10rpx">
        <text class="text-26rpx text-gray-600">收入</text>
        <view class="">
          <text class="text-20rpx text-red-400">¥</text>
          <text class="text-26rpx text-red-500 ml-5rpx">56</text>
        </view>
      </view>

      <view class="flex flex-col items-center gap-10rpx bg-gray-100 rounded-sm py-10rpx">
        <view class="relative flex items-center gap-10rpx">
          <text class="text-26rpx text-gray-600 ml-10rpx">较昨天</text>
          <text class="text-green-500 text-20rpx">(支出)</text>
        </view>
        <view class="">
          <text class="text-20rpx text-red-400">+</text>
          <text class="text-26rpx text-red-500 ml-5rpx">100</text>
          <text class="text-20rpx text-red-400 ml-5rpx">%</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let item = ref({
  "icon": "☕️",
  "price": "20",
  "desc": "一杯咖啡",
  "ai_say": "喝杯咖啡提提神，但这价格稍微有点贵了哦！",
  "time": "12:00"
})
</script>

