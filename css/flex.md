## Flex
  - 弹性布局

  - 容器指定为 `flex` 布局
    - `display: flex`
  - 行内元素使用 `flex`布局
    - `display: inline-flex`
  - 父级成为flex 容器后，子元素的 float、clear、vertical-align 属性 失效;


  - 容器上的属性 6 个:
    - flex-direction: 
      - 决定主轴的方向
      - row(raʊ] 柔): 行、水平方向，默认值
      - column [ˈkɑləm]  ke len 纵向
    - flex-wrap:
      - 在轴线上 放不下时 如何换行
    - flex-flow:
      - flex-direction属性和flex-wrap属性的简写形式
      - 默认值为: row nowrap 
    - justify-content:(ˈdʒʌstɪˌfaɪ] 贾斯特 fai 两端对齐):
      - 在主轴上的对齐方式
    - align-items: ( [əˈlaɪn] 尔莱恩)
      - 在交叉轴上的对齐方式
    - align-content:
      - 交叉轴多根轴线的对齐方式，如果轴线只有一根，不起作用

  - 子元素的属性 6 个:
    - order:
      - 定义项目的排列顺序。数值越小，排列越靠前，默认为0;
    - flex-grow:
      - 定义项目的放大比例
      - 默认值为 0, 有剩余空间不放大
    - flex-shrink: [ʃrɪŋk] 逊克
      - 定义项目的缩小比例
      - 默认为1, 空间不足时缩小
    - flex-basis: [ˈbeɪsɪs] bei sei s
      - 定义在分配多余空间之前，项目占据的主轴空间
      - 浏览器根据此属性计算是否有剩余空间
      - 默认值 auto, 项目原本大小
    - flex:
      - flex-grow, flex-shrink 和 flex-basis的简写
      - 默认值: 0 1 auto
      - auto: 1 1 auto
      - none: 0 0 auto
      - 其中 后两个属性可选， 所以设置 flex: 1，实际是设置了 flex-grow: 1, 剩余两个为默认是 1 auto
    - align-self:
      - 允许单个项目有与其他项目不一样的对齐方式
      - 覆盖align-items属性 
      - 默认值为auto, 表示继承 align-items

