const fs = require('fs')
const { format } = require('path')
const path = require('path')
const mdp = require('md-padding')

const { getTemplate } = require('./configTemplate')
const { getMap } = require('./navbarMap')
const MD_DIR = './docs'
const OUTPUT_DIR = path.resolve(__dirname, './docs/.vuepress')
const OUTPUR_FILENAME = 'config.js'


const map = getMap();

const readDir = (root) => {
    var navbar = [];
    var sidebar = [];
    const files = fs.readdirSync(root)

    files.forEach(name => {
        if (name.startsWith('.') || name.includes("README")) {
            return;
        }
        const filePath = `${root}/${name}`
        const state = fs.lstatSync(filePath)
        if (state.isDirectory()) {
            navbar.push(
                ` {
                    link: '/${name}',
                    text: '${map[name]}',
                  }
                `
            )
            var files = fs.readdirSync(filePath);
            var children = [];
            files.forEach(name => {
                if (name.startsWith('.') || name.includes("README")) {
                    return;
                }
                const subFilePath = `${filePath}/${name}`
                const state = fs.lstatSync(subFilePath)
                if (state.isFile()) {
                    if (subFilePath.endsWith('.md')) {
                        let simpleName = name.split(".md")[0]
                        children.push(
                            ` {
                                text: '${simpleName}',
                                link: '${subFilePath.split('docs')[1]}',
                              }`
                        )
                    }
                }
            })

            let father =
                `'/${name}':[{
                    children: [${children}],
               }] `
            sidebar.push(father)

        } else if (state.isFile()) {
            if (filePath.endsWith('.md')) {
                let simpleName = name.split(".md")[0]
                sidebar.push(
                    `'/${simpleName}': {
                        text: '${simpleName}',
                        link: '${filePath.split('docs')[1]}',
                      }`
                )
            }
        }
    })
    return ["[" + navbar + "]", "{" + sidebar + "}"];
}


const format_md = (root) => {
    const files = fs.readdirSync(root)

    files.forEach(name => {
        if (name.startsWith('.')) {
            return;
        }
        const filePath = `${root}/${name}`
        const state = fs.lstatSync(filePath)
        if (state.isDirectory()) {
            // 递归一下
            format_md(filePath)
        } else if (state.isFile()) {
            if (filePath.endsWith('.md')) {
                formatContent = mdp.padMarkdown(fs.readFileSync(filePath).toString())
                // 重新格式化后写入
                fs.writeFileSync(filePath, formatContent)

            }
        }
    })
}

const run = () => {
    const root = path.resolve(__dirname, MD_DIR)

    const template = getTemplate(...readDir(root))

    fs.writeFileSync(path.resolve(OUTPUT_DIR, OUTPUR_FILENAME), template)

    format_md(root);
}

run()
