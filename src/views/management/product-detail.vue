<template>
  <a-form :model="form">
    <a-form-item label="商品名称">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="商品简介">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="商品分类">
      <a-select v-model:value="form.category" :options="options"></a-select>
    </a-form-item>
    <a-form-item label="商品主图">
      <a-upload
        action="http://eyuanxing.cn/upload"
        listType="picture-card"
        v-model:file-list="form.image"
        @preview="handlPreview"
      >
        <div v-if="form.image.length < 8">
          <PlusOutlined />
          <div class="ant-upload-text">上传</div>
        </div>
      </a-upload>
      <a-modal v-model:visible="previewVisible" centered :maskClosable="false" :footer="null">
        <img :src="previewImage" style="margin: auto" alt="预览" />
      </a-modal>
    </a-form-item>
    <a-form-item label="商品状态">
      <a-switch checkedChildren="上架" unCheckedChildren="下架" v-model:checked="form.status"></a-switch>
    </a-form-item>
    <a-form-item label="商品规格">
      <div>
        <div v-for="item in skus" :key="item">{{ item }}</div>
        <a-button type="primary">添加规格</a-button>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { UnwrapRef, reactive, toRaw, ref, defineComponent } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'

function usePreview() {
  const previewVisible = ref(false)
  const previewImage = ref('')
  const handlPreview = (file: any) => {
    console.log(file)
    previewImage.value = file.url || file.preview || file.thumbUrl
    previewVisible.value = true
  }
  return {
    previewVisible,
    previewImage,
    handlPreview,
  }
}
interface SkuState {
  id?: string
  spuId: string
  no: string
  name: string
  value: Object
  image: string
  price: number
  originPrice: number
  cost: number
  stock: number
}
interface ProductState {
  id?: string
  name: string
  desc: string
  category: string
  info: string
  image: string[]
  status: boolean
  skus: SkuState[]
}
export default defineComponent({
  components: {
    PlusOutlined,
  },
  setup() {
    const form: UnwrapRef<ProductState> = reactive({
      id: '1',
      name: '',
      desc: '',
      category: '',
      info: '',
      status: true,
      image: [],
      skus: [
        {
          id: '1-1',
          spuId: '1',
          no: 'SKU001',
          name: '',
          value: { 颜色: '红色', 内存: '64g' },
          image: '',
          price: 1000,
          originPrice: 1000,
          cost: 1000,
          stock: 1000,
        },
        {
          id: '1-2',
          spuId: '1',
          no: 'SKU002',
          name: '',
          value: { 颜色: '红色', 内存: '128g' },
          image: '',
          price: 1000,
          originPrice: 1000,
          cost: 1000,
          stock: 1000,
        },
        {
          id: '1-3',
          spuId: '1',
          no: 'SKU003',
          name: '',
          value: { 颜色: '红色', 内存: '256g' },
          image: '',
          price: 1000,
          originPrice: 1000,
          cost: 1000,
          stock: 1000,
        },
      ],
    })
    const options = [
      { name: '男装', id: '01' },
      { name: '女装', id: '02' },
    ]
    const { previewVisible, previewImage, handlPreview } = usePreview()
    const skus = reactive(Object.keys(form.skus[0].value))
    return {
      form,
      options,
      previewVisible,
      previewImage,
      handlPreview,
      skus,
    }
  },
})
</script>
