<template>
  <view class="flex flex-col min-h-screen bg-emerald-500">

    <Head></Head>
    <view class="flex flex-col gap-20rpx pb-20rpx shadow-md z-1">
      <Today :today="today"></Today>
      <view class="flex mx-20rpx items-center">
        <view class="flex items-center gap-10rpx">
          <text class="text-white text-28rpx active-opacity-50 cursor-pointer" @click="showMonthSelector">{{ yearAndMonth
          }}</text>
          <u-icon name="arrow-down-fill" color="#FFFFFF80" size="10"></u-icon>
        </view>
        <view class="ml-auto flex gap-20rpx text-white">
          <view class="text-24rpx">
            <text>总支出</text>
            <text class="ml-5rpx">¥</text>
            <text>{{ monthData.out }}</text>
          </view>
          <view class="text-24rpx">
            <text>总入账</text>
            <text class="ml-5rpx">¥</text>
            <text>{{ monthData.in }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="flex-auto h-0 overflow-y-auto bg-gray-200 pt-20rpx flex flex-col gap-20rpx" :style="{
      paddingBottom: setting.isAppleAndHasLine ? 'env(safe-area-inset-bottom)' : '20rpx',
    }">
      <HistoryItem v-for="(item, i) in monthData.days" :key="i" :day="item"></HistoryItem>
    </view>
  </view>

  <Loading :show="loading"></Loading>
  <view class="fixed bottom-100rpx right-50rpx flex flex-col gap-20rpx items-end">
    <view @click="toQuestion"
      class="p-20rpx rounded-full shadow-md flex justify-center w-max items-center bg-gray-500 bg-opacity-15">
      <u-icon name="question" size="14" color="#9ca3af"></u-icon>
    </view>
    <view @click="showStatistics"
      class="px-30rpx py-16rpx rounded-full shadow-md flex justify-center gap-10rpx items-center bg-cyan-500 bg-opacity-15">
      <u-icon name="coupon" size="14" color="#06b6d4"></u-icon>
      <text class="text-cyan-500 text-26rpx">统计</text>
    </view>
    <view @click="showRecording"
      class="px-30rpx py-16rpx rounded-full shadow-md flex justify-center gap-10rpx items-center bg-emerald-500 bg-opacity-15">
      <u-icon name="attach" size="14" color="#55B685"></u-icon>
      <text class="text-emerald-500 text-26rpx">记一笔</text>
    </view>
  </view>
  <MonthSelector ref="monthSelector" @close="monthSelectorClose"></MonthSelector>
  <Recording ref="recording" @confirm="recordingConfirm"></Recording>
  <Toast ref="toast"></Toast>
</template>

<script setup lang="ts">
import Head from './components/Head.vue'
import Today from './components/Today.vue';
import HistoryItem from './components/HistoryItem.vue';
import Recording from './components/Recording.vue';
import { ref, onMounted } from 'vue'
import { useSettingStore } from '@/store/setting';
import { onShareAppMessage, onShareTimeline, onShow } from '@dcloudio/uni-app';
import { loginVerify, loginHandle } from "@/ts/global";
import { listForMonth, save, todayData } from "@/api/bill";
import { useRecordStore } from '@/store/record';
import dayjs from 'dayjs';

const toast = ref()
const recordStore = useRecordStore()
const setting = useSettingStore()
let loading = ref<boolean>(true)
let yearAndMonth = ref<string>(dayjs().format('YYYY-MM'))
let monthData = ref<BillMonthData>({})
let today = ref<BillToDayData>({
  in: 0,
  out: 0,
  withLastDay: 0
})

onMounted(async () => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

onShow(async () => {
  if (!loginVerify()) {
    await loginHandle()
  }

  load()
})

const load = () => {
  loadMonthData()
  loadTodayData()
}

const loadTodayData = () => {
  todayData().then(res => {
    today.value = res.data
  }).catch(() => {
    toast.value.show({
      text: '连接超时，请稍后再试',
      type: 'error'
    })
  })
}

const loadMonthData = () => {
  listForMonth({ month: yearAndMonth.value }).then(res => {
    monthData.value = res.data
  }).catch(() => {
    toast.value.show({
      text: '连接超时，请稍后再试',
      type: 'error'
    })
  })
}

onShareAppMessage(() => {
  return {
    title: '🐱 Neko记账',
    path: '/pages/index/index',
    imageUrl: 'https://image.qwq.link/images/2023/06/03/FwavAh0aMAk60Tp.jpg'
  }
})

onShareTimeline(() => {
  return {
    title: '🐱 Neko记账',
    path: '/pages/index/index',
    imageUrl: 'https://image.qwq.link/images/2023/06/03/FwavAh0aMAk60Tp.jpg'
  }
})

const monthSelector = ref()

const showMonthSelector = () => {
  monthSelector.value.showHandle(yearAndMonth.value)
}

const monthSelectorClose = (time: Month) => {
  let day = `${time.year}-${time.month < 10 ? '0' + time.month : time.month}`
  if (day === yearAndMonth.value) return
  yearAndMonth.value = day
  loadMonthData()
}

const recording = ref()

const showRecording = () => {
  recording.value.showHandle()
}

const recordingConfirm = (form: RecordingForm) => {
  uni.showLoading()
  save(form).then(() => {
    load()
  }).then(() => {
    uni.hideLoading()
  }).catch(() => {
    toast.value.show({
      text: '和某不知名服务间的通信发生错误，请重试 🥲',
      type: 'error'
    })
  })
}

const toQuestion = () => {
  uni.navigateTo({
    url: '/pages/question/index'
  })
}

const showStatistics = () => {
  uni.navigateTo({
    url: '/pages/statistics/index'
  })
}
</script>
