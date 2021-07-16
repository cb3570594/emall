<template>
  <div class="tags-view" :class="{ 'tags-view--active': list.length > 0 }">
    <a-tag
      v-for="(item, index) in list"
      :key="item.fullPath"
      closable
      @close="close(item, index)"
      @click="changeTag(item)"
      :color="active === item.fullPath ? '#108ee9' : ''"
      >{{ item.meta.title }}</a-tag
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTagsStore } from '@/store/modules/tags'

export default defineComponent({
  setup() {
    const tagStore = useTagsStore()
    const router = useRouter()
    const list = computed(() => tagStore.list)
    const active = computed(() => tagStore.active)
    const changeTag = (item: any) => {
      console.log(item)
      if (item.fullPath === active) {
        return
      }
      router.replace(item)
    }
    // todo: item中既存路由信息，又存该页面的实例
    const close = (item: any, index: number) => {
      tagStore.delTag(index, router)
    }
    return {
      list,
      active,
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
