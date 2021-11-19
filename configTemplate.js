const path = require('path')

const getTemplate = (routesConfig) => {
    const baseContent =
`module.exports = {
    lang: 'zh-CN',
    title: "liujunjia's blog",
    themeConfig: {
        sidebar: ${routesConfig},
    },
}`
    return baseContent
}

module.exports = {
    getTemplate
}