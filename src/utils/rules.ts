import { computed, unref } from 'vue'
export function useFormRules(key?: string) {
  const getAccountFormRule = computed(() => createRule('请输入用户名'));
  const getPasswordFormRule = computed(() => createRule('请输入密码'));
  switch (key) {
    case 'login':
      return {
        account: unref(getAccountFormRule),
        password: unref(getPasswordFormRule),
      }
    default:
      return
  }
}
function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}
