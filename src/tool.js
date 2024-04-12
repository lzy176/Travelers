
//格式化字节
const formatBytes = (bytes) => {
  if (bytes >= 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'G';
  } else if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + 'M';
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + 'K';
  } else {
    return bytes + 'B';
  }
};
// 数组填充
const fillArray = (arr, resultArr) => {
  let lastArr = resultArr[resultArr.length - 1];
  if (lastArr && lastArr.length < 10) {
    let remaining = 10 - lastArr.length;
    lastArr.push(...getFillData(arr.splice(0, remaining)));
  }
  while (arr.length > 0) {
    resultArr.push(getFillData(arr.splice(0, 10)));
  }
  return resultArr;
};
// 填充数据
const getFillData = (arr) => {
  const result = [];
  for (const fill of arr) {
    const fillData = fill.name.split('.');
    result.push({
      name: fillData[0],
      type: fillData[fillData.length-1],
      size: formatBytes(fill.size),
      fileObject: fill,
    });
  }
  return result;
};
export {
  formatBytes,
  fillArray
}