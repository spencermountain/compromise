'use strict';
exports.pluck = function(arr, str) {
  arr = arr || [];
  return arr.map(function(o) {
    return o[str];
  });
};

//make an array of strings easier to lookup
exports.toObj = function(arr) {
  return arr.reduce(function(h, a) {
    h[a] = true;
    return h;
  }, {});
};
//turn key->value into value->key
exports.reverseObj = function(obj) {
  return Object.keys(obj).reduce(function(h, k) {
    h[obj[k]] = k;
    return h;
  }, {});
};

exports.flatten = function(arr) {
  let all = [];
  arr.forEach(function(a) {
    all = all.concat(a);
  });
  return all;
};

//string utilities
exports.endsWith = function(str, suffix) {
  if (str && suffix && str.indexOf(suffix, str.length - suffix.length) !== -1) {
    return true;
  }
  return false;
};
exports.startsWith = function(str, prefix) {
  if (str && str.length && str.substr(0, 1) === prefix) {
    return true;
  }
  return false;
};

exports.extend = function(a, b) {
  const keys = Object.keys(b);
  for(let i = 0; i < keys.length; i++) {
    a[keys[i]] = b[keys[i]];
  }
  return a;
};

exports.titlecase = function(str) {
  if (!str) {
    return '';
  }
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// typeof obj == "function" also works
// but not in older browsers. :-/
exports.isFunction = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};


//uncompress data in the adhoc compressed form {'ly':'kind,quick'}
exports.expand_suffixes = function(list, obj) {
  let keys = Object.keys(obj);
  let l = keys.length;
  for (let i = 0; i < l; i++) {
    const arr = obj[keys[i]].split(',');
    for (let i2 = 0; i2 < arr.length; i2++) {
      list.push(arr[i2] + keys[i]);
    }
  }
  return list;
};
//uncompress data in the adhoc compressed form {'over':'blown,kill'}
exports.expand_prefixes = function(list, obj) {
  let keys = Object.keys(obj);
  let l = keys.length;
  for (let i = 0; i < l; i++) {
    const arr = obj[keys[i]].split(',');
    for (let i2 = 0; i2 < arr.length; i2++) {
      list.push(keys[i] + arr[i2]);
    }
  }
  return list;
};
