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
