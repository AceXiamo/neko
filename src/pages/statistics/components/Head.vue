<template>
  <HeadBar color="#FFFFFF00">
    <view class="flex h-full items-center px-20rpx gap-10rpx">
      <u-icon name="arrow-left" size="14" color="#4D5562" @click="back"></u-icon>
      <span class="text-35rpx">{{ title }}</span>
    </view>
  </HeadBar>
</template>

<script lang="ts" setup>
const prop = defineProps<{
  title: string
}>()

const back = () => {
  uni.navigateBack()
}
</script>
