<template>
  <span class="">
    <Icon v-if="iconName" :type="iconName" />
    {{ name }}
  </span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { contentProps } from './props'
import Icon from '@/components/icon/Icon.vue'
export default defineComponent({
  components: {
    Icon,
  },
  props: contentProps,
  setup(props) {
    const name = computed(() => props.item?.name)
    const iconName = computed(() => props.item?.icon)
    return {
      name,
      iconName,
    }
  },
})
</script>
