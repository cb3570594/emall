import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
export function useTableData(): TableData {
  const columns = [
    {
      title: '订单号',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '订单金额',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      slots: { customRender: 'status' },
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      key: 'payType',
      slots: { customRender: 'payType' },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ]
  const data = reactive<ApiResult>({
    list: [],
    total: 0,
    pageSize: 10,
    current: 1,
  })
  const loading = ref(false)
  const getData = (params: ApiRequestParams) => {
    loading.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          id: 0,
          no: 'DD1100110',
          price: '300.00',
          status: 10,
          payType: 0,
          createTime: '2020-01-02',
          updateTime: '2020-01-03',
        }
        data.list = Array(100).fill(null).map((item, index) => {
          return {...mockData, id: index, no: mockData.no + index, status : index % 10 * 10 + 10}
        }).filter(item => !params.status || item.status === params.status)
        data.total = data.list.length
        data.pageSize = params.pageSize
        data.current = params.current
        loading.value = false
        resolve(data)
      }, 1e3)
    })
  }
  return {
    columns,
    data,
    loading,
    getData,
  }
}

interface OrderInfo {
  id: string | number
  no: string
  price: string
  status: number
  payType: number
  createTime: string
  updateTime: string
}

type TableData = {
  columns: Array<any>
  data: ApiResult
  getData: (params: ApiRequestParams) => Promise<unknown>
  loading: Ref<boolean>
}
type ApiResult = {
  list: OrderInfo[]
  total: number
  pageSize: number
  current: number
}

type ApiRequestParams = {
  pageSize: number
  current: number
  no?: string
  status?: number
  payType?: number
  startTime?: string
  endTime?: string
}

export function useOrderStatus() {
  const orderStatus = [
    { name: '全部', status: 0 },
    { name: '待付款', status: 10 },
    { name: '已付款', status: 20 },
    { name: '已发货', status: 30 },
    { name: '已收货', status: 40 },
    { name: '已评价', status: 50 },
    { name: '已关闭', status: 60 },
    { name: '售后中', status: 100 },
    { name: '已售后', status: 110 },
  ]
  const getOrderStatus = (statusCode: number) => {
    return orderStatus.find(item => item.status === statusCode)?.name
  }
  return {
    orderStatus,
    getOrderStatus,
  }
}