//turn big numbers, like 2.3e+22, into a tonne of 0's
const numToString = function(n) {
  if (n < 1000000) {
    return String(n);
  }
  var str = n.toFixed(0);
  if (str.indexOf('e+') === -1) {
    return str;
  }
  return str.replace('.', '').split('e+').reduce(function(p, b) {
    return p + Array(b - p.length + 2).join(0);
  });
};
module.exports = numToString;
// console.log(numToString(2.5e+22));
