'use strict';
//
const relatives = {
  this: 'this',
  next: 'next',
  last: 'last',
  upcoming: 'next',
};
const parseRelative = (r) => {
  let known = '(' + Object.keys(relatives).join('|') + ')';
  let m = r.match(`${known}+`).lastTerm();
  if (m.found) {
    let str = m.match(known).normal();
    return relatives[str];
  }
};
module.exports = parseRelative;
