'use strict';

const methods = {
  inflection: (m) => {
    return {
      plural: '',
      singular: ''
    };
  }
};

const parse = function(obj) {
  obj = obj || methods;
  let all = {};
  Object.keys(obj).forEach((k) => {
    if (obj[k] && methods[k]) {
      all[k] = methods[k](this);
    }
  });
  return all;
};

module.exports = parse;
