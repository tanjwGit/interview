/**
Moka前端团队的技术分享2周一次，一次2人
为了确定下一次是谁来分享，团队中引入了分享积分制，具体规则为：

每个人都有一个积分，初始值是0。
每次分享后所有人摇一轮骰子，点数作为积分累加到各自的积分中，骰子范围是1-12。
积分最高的2个人将作为下一次的分享人。
为了避免连续分享，某个人分享后他的积分会被清零且跳过本次的摇骰子环节。
如果积分最高的人数超过2人，则相同分数的人继续摇骰子，直到决出2个积分最高的人。需要注意的是，这期间摇骰子的积分也同样累积。

请你编写代码模拟这个过程，数据结构和函数组织自由发挥
 * */

// 已实现为 可以自由 控制 一次抽出的人数

class Select {
  constructor(arr = [], n = 2) {
    this.currentShareList = this.initList(arr);
    this.lastShareList = [];
    this.endIndex = n - 1;
  }

  initList = (arr) => (arr.map((name) => ({
    name,
    integral: 0,
  })));

  getRandomIntegral = () => (Math.ceil(Math.random() * 12));

  resetIntegral = () => {
    const fn = (list) => list.map((item) => ({
      ...item,
      integral: 0,
    }));
    this.currentShareList = fn(this.currentShareList);
    this.lastShareList = fn(this.lastShareList);
  };

  get = () => {
    this.resetIntegral();
    let list = this.setIntegral(this.currentShareList);
    list = this.getAccordList(list);
    this.currentShareList = [...this.lastShareList, ...list.slice(this.endIndex + 1)];
    this.lastShareList = list.slice(0, this.endIndex + 1);
    console.log(this.endIndex);
    return this.lastShareList.map((item) => (item.name));
  };

  setIntegral = (list) => list.map((item) => ({
    ...item,
    integral: item.integral + this.getRandomIntegral(),
  })).sort((a, b) => (b.integral - a.integral));

  getAccordList = (currentList) => {
    if (currentList[this.endIndex] === currentList[this.endIndex + 1]) {
      let left = this.endIndex;
      let right = this.endIndex + 1;

      while (currentList[left] === currentList[left - 1]) {
        left--;
      }

      while (currentList[right] === currentList[right + 1]) {
        right++;
      }

      const needResetIntegralList = this.setIntegral(currentList.slice(left, right + 1));
      currentList.replace(left, right + 1, ...needResetIntegralList);
      return this.getAccordList(currentList);
    }
    return currentList;
  };
}

const selectShare = new Select(['a', 'b', 'c', 'd', 'e'], 2);
selectShare.get(); // ['b', 'c']
selectShare.get(); // ['e', 'a']
selectShare.get(); // ['d', 'b']
selectShare.get(); // ['c', 'e']
selectShare.get(); // ['d', 'b']
selectShare.get(); // ['c', 'a']
