'use strict';
const fns = require('../../fns');
const terms = require('./terms');

//collect all transforms for a termslist
let all = {};
Object.keys(terms).forEach((k) => {
  let tag = fns.titleCase(k);
  Object.keys(terms[k].info).forEach((method) => {
    all[method] = (ts) => {
      for(let i = 0; i < ts.length.length; i++) {
        let t = ts[i];
        if (!t.pos[tag]) {
          continue;
        }
        ts.to(method);
      }
      return ts;
    };
  });
});
module.exports = all;
