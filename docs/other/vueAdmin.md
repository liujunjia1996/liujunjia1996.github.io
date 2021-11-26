最近开发了两个后台管理项目，使用到了 vue admin template ，在使用的过程中遇到了一些问题，在这里总结一下

### 项目结构

```js
src
├─ api
├─ App.vue
├─ assets
├─ components
├─ icons
├─ layout
├─ main.js
├─ permission.js
├─ router
├─ settings.js
├─ store
├─ styles
├─ utils
└─ views
```

#### api

在这里封装对接口的请求。另外。如果接口返回的数据格式和需要的不一致，可以在这里处理一下数据结构，如：

```
export function detail(id) {
  return request({
    url: 'module/' + id,
    method: 'get'
  }).then(res => {
    // 因为数据结构奇葩，需提前处理数据
    res.data.modelFlag = res.data.modelFlag + ''
    res.data.moduleModelRelList = res.data.moduleModelRelList
    .reduce((pre, cur) => {
      pre.push(cur.model)
      return pre
    }, [])
    res.data.moduleColorosVersionRelList = res.data.moduleColorosVersionRelList
    .reduce((pre, cur) => {
      pre.push(cur.colorosVersion)
      return pre
    }, [])
    res.data.time = [new Date(res.data.validBeginDate), new Date(res.data.validEndDate)]
    return res
  })
}
```

#### App.vue

页面的根组件，里面主要是一个 router-view

#### assets

图片、字体等资源

#### components

组件

#### icons

存放 svg 图标，vue admin template 在 svg logo 的使用上做了一些优化：

- 配置 webpack ，将 src/icons 里的 svg 从 file-loader exclude 掉，再将其 include 进 svg-sprite-loader
- 在 src/icon/index.js 使用 webpack requireContext api 自动导入所有 svg 
- 在 src/icon/index.js 全局注册 svg-icon 组件
- 使用 svgo 优化 svg 文件大小，配置文件是 src/icons/svgo.yml

配置好后，需要新图标只需在 src/icons/svg 新建图标文件，再在 svg-icon 组件上传入对应类名即可

#### layout

布局相关的组件：具体是Sidebar，Navbar，AppMain。其中 Navbar 里使用了Breadcrumb 和 Hamburger

#### main.js

入口文件。进行样式导入，插件注册，根组件挂载等逻辑

#### permission

权限相关逻辑，后面涉及

#### router

路由文件

#### settings.js

项目配置文件

#### store

vuex 文件

#### styles

全局样式

#### utils

工具函数，axios 封装，时间格式化，标题拼接，链接检测等

#### views

页面文件，项目的页面写在这里，是后续开发最常访问的文件夹

***

### 配置相关

做新项目时不只是直接进入 views 文件夹开发页面，还有一些其他的细节需要配置

- 页面 title ，在 src/settings.js 里面配置

- 页面 logo ，在项目根目录的 public 里进行替换

- 主题色修改

  新建 scss

  ```scss
  /* 改变主题色变量 */
  $--color-primary: teal;
  
  /* 改变 icon 字体路径变量，必需 */
  $--font-path: '~element-ui/lib/theme-chalk/fonts';
  
  @import "~element-ui/packages/theme-chalk/src/index";
  ```

  在 main.js 引入这个自定义的 scss 取代 element 默认 scss
  
- element-ui 按需引入（可选），如果对打包后的资源有体积上的要求，可以配合 babel-plugin-component 实现按需加载

***

### mock

可以利用 mock 来模拟接口调用，mock 的逻辑写在根目录的 mock 文件夹下，可以根据后端 yapi 上分好的模块建立对应的 js 文件，如 yapi 上有 table 模块，就在 mock 文件夹中创建 table.js ，按 yapi 模块创建对应 js 可以防止多人开发时，重复定义 mock 接口

table.js

```js
import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
//...
```

如果 table 模块除了 list 还有其他接口，只需在继续添加即可

mock 的语法可参考

http://mockjs.com/examples.html



***

### 权限控制

权限控制有两种场景：

- 路由级权限控制
- 页面级权限控制

#### 路由级权限控制

通过静态路由和动态路由的拼接实现。具体的做法是在 router 定义时分为静态路由和动态路由，在动态路由的 meta 里配置好可访问的角色数组，在获取到用户信息后，根据用户角色，过滤出可访问的动态路由，再拼接上静态路由即可得出完整的路由表

#### 页面级权限控制

页面级权限控制并不和路由级权限控制冲突，只是细粒度更小，可以实现更多的需求：

- 针对个别页面进行权限弹窗提示
- 在个别页面内根据不同角色显示不同内容

这些需求主要是将用户信息存入 vuex 中，再通过路由钩子、自定义组件、自定义命令等方式实现

***

### 部署相关

这里的部署主要针对接入 usp

因为接入 usp 的页面并不是部署在域名的根目录，以绝对路径请求的话转发不到网关拿不到资源，所以首先要修改 vue.config.js 中的 publicPath，将`/`改为`./`

其次，还要修改 .env 文件的 VUE_APP_BASE_API，改成对应 usp 域名的 /proxy/aaa/bbb , aaa 为 usp 项目名称，bbb 为接口前缀，这样使得请求可以准确的到达网关，可以被进一步转发至后端

最后，接入 usp 还需配置 nginx ：

```nginx
server {
        listen       8299;
        real_ip_header proxy_protocol;

        location  /api/ {
                proxy_http_version 1.1;
                proxy_set_header Cookie $http_cookie;
                proxy_set_header Host   $host;
                proxy_set_header X-Real-IP      $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass  http://10.84.20.154:9052/api/;
        }

        location / {
                root /home/service/app/game-space-admin-page/release;
                rewrite ^(.*)$ /index.html break;
        }

        location ~* \.(js|gif|jpg|jpeg|png|css|icon|woff|ttf)$ {
                root /home/service/app/game-space-admin-page/release;
                add_header Cache-Control no-cache;
        }
}
```
注：后端地址为域名时要去掉 `proxy_set_header Host   $host;`
