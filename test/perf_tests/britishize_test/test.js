'use strict';
let nlp = require('../../../src/index');
let nlpLocale = require('/home/spencer/mountain/nlp/locale/src/index');
let data = require('./data');

nlp.plugin(nlpLocale);

let mistakes = {
  toAmerican: 0,
  toBritish: 0,
};
data.forEach(function(o) {
  let t = new nlp.term(o.uk);
  if (t.toAmerican().normal !== o.us) {
    console.log(o.us + '    ' + t.normal);
    mistakes.toAmerican += 1;
  }
  t = new nlp.term(o.us);
  if (t.toBritish().normal !== o.uk) {
    console.log(o.uk + '    ' + t.normal);
    mistakes.toBritish += 1;
  }
});

console.log('\n\n' + data.length + 'tests ----');
console.log('============toAmerican()');
console.log(mistakes.toAmerican + ' mistakes');
console.log((mistakes.toAmerican / data.length) * 100 + '%');

console.log('\n\n============toBritish()');
console.log(mistakes.toBritish + ' mistakes');
console.log((mistakes.toBritish / data.length) * 100 + '%');
