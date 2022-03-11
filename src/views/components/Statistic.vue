<template>
  <a-card :loading="loading" class="text-center">
    <a-row>
      <a-col :span="24" :md="8" class="<md:mb-4"
        ><a-statistic title="营业收入" :value="112893" :precision="2"></a-statistic
      ></a-col>
      <a-col :span="24" :md="8" class="<md:mb-4"><a-statistic title="订单数量" :value="9245"></a-statistic></a-col>
      <a-col :span="24" :md="8"><a-statistic title="用户数量" :value="10244"></a-statistic></a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Statistic, Row, Col, Card } from 'ant-design-vue'

export default defineComponent({
  components: {
    Statistic,
    Row,
    Col,
    Card,
  },
  props: {
    loading: Boolean,
  },
  setup() {},
})
</script>
