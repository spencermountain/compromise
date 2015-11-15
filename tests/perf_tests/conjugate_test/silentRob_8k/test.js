'use strict';
let verbs = require('./verbs');
let nlp = require('../../../../src/index');

let mappings = [
  ['present', '3rd singular present'],
  ['gerund', 'present participle'],
  ['past', 'past']
];

let yep = 0;
let nope = 0;

for(let i = 0; i < verbs.length; i++) {
  let correct = verbs[i];
  let mine = nlp.Verb(correct.infinitive).conjugate();
  for(let o = 0; o < mappings.length; o++) {
    let map = mappings[o];
    if (mine[map[0]] === correct[map[1]]) {
      yep += 1;
    } else {
      nope += 1;
    // console.log(mine[map[0]] + '      ' + correct[map[1]]);
    }
  }

}
// console.log(yep + ' correct');
// console.log(nope + ' incorrect');
let percent = parseInt(yep / (yep + nope) * 100, 10);

console.log('  ' + percent + '% correct');
