'use strict';

const methods = {
  array: (m) => {
    return m.list.map((ts) => {
      return ts.normal();
    });
  },
  plaintext : (m) => {
    return m.list.reduce((str, ts) => {
      str += ts.plaintext();
      return str;
    }, '');
  },
  normal : (m) => {
    return m.list.reduce((str, ts) => {
      str += ts.normal();
      return str;
    }, '');
  },
};

//
const render = function(method) {
  let result = this;
  method = method.toLowerCase();
  if (methods[method]) {
    return methods[method](result);
  }
  return '-';
};

module.exports = render;
