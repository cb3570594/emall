<template>
  <a-menu
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @openChange="openCb"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" :theme="theme" :isHorizontal="isHorizontal" />
    </template>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onMounted } from 'vue'
import BasicSubMenuItem from './BasicSubMenuItem.vue'
import { basicProps } from './props'
import type { MenuState } from './types'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'BasicMenu',
  components: {
    BasicSubMenuItem,
  },
  props: basicProps,
  setup(props) {
    const state = reactive<MenuState>({
      collapsed: false,
      selectedKeys: [],
      openKeys: [],
      defaultSelectedKeys: [],
      collapsedOpenKeys: [],
    })
    const router = useRouter()
    const route = useRoute()
    state.selectedKeys = [route.path]
    state.openKeys = [route.path.match(/(.*)\/(.*)/)?.[1] || '/']
    watch(
      () => route.path,
      (val) => {
        state.selectedKeys = [val]
        const key = val.match(/(.*)\/(.*)/)?.[1] || '/'
        !state.openKeys.includes(key) && state.openKeys.push(key)
      }
    )
    watch(
      () => state.selectedKeys,
      (val) => {
        router.push(val[0])
      }
    )
    const openCb = (e: any) => {
      console.log(e)
    }
    return {
      ...toRefs(state),
      openCb
    }
  },
})
</script>
