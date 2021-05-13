import { defineConfig } from 'vite'
/**
 * @plugins
 */
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import styleImport from 'vite-plugin-style-import'
import vueJsx from '@vitejs/plugin-vue-jsx'
/**
 * @extra
 */
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS(),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      '#': resolve(__dirname, 'types'), // 设置 `#` 指向 `types` 目录
    },
    extensions: ['.js', '.ts', '.vue', '.json'],
  },
  base: './', // 设置打包路径
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    target: 'es2015',
  },
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
})
