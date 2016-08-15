'use strict';
const methods = require('../term/methods');
//hang termlist methods on Text()
const addMethods = function(text) {
  Object.keys(methods).forEach((k) => {
    Object.keys(methods[k]).forEach((method) => {
      text[method] = () => {
        return text.terms()[method]();
      };
    });
  });
  return;
};

module.exports = addMethods;
