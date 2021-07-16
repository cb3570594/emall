<template>
  <BasicMenu :items="items"> </BasicMenu>
</template>

<script lang="ts">
import type { RouteRecordRaw } from 'vue-router'

// import {
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
// } from '@ant-design/icons-vue'
import BasicMenu from '@/components/menu/BasicMenu.vue'
import { defineComponent, reactive } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'

export default defineComponent({
  setup() {
    const permissionStore = usePermissionStore()
    const items = reactive<RouteRecordRaw[]>(permissionStore.routes)
    console.log(items)
    return {
      items,
    }
  },
  components: {
    BasicMenu,
    // UserOutlined,
    // VideoCameraOutlined,
    // UploadOutlined,
    // BarChartOutlined,
    // CloudOutlined,
    // AppstoreOutlined,
    // TeamOutlined,
    // ShopOutlined,
  },
})
</script>
