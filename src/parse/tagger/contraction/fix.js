'use strict';
//add a silent term
const fixContraction = (ts, arr, i) => {
  //add a new term
  ts.insertAt('', i);
  let t = ts.terms[i];
  let nextT = ts.terms[i + 1];
  //add the interpretation silently
  t.silent_term = arr[0];
  nextT.silent_term = arr[1];
  return ts;
};

module.exports = fixContraction;
