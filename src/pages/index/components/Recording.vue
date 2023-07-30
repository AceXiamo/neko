<template>
  <view
    :class="[
      `recording-view fixed flex flex-col justify-end top-0 left-0 right-0 bg-black bg-opacity-50 z-2 transition-all duration-300`,
      `opaciry-0 pointer-events-none`
    ]"
    :style="{
      opacity: show ? '1' : '0',
      pointerEvents: show ? 'auto' : 'none',
      bottom: height > 0 ? `${height}rpx` : `0`
    }"
    @click="closeHandle"
  >
    <view
      :class="[`bg-gray-100 flex flex-col pt-20rpx transition-all duration-300`]"
      :style="{
        paddingBottom: setting.isAppleAndHasLine ? 'env(safe-area-inset-bottom)' : '20rpx',
        transform: show ? 'translateY(0)' : 'translateY(100%)'
      }"
      @click.stop="showPicker = false"
    >
      <view class="relative flex w-full justify-center items-center">
        <view class="absolute left-20rpx" @click="closeHandle">
          <u-icon name="close" color="#64748b"></u-icon>
        </view>
        <text class="text-30rpx">记一笔 🪶</text>
      </view>

      <view class="mt-50rpx mx-20rpx flex items-center">
        <view class="text-26rpx flex w-max text-gray-400 gap-10rpx" @click.stop="showPicker = true">
          <text>{{ dayjs(date).format('YYYY-MM-DD') }}</text>
          <u-icon name="arrow-down-fill" color="#00000020" size="10"></u-icon>
        </view>
        <u-datetime-picker
          :show="showPicker"
          v-model="date"
          :maxDate="today"
          mode="date"
          @cancel="showPicker = false"
          @confirm="showPicker = false"
          :itemHeight="35"
          confirmColor="#55B685"
        ></u-datetime-picker>

        <view class="flex items-center gap-20rpx ml-auto">
          <view class="bg-white px-10rpx py-7rpx rounded-1">
            <text class="text-20rpx ext-gray-600">🤖 Ai Say</text>
          </view>
          <view>
            <u-switch
              size="15"
              space="2"
              v-model="userOptions.hasAiSay"
              activeColor="#f9ae3d"
              inactiveColor="rgb(230, 230, 230)"
            >
            </u-switch>
          </view>
        </view>
      </view>

      <view class="border-1 border-gray-300 border-solid rounded-md mx-20rpx mt-20rpx p-15rpx">
        <textarea
          placeholder="记账是个好习惯捏 👏"
          v-model="form.chat"
          @focus="inputFocus"
          @blur="inputBlur"
          class="text-24rpx h-100rpx w-full"
        ></textarea>
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

      <view class="grid grid-cols-3 mx-20rpx gap-20rpx mt-30rpx">
        <view
          :class="[
            `bg-gray-200 bg-opacity-50 aspect-square rounded-md flex justify-center items-center cursor-default select-none relative overflow-hidden`,
            `animate__animated animate__fadeInLeft animate-duration-500`
          ]"
          v-for="(item, index) in images"
          :key="index"
          @click="uploadHandle(item)"
        >
          <!-- add icon -->
          <view
            :class="[
              item.status != 'wait' && 'animate__animated animate__fadeOutDown',
              `animate-duration-600 absolute`
            ]"
          >
            <u-icon name="plus" size="16" color="#d1d5db"></u-icon>
          </view>

          <!-- uploading icon -->
          <view
            :class="[
              item.status === 'run'
                ? 'animate__animated animate__fadeInDown block'
                : 'animate__animated animate__fadeOutUp hidden',
              `animate-duration-600 absolute`
            ]"
          >
            <view class="animate__animated animate__swing animate__infinite">
              <u-icon name="arrow-upward" size="16" color="#26B981"></u-icon>
            </view>
          </view>

          <!-- image container -->
          <view
            :class="[
              item.status === 'finish'
                ? 'animate__animated animate__fadeIn block'
                : 'animate__animated animate__fadeOut hidden',
              `absolute top-0 left-0 w-full h-full animate-duration-300`
            ]"
          >
            <image @click.stop="viewImage(item.url)" :src="fileUrlReplace(item.url)" v-if="item.url" mode="aspectFill" class="w-full h-full"></image>
            <view
              class="absolute -top-50rpx -right-50rpx rotate-45 h-100rpx w-100rpx bg-black bg-opacity-10 flex items-end justify-center"
              @click.stop="removeHandle(index)"
            >
              <view class="rotate-45 mb-5rpx">
                <u-icon name="close" size="13" color="white"></u-icon>
              </view>
            </view>
          </view>
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
import { useSettingStore } from '@/store/setting'
import { userOptionsStore } from '@/store/userOptions'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { host } from '@/ts/request'
import { fileUrlReplace, getLoginUser } from '@/ts/global'

const setting = useSettingStore()
const userOptions = userOptionsStore()
const toast = ref()

let show = ref<boolean>(false)
let showPicker = ref<boolean>(false)
let today = dayjs().valueOf()
let date = ref<number>(dayjs().valueOf())
let images = ref<ImageItem[]>([
  {
    url: '',
    status: 'wait'
  }
])

const showHandle = () => {
  show.value = true
  images.value = [
    {
      url: '',
      status: 'wait'
    }
  ]
}

const viewImage = (url: string) => {
  uni.previewImage({
    urls: [fileUrlReplace(url)]
  })
}

const uploadHandle = (item: ImageItem) => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      console.log(res)
      item.status = 'run'
      uni.uploadFile({
        url: host + '/file/upload',
        filePath: res.tempFilePaths[0],
        name: 'file',
        header: {
          Authorization: getLoginUser().token
        },
        success: (res) => {
          let data: { msg: string; code: number } = JSON.parse(res.data)
          item.status = 'finish'
          item.url = data.msg
          if (images.value.length < 3) {
            images.value.push({
              url: '',
              status: 'wait'
            })
          }
        }
      })
    }
  })
}

const removeHandle = (index: number) => {
  images.value.splice(index, 1)
  if (images.value.length < 3 && !images.value.find((item) => item.status === 'wait')) {
    images.value.push({
      url: '',
      status: 'wait'
    })
  }
}

const emit = defineEmits<{
  (e: 'confirm', form: RecordingForm): void
}>()

let form = ref<RecordingForm>({
  day: '',
  chat: '',
  images: []
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
  form.value.images = images.value.filter((item) => item.status === 'finish').map((item) => item.url)
  form.value.hasAiSay = userOptions.hasAiSay

  emit('confirm', form.value)
  closeHandle()
}

defineExpose({
  showHandle: showHandle
})
</script>
