
  
const getTemplate = (routesConfig) => {
    const baseContent =
`const { path } = require('@vuepress/utils')
module.exports = {
    lang: 'zh-CN',
    title: "liujunjia's blog",
    head: [
      [
        'link',{rel:'stylesheet',href: '/css/index.css'}
      ]
    ],
    themeConfig: {
        sidebar: ${routesConfig},
    },
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
    ],
}`
    return baseContent
}

module.exports = {
    getTemplate
}