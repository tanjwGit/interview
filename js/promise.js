Promise.all = function (arr) {
  return new Promise((resolve, reject) => {
    const reslut = [];
    let count = 0;
    [...arr].forEach((item, index) => {
      Promise.resolve(item).then((value) => {
        reslut[index] = value;
        count++;
        if (count === arr.length) {
          resolve(reslut);
        }
      }).catch((e) => reject(e));
    });
  });
};
