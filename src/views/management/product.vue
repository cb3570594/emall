<template>
  <a-form layout="inline" :model="form" @finish="handleFinish" style="margin-bottom: 20px">
    <a-form-item>
      <a-input v-model:value="form.no" placeholder="商品编号" allowClear />
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="form.name" placeholder="商品名称" allowClear />
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="form.creator" placeholder="创建人" allowClear />
    </a-form-item>
    <a-form-item>
      <a-range-picker
        v-model:value="form.time"
        :show-time="{ format: 'HH:mm' }"
        format="YYYY-MM-DD HH:mm"
        :placeholder="['Start Time', 'End Time']"
        @change="onFormTimeChange"
        @ok="onFormTimeOk"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit"> 查询 </a-button>
    </a-form-item>
  </a-form>
  <a-table
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :columns="columns"
    :data-source="data"
    :scroll="{ x: 1500, y: 300 }"
    :pagination="false"
  >
    <template #img="{ text }">
      <img :src="text" alt="" class="product-img" />
    </template>
    <template #action>
      <a-button type="primary" shape="circle" size="14">
        <template #icon>
          <FormOutlined />
        </template>
      </a-button>
      <a-divider type="vertical" />
      <a-button type="primary" danger shape="circle" size="14">
        <template #icon>
          <DeleteOutlined />
        </template>
      </a-button>
      <a-divider type="vertical" />
      <a-button type="primary" shape="circle" size="14">
        <template #icon>
          <SwapOutlined />
        </template>
      </a-button>
    </template>
  </a-table>
  <a-pagination
    show-quick-jumper
    v-model:current="current"
    :total="500"
    @change="onPageChange"
    style="margin-top: 20px; text-align: right"
  />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { FormOutlined, DeleteOutlined, SwapOutlined } from '@ant-design/icons-vue'
import { ColumnProps } from 'ant-design-vue/es/table/interface'

type Key = ColumnProps['key']
const columns = [
  { title: '缩略图', dataIndex: 'img', key: 'img', width: 100, fixed: 'left', slots: { customRender: 'img' } },
  { title: '名称', dataIndex: 'name', key: 'name', width: 200, fixed: 'left' },
  { title: '价格', dataIndex: 'price', key: 'price', width: 100 },
  { title: '库存', dataIndex: 'stock', key: 'stock', width: 100 },
  { title: '当前状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '创建人', dataIndex: 'creator', key: 'creator', width: 100 },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '修改时间', dataIndex: 'updateTime', key: 'updateTime', width: 180 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 180,
    slots: { customRender: 'action' },
  },
]
export default defineComponent({
  name: 'product',
  components: {
    FormOutlined,
    DeleteOutlined,
    SwapOutlined,
  },
  setup() {
    const data = reactive(
      Array(10)
        .fill(null)
        .map((item, index) => ({
          key: index,
          img: '//img13.360buyimg.com/n1/s450x450_jfs/t1/136325/32/19494/112492/5fd3304dE3b793677/2c12a09244a945b4.jpg',
          name: 'Apple iPhone 11 Pro',
          price: '5688',
          stock: index,
          status: '上架中',
          creator: 'admin',
          createTime: '2021-10-10 20:01:00',
          updateTime: '2021-10-10 20:01:00',
        })),
    )
    const form = reactive({
      no: '',
      name: '',
      creator: '',
      time: [],
    })
    const state = reactive<{
      selectedRowKeys: Key[]
      loading: boolean
      current: number
      total: number
    }>({
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      current: 1,
      total: 100,
    })
    const onSelectChange = (selectedRowKeys: Key[]) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      state.selectedRowKeys = selectedRowKeys
    }
    const onPageChange = (pageNumber: number) => {
      console.log('Page: ', pageNumber)
    }
    const onFormTimeChange = () => {}
    const onFormTimeOk = () => {}
    const handleFinish = (e: any) => {
      console.log(e, form)
    }
    return {
      // form查询项
      form,
      onFormTimeChange,
      onFormTimeOk,
      handleFinish,
      // 表单项
      data,
      columns,
      onSelectChange,
      onPageChange,
      ...toRefs(state),
    }
  },
})
</script>
<style lang="less" scoped>
.product-img {
  width: 60px;
  height: 60px;
}
</style>
