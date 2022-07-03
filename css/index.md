1. [50道CSS基础面试题（附答案）需辩证看到, 存在不足之处](https://segmentfault.com/a/1190000013325778)


## css 的 bfc?
  #### 什么是BFC
  * 块级格式化上下文,  会改变盒子内的渲染规则, 
  * 决定了元素如何对其内容进行定位以及与其他元素的关系和相互作用.
  * 是一个独立的渲染区域, 让bfc内部的元素与外部的元素相互隔离，互不影响(位置)，内外元素的定位不会相互影响

  #### 触发BFC的条件
  * 浮动元素 float:left/right  (会打内部把元素转换成inline-block)
  * (绝对)定位元素（position为 absolute 或 fixed）
  * 内联块(行级块)元素(display:inline-block)
  * overflow:hidden(超出部分隐藏)

  * 表格单元格、或 display: table-cell
  * 表格标题、或 display: table-caption

## margin 塌陷 和 合并
  - 父子塌陷
    - 父子嵌套的结构
    - 在垂直方向上的margin取两者之间的最大值
    - 父级触发 bfc 可解决
  - 兄弟合并
    - 兄弟关系的两个元素
    - 垂直方向上的margin取两者之间的最大值
    - 解决: 可以使用BFC解决，但一般选择不解决，因为不能随便加结构，选择通过改变margin值解决

## 清除浮动的方式
  - float会使元素产生浮动流，块级元素看不到产生浮动流的元素，产生BFC的元素和文本类属性的元素可以看到
  - 清除
    - 利用行级元素占位，行级元素可以识别到
    - 利用伪元素，伪元素是天生的行级元素，选中就可（标签名::before{}标签名::after{}）
    - 触发 BFC

## 回流 和 重绘？
  - 回流:
    - render tree 中的一些元素的尺寸、布局发生变化时需要重新计算布局信息; border margin padding width height
  - 重绘:
    - render tree 中的一些元素 需要更新，但是不会影响到布局信息， 比如 改变透明度、平移、颜色
  - 回流一定发生重绘

## 隐藏一个dom的方式？
  - display: none 回流 + 重绘
  - visibility: hidden; 重绘
  - opacity: 0; 重绘
  - z-index: n; 利用层级，被遮盖，隐藏  回流、重绘
  

## 选择器优先级权重
  - !important         infinity(无穷大)
  - 行间样式            1000
  - id选择器            100                     #id{}
  - class选择器         10                      .class{}
    - 属性选择器                                 [class='demo']{}
    - 伪类选择器                                  div:hover{}
  -  标签｜伪元素        1                        div{}  div::after{}
  - 通配符选择器         0                        *{}


## css中的标签分类
  - 行级元素（内联元素）
    - 内容决定dom的位置
    - 不能通过css改变宽高
        - padding: top 不起作用
        - margin: top bottom 不起作用
    - 如: span、em、a、strong、del
  - 块级元素
    - 独占一行
    - css 可以改变宽高

    - 如: div、p、ui、li、ol、form、address
  - 行级块元素
    - 内容决定大小
    - css又可以改变宽高

## html中的img和css中的img有什么不同？
  - css中 图片作为背景，加载失败时不会有图片的占位标识，不会出现红叉
    - 因为只是一个样式，所以不会占位
  - 网页加载过程中
    - css背景图会等到html结构加载完成后开始加载
    - img 标签的图片，是在html结构加载中异步加载

  - 不重要的图片使用 css background-img