<template>
  <a-form ref="formRef" layout="inline" :model="formState">
    <a-form-item name="orderNo">
      <a-input placeholder="订单号" v-model:value="formState.orderNo" class="!w-10rem" />
    </a-form-item>
    <a-form-item name="status">
      <a-select v-model:value="formState.status" class="!w-10rem">
        <a-select-option v-for="item in orderStatus" :key="item.status" :value="item.status">{{
          item.name
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="search">查询</a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="default" @click="reset">重置</a-button>
    </a-form-item>
  </a-form>
  <a-table
    :columns="columns"
    :row-key="(record) => record.id"
    :data-source="data.list"
    :pagination="pagination"
    :loading="loading"
    @change="handlTableChange"
    class="mt-5"
  >
    <template #status="{record}">
      <span>{{getOrderStatus(record.status)}}</span>
    </template>
    <template #payType="{record}">
      <span>{{getPayType(record.payType)}}</span>
    </template>
    <template #action="{ record }">
      <span class="text-xs">
        <router-link to="/management/order-detail" class="text-blue-400">详情</router-link>
        <a-divider v-if="record.status === 20" type="vertical" />
        <span v-if="record.status === 20" class="text-green-400 cursor-pointer">发货</span>
        <a-divider v-if="record.status < 60" type="vertical" />
        <span v-if="record.status < 60" class="text-red-400 cursor-pointer">关闭</span>
      </span>
    </template>
  </a-table>
</template>
<script lang="ts">
import type { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface'
import type { UnwrapRef } from 'vue'
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { useTableData, useOrderStatus } from './orderTable'
interface FormState {
  orderNo: string
  status: number
}
type Pagination = TableState['pagination']
export default defineComponent({
  name: 'order',
  setup() {
    const { orderStatus, getOrderStatus } = useOrderStatus()
    const { data, getData, loading, columns } = useTableData()
    const getPayType = (payType: number) => {
      return ['微信支付', '支付宝支付'][payType]
    }
    const formState: UnwrapRef<FormState> = reactive({
      orderNo: '',
      status: 0,
    })
    const formRef = ref()
    const search = () => {
      getData({
        current: 1,
        pageSize: 10,
        no: formState.orderNo,
        status: formState.status,
      })
    }
    const reset = () => {
      formRef.value.resetFields()
    }
    const handlTableChange = (pag: Pagination, filters: TableStateFilters, sorter: any) => {
      getData({
        current: pag?.current || 1,
        pageSize: pag?.pageSize || 10,
        no: formState.orderNo,
        status: formState.status,
      })
    }
    const pagination = computed(() => ({
      total: data.total,
      current: data.current,
      pageSize: data.pageSize,
    }))
    onMounted(search)
    return {
      orderStatus,
      getOrderStatus,
      getPayType,
      search,
      reset,
      handlTableChange,
      formState,
      formRef,
      data,
      loading,
      columns,
      pagination,
    }
  },
})
</script>
