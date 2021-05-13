<template>
  <a-menu-item>
    <MenuItemContent v-bind="$props" :item="item"></MenuItemContent>
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuItemContent from './MenuItemContent.vue'
import { itemProps } from './props'

export default defineComponent({
  components: {
    MenuItemContent,
  },
  props: itemProps,
  setup() {},
})
</script>
