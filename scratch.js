'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// let doc = nlp('The Elkjsdflkjsdf sells hamburgers')

// var doc = nlp("gonna say, we ain't gonna take it");//fixme
// var doc = nlp("we ain't").debug();

// console.log(doc.match('are not').length); // 2 !
// console.log(
//   doc
//     .contractions()
//     .expand()
//     .out()
// );

// nlp.addTags({
//   Doctor: {
//     isA: 'Person',
//     notA: ['Verb']
//   }
// });
// nlp.addWords({ surgeon: 'Doctor', 'surgeon general': 'Doctor' });
// var lex = {
//   'lkj lkjs': 'Place'
// };
// var doc = nlp('the surgeon operated lkj lkjs', lex);
// doc.debug();

// var lexicon = {
//   'jardas al abid': 'Place'
// };
// nlp('jardas al Abid', lexicon)
//   .match('#Place')
//   .debug();
var doc = nlp('aaraa bbbb cccc');
doc.match('bbbb').tag('MaleName');
doc.tag('Place');
doc.debug();
