'use strict';
const firstnames = require('../../../data/firstnames').all;
const parse_name = require('./parse_name.js');

const gender = function(normal) {
  if (normal === 'he') {
    return 'Male';
  }
  if (normal === 'she') {
    return 'Female';
  }
  let o = parse_name(normal);
  let firstName = o.firstName;
  if (!firstName) {
    return null;
  }
  if (firstnames[firstName] === 'm') {
    return 'Male';
  }
  if (firstnames[firstName] === 'f') {
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

// console.log(gender('john', 'john') === 'Male');
// console.log(gender('jane smith', 'jane') === 'Female');
// console.log(gender('jan smith', 'jan') === null);
