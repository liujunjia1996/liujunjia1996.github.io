const getTemplate = (navbar,sidebar) => {
  const baseContent =
`
const { path } = require('@vuepress/utils')
const { viteBundler } = require('@vuepress/bundler-vite')
const { localTheme } = require('./theme')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { searchPlugin } = require('@vuepress/plugin-search')

module.exports = {
lang: 'zh-CN',
title: "liujunjia's blog",
theme: localTheme({
  navbar: ${navbar},
  sidebar: ${sidebar},
  colorMode: light,
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
