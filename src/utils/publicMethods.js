/*
 * @Author: 王龙金 
 * @Date: 2022-03-15 10:06:31 
 * @Last Modified by: 王龙金
 * @Last Modified time: 2022-03-16 14:25:51
 */

// 数组内取任意个随机值（数组，数目）
function RandomArray(arr, count) {
  let resultArray = [];
  for (let i = 0; i < count; i++) {
    let index = Math.random() * arr.length;
    resultArray.push(arr.slice(parseInt(index), parseInt(index) + 1)[0]);
  }
  resultArray = [...new Set(resultArray)]
  return resultArray;
};

// 根据数组对象内某一值大小排序（数组对象，true升序，fasle降序）
function compare(property, desc) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    if (desc == true) { return value1 - value2; }
    else { return value2 - value1; }
  }
};

// 时间转换(这里的转换是查看文字发布了多久，文章发布时间戳-当前时间戳)
function filterTime(arr) {
  var timestamp = new Date().getTime();
  arr.forEach((item, index) => {
    let foo1 = timestamp - (item.created_time / 1000);
    let realy = Math.floor(foo1 / 1000)
    let h = Math.floor(realy / 3600)
    let m = Math.floor(realy % 3600 / 60)
    if (h != 0) {
      var str = `${h}小时${m}分前发布`
    } else {
      var str = `${m}分钟前发布`
    }
    item.created_time = str;
  })
  return arr;
};

// 随机数取值，保留12位数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseFloat(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseFloat(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
};
function randomNum2(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
};



export default { RandomArray, compare, filterTime, randomNum, randomNum2 };




