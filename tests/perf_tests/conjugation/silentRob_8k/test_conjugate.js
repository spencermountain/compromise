'use strict';
let verbs = require('./verbs');
let nlp = require('../../../../src/index');
// console.log(verbs.length);

let particple = {};
for(var i = 0; i < verbs.length; i++) {
  if (verbs[i]['past participle'] !== verbs[i]['past']) {
    particple[verbs[i]['infinitive']] = verbs[i]['past participle'];
  }
}
console.log(JSON.stringify(particple, null, 2));

let mapping = {
  present: '3rd singular present',
  gerund: 'present participle',
  past: 'past',
};

let correct = verbs[41];

let mine = nlp.Verb(correct.infinitive).conjugate();
// console.log(correct);
// console.log(mine);
