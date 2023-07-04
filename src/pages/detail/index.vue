<template>
  <view class="flex flex-col bg-gray-100 min-h-screen">

    <Head :title="show === 'view' ? '详情' : '编辑'"></Head>
    <view class="flex flex-col flex-auto pt-20rpx">
      <DetailViewer @showDelConfirm="showDelConfirm" :show="show" @changeShow="changeShow"></DetailViewer>
      <DetailEditor :show="show" :toast="toast" @changeShow="changeShow"></DetailEditor>
    </view>
  </view>
  <DelConfirm ref="delConfirm" @cancel="cancel" @confirm="confirm"></DelConfirm>
  <Toast ref="toast"></Toast>
</template>

<script lang="ts" setup>
import Head from './components/Head.vue';
import DetailViewer from './components/DetailViewer.vue'
import DetailEditor from './components/DetailEditor.vue';
import DelConfirm from './components/DelConfirm.vue'
import { ref } from 'vue';
import { del } from '@/api/bill';
import { useRecordStore } from '@/store/record';

const toast = ref()
const recordStore = useRecordStore()
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
  if (recordStore.data.id) {
    del({ id: recordStore.data.id }).then(() => {
      uni.hideLoading()
      toast.value.show({
        text: '删除成功',
        type: 'success'
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    })
  }
}

</script>

