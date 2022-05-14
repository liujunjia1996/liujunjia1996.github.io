const { path } = require("@vuepress/utils");
const { defaultTheme } = require("vuepress");
module.exports = {
    localTheme: (options) => {
        return {
            name: "vuepress-theme-local",
            extends: defaultTheme(options),
            layouts: {
                Layout: path.resolve(__dirname, "Layout.vue"),
            },
        };
    },
};
