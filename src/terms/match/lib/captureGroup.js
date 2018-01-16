'use strict';
//take all the matches, and if there is a [capture group], only return that.
const onlyCaptureGroup = function(matches) {
  let results = [];
  matches.forEach((terms) => {
    //if there's no capture group, we good.
    if (terms.filter(t => t.captureGroup === true).length === 0) {
      results.push(terms);
      return;
    }
    //otherwise, just return them as seperate subsets
    let current = [];
    for(let i = 0; i < terms.length; i += 1) {
      if (terms[i].captureGroup) {
        current.push(terms[i]);
      } else if (current.length > 0) {
        results.push(current);
        current = [];
      }
    }
    if (current.length > 0) {
      results.push(current);
    }
  });
  return results;
};
module.exports = onlyCaptureGroup;
