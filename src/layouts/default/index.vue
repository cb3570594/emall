<template>
  <a-layout>
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo" />
      <MenuContent />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px', minWidth: '320px' }">
      <a-layout-header :style="{ background: '#fff' }" class="flex items-center justify-end px-5 py-0">
        <HeaderContent />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: 'calc(100vh - 108px)' }">
          <!-- <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view> -->
          <RouterView />
        </div>
        <a-backtop />
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }"> <FooterContent /> </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import MenuContent from './menu/index.vue'
import HeaderContent from './header/index.vue'
import FooterContent from './footer/index.vue'
export default defineComponent({
  components: {
    MenuContent,
    HeaderContent,
    FooterContent,
  },
})
</script>
<style>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
