<template>
  <BasicMenuItem v-if="!menuHasChildren(item) && getShowMenu" v-bind="$props" />
  <a-sub-menu v-if="menuHasChildren(item) && getShowMenu">
    <template #title>
      <MenuItemContent v-bind="$props" :item="item" />
    </template>

    <BasicSubMenuItem
      v-for="childrenItem in item.children || []"
      :key="childrenItem.path"
      v-bind="$props"
      :item="childrenItem"
    />
  </a-sub-menu>
</template>

<script lang="ts">
import type { Menu as MenuType } from '@/router/types'
import { defineComponent, computed } from 'vue'
import { itemProps } from './props'
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
    const menuHasChildren = (item: MenuType) => item.children && item.children.length > 0
    return {
      menuHasChildren,
      getShowMenu,
    }
  },
})
</script>
