<template>
  <view
    class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 pointer-events-none transition-all duration-300"
    @click="cancel" :style="{
      opacity: show ? '1' : '0',
      pointerEvents: show ? 'auto' : 'none'
    }">
    <view class="bg-white w-70vw rounded-md transition-all duration-300 opacity-0" @click.stop :style="{
      transform: show ? 'translateY(0)' : 'translateY(10%)',
      opacity: show ? '1' : '0'
    }">
      <view class="flex justify-center gap-10rpx text-28rpx py-80rpx">
        <u-icon name="info-circle-fill" size="14" color="#fb923c"></u-icon>
        <text>确定要删除吗？</text>
      </view>
      <view class="flex border-t-gray-100 border-t-1 border-t-solid">
        <view class="flex-1 flex justify-center items-center text-28rpx text-gray-700 py-20rpx btn-active"
          @click="cancel">取消</view>
        <view class="flex-1 flex justify-center items-center text-28rpx text-red-500 py-20rpx btn-active"
          @click="confirm">确定</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

let show = ref<boolean>(false)

const showHandle = () => {
  show.value = true
}

const cancel = () => {
  show.value = false
  emit('cancel')
}
const confirm = () => {
  show.value = false
  emit('confirm')
}

defineExpose({
  showHandle
})
</script>

<style lang="scss" scoped>
.btn-active {
  &:active {
    opacity: .5;
  }
}
</style>
