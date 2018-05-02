'use strict';
//tag the words between '(' and ')' as #Parentheses
const parenthesesStep = function(ts) {
  ts.terms.forEach((t, i) => {
    if (t.tags.StartBracket) {
      for(let o = i; o < ts.terms.length; o += 1) {
        if (ts.terms[o].tags.EndBracket === true) {
          ts.slice(i, o + 1).tag('Parentheses');
          break;
        }
      }
    }
  });
  return ts;
};
module.exports = parenthesesStep;
