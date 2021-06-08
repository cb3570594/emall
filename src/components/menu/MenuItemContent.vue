<template>
  <span class="">
    <Icon v-if="iconName" :type="iconName" />
    {{ name }}
  </span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Icon from '@/components/icon/Icon.vue'
import { contentProps } from './props'

export default defineComponent({
  components: {
    Icon,
  },
  props: contentProps,
  setup(props) {
    const name = computed(() => props.item?.meta?.title)
    const iconName = computed(() => props.item?.meta?.icon)
    return {
      name,
      iconName,
    }
  },
})
</script>
