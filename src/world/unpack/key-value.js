
//pivot k:[val,val] ->  val:k, val:k
const keyValue = function(obj) {
  return Object.keys(obj).reduce((h, k) => {
    let arr = obj[k];
    arr.forEach((a) => {
      h[a] = k;
    });
    return h;
  }, {});
};
module.exports = keyValue;
