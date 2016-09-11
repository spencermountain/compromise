'use strict';
//add a silent term
const fixContraction = (ts, arr, i) => {
  //add a new term
  ts.insertAt('', i);
  //add the interpretation silently
  ts.terms[i].silent_term = arr[0];
  ts.terms[i + 1].silent_term = arr[1];
  return ts;
};

module.exports = fixContraction;
