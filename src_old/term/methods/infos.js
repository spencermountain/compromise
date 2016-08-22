'use strict';
const fns = require('../../fns');
const terms = require('./terms');

//collect all info methods for a termslist
let all = {};
Object.keys(terms).forEach((k) => {
  let tag = fns.titleCase(k);
  Object.keys(terms[k].info).forEach((method) => {
    all[method] = (ts) => {
      return ts.map((t) => {
        //null, if it doesn't apply
        if (!t.tag[tag]) {
          return null;
        }
        return t.info(method);
      });
    };
  });
});
module.exports = all;
