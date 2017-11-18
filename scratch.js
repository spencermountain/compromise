var nlp = require('./src/index');
// nlp.verbose('tagger');

// doc=nlp('measuring 7.5–11 micrometers')

// nlp('pulled').verbs().toInfinitive().debug(); //pulle
// nlp('leaving').verbs().toInfinitive().debug(); //leav

// 5) sentence .topast/.toNegative/toPlural
// nlp('are really fun').verbs().toPastTense().debug();
// nlp('i am really walking on').verbs().toPastTense().debug();
// nlp('we\'re really fun').sentences().toPastTense().debug();
// console.log(nlp('we\'re really fun').verbs().data());
// console.log(nlp('i\'m really fun').verbs().data());
// nlp('we\'re really fun').sentences().toPlural().debug();


let doc = nlp('April, June, and Sept').dates().toShortForm().all();
console.log(doc.out());
//Apr, Jun, and Sept
