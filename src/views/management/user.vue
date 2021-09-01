<template>
  <a-form layout="inline" :model="form" @finish="handleFinish" style="margin-bottom: 20px">
    <a-form-item>
      <a-input v-model:value="form.nickname" placeholder="用户昵称" allowClear />
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="form.mobile" placeholder="用户手机号" allowClear />
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="form.consume[0]" placeholder="消费金额" allowClear class="range-input" />
      <a-input
        placeholder="~"
        disabled
        style="width: 30px; border-left: 0; pointer-events: none; background-color: #fff; border-radius: 0"
      />
      <a-input v-model:value="form.consume[1]" placeholder="范围筛选" allowClear class="range-input" />
    </a-form-item>
    <a-form-item>
      <a-range-picker
        v-model:value="form.time"
        :show-time="{ format: 'HH:mm' }"
        format="YYYY-MM-DD HH:mm"
        :placeholder="['创建起止', '时间筛选']"
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
          <CheckSquareOutlined />
        </template>
      </a-button>
      <a-divider type="vertical" />
      <a-button type="primary" danger shape="circle" size="14">
        <template #icon>
          <StopOutlined />
        </template>
      </a-button>
      <a-divider type="vertical" />
      <a-button type="primary" shape="circle" size="14">
        <template #icon>
          <FormOutlined />
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
import { CheckSquareOutlined, StopOutlined, FormOutlined } from '@ant-design/icons-vue'
import { ColumnProps } from 'ant-design-vue/es/table/interface'

type Key = ColumnProps['key']
const columns = [
  { title: '头像', dataIndex: 'img', key: 'img', width: 100, fixed: 'left', slots: { customRender: 'img' } },
  { title: '昵称', dataIndex: 'name', key: 'name', width: 200, fixed: 'left' },
  { title: '手机号', dataIndex: 'mobile', key: 'mobile', width: 100 },
  { title: '消费金额', dataIndex: 'consume', key: 'consume', width: 100 },
  { title: '当前状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '上次登录时间', dataIndex: 'loginTime', key: 'loginTime', width: 180 },
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
    CheckSquareOutlined,
    StopOutlined,
    FormOutlined,
  },
  setup() {
    const data = reactive(
      Array(10)
        .fill(null)
        .map((item, index) => ({
          key: index,
          img: 'https://img2.baidu.com/it/u=1077360284,2857506492&fm=26&fmt=auto&gp=0.jpg',
          name: `用户${index}`,
          mobile: 15568589963,
          consume: 5688,
          status: '正常',
          createTime: '2021-10-10 20:01:00',
          loginTime: '2021-10-10 20:01:00',
        })),
    )
    const form = reactive({
      nickname: '',
      mobile: '',
      consume: [],
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
  border-radius: 50%;
}
.range-input {
  width: 100px;
  text-align: center;
}
</style>
