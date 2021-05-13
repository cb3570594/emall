<template>
  <BasicMenuItem v-if="!menuHasChildren(item) && getShowMenu" v-bind="$props" />
  <a-sub-menu v-if="menuHasChildren(item) && getShowMenu">
    <template #title>
      <MenuItemContent v-bind="$props" :item="item" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <BasicSubMenuItem v-bind="$props" :item="childrenItem" />
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import type { Menu as MenuType } from '@/router/types'
import { itemProps } from './props'

import { defineComponent, computed } from 'vue'
import BasicMenuItem from './BasicMenuItem.vue'
import MenuItemContent from './MenuItemContent.vue'

export default defineComponent({
  components: {
    BasicMenuItem,
    MenuItemContent,
  },
  props: itemProps,
  setup(props) {
    const getShowMenu = computed(() => !props.item.meta?.hideMenu)
    const menuHasChildren = function (item: MenuType) {
      return item.children && item.children.length > 0
    }
    return {
      menuHasChildren,
      getShowMenu,
    }
  },
})
</script>
