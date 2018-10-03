'use strict';
//pivot k:[val,val] ->  val:k, val:k
const keyValue = function(obj) {
  let keys = Object.keys(obj);
  let isCompressed = true;
  if (keys[0] && typeof obj[keys[0]] === 'string') {
    isCompressed = false;
  }
  return keys.reduce((h, k) => {
    if (isCompressed === true) {
      let arr = obj[k];
      arr.forEach((a) => {
        if (h[a]) {
          //convert val to an array
          if (typeof h[a] === 'string') {
            h[a] = [h[a]];
          }
          //add it
          h[a].push(k);
        } else {
          h[a] = k;
        }
      });
    } else {
      h[k] = obj[k];
    }
    return h;
  }, {});
};
module.exports = keyValue;
