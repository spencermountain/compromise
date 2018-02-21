var nlp = require('./src/index');
// nlp.verbose('tagger');


// let str = 'I met John Smith in Toronto and we ate shellfish at 23 Main st.';
// console.log(nlp(str).match('#ProperNoun+').out('array'));

// const r = nlp('geniuses').nouns().toSingular().out('text');
// console.log(r); // geniuse



nlp('march and feb').debug();
