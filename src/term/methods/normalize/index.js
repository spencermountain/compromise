'use strict';
const addNormal = require('./normalize').addNormal;
const addRoot = require('./root');

const addMethods = (Term) => {

  const methods = {
    normalize: function () {
      addNormal(this);
      addRoot(this);
      return this;
    },
  };
  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Term.prototype[k] = methods[k];
  });
  return Term;
};

module.exports = addMethods;
