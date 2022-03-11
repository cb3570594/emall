<template>
  <a-card title="成交占比" :loading="loading">
    <div ref="chartRef" style="width: 100%; height: 300px"></div>
  </a-card>
</template>
<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, onMounted, ref, unref, watch, nextTick } from 'vue'
import echarts from '@/utils/echarts'

export default defineComponent({
  props: {
    loading: Boolean,
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement>()
    watch(
      () => props.loading,
      (val) => {
        if (val) {
          return
        }
        nextTick(() => {
          const chartInstance = echarts.init(unref(chartRef as Ref<HTMLDivElement>))
          chartInstance.setOption({
            tooltip: {
              trigger: 'item',
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
                data: [
                  { value: 500, name: '电子产品' },
                  { value: 310, name: '服装' },
                  { value: 274, name: '化妆品' },
                  { value: 400, name: '家居' },
                ].sort((a, b) => a.value - b.value),
                roseType: 'radius',
                animationType: 'scale',
                animationEasing: 'exponentialInOut',
                animationDelay() {
                  return Math.random() * 400
                },
              },
            ],
          })
        })
      },
    )

    return {
      chartRef,
    }
  },
})
</script>
