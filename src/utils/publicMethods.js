let publicMethods = {};

publicMethods.RandomArray = function (arr, count) {
  let resultArray = [];
  for (let i = 0; i < count; i++) {
    let index = Math.random() * arr.length;
    resultArray.push(arr.slice(parseInt(index), parseInt(index) + 1)[0]);
  }
  return resultArray;
};

export default publicMethods;




