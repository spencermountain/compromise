'use strict';
var verbs = require('./verbs');
var nlp = require('../../../../src/index');


var yep = 0;
var nope = 0;
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
for(var i = 0; i < verbs.length; i++) {
  var robs = verbs[i];
  var mine = nlp.verb(robs.infinitive).conjugate();
  //test past
  evaluate(mine['past'], robs['past']);
  evaluate(mine['present'], robs['3rd singular present']);
  evaluate(mine['gerund'], robs['present participle']);

}
// // var arr = [];
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
var percent = parseInt(yep / (yep + nope) * 100, 10);
console.log('  ' + percent + '% correct');
