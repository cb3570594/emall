import { createApp } from 'vue'
import createAntdImport from '@/plugins/antdImport'
import App from './App.vue'
import router from './router/index'
import { store } from './store'
import 'virtual:windi.css'
import '@/style/fix.less'
import '@/style/global.less'

const app = createApp(App)
createAntdImport(app).use(router).use(store).mount('#app')
