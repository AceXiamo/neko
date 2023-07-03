<template>
  <view class="flex flex-col rounded-md bg-white transition-all duration-300 opacity-0 left-0 right-0 absolute mx-20rpx"
    :style="{
      transform: show === 'edit' ? 'translateX(0)' : 'translateX(calc(100% + 40rpx))',
      opacity: show === 'edit' ? '1' : '0'
    }">
    <view class="px-40rpx py-30rpx border-b-gray-100 border-b-1 border-b-solid">
      <text class="text-26rpx text-gray-700">✏️</text>
    </view>
    <view class="flex flex-col py-20rpx gap-20rpx">

      <view class="flex px-40rpx items-center">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">金额</text>
        <input type="text" v-model="recordStore.data.price"
          class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm py-6rpx px-15rpx text-gray-700" />
      </view>

      <!-- <view class="flex px-40rpx items-center">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">日期</text>
        <input type="text" v-model="recordStore.data.recordTime" class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm py-6rpx px-15rpx text-gray-700" />
      </view> -->

      <view class="flex px-40rpx items-center">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">详情</text>
        <input type="text" v-model="recordStore.data.remark"
          class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm py-6rpx px-15rpx text-gray-700" />
      </view>

      <view class="flex px-40rpx items-center">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">emoji图标</text>
        <input type="text" v-model="recordStore.data.icon"
          class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm py-6rpx px-15rpx text-gray-700" />
      </view>

      <view class="flex px-40rpx items-start">
        <text class="text-gray-400 text-26rpx w-160rpx flex-none">AI的吐槽</text>
        <textarea v-model="recordStore.data.aiSay"
          class="text-26rpx bg-gray-100 bg-opacity-50 rounded-sm h-200rpx p-15rpx text-gray-700"></textarea>
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
import { ref } from 'vue';
import { useRecordStore } from '@/store/record';
import { update } from '@/api/bill';
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

const emit = defineEmits<{
  (e: 'changeShow', key: ShowMode): void
}>()

const submit = () => {
  update(recordStore.data).then(() => {
    prop.toast.show({
      text: '保存成功',
      type: 'success'
    })
    emit('changeShow', 'view')
  })
}
</script>

