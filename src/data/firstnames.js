// common first-names in compressed form.
// from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
// not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names

// used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
// used to identify gender for coreference resolution
'use strict';
let male = require('./names/male');
let female = require('./names/female');
const names = {};

//names commonly used in either gender
const ambiguous = [
  'casey',
  'jamie',
  'lee',
  'jaime',
  'jessie',
  'morgan',
  'rene',
  'robin',
  'devon',
  'kerry',
  'alexis',
  'guadalupe',
  'blair',
  'kasey',
  'jean',
  'marion',
  'aubrey',
  'shelby',
  'jan',
  'shea',
  'jade',
  'kenyatta',
  'kelsey',
  'shay',
  'lashawn',
  'trinity',
  'regan',
  'jammie',
  'cassidy',
  'cheyenne',
  'reagan',
  'shiloh',
  'marlo',
  'andra',
  'devan',
  'rosario',
  'lee'
];
for(let i = 0; i < male.length; i++) {
  names[male[i]] = 'm';
}
for(let i = 0; i < female.length; i++) {
  names[female[i]] = 'f';
}
//ambiguous/unisex names
for (let i = 0; i < ambiguous.length; i += 1) {
  names[ambiguous[i]] = 'a';
}
// console.log(names['spencer']);
// console.log(names['jill']);
// console.log(names['sue'])
// console.log(names['jan'])
module.exports = {
  all: names,
  male: male,
  female: female
};
