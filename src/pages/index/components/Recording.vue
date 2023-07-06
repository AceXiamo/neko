<template>
  <view :class="[
    `recording-view fixed flex flex-col justify-end top-0 left-0 right-0 bg-black bg-opacity-50 z-2 transition-all duration-300`,
    `opaciry-0 pointer-events-none`
  ]" :style="{
  opacity: show ? '1' : '0',
  pointerEvents: show ? 'auto' : 'none',
  bottom: height > 0 ? `${height}rpx` : `0`
}" @click="closeHandle">
    <view :class="[
      `bg-gray-100 flex flex-col pt-20rpx transition-all duration-300`,
    ]" :style="{
  paddingBottom: setting.isAppleAndHasLine ? 'env(safe-area-inset-bottom)' : '20rpx',
  transform: show ? 'translateY(0)' : 'translateY(100%)'
}" @click.stop="showPicker = false">
      <view class="relative flex w-full justify-center items-center">
        <view class="absolute left-20rpx" @click="closeHandle">
          <u-icon name="close" color="#64748b"></u-icon>
        </view>
        <text class="text-30rpx">记一笔 🪶</text>
      </view>

      <view class="mt-50rpx mx-20rpx">
        <view class="text-26rpx flex w-max text-gray-400 gap-10rpx" @click.stop="showPicker = true">
          <text>{{
            dayjs(date).format('YYYY-MM-DD') }}</text>
          <u-icon name="arrow-down-fill" color="#00000020" size="10"></u-icon>
        </view>
        <u-datetime-picker :show="showPicker" v-model="date" :maxDate="today" mode="date" @cancel="showPicker = false"
          @confirm="showPicker = false" :itemHeight="35" confirmColor="#55B685"></u-datetime-picker>
      </view>

      <view class="border-1 border-gray-300 border-solid rounded-md mx-20rpx mt-20rpx p-15rpx">
        <textarea placeholder="记账是个好习惯捏 👏" v-model="form.chat" @focus="inputFocus" @blur="inputBlur"
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
        <view class="px-40rpx py-15rpx rounded-sm bg-emerald-600 bg-opacity-20 active-opacity-50" @click="confirm">
          <text class="text-26rpx text-emerald-600">提交</text>
        </view>
      </view>
    </view>
  </view>
  <Toast ref="toast"></Toast>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/setting';
import { ref } from 'vue';
import dayjs from 'dayjs';

const setting = useSettingStore()
const toast = ref()

let show = ref<boolean>(false)
let showPicker = ref<boolean>(false)
let today = dayjs().valueOf()
let date = ref<number>(dayjs().valueOf())

const showHandle = () => {
  show.value = true
}

const emit = defineEmits<{
  (e: 'confirm', form: RecordingForm): void
}>()

let form = ref<RecordingForm>({
  day: '',
  chat: ''
})

const closeHandle = () => {
  if (showPicker.value) {
    showPicker.value = false
    return
  }
  date.value = dayjs().valueOf()
  show.value = false
  form.value.chat = ''
}

let height = ref(0)

const inputFocus = (e: any) => {
  height.value = e.detail.height - 20
}

const inputBlur = () => {
  height.value = 0
}

const confirm = () => {
  if (!form.value.chat) {
    toast.value.show({
      type: 'error',
      text: '请填写记账内容'
    })
    return
  }
  form.value.day = dayjs(date.value).format('YYYY-MM-DD')
  emit('confirm', form.value)
  closeHandle()
}

defineExpose({
  showHandle: showHandle
})
</script>
