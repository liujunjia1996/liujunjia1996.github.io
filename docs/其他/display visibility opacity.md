## 结构

1. display: none (不占空间，不能点击)（场景，显示出原来这里不存在的结构）
2. visibility: hidden（占据空间，不能点击）（场景：显示不会导致页面结构发生变动，不会撑开）
3. opacity: 0（占据空间，可以点击）（场景：可以跟 transition 搭配）


## 继承性

opacity 和 display 会被继承：

若父元素应用了 opacity: 0 和 display: none，子孙元素无论怎么设置都是无法显示的

而若父元素应用 visibility: hidden，子孙元素应用 visibility: visible，那么该子孙元素就会毫无意外的显现出来


## 性能

display: none：修改元素会造成文档回流,读屏器不会读取 display: none 元素内容，性能消耗较大

visibility: hidden：修改元素只会造成本元素的重绘，性能消耗较少，读屏器会读取 visibility: hidden 元素内容

opacity: 0：修改元素会造成重绘，性能消耗较少：

- 在一般情况下，opacity 会触发重绘，即 `Recalculate style` => `Update Layer Tree`。不管你是否开启 GPU 提升为合成层与否
- 如果利用 animation 动画，对 opacity 做变化（animation 会默认触发 GPU 加速），则只会触发 GPU 层面的 composite，不会触发重绘


### 动画

只有 opacity 可以做动画效果，给 visibility 加 transition 只能延迟隐藏
