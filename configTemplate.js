
  
const getTemplate = (navbar,sidebar) => {
    const baseContent =
`const { path } = require('@vuepress/utils')
module.exports = {
  lang: 'zh-CN',
  title: "liujunjia's blog",
  themeConfig: {
      navbar: ${navbar},
      sidebar: ${sidebar},
  },
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  bundler: '@vuepress/bundler-vite',
  theme: path.resolve(__dirname, './theme'),
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components')
      }
    ]
  ],
}`
    return baseContent
}

module.exports = {
    getTemplate
}
