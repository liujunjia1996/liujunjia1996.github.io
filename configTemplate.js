const path = require('path')

const getTemplate = (routesConfig) => {
    const baseContent =
`module.exports = {
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