var nlp = require('./src/index');
// nlp.verbose('tagger');

// var doc = nlp('i just walked to the store');
// doc.match('just [#PastTense] to the store').debug();

// nlp('cheering hard').debug();

// var nlp2 = nlp.clone();
// nlp.addWords({
//   bat: 'Verb'
// });
//
// nlp('bat').debug();
// nlp2('bat').debug();


var vb = nlp('stunk up').verbs().toNegative(); //.debug();
var str = vb.out('normal');
console.log(str);
