'use strict';
const methods = require('../term/methods');

//rope all the methods into termList
const addMethods = function(ts) {
  //add filters
  Object.keys(methods.filters).forEach((method) => {
    ts[method] = () => {
      ts.arr = methods.filters[method](ts.arr);
      return ts;
    };
  });
  //add map over info methods
  Object.keys(methods.infos).forEach((method) => {
    ts[method] = () => {
      return methods.infos[method](ts.arr);
    };
  });
  //add transform methods
  Object.keys(methods.transforms).forEach((method) => {
    ts[method] = () => {
      return methods.transforms[method](ts);
    };
  });
  //add pluck methods
  Object.keys(methods.pluck).forEach((method) => {
    ts[method] = () => {
      ts.arr = ts.arr.map((t) => t.pluck(method));
      ts.arr = ts.arr.filter(t => t);
      return ts;
    };
  });
  return ts;
};

module.exports = addMethods;
