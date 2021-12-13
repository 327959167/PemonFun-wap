// 数组内取任意个随机值
let publicMethods = {};

publicMethods.RandomArray = function (arr, count) {
  let resultArray = [];
  for (let i = 0; i < count; i++) {
    let index = Math.random() * arr.length;
    resultArray.push(arr.slice(parseInt(index), parseInt(index) + 1)[0]);
  }
  resultArray = [...new Set(resultArray)]
  return resultArray;
};

export default publicMethods;




