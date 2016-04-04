'use strict';
let verbs = require('./verbs');
let nlp = require('../../../../src/index');


let yep = 0;
let nope = 0;
// const baddies = {};

const evaluate = function(mine, robs) {
  if (robs === mine) {
    yep += 1;
  } else {
    nope += 1;
  // console.log(mine + '   -rob: ' + robs);
  }
};

console.log(verbs.length);
//
for(let i = 0; i < verbs.length; i++) {
  let robs = verbs[i];
  let mine = nlp.verb(robs.infinitive).conjugate();
  //test past
  evaluate(mine['past'], robs['past']);
  evaluate(mine['present'], robs['3rd singular present']);
  evaluate(mine['gerund'], robs['present participle']);

}
// // let arr = [];
// // Object.keys(baddies).forEach((a) => {
// //   if (baddies[a].length > 3) {
// //     // console.log(a + '  ' + baddies[a]);
// //     arr.push(baddies[a]);
// //   }
// // });
// // arr = arr.sort((a, b) => {
// //   if (a.length > b.length) {
// //     return -1;
// //   } else {
// //     return 1;
// //   }
// // });
// // console.log(arr.slice(0, 10));

//report
console.log(yep + ' correct');
console.log(nope + ' incorrect');
let percent = parseInt(yep / (yep + nope) * 100, 10);
console.log('  ' + percent + '% correct');
