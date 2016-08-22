'use strict';

const terms = require('./terms');

const reduce_methods = (k) => {
  let methods = {};
  Object.keys(terms).forEach((t) => {
    Object.keys(terms[t][k]).forEach((method) => {
      methods[method] = terms[t][k][method];
    });
  });
  return methods;
};

let methods = {
  //individual term methods
  is: reduce_methods('is'),
  info: reduce_methods('info'),
  transform: reduce_methods('transform'),
  pluck: reduce_methods('pluck'),
  render: terms.term.render,
  //termlist methods
  filters: require('./filters'),
  infos: require('./infos'),
  transforms: require('./transforms'),
};
module.exports = methods;
