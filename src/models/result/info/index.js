'use strict';
//
const methods = {
  number: (m) => {
    return m.match('#Value').clone().toNumber().render('array').map((str) => {
      return parseInt(str, 10);
    });
  },
  nicenumber: (m) => {
    return m.match('#Value').clone().toNiceNumber().render('array');
  }
};

const info = function(method) {
  let result = this;
  method = method.toLowerCase();
  if (methods[method]) {
    return methods[method](result);
  }
  return [];
};

module.exports = info;
