'use strict';

//ie. john never walks -> john always walks
//nobody/noone are ambiguous logically (somebody? / everybody?)
const logical = {
  'never': 'always',
  'nothing': 'everything',
};

const toPositive = (ts) => {
  let m = ts.match('(never|nothing)').first();
  if (m.found) {
    let str = m.out('normal');
    if (logical[str]) {
      ts = ts.match(str).replaceWith(logical[str], true).list[0];
      return ts.parentTerms;
    }
  }
  //otherwise just remove 'not'
  ts.delete('#Negative');
  return ts;
};
module.exports = toPositive;
