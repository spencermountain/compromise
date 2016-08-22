'use strict';
const fns = require('../../fns');
const terms = require('./terms');

//collect all transforms for a termslist
let all = {};
Object.keys(terms).forEach((k) => {
  let tag = fns.titleCase(k);
  Object.keys(terms[k].transform).forEach((method) => {
    let name = 'to' + fns.titleCase(method);
    //make a termList method..
    all[name] = (ts) => {
      ts.arr = ts.arr.map((t) => {
        //only apply it
        if (tag === 'Term' || t.tag[tag]) {
          return t.to(method);
        }
        return t;
      });
      return ts;
    };

  });
});
module.exports = all;
