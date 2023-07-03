<template>
  <view :class="[
    `fixed bottom-0 flex flex-col justify-end top-0 left-0 right-0 bg-black bg-opacity-50 z-2 transition-all duration-300`,
    `opacity-0 pointer-events-none`
  ]" :style="{
  opacity: show ? '1' : '0',
  pointerEvents: show ? 'auto' : 'none'
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
        <text class="text-30rpx">选择月</text>
      </view>

      <view class="flex justify-start gap-30rpx items-center mt-50rpx mx-20rpx">
        <view class="px-30rpx py-16rpx rounded-sm bg-gray-500 bg-opacity-10" @click="last"
          :style="{ opacity: lastFlag ? '1' : '.5' }">
          <u-icon name="play-left-fill" size="10" color="#6C727F"></u-icon>
        </view>
        <view>
          <text class="text-30rpx text-gray-500">{{ year }}</text>
        </view>
        <view class="px-30rpx py-16rpx rounded-sm bg-gray-500 bg-opacity-10" @click="next"
          :style="{ opacity: nextFlag ? '1' : '.5' }">
          <u-icon name="play-right-fill" size="10" color="#6C727F"></u-icon>
        </view>
      </view>

      <view :class="[
        `grid grid-cols-5 mx-20rpx gap-30rpx mt-50rpx`,
        `${className}`
      ]">
        <view :class="[
          `h-80rpx rounded-md flex justify-center items-center`,
          activeMonth?.year === item.year && activeMonth?.month === item.month ? 'bg-emerald-500 bg-opacity-10 text-emerald-600' : 'bg-white'
        ]" v-for="(item, i) in monthArr" :key="i" :style="{ opacity: item.disabled ? '.3' : '1' }"
          @click="monthClick(item)">
          <text class="text-24rpx">{{ item.month }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/setting';
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';

const setting = useSettingStore()
let year = ref<number>(2023)
let activeMonth = ref<Month>()
let nextFlag = ref<boolean>(false)
let lastFlag = ref<boolean>(false)
let className = ref<string>('')
let show = ref<boolean>(false)

let monthArr = ref<Month[]>([])

const emit = defineEmits(['close'])

onMounted(() => {
  yearChange()
})

const showHandle = (yearAndMonth: string) => {
  let time = dayjs(yearAndMonth)
  activeMonth.value = {
    year: time.year(),
    month: time.month() + 1,
    disabled: false
  }
  show.value = true
}


const monthClick = (item: Month) => {
  if (item.disabled) return
  activeMonth.value = item
  closeHandle()
}

const closeHandle = () => {
  show.value = false
  emit('close', activeMonth.value)
}

const last = () => {
  if (!lastFlag.value) return
  className.value = 'animate-last-out'
  setTimeout(() => className.value = 'animate-last-in', 100)
  year.value -= 1

  yearChange()
}

const next = () => {
  if (!nextFlag.value) return
  className.value = 'animate-next-out'
  setTimeout(() => className.value = 'animate-next-in', 100)
  year.value += 1

  yearChange()
}

const yearChange = () => {
  lastFlag.value = year.value > 1999
  nextFlag.value = year.value < dayjs().year()

  monthArr.value = []
  for (let i = 1; i <= 12; i++) {
    monthArr.value.push({
      year: year.value,
      month: i,
      disabled: dayjs(year.value + '-' + i).isAfter(dayjs())
    })
  }
}

defineExpose({
  showHandle
})
</script>

<style lang="scss" scoped>
.animate-next-in {
  animation: aniNextIn 0.1s ease-in-out forwards;
}

@keyframes aniNextIn {
  0% {
    transform: translateX(10%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-next-out {
  animation: aniNextOut 0.1s ease-in-out forwards;
}

@keyframes aniNextOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(-10%);
    opacity: 0;
  }
}

.animate-last-in {
  animation: aniLastIn 0.1s ease-in-out forwards;
}

@keyframes aniLastIn {
  0% {
    transform: translateX(-10%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-last-out {
  animation: aniLastOut 0.1s ease-in-out forwards;
}

@keyframes aniLastOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(10%);
    opacity: 0;
  }
}
</style>
