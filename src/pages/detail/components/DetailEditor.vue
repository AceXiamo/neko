<template>
  <view
    class="flex flex-col rounded-md bg-white transition-all duration-300 opacity-0 left-0 right-0 absolute mx-20rpx"
    :style="{
      transform: show === 'edit' ? 'translateX(0)' : 'translateX(calc(100% + 40rpx))',
      opacity: show === 'edit' ? '1' : '0'
    }"
  >
    <view class="px-40rpx py-30rpx border-b-gray-100 border-b-1 border-b-solid">
      <text class="text-26rpx text-gray-700">✏️</text>
    </view>
    <view class="flex flex-col py-20rpx gap-20rpx">
      <view class="flex px-40rpx items-center">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">金额</text>
        <input
          type="text"
          v-model="recordStore.data.price"
          class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm py-6rpx px-15rpx text-gray-700"
        />
      </view>

      <!-- <view class="flex px-40rpx items-center">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">日期</text>
        <input type="text" v-model="recordStore.data.recordTime" class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm py-6rpx px-15rpx text-gray-700" />
      </view> -->

      <view class="flex px-40rpx items-center">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">标题</text>
        <input
          type="text"
          v-model="recordStore.data.remark"
          class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm py-6rpx px-15rpx text-gray-700"
        />
      </view>

      <view class="flex px-40rpx items-center">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">emoji图标</text>
        <input
          type="text"
          v-model="recordStore.data.icon"
          class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm py-6rpx px-15rpx text-gray-700"
        />
      </view>

      <view class="flex px-40rpx items-start">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">AI的吐槽</text>
        <textarea
          v-model="recordStore.data.aiSay"
          class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm h-200rpx p-15rpx text-gray-700"
        ></textarea>
      </view>

      <view class="mx-40rpx flex flex-col gap-20rpx">
        <view class="border-b-dashed border-b-1 border-b-gray-100 pb-10rpx">
          <text class="text-gray-400 text-26rpx">🖼️ Photo</text>
        </view>
        <view class="grid grid-cols-3 gap-20rpx">
          <view
            :class="[
              `bg-gray-100 bg-opacity-50 aspect-square rounded-md flex justify-center items-center cursor-default select-none relative overflow-hidden`,
              `animate__animated animate__fadeIn animate-duration-500`
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
      </view>
    </view>
    <view class="px-40rpx mt-50rpx border-t-gray-100 border-t-1 border-t-solid flex">
      <view class="py-30rpx flex-1 flex justify-center items-center gap-10rpx" @click="submit">
        <text class="text-26rpx text-emerald-500">保存</text>
      </view>
      <view class="py-30rpx flex-1 flex justify-center items-center gap-10rpx" @click="emit('changeShow', 'view')">
        <text class="text-26rpx text-gray-700">返回</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRecordStore } from '@/store/record'
import { update } from '@/api/bill'
import { host } from '@/ts/request'
import { fileUrlReplace, getLoginUser } from '@/ts/global'

const recordStore = useRecordStore()
const prop = defineProps({
  show: {
    type: String,
    default: ''
  },
  toast: {
    type: Object,
    required: true
  }
})

watch(
  () => prop.show,
  (val) => {
    if (val === 'edit') {
      images.value =
        recordStore.images.length > 0 ? recordStore.images.map((item) => ({ url: item, status: 'finish' })) : []
      if (images.value.length < 3) {
        images.value.push(imgItemInitValue)
      }
    }
  }
)

const viewImage = (url: string) => {
  uni.previewImage({
    urls: [fileUrlReplace(url)]
  })
}

const emit = defineEmits<{
  (e: 'changeShow', key: ShowMode): void
}>()

const imgItemInitValue: ImageItem = {
  url: '',
  status: 'wait'
}
let images = ref<ImageItem[]>([imgItemInitValue])

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
    images.value.push(imgItemInitValue)
  }
}

const submit = () => {
  let arr = images.value.filter((item) => item.status === 'finish').map((item) => item.url)
  recordStore.data.images = JSON.stringify(arr)
  update(recordStore.data).then(() => {
    prop.toast.show({
      text: '保存成功',
      type: 'success'
    })
    emit('changeShow', 'view')
  })
}
</script>
