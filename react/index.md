## react 当中 key 的作用？
- `key` 在同级元素中，要保持唯一性、稳定性;
- 用于 `diff` 算法中
  - 借助 `key` 来识别当前元素需要的操作， 新增、删除、更新、移动，减少不必要的操作元素的开销，提高性能;
- 需要借助Key值来判断元素与本地状态的关联关系（TODO: 暂时不懂）

## 调用 `setState` 之后发生了什么?
  - 从三层架构说起
    - Scheduler([ˈskedʒuːlər] 斯盖酒ler): 调度器
      - 调度任务优先级，高优先级优先进入 Reconciler;
    - Reconciler(['rekənsaɪlə] ruai 肯 塞ler) : 协调器
      - 负责找出变化的组件
      - 从递归处理虚拟DOM, 16+ 可中断的循环处理;(通过遍历的方式实现可中断的递归)
    - Renderer(ruan de er ler): 渲染器
      - 将变化的组件重渲染到页面;

    - 旧:
      - Reconciler与Renderer是交替工作;
    - 新:
      - Reconciler 为变化的虚拟DOM打上标记，当所有组件都完成Reconciler的工作，在统一交给 renderer处理;
      - Renderer 根据虚拟DOM上的标记，同步执行DOM操作;
    - 整个更新流程：
      1. 收到更新任务，查看有无更高优先级的任务需要先执行; 改变state, 调用Reconciler;
        - 小顶堆的数据结构
      2. Reconciler收到更新，diff 出变化的虚拟DOM, 打上相应标记; 调用Renderer;
      3. 重新渲染被打标记的虚拟DOM;

      > 其中 步骤 1，2 可能会由于 有更高优先级任务插入、当前桢没有剩余时间而被打断;

  <br />

  - 各架构层的小阶段
    - Scheduler
    - Reconciler: render 阶段: 创建并构建Fiber树
      - 通过遍历的方式实现可中断的递归
      - “递”阶段
        - 从rootFiber 向下深度优先遍历，为遍历到的每个Fiber节点调用beginWork方法
          - beginWork:
            - 传入当前Fiber节点，创建子Fiber节点;
            - update:
              - 如果current存在，在满足一定条件时可以复用current节点，克隆current.child, 不新建子Fiber节点;
                - 满足一定条件时是指：
                - type、props相同
                - 优先级不够时,TODO
                  - 优先级不够，直接复用;(TODO: 相当于先不更新 推测：需要确认这个想法对不对)
            - mount:
              - 根据fiber.tag不同，创建不同类型的子Fiber节点;
            - reconcileChildren: Reconciler模块的核心部分
              - 对于mount的组件，创建新的子Fiber节点
              - 对于update的组件
                - 将当前组件与该组件在上次更新时对应的Fiber节点比较(即diff算法),将比较结果生成新的fiber节点;
            - beginWork流程图
              ![beginWork流程图](https://react.iamkasong.com/img/beginWork.png)
        - 当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段;
      - “归”阶段
        - 在“归”阶段会调用completeWork (opens new window)处理Fiber节点;
        - 当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点，会进入其兄弟Fiber的“递”阶段,如果不存在兄弟Fiber，会进入父级Fiber的“归”阶段;
        - completeWork:
          - update时:
            - Fiber节点已经存在对应DOM节点, 所以不需要生成DOM节点
            - 仅处理props
              - 被处理的props会放入新fiber节点的updateQueue队列中, 在commit阶段被渲染在页面上
                - 新fiber节点: 即workInProgress
          - mount时
            - 为Fiber节点生成对应的DOM节点
            - 将子孙DOM节点插入刚生成的DOM节点中;
            - 与update类似的处理props
          - completeWork执行完：
            - 每个执行完completeWork且存在effectTag的fiber节点，会被保存在 effectList 单向链表中;
          - completeWork流程图
          ![completeWork流程图](https://react.iamkasong.com/img/completeWork.png)
          
      - “递”和“归”阶段会交错执行直到“归”到rootFiber;
    - Renderer: commit阶段
      - ~~在rootFiber.firstEffect上保存了一条需要执行副作用的Fiber节点的单向链表effectList，这些Fiber节点的updateQueue中保存了变化的props~~,以下为人话
      - rootFiber.firstEffect 保存了一条链表，链表中的每个fiber节点都是需要执行副作用的节点，每个fiber节点的updateQueue数组中，保存了发生变化的props;

      - commit阶段 主要分为 三个子阶段，形成 5 个时机;
        - before mutation之前 ([mjuˈteɪʃ(ə)n] miu  tei 申)
        - before mutation阶段， 执行DOM操作前 
        - mutation阶段（执行DOM操作）
        - layout阶段（执行DOM操作后）
        - layout之后
      - 额外工作: 不需要掌握
        - before mutation之前: 做一些变量赋值，状态重置的工作;
          - 触发useEffect回调
          - 重置优先级相关变量
          - 重置Scheduler绑定的回调函数
          - 重置全局变量
          - 清除已完成的discrete updates，例如：用户鼠标点击触发的更新。 （TODO: 暂时不懂）
          - 将有effectTag的根节点插入到effectList尾部, 保证有effect的fiber都在effectList中
            - 是因为每个fiber的effectList只包含他的子孙节点, 根节点如果有effectTag则不会被包含进来
        - layout之后:
          - useEffect相关的处理
          - 性能追踪相关
          - 检测无限循环的同步任务
          - 在离开commitRoot函数前调用，触发一次新的调度，确保任何附加的任务被调度
          - 执行同步任务，这样同步任务不需要等到下次事件循环再执行
            - 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行
            - 或useLayoutEffect
      - before mutation阶段:
        - 遍历effectList并调用commitBeforeMutationEffects函数处理;
          - 处理DOM节点渲染/删除后的 autoFocus、blur 逻辑(TODO: 暂时不懂)
          - 调用getSnapshotBeforeUpdate
          - 调度useEffect
            - scheduleCallback: Scheduler模块提供的，指定一个优先级，异步调度一个回调函数
            - 被异步调度的回调函数就是触发useEffect的方法flushPassiveEffects
            - useEffect异步调用分为三步：
              1. before mutation阶段在scheduleCallback中调度flushPassiveEffects
              2. layout阶段之后将effectList赋值给rootWithPendingPassiveEffects
              3. scheduleCallback触发flushPassiveEffects，flushPassiveEffects内部遍历rootWithPendingPassiveEffects
      - mutation阶段:
        - mutation阶段也是遍历effectList, 调用commitMutationEffects
          - ~~ContentReset effectTag重置文字节点(不需要关注)~~
          - ~~更新ref(不需要关注)~~
          - 分别处理不同的effectTag:
            - Placement:
              1. 获取父级DOM节点
              2. 获取Fiber节点的DOM兄弟节点
                - 执行很耗时，当在同一个父Fiber节点下依次执行多个插入操作，查找算法的复杂度为指数级
                - 因为自定义react组件，不会生成DOM节点，但会生成fiber树,所以Fiber树和渲染的DOM树节点并不是一一对应的。要从Fiber节点找到DOM节点很可能跨层级遍历
              3. 根据DOM兄弟节点是否存在决定调用parentNode.insertBefore或parentNode.appendChild执行DOM插入操作
            - Update:
              - 对函数组件而言: 会遍历effectList, 执行所有useLayoutEffect hook的销毁函数
              - 对原生节点而言: 将render阶段 completeWork中为Fiber节点赋值的updateQueue对应的内容渲染在页面上
                - updateQueue: 即变化的props;
            - Deletion
              - 递归调用Fiber节点及其子孙Fiber节点中fiber.tag为ClassComponent的componentWillUnmount，并从页面移除Fiber节点对应DOM节点
              - 解绑ref
              - 调度useEffect的销毁函数
      - layout阶段:
        - 同样遍历effectList, 执行commitLayoutEffects
          - 调用生命周期: 
            - class组件: componentDidMount、componentDidUpdate
            - hook组件: useLayoutEffect、useEffect销毁函数、useEffect回调函数
            - 调用触发更新的 this.setState 的回调函数
            - 调用ReactDOM.render的第三个参数回调函数;
          - 获取DOM实例，更新ref
          - 切换current Fiber树;

## React 首次渲染
  - react 不会为新生成的fiber 设置 effectTag标记 = Placement(插入)
  - 因为如果生成的话，commit阶段会为每个fiber节点，执行一次插入，导致大量的DOM操作，十分低效
  - react 只在rootFiber 设置Placement effectTag, 这样commit阶段只进行一次插入操作;
    - 因为调和的归阶段，mount时，completeWork 函数中会执行appendAllChildren函数;
    - 会将已生成的子孙DOM节点插入当前生成的DOM节点下,当“归”到rootFiber时，就有一个构建好的离屏DOM树;

## commit阶段如何找到所有有effectTag的Fiber节点并依次执行effectTag对应操作？
  - ~~在Reconciler阶段的归阶段，completeWork 的上层函数 completeUnitOfWork 中，每一个执行完 completeWork， 用下面的人话~~
  - 在Reconciler阶段的归阶段，每个执行完completeWork且存在effectTag的fiber节点，会被保存在 被称作effectList 的单向链表中;
    - effectList 只是一个称呼，实际没有这个变量声明;
    - effectList中第一个Fiber节点保存在 fiber.firstEffect，最后一个元素保存在fiber.lastEffect。
  - 在“归”阶段，所有有effectTag的Fiber节点都会被追加在effectList中，最终形成一条以rootFiber.firstEffect为起点的单向链表（即：所谓的effectList）
  - 在commit阶段只需要遍历effectList就能执行所有effect;


## 生命周期 及 useEffect、useLayoutEffect 在三层架构中具体的执行时机？
- render阶段
  - 递阶段
  - 归阶段
  - componentWillXXX (暂不明确具体阶段)
- commit阶段
  - before mutation阶段:
    - `getSnapshotBeforeUpdate`
    - 调度 `useEffect`
  - mutation阶段:
    - 更新的节点: useLayoutEffect的销毁函数
    - 删除的节点: componentWillUnmount
  - layout阶段:
    - 更新的class节点: componentDidUpdate
    - 新增的class节点: componentDidMount
    - hook: useLayoutEffect回调函数、useEffect销毁函数、useEffect回调函数
    - 调用触发更新的 this.setState 的回调函数
    - 调用ReactDOM.render的第三个参数回调函数;

## Diff 算法？

## 优先级的调度？

## useLayoutEffect与useEffect的区别?
  - mutation阶段会执行useLayoutEffect hook的销毁函数
  - layout阶段会执行useLayoutEffect回调函数
  - 所以useLayoutEffect hook从上一次更新的销毁函数调用到本次更新的回调函数调用是同步执行的
  - useEffect 先在before mutation调度，然后Layout阶段完成后异步执行；
## 为什么需要异步调用useEffect？
  > 摘录自React文档effect 的执行时机:
  >> 与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。
  - useEffect异步执行的原因主要是防止同步执行时阻塞浏览器渲染;

  <!-- ## 其他: 暂定为以上内容 -->