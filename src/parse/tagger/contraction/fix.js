'use strict';
//add a silent term
const fixContraction = (ts, arr, i) => {
  //add a new term
  ts.insertAt('', i);
  let t = ts.terms[i];
  let t2 = ts.terms[i + 1];
  //add the interpretation silently
  t.silent_term = arr[0];
  t2.silent_term = arr[1];
  t.tagAs('Contraction', 'tagger-contraction');
  t2.tagAs('Contraction', 'tagger-contraction');
  return ts;
};

module.exports = fixContraction;
