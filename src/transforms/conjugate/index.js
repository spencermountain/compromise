const checkSuffix = require('./01-suffixes');
const genericFill = require('./02-generic');

//we run this on every verb in the lexicon, so please keep it fast
//we assume the input word is a proper infinitive
const fastConjucate = function(str) {
  let found = checkSuffix(str);
  //'buzzing'
  if (found.Gerund === undefined) {
    found.Gerund = genericFill.Gerund(str);
  }
  //'buzzed'
  if (found.PastTense === undefined) {
    found.PastTense = genericFill.PastTense(str);
  }
  //'buzzes'
  if (found.PresentTense === undefined) {
    found.PresentTense = genericFill.PresentTense(str);
  }
  return found;
};
module.exports = fastConjucate;
