import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt'
import AutoImport from 'unplugin-auto-import/vite'
import ViteComponent from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import SvgLoader from 'vite-svg-loader'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt3-demo',
      meta: [
        {
          'http-equiv': 'X-UA-Compatible',
          'content': 'IE=Edge,chrome=1'
        },
        { name: 'renderer', content: 'webkit' },
        // 禁止爬虫的约定俗成
        { name: 'robots', content: 'noindex,nofollow' },
        {
          hid: 'description',
          name: 'description',
          content: '我的nuxt3项目'
        }
      ],
      viewport: 'width=device-width,initial-scale=1,minimum-scale=0.625,maximum-scale=1,user-scalable=no',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['@/assets/less/global.less', '@/assets/css/tailwind.css'],
  // 设置自动引入的组件
  components: {
    dirs: ['~/components']
  },
  srcDir: 'src/',
  alias: {},
  // 自动导入下级的目录
  autoImports: { dirs: ['composables/**'] },
  extensions: ['.ts', '.js'],
  // 项目自定义插件
  plugins: [],
  vite: {
    plugins: [
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: ['vue', 'vue-router', 'pinia', { '@vueuse/core': ['useDark', 'useToggle', 'useIntervalFn'] }],
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dirs: [resolve(process.cwd(), 'src/store')],
        eslintrc: {
          enabled: false,
          filepath: 'src/types/.auto-imports.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      // ui引入只能使用此插件
      ViteComponent({ resolvers: [ArcoResolver({ resolveIcons: true })] }),
      SvgLoader({ svgoConfig: {} }),
      eslintPlugin({
        cache: false,
        include: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.d.ts'],
        exclude: ['node_modules']
      })
    ],
    server: {
      open: false,
      fs: {
        strict: true
      },
      host: '0.0.0.0',
      port: 3001,
      proxy: {
        '/dz': {
          target: 'http://192.168.98.122:81/dz', // 测试
          // target: 'http://icanhazip.com', // 开发
          // target: 'http://192.168.198.114:2510/defraud', // 开发 李韬
          // target: 'http://192.168.198.206:2510/defraud', // 开发 彭卫
          rewrite: path => path.replace(/^\/dz/, ''),
          changeOrigin: true,
          secure: false,
          ws: true
        }
      }
    }
  }
})
