'use strict';
const firstnames = require('../paths').data.firstnames
// make a statistical assumption about the gender of the person based on their given name
// used for pronoun resolution only.
// not intended for classification, or discrimination of people.
const gender = function(t) {
  let o = t.info('parsedName');
  let firstName = o.firstName;
  if (!firstName) {
    return null;
  }
  if (firstnames[firstName] === 'MalePerson') {
    return 'Male';
  }
  if (firstnames[firstName] === 'FemalePerson') {
    return 'Female';
  }
  //male honourifics
  if (normal.match(/\b(mr|mister|sr|sir|jr)\b/i)) {
    return 'Male';
  }
  //female honourifics
  if (normal.match(/^(mrs|miss|ms|misses|mme|mlle)\.? /i)) {
    return 'Female';
  }
  //statistical guesses
  if (firstName.match(/.(i|ee|[a|e]y|a)$/i)) { //this is almost-always true
    return 'Female';
  }
  if (firstName.match(/[ou]$/i)) { //if it ends in a 'oh or uh', male
    return 'Male';
  }
  if (firstName.match(/(nn|ll|tt)/i)) { //if it has double-consonants, female
    return 'Female';
  }
  // name not recognized, or recognized as of indeterminate gender
  return null;
};
module.exports = gender;
