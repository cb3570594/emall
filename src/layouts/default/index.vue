<template>
  <a-layout>
    <a-layout-sider
      class="menu-sider scrollbar "
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: 999 }"
    >
      <div class="logo" />
      <MenuContent />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px', minWidth: '320px' }">
      <a-layout-header
        :style="{ background: '#fff' }"
        class="flex items-center justify-end px-5 py-0"
      >
        <HeaderContent />
      </a-layout-header>
      <TagsContent />
      <a-layout-content :style="{ margin: '0 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: 'calc(100vh - 108px)' }">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
          <!-- <RouterView /> -->
          <a-back-top :visibilityHeight="100" />
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }"> <FooterContent /> </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useTagsStore } from '@/store/modules/tags'
import MenuContent from './menu/index.vue'
import HeaderContent from './header/index.vue'
import FooterContent from './footer/index.vue'
import TagsContent from './tags/index.vue'

export default defineComponent({
  components: {
    MenuContent,
    HeaderContent,
    FooterContent,
    TagsContent,
  },
  setup() {
    const userStore = useTagsStore()
    return {
      tagsView: userStore.list,
    }
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
