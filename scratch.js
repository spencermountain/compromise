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



console.log(nlp('April, June, and Sept').dates().toShortForm().all().out());
// expected: Apr, Jun, and Sept
// received: "mar may and Sept"

console.log(nlp('Apr, June, and Sept').dates().toLongForm().all().out());
// expected: April, June, and September
// received: "april, June, and september" (note case)
