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
const baddies = {

};

for(let i = 0; i < verbs.length; i++) {
  let correct = verbs[i];
  let mine = nlp.verb(correct.infinitive).conjugate();
  for(let o = 0; o < mappings.length; o++) {
    let map = mappings[o];
    if (mine[map[0]] === correct[map[1]]) {
      yep += 1;
    } else {
      nope += 1;
      // console.log(mine[map[0]] + '      ' + correct[map[1]]);
      let suff = mine[map[0]].substr(mine[map[0]].length - 4, mine[map[0]].length);
      baddies[suff] = baddies[suff] || [];
      baddies[suff].push(correct[map[1]] + '  ' + mine[map[0]]);
    }
  }

}
let arr = [];
Object.keys(baddies).forEach((a) => {
  if (baddies[a].length > 3) {
    // console.log(a + '  ' + baddies[a]);
    arr.push(baddies[a]);
  }
});
arr = arr.sort((a, b) => {
  if (a.length > b.length) {
    return -1;
  } else {
    return 1;
  }
});
console.log(arr.slice(0, 10));
// console.log(yep + ' correct');
// console.log(nope + ' incorrect');
let percent = parseInt(yep / (yep + nope) * 100, 10);
console.log('  ' + percent + '% correct');
//sort mistakes
