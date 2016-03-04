'use strict';
exports.pluck = function(arr, str) {
  arr = arr || [];
  return arr.map(function(o) {
    return o[str];
  });
};

exports.flatten = function(arr) {
  let all = [];
  arr.forEach(function(a) {
    all = all.concat(a);
  });
  return all;
};

exports.sameArr = function(arr, arrB) {
  if (typeof arr !== typeof arrB || arr.length !== arrB.length) {
    return null;
  }
  for(let i = 0; i < arr.length; i++) {
    if (arr[i] !== arrB[i]) {
      return false;
    }
  }
  return true;
};

exports.compact = function(arr) {
  return arr.filter(function(a) {
    if (a === undefined || a === null) {
      return false;
    }
    return true;
  });
};

//shallow-combine two objects
exports.extend = function (objA, objB) {
  Object.keys(objB).forEach(function (k) {
    objA[k] = objB[k];
  });
  return objA;
};

//last element in an array
exports.last = function(arr) {
  if (arr.length <= 0) {
    return null;
  }
  return arr[arr.length - 1];
};

//string utilities
exports.endsWith = function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};
exports.startsWith = function(str, prefix) {
  if (str && str.length && str.substr(0, 1) === prefix) {
    return true;
  }
  return false;
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
