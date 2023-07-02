<template>
  <view class="flex flex-col min-h-screen bg-emerald-500">

    <Head></Head>
    <view class="flex flex-col gap-20rpx pb-20rpx shadow-md z-1">
      <Today></Today>
      <view class="flex mx-20rpx items-center">
        <view class="flex items-center gap-10rpx">
          <text class="text-white text-28rpx active-opacity-50" @click="showMonthSelector = true">{{ yearAndMonth
          }}</text>
          <u-icon name="arrow-down-fill" color="#FFFFFF80" size="10"></u-icon>
        </view>
        <view class="ml-auto flex gap-20rpx text-24rpx text-white">
          <view class="">
            <text>总支出</text>
            <text class="ml-5rpx">¥</text>
            <text>100</text>
          </view>
          <view class="">
            <text>总入账</text>
            <text class="ml-5rpx">¥</text>
            <text>1000</text>
          </view>
        </view>
      </view>
    </view>
    <view class="flex-auto h-0 overflow-y-auto bg-gray-200 pt-20rpx flex flex-col gap-20rpx" :style="{
        paddingBottom: setting.isAppleAndHasLine ? 'env(safe-area-inset-bottom)' : '20rpx',
      }">
      <HistoryItem :day="{ day: '07-01', detail: detail }"></HistoryItem>
      <HistoryItem :day="{ day: '06-30', detail: detail }"></HistoryItem>
      <HistoryItem :day="{ day: '06-29', detail: detail }"></HistoryItem>
      <HistoryItem :day="{ day: '06-28', detail: detail }"></HistoryItem>
      <HistoryItem :day="{ day: '06-27', detail: detail }"></HistoryItem>
    </view>
  </view>
  <MonthSelecor :show="showMonthSelector" :selected="yearAndMonth" @close="monthSelectorClose"></MonthSelecor>
</template>

<script setup lang="ts">
import Head from './components/Head.vue'
import Today from './components/Today.vue';
import HistoryItem from './components/HistoryItem.vue';
import { ref } from 'vue'
import { useSettingStore } from '@/store/setting';

const setting = useSettingStore()

let detail = ref([
  {
    "icon": "☕️",
    "price": "20",
    "desc": "一杯咖啡",
    "ai_say": "喝杯咖啡提提神，但这价格稍微有点贵了哦！",
    "time": "12:00"
  },
  {
    "icon": "🍰",
    "price": "34",
    "desc": "甜点",
    "ai_say": "嗯，吃甜点可是个不错的享受！不过这次的甜点有点小贵呢，下次可以考虑其他选择。",
    "time": "13:00"
  },
  {
    "icon": "💧",
    "price": "2",
    "desc": "矿泉水",
    "ai_say": "矿泉水是个好选择，保持身体 hydrated！而且价格也非常合理。",
    "time": "14:00"
  }
])

let yearAndMonth = ref<string>('2023-07')
let showMonthSelector = ref<boolean>(false)
const monthSelectorClose = (time: Month) => {
  showMonthSelector.value = false
  yearAndMonth.value = `${time.year}-${time.month < 10 ? '0' + time.month : time.month}`
}
</script>
