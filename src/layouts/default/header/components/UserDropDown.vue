<template>
  <Dropdown placement="bottomCenter">
    <Avatar class="cursor-pointer" />
    <template #overlay>
      <Menu>
        <MenuItem>个人中心</MenuItem>
        <MenuItem @click="logout">退出登录</MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Dropdown, Avatar, Menu } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    Dropdown,
    Avatar,
    Menu,
    MenuItem: Menu.Item,
  },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const logout = () => {
      userStore.setUserInfo({
        userInfo: null,
      })
      router.push('login')
    }
    return {
      logout,
    }
  },
})
</script>
