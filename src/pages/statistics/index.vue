<template>
  <view
    :class="[
      `flex flex-col min-h-screen transition-all duration-400`,
      active === 'expenditure' ? 'bg-emerald-500' : 'bg-amber-500'
    ]"
  >
    <Head title="📉 统计"></Head>
    <view
      :class="[
        `py-20rpx flex flex-col gap-30rpx transition-all duration-400`,
        active === 'expenditure' ? 'bg-emerald-500' : 'bg-amber-500'
      ]"
    >
      <view class="ml-20rpx w-max flex-none active-opacity-50">
        <view class="flex items-center gap-10rpx">
          <text class="text-white te text-28rpx cursor-pointer" @click="showMonthSelector">{{ yearAndMonth }}</text>
          <view class="-translate-y-1rpx">
            <u-icon name="calendar-fill" color="#f9fafb" size="20"></u-icon>
          </view>
        </view>
      </view>
      <view class="px-20rpx flex gap-20rpx">
        <view
          :class="[
            `p-20rpx flex-none w-210rpx flex flex-col gap-20rpx  bg-opacity-10 rounded-md transition-all duration-400`,
            active === 'expenditure' ? 'bg-black' : ''
          ]"
          @click="changeActive('expenditure')"
        >
          <text class="text-white text-opacity-70 text-26rpx">支出</text>
          <view>
            <text class="text-34rpx text-white">{{ result.out || 0 }}</text>
            <text class="text-24rpx text-white ml-10rpx">元</text>
          </view>
        </view>
        <view
          :class="[
            `p-20rpx flex-none w-210rpx flex flex-col gap-20rpx  bg-opacity-10 rounded-md transition-all duration-400`,
            active === 'income' ? 'bg-black' : ''
          ]"
          @click="changeActive('income')"
        >
          <text class="text-white text-opacity-70 text-26rpx">收入</text>
          <view>
            <text class="text-34rpx text-white">{{ result.in || 0 }}</text>
            <text class="text-24rpx text-white ml-10rpx">元</text>
          </view>
        </view>
      </view>
    </view>

    <view class="flex-auto pt-20rpx pb-50rpx bg-gray-100 h-0 overflow-y-auto">
      <view class="bg-white mx-20rpx rounded-t-md px-20rpx pt-20rpx">
        <text class="text-28rpx">💦 构成</text>
      </view>
      <view class="mx-20rpx h-400rpx bg-white">
        <LEcharts ref="pieRef"></LEcharts>
      </view>
      <view class="rounded-b-md flex flex-col pt-20rpx bg-white mx-20rpx">
        <view
          class="flex items-center gap-20rpx active-bg py-20rpx px-30rpx"
          v-for="(item, index) in items"
          :key="index"
        >
          <view class="w-150rpx text-left text-24rpx truncate">{{ item.typeName }}</view>
          <view class="flex-auto relative flex items-center">
            <view class="h-12rpx w-full bg-gray-100 rounded-full absolute z-0"></view>
            <view
              class="h-12rpx w-0 min-w-15rpx bg-emerald-500 rounded-full absolute z-1 transition-all duration-200"
              :style="{ width: `${item.rate}%` }"
            ></view>
          </view>
          <view class="w-200rpx text-right">
            <text class="text-26rpx">{{ item.price }}</text>
            <text class="text-22rpx ml-5rpx">元</text>
          </view>
        </view>
      </view>
    </view>
  </view>

  <MonthSelector ref="monthSelector" @close="monthSelectorClose"></MonthSelector>
  <Toast ref="toast"></Toast>
</template>

<script setup lang="ts">
import Head from './components/Head.vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { statistics } from '@/api/bill'
import dayjs from 'dayjs'

let option = ref<any>({
  toolbox: {
    show: false
  },
  series: [
    {
      name: 'The From',
      type: 'pie',
      radius: ['10%', '55%'],
      itemStyle: {
        borderRadius: 2,
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        show: true,
        formatter: '{b} {d}%',
        fontSize: 10,
        color: '#94a3b8'
      },
      data: []
    }
  ]
})

type RankItem = {
  typeId?: number
  typeName?: string
  price?: number
  rate?: number
}

let items = ref<RankItem[]>([])

type ActiveType = 'expenditure' | 'income'
let active = ref<ActiveType>('expenditure')
let yearAndMonth = ref<string>(dayjs().format('YYYY-MM'))
let result = ref<BillStatisticsData>({})

let pieRef = ref()
onMounted(() => {
  pieRef.value.init(echarts, (chart: any) => {
    chart.setOption(option.value)
    loadData()
  })
})

const loadData = () => {
  statistics({ date: yearAndMonth.value }).then((res) => {
    result.value = res.data

    changeActive('expenditure')
  })
}

const rankHandle = (data: BillTypeData[]) => {
  items.value = []
  data.forEach((v) => {
    let item: RankItem = {}
    item.price = v.price
    item.typeId = v.typeId
    item.typeName = v.typeName

    items.value.push(item)
  })

  let max = Math.max(...items.value.map((item) => item.price!))
  items.value.forEach((v) => {
    v.rate = (v.price! / max) * 100
  })
}

const chartHandle = (data: BillTypeData[]) => {
  option.value.series[0].data = []

  data.forEach((v) => {
    let item: any = {}
    item.name = v.typeName
    item.value = v.price
    option.value.series[0].data.push(item)
  })

  pieRef.value.setOption(option.value)
}

const monthSelector = ref()

const showMonthSelector = () => {
  monthSelector.value.showHandle(yearAndMonth.value)
}

const monthSelectorClose = (time: Month) => {
  let day = `${time.year}-${time.month < 10 ? '0' + time.month : time.month}`
  if (day === yearAndMonth.value) return
  yearAndMonth.value = day

  loadData()
}

const changeActive = (type: ActiveType) => {
  active.value = type

  if (type === 'expenditure') {
    rankHandle(result.value.outDetail!)
    chartHandle(result.value.outDetail!)
  } else {
    rankHandle(result.value.inDetail!)
    chartHandle(result.value.inDetail!)
  }
}
</script>
