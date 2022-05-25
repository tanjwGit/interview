// splitPage
/**
 * 支持固定展示边界
 * curr左右页数足够的情况下，prev展示4页，next展示4页
 * pre展示的页数和next展示的页数尽可能的等于8页（在总页数足够的情况），
 * 例如prev展示1页，total足够的话，next最多展示7页。
 *
 * ，
 * 对已有的页数进行分割，如下面总页数7
 *
 * total = 7 curr = 6
 *         curr
 *           |
 * 1 2 3 4 5 6 7
 * ---------   --
 *     |        |
 *    prev     next
 *
 * total = 10, curr = 2
 *  curr
 *    |
 *  1 2 3 4 5 6 7 8 9 10
 *  -   -------------
 *  |       |
 *  prev    next
 *
 * total=12, curr = 5
 *            curr
 *            |
 *  1 2 3 4 5 6 7 8 9 10 11 12
 *    -------   --------
 *       |        |
 *      prev    next
 *
 */

function splitPage(n, current) {
  let leftPage = current - 1;
  let rightPage = current + 1;

  const prev = [];
  const next = [];

  const count = Math.min(n - 1, 8);

  while ((leftPage >= 1 || rightPage <= n) && rightPage - leftPage < count + 2) {
    if (leftPage >= 1) {
      prev.unshift(leftPage);
      leftPage--;
    }
    if (rightPage <= n) {
      next.push(rightPage);
      rightPage++;
    }
  }

  return {
    prev,
    current,
    next,
  };
}

splitPage(12, 6); // { prev: [2, 3, 4, 5], curr: 6, next: [7, 8, 9,10]}
splitPage(10, 5); // { prev: [1, 2, 3, 4], curr: 5, next: [6, 7, 8,9]}
splitPage(5, 2); // { prev: [1], curr: 2, next: [3, 4, 5]}
splitPage(10, 2); // { prev: [1], curr: 2, next: [3, 4, 5,6,7,8,9]}

/**
 * 支持固定展示边界
 *
 * 除了prev, curr, next，额外增加了2个边界first, last，分别代表第一页和最后一页
 * 由于多了first和last，因此prev和next各需要减少1页，默认展示2页
 * 例如（不包括省略号）：
 *            curr
 *             |
 * 1 ... 3 4 5 6 7 8 9 ... 12
 * -     -----   -----     --
 * |       |       |       |
 * first  prev    next    last
 *
 * 如果first和prev紧挨着，则first需要合并入prev中，即first为空（用-1表示）
 * 例如（不包括省略号）：
 *        curr
 *         |
 * 1 2 3 4 5 6 7 8 ... 10
 * -------   -----     -
 *    |        |       |
 *  prev      next    last
 *
 * 如果last和next紧挨着，同理操作
 */

function splitPageV2(n, current) {
  const {
    prev,
    next,
  } = splitPage(n, current);
  let first = -1;
  let last = -1;

  if (prev[0] !== 1) {
    first = 1;
    prev.shift();
  }

  if (next[next.length - 1] !== n) {
    last = n;
    next.pop();
  }

  return {
    prev,
    current,
    next,
    first,
    last,
  };
}

splitPageV2(12, 6); // { first: 1, prev: [3, 4, 5], curr: 6, next: [7, 8, 9], last: 12 }
splitPageV2(10, 5); // { first: -1, prev: [1, 2, 3, 4], curr: 5, next: [6, 7, 8], last: 10 }
splitPageV2(5, 2); // { first: -1, prev: [1], curr: 2, next: [3, 4, 5], last: -1 }
