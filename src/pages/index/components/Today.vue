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
          <text class="text-26rpx text-green-500 ml-5rpx">{{ recordStore.today.out }}</text>
        </view>
      </view>

      <view class="flex flex-col items-center gap-10rpx bg-gray-100 rounded-sm py-10rpx">
        <text class="text-26rpx text-gray-600">收入</text>
        <view class="">
          <text class="text-20rpx text-red-400">¥</text>
          <text class="text-26rpx text-red-500 ml-5rpx">{{ recordStore.today.in }}</text>
        </view>
      </view>

      <view class="flex flex-col items-center gap-10rpx bg-gray-100 rounded-sm py-10rpx">
        <view class="relative flex items-center gap-10rpx">
          <text class="text-26rpx text-gray-600 ml-10rpx">较昨天</text>
          <text class="text-green-500 text-20rpx">(支出)</text>
        </view>
        <view class="">
          <text class="text-20rpx" :style="{
            color: (recordStore.today.out - recordStore.lastDay.out) > 0 ? 'rgb(248, 113, 113)' : 'rgb(52, 211, 153)'
          }">{{ (recordStore.today.out - recordStore.lastDay.out) > 0 ? '+' : '-' }}</text>
          <text class="text-26rpx ml-5rpx" :style="{
            color: (recordStore.today.out - recordStore.lastDay.out) > 0 ? 'rgb(248, 113, 113)' : 'rgb(52, 211, 153)'
          }">{{ recordStore.today.out - recordStore.lastDay.out }}</text>
          <text class="text-20rpx text-red-400 ml-5rpx"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRecordStore } from '@/store/record';

const recordStore = useRecordStore()
</script>

