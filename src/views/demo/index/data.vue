<template>
  <div>Demo</div>
  <div class="text-center"><a-button type="primary" @click="goHome">去首页</a-button></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const goHome = () => {
      router.push('/')
    }
    return {
      goHome,
    }
  },
})
</script>
