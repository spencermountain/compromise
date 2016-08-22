'use strict';
const tags = require('../../tags');
const fns = require('../../fns');
const terms = require('./terms');

//collect all methods that reduce a termlist, etc
let all = {};
//each POS tag is a filter method
Object.keys(tags).forEach((k) => {
  let method = fns.toPlural(k).toLowerCase();
  all[method] = (ts) => {
    return ts.filter((t) => {
      return t.tag[k];
    });
  };
});

//each 'is' method is a filter
Object.keys(terms).forEach((term) => {
  Object.keys(terms[term].is).forEach((k) => {
    let method = fns.toPlural(k);
    all[method] = (ts) => {
      return ts.filter((t) => {
        return t.is(k);
      });
    };
  });
});

module.exports = all;
