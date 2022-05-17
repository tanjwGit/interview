1. [50道CSS基础面试题（附答案）需辩证看到, 存在不足之处](https://segmentfault.com/a/1190000013325778)


## css 的 bfc?
  #### 什么是BFC
  * 块级格式化上下文,  决定了元素如何对其内容进行定位以及与其他元素的关系和相互作用.
  * 是一个独立的渲染区域, 让bfc内部的元素与外部的元素相互隔离，互不影响(位置)，内外元素的定位不会相互影响

  #### 触发BFC的条件
  * 浮动元素（float 不是 none）
  * (绝对)定位元素（position为 absolute 或 fixed）
  * 内联块(行级块)元素(display:inline-block)
  * 表格单元格、或 display: table-cell
  * 表格标题、或 display: table-caption
  * 
  * 
  * 
  * 
  * 
  * 
  * 触发条件：  浮动 定位 overflow