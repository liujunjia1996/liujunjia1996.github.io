import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/home/runner/work/blog-vue-press/blog-vue-press/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("/home/runner/work/blog-vue-press/blog-vue-press/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
