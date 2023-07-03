<template>
  <view class="flex flex-col bg-emerald-500 min-h-screen">

    <Head></Head>
    <view class="flex flex-col flex-auto bg-gray-100 gap-20rpx px-20rpx">
      <view class="w-max mt-20rpx">
        <image class="h-200rpx w-200rpx rounded-md" mode="aspectFit"
          src="https://image.qwq.link/images/2023/07/02/twitter_Downvote__downvote_me__20230630-184731_1674852180619329537_gif.gif">
        </image>
      </view>
      <view class="text-32rpx">
        <text class="text-emerald-500">#</text>
        <text class="ml-10rpx">关于</text>
      </view>
      <view class="flex flex-col gap-10rpx text-26rpx text-gray-600">
        <text class="leading-40rpx">这是一个记账工具</text>
        <text class="leading-40rpx">区别于传统记账工具，这里加入了 AI 🤖</text>
        <text class="leading-40rpx">你只需要告诉它你花钱做了什么即可完成记账，同时AI也能够对你的月账单、年账单进行分析，并提供一些建议</text>
        <text class="leading-40rpx">目前初版上线了基础的记账功能（记账，日汇总，月汇总，历史</text>
        <text class="leading-40rpx">由于本人是一个在职社畜，时间有限，所以大概并不会有比较稳定的发版时间 🫠，你可以选择加入反馈群以催更（❌ </text>
        <view class="my-10rpx">
          <text class="px-20rpx py-15rpx bg-emerald-500 rounded-sm text-white text-26rpx" @click="viewGroupImage">🏔️ 加入反馈群</text>
        </view>
      </view>
      <view class="text-32rpx">
        <text class="text-emerald-500">#</text>
        <text class="ml-10rpx">开发计划</text>
      </view>
      <view class="flex flex-col gap-20rpx text-24rpx text-gray-600">
        
        <view class="flex flex-col gap-10rpx bg-white p-20rpx rounded-md relative overflow-hidden">
          <text class="leading-40rpx">Ver.1.0</text>
          <text>AI记账 & 基础功能</text>
          <view
            class="absolute -top-40rpx -right-40rpx w-80rpx h-80rpx bg-emerald-500 rotate-45 flex items-end justify-center">
            <view class="-rotate-45">
              <u-icon name="checkbox-mark" size="12" color="white"></u-icon>
            </view>
          </view>
        </view>

        <view class="flex flex-col gap-10rpx bg-white p-20rpx rounded-md relative overflow-hidden">
          <text class="leading-40rpx">Ver.1.1</text>
          <text>月账单分析 & 年账单分析 ...</text>
          <view
            class="absolute -top-40rpx -right-40rpx w-80rpx h-80rpx bg-orange-500 rotate-45 flex items-end justify-center">
            <view class="-rotate-45">
              <u-icon name="bookmark-fill" size="12" color="white"></u-icon>
            </view>
          </view>
        </view>

        <view class="flex flex-col gap-10rpx bg-white p-20rpx rounded-md relative overflow-hidden">
          <text class="leading-40rpx">Ver.1.2</text>
          <text>个人中心 & 留言板 ...</text>
          <view
            class="absolute -top-40rpx -right-40rpx w-80rpx h-80rpx bg-orange-500 rotate-45 flex items-end justify-center">
            <view class="-rotate-45">
              <u-icon name="bookmark-fill" size="12" color="white"></u-icon>
            </view>
          </view>
        </view>

      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Head from "./components/Head.vue";

const viewGroupImage = () => {
  uni.previewImage({
    urls: [
      "https://image.qwq.link/images/2023/06/20/twitter_Aoitori_775_20230619-105346_1670746688787742721_photo_pixian.png"
    ]
  });
}
</script>
