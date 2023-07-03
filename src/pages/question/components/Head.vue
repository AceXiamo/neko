<template>
  <HeadBar color="#FFFFFF00">
    <view class="flex h-full items-center px-20rpx gap-10rpx">
      <u-icon name="arrow-left" size="14" color="white" @click="back"></u-icon>
      <span class="text-35rpx">🧨 About</span>
    </view>
  </HeadBar>
</template>

<script lang="ts" setup>
const back = () => {
  uni.navigateBack()
}
</script>
