const unpackPrefix = function(str) {
  let lines = str.split(',');
  return lines.reduce((h, line) => {
    let arr = line.split('|');
    let key = arr[0];
    //if there is only one '|', it is the val
    if (arr.length === 2) {
      h[key] = arr[0] + arr[1];
      return h;
    }
    //otherwise, key is combination of first two..
    if (arr[1] !== '') {
      key += arr[1];
    }
    h[key] = arr[0] + arr[2];
    return h;
  }, {});
};
module.exports = unpackPrefix;
