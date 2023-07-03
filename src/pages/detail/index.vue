<template>
  <view class="flex flex-col bg-gray-100 min-h-screen">

    <Head :title="show === 'view' ? '详情' : '编辑'"></Head>
    <view class="flex flex-col flex-auto pt-20rpx">
      <DetailViewer @showDelConfirm="showDelConfirm" :show="show" @changeShow="changeShow"></DetailViewer>
      <DetailEditor :show="show" @changeShow="changeShow"></DetailEditor>
    </view>
  </view>
  <DelConfirm ref="delConfirm" @cancel="cancel" @confirm="confirm"></DelConfirm>
</template>

<script lang="ts" setup>
import Head from './components/Head.vue';
import DetailViewer from './components/DetailViewer.vue'
import DetailEditor from './components/DetailEditor.vue';
import DelConfirm from './components/DelConfirm.vue'
import { ref } from 'vue';

const title = ref<string>('详情')
const delConfirm = ref()
const show = ref<ShowMode>('view')

const showDelConfirm = () => {
  delConfirm.value.showHandle()
}

const changeShow = (key: ShowMode) => {
  show.value = key
}

const cancel = () => {
}
const confirm = () => {
}

</script>

