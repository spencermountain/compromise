'use strict';
const methods = require('../term/methods');
const termListMethods = require('../termList/methods');
//hang termlist methods on Text()
const addMethods = function(text) {
  //add all term methods
  Object.keys(methods).forEach((k) => {
    Object.keys(methods[k]).forEach((method) => {
      text[method] = () => {
        return text.terms()[method]();
      };
    });
  });
  //add termlist ones too
  Object.keys(termListMethods).forEach((method) => {
    text[method] = (str) => {
      return text.terms()[method](str);
    };
  });
  return;
};

module.exports = addMethods;
