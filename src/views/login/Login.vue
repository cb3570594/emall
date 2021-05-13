<template>
  <div class="login">
    <div class="p-4 login-box -enter-x">
      <div class="pt-2 pb-4 text-lg text-center">管理后台</div>
      <a-form :model="formData" :rules="rules" ref="formRef" layout="vertical">
        <a-form-item name="account" class="enter-x">
          <a-input size="large" v-model:value="formData.account" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item name="password" class="enter-x">
          <a-input-password
            size="large"
            visibilityToggle
            v-model:value="formData.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item class="enter-x">
          <a-button type="primary" size="large" block @click="login" :loading="loading">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts">
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import type { UnwrapRef } from 'vue'
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { useFormRules } from '@/utils/rules'
interface FormState {
  account: string | never
  password: string | never
}
export default defineComponent({
  components: {
  },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute()
    const rules = useFormRules('login')

    const formData: UnwrapRef<FormState> = reactive({
      account: 'cboy',
      password: '123456',
    })
    const formRef = ref()
    const loading = ref(false)

    const login = () => {
      formRef.value
        .validate()
        .then(() => {
          loading.value = true
          if (formData.account === 'cboy' && formData.password === '123456') {
            setTimeout(() => {
              userStore.setUserInfo({
                userInfo: {
                  userId: '',
                  name: formData.account,
                  mobile: '',
                  permissions: [], // ['demo']
                  role: '',
                },
                token: 'token',
              })
              loading.value = false
              router.replace((route.query.redirect as string) || '/')
            }, 5e2)
          } else {
            message.error('账号或密码错误')
            loading.value = false
          }
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error)
        })
    }
    return { formRef, login, formData, rules, loading }
  },
})
</script>
<style lang="less">
.login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: linear-gradient(#ffcb93, #a8e5ff);
  &-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
