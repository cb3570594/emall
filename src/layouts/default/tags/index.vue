<template>
  <div class="tags-view" :class="{ 'tags-view--active': list.length > 0 }">
    <a-tag
      v-for="(item, index) in list"
      :key="item.fullPath"
      closable
      @close="close(item, index)"
      @click="changeTag(item)"
      :color="active === item.title ? '#108ee9' : ''"
      >{{ item.title }}</a-tag
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const tags = reactive({
      list: [{ title: '首页' }, { title: '详情' }],
      active: '首页',
    })
    // todo: item中既存路由信息，又存该页面的实例
    const close = (item: any, index: number) => {
      console.log(item)
      tags.list.splice(index, 1)
    }
    const changeTag = (item: any) => {
      console.log(item)
      if (item.title === tags.active) {
        return
      }
      tags.active = item.title
    }
    return {
      ...toRefs(tags),
      close,
      changeTag,
    }
  },
})
</script>

<style scoped lang="less">
.tags-view {
  height: 0px;
  margin: 15px 15px 0;
  transition: height 0.3s;
  &--active {
    height: 38px;
  }
}
</style>
