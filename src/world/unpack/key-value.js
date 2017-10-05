
//pivot k:[val,val] ->  val:k, val:k
const keyValue = function(obj) {
  return Object.keys(obj).reduce((h, k) => {
    h[obj[k]] = k
    return h;
  }, {});
}
module.exports = keyValue
