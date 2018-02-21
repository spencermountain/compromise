var nlp = require('./src/index');
// nlp.verbose('tagger');


// let str = 'I met John Smith in Toronto and we ate shellfish at 23 Main st.';
// console.log(nlp(str).match('#ProperNoun+').out('array'));

let r = nlp('bases').tag('#Plural').nouns().toSingular().out('text');
console.log(r); // geniuse
r = nlp('buses').tag('#Plural').nouns().toSingular().out('text');
console.log(r); // geniuse
