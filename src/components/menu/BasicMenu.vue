<template>
  <a-menu
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @click="handleClick"
    @openChange="openCb"
  >
    <BasicSubMenuItem
      v-for="item in items"
      :key="item.path"
      :pathKey="item.path"
      :item="item"
      :theme="theme"
      :isHorizontal="isHorizontal"
    />
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ss } from '@/utils/storage'
import BasicSubMenuItem from './BasicSubMenuItem.vue'
import { basicProps } from './props'
import type { MenuState } from './types'

function getPathKey(path: string) {
  const res = path.split('/')
  return res[res.length - 1]
}
export default defineComponent({
  name: 'BasicMenu',
  components: {
    BasicSubMenuItem,
  },
  props: basicProps,
  setup() {
    const state = reactive<MenuState>({
      collapsed: false,
      selectedKeys: [],
      openKeys: [],
      defaultSelectedKeys: [],
      collapsedOpenKeys: [],
    })
    const router = useRouter()
    const route = useRoute()
    state.selectedKeys = [getPathKey(route.path)]
    state.openKeys = ss.getItem('openKeys') || []
    watch(
      () => route.path,
      (path: string) => {
        state.selectedKeys = [getPathKey(path)]
      },
    )
    const openCb = (e: []) => {
      ss.setItem('openKeys', e)
    }
    const handleClick = (e: any) => {
      router.push({ name: e.key })
    }
    return {
      ...toRefs(state),
      openCb,
      handleClick,
    }
  },
})
</script>
