<template>
  <div class="p-4">
    <Statistic class="!mb-4" :loading="loading" />
    <div class="md:flex enter-y">
      <VisitRadar class="w-full md:w-1/2 !md:mr-2 !md:mb-0 !mb-4" :loading="loading" />

      <!-- <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" /> -->
      <SalesProductPie class="w-full md:w-1/2 !md:ml-2 !md:mb-0 !mb-4" :loading="loading" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Statistic from './components/Statistic.vue'
import VisitRadar from './components/VisitRadar.vue'
import SalesProductPie from './components/SalesProductPie.vue'

export default defineComponent({
  components: {
    Statistic,
    VisitRadar,
    SalesProductPie,
  },
  setup() {
    const loading = ref(true)
    setTimeout(() => {
      loading.value = false
    }, 1000)
    return { loading }
  },
})
</script>
