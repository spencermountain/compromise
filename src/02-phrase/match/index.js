const failFast = require('./01-failFast');
const tryMatch = require('./02-tryMatch');

//returns a simple array of arrays
const matchAll = function(p, regs) {
  let matches = [];
  let terms = p.terms();
  //try to dismiss it, at-once
  if (failFast(terms, regs) === true) {
    return false;
  }
  //any match needs to be this long, at least
  const minLength = regs.filter((r) => r.optional !== true).length;
  //try starting, from every term
  for(let i = 0; i < terms.length; i += 1) {
    // slice may be too short
    if (i + minLength > terms.length) {
      return matches;
    }
    //try it!
    let match = tryMatch(terms.slice(i), regs);
    if (match.length > 0) {
      matches.push(match);
      i += match.length; //zoom forward
    }
  }
  return matches;
};
module.exports = matchAll;
