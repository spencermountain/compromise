'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// let doc = nlp('The Elkjsdflkjsdf sells hamburgers')

// var doc = nlp("gonna say, we ain't gonna take it");//fixme
let doc = nlp('gonna gonna take it');
doc.contractions().expand();
console.log(doc.out());
// console.log(doc.match('are not').length); // 2 !
// console.log(
//   doc
//     .contractions()
//     .expand()
//     .out()
// );
