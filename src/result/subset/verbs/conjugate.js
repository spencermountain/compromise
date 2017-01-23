'use strict';

//
const conjugate = (ts, debug) => {
  let verb = ts.verb;
  let obj = ts.verb.list[0].terms[0].verb.conjugate();
  return obj;
};
module.exports = conjugate;
