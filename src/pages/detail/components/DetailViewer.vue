<template>
  <view class="flex flex-col rounded-md bg-white transition-all duration-300 opacity-0 left-0 right-0 absolute mx-20rpx"
    :style="{
      transform: show === 'view' ? 'translateX(0)' : 'translateX(calc(-100% - 40rpx))',
      opacity: show === 'view' ? '1' : '0'
    }">
    <view class="px-40rpx py-30rpx border-b-gray-100 border-b-1 border-b-solid">
      <text class="text-26rpx text-gray-700">{{ recordStore.data.recordTime }}</text>
    </view>
    <view class="flex flex-col">
      <view class="my-50rpx font-bold text-center"
        :style="{ color: recordStore.data.recordType === 0 ? '#DD524C' : '#55B685' }">
        <text class="text-40rpx">{{ recordStore.data.recordType === 0 ? '+' : '-' }}</text>
        <text class="text-40rpx ml-10rpx">{{ recordStore.data.price }}</text>
        <text class="text-24rpx ml-10rpx">元</text>
      </view>
      <view class="flex px-40rpx items-center text-24rpx">
        <text class="text-gray-400 w-160rpx flex-none">详情</text>
        <text class="text-gray-700">{{ recordStore.data.remark }}</text>
      </view>
      <view class="flex px-40rpx items-center text-24rpx mt-20rpx">
        <text class="text-gray-400 w-160rpx flex-none">emoji图标</text>
        <text class="text-gray-700">{{ recordStore.data.icon }}</text>
      </view>
      <view class="flex px-40rpx text-24rpx mt-20rpx">
        <text class="text-gray-400 w-160rpx flex-none">AI的吐槽</text>
        <text class="text-gray-700">{{ recordStore.data.aiSay }}</text>
      </view>
    </view>
    <view class="px-40rpx mt-50rpx border-t-gray-100 border-t-1 border-t-solid flex">
      <view class="py-30rpx flex-1 flex justify-center items-center gap-10rpx" @click="emit('showDelConfirm')">
        <u-icon name="trash" size="15" color="#DD524C"></u-icon>
        <text class="text-26rpx text-red-500">删除</text>
      </view>
      <view class="py-30rpx flex-1 flex justify-center items-center gap-10rpx" @click="emit('changeShow', 'edit')">
        <u-icon name="edit-pen" size="15" color="#394150"></u-icon>
        <text class="text-26rpx text-gray-700">编辑</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useRecordStore } from '@/store/record';
const recordStore = useRecordStore()

const prop = defineProps({
  show: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'showDelConfirm'): void,
  (e: 'changeShow', key: ShowMode): void
}>()

</script>

