1. https://leetcode.cn/problems/search-insert-position/submissions/
2. https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/

3. https://leetcode.cn/problems/remove-element/submissions/




- 双指针
  - 双指针二分法
    - 数组、有序、无重复元素
  - 快慢双指针法
    - 通过一个快指针和慢指针在一个for循环下完成两个for循环的工作
  - 滑动窗口法:
    - 就是不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果
    - 最、连续子串
  - 两端双指针法(两端向中移动)
    - 

- 链表
  - 直接只用原链表;
  - 设置一个虚拟头节点;

- 字符串
  - 翻转、旋转、1替换n
    - 双指针
    - 局部翻转 + 整体翻转
    - 整体翻转 + 局部翻转
  - 字符串匹配
    - KMP
      - 当出现字符串不匹配时，可以记录一部分之前已经匹配的文本内容，利用这些信息避免从头再去做匹配
      - 匹配一个字符串是否是另一个的子串
      - 匹配一个字符串能否由子串重构构成

      - 前缀表的计算
        1. 初始化
        2. 处理前后缀不相同的情况
        3. 处理前后缀相同的情况
- 回溯法
  - 组合问题
  - 切割问题
  - 子集问题
  - 排列问题
  - 棋盘问题
  - for () {
    递归
  }