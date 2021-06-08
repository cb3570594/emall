<template>
  <div>{{params}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    return {
      params: route.params,
    }
  },
})
</script>

<style scoped>
</style>
