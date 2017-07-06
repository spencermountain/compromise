'use strict';
var verbs = require('./verbs');
var nlp = require('../../../src/index');

var yep = 0;
var nope = 0;
// const baddies = {};

const evaluate = function(mine, robs) {
  if (robs === mine) {
    yep += 1;
  } else {
    nope += 1;
    console.log(mine + '   -rob: ' + robs);
  }
};

console.log(verbs.length);
//
for (var i = 0; i < verbs.length; i++) {
  var robs = verbs[i];
  var mine = nlp(robs.infinitive).tag('Verb').verbs().data()[0] || {};
  mine = mine.conjugations || {};
  //test past
  evaluate(mine['PastTense'], robs['past']);
  evaluate(mine['PresentTense'], robs['3rd singular present']);
  evaluate(mine['Gerund'], robs['present participle']);
}

//report
console.log(yep + ' correct');
console.log(nope + ' incorrect');
var percent = parseInt(yep / (yep + nope) * 100, 10);
console.log('  ' + percent + '% correct');
