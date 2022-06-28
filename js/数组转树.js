// 数组转树
const input = [
  {
    id: 1,
    val: '学校',
    parentId: null,
  },
  {
    id: 4,
    val: '学生1',
    parentId: 2,
  },
  {
    id: 5,
    val: '学生2',
    parentId: 3,
  },
  {
    id: 6,
    val: '学生3',
    parentId: 3,
  },
  {
    id: 2,
    val: '班级1',
    parentId: 1,
  },
  {
    id: 3,
    val: '班级2',
    parentId: 1,
  },
];

function arrToTree(list) {
  const map = new Map();
  let rootId = null;
  list.forEach((item) => {
    let node = map.get(item.id);
    let parentNode = map.get(item.parentId);
    if (!item.parentId) {
      rootId = item.id;
    }
    // if (!node) {
    //   node = item;
    // } else {
    //   node = { ...item, ...node };
    // }
    node = node ? { ...item, ...node } : item;
    map.set(item.id, node);

    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(node);
    } else {
      parentNode = {
        children: [],
        id: item.id,
      };
      map.set(item.parentId, parentNode);
    }
  });
  return map.get(rootId);
}

arrToTree(input);

// 简化版本
// 直接阅读 比较难以理解
function arrToTreeV2(list) {
  const map = new Map();
  let rootId = null;

  list.forEach((item) => {
    const { id, parentId } = item;
    const node = map.has(id) ? { ...item, ...map.get(id) } : item;
    map.set(id, node);
    let parentNode = map.has(parentId) ? map.get(parentId) : { children: [], id: parentId };
    parentNode = parentNode.children ? parentNode : { ...parentNode, children: [] };
    parentNode.children.push(node);
    if (parentId) {
      map.set(parentId, parentNode);
    } else {
      rootId = id;
    }
  });
  return map.get(rootId);
}

arrToTreeV2(input);
