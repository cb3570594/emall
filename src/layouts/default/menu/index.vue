<template>
  <BasicMenu :items="items"> </BasicMenu>
</template>

<script lang="ts">
import type { Menu as MenuType } from '@/router/types'

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from '@ant-design/icons-vue'
import BasicMenu from '@/components/menu/BasicMenu.vue'
import { defineComponent, reactive } from 'vue'
import { menus } from '@/config/menu'
export default defineComponent({
  setup() {
    const items = reactive<MenuType[]>(menus)
    return {
      items,
    }
  },
  components: {
    BasicMenu,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
  },
})
</script>
