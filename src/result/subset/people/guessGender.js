'use strict';
const log = require('../../paths').log;
// make a statistical assumption about the gender of the person based on their given name
// used for pronoun resolution only.
// not intended for classification, or discrimination of people.
const gender = function (firstName) {
  if (!firstName) {
    return null;
  }
  //statistical guesses
  if (firstName.match(/.(i|ee|[a|e]y|a)$/i)) { //this is almost-always true
    log.tell('Female-name suffix');
    return 'Female';
  }
  if (firstName.match(/[ou]$/i)) { //if it ends in a 'oh or uh', male
    log.tell('Male-name suffix');
    return 'Male';
  }
  if (firstName.match(/(nn|ll|tt)/i)) { //if it has double-consonants, female
    log.tell('Female-name consonant-doubling');
    return 'Female';
  }
  // name not recognized, or recognized as of indeterminate gender
  return null;
};
module.exports = gender;
