const getTemplate = (navbar,sidebar) => {
  const baseContent =
`
import { defaultTheme } from 'vuepress'
import { path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'

module.exports = {
lang: 'zh-CN',
title: "liujunjia's blog",
theme: defaultTheme({
  navbar: ${navbar},
  sidebar: ${sidebar},
  colorMode: 'light',
  colorModeSwitch: false
}),
head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
bundler: viteBundler({
  viteOptions: {},
  vuePluginOptions: {},
}),
plugins: [
  registerComponentsPlugin({
    componentsDir: path.resolve(__dirname, './components')
  }),
  searchPlugin({
    // options
  }),
]
}`
  return baseContent
}

module.exports = {
  getTemplate
}
