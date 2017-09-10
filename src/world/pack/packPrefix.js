const cleanup = function(str) {
  str = str.replace(/[,|]/g, '');
  return str;
};

const compareBoth = function(a, b) {
  a = cleanup(a).split('');
  b = cleanup(b).split('');
  let common = [];
  let suffA = [];
  let suffB = [];
  let len = a.length;
  if (b.length > a.length) {
    len = b.length;
  }
  for (let i = 0; i < len; i++) {
    if (a[i] === b[i]) {
      common.push(a[i]);
    } else {
      suffA = a.slice(i, a.length);
      suffB = b.slice(i, b.length);
      break;
    }
  }
  let str = common.join('');
  if (suffA.length > 0) {
    str += '|' + suffA.join('');
  }
  str += '|' + suffB.join('');
  return str;
};

const packPlurals = function(obj) {
  return Object.keys(obj)
    .map(k => {
      return compareBoth(k, obj[k]);
    })
    .join(',');
};

module.exports = packPlurals;

// let str = packPlurals({
//   house: 'houses',
//   matrix: 'matrices'
// });
// console.log(str);
// const unpack = require('./unpack');
// console.log(unpack(str));
