'use strict';
const defaults = function(options) {
  options = options || {};
  if (typeof options === 'number' || (options && options.length !== undefined)) {
    options = {
      size : options
    };
  }
  if (typeof options.size === 'number') {
    options.size = [options.size];
  }
  options.size = options.size || [1, 2, 3];
  return options;
};

exports.start = function(r, options) {
  options = defaults(options);
  //count freq
  let obj = {};
  //each gram-size
  options.size.forEach((size) => {
    obj[size] = {};
    r.list.forEach((ts) => {
      if (ts.length >= size) {
        let gram = ts.slice(0, size);
        let str = gram.normal();
        obj[size][str] = obj[size][str] || 0;
        obj[size][str] += 1;
      }
    });
  });
  return obj;
};
exports.end = function(r, options) {};
exports.both = function(r, options) {};
