var nlp = require('./src/index');
// nlp.verbose('tagger');

// let doc = nlp(`doesn't there's i'd i'll can't won't wasn't weren't wouldn't haven't`);
// doc.contractions().expand();
// doc.contractions().contract();
// console.log(doc.out());



// nlp('pulled').verbs().toInfinitive().debug(); //pulle
// nlp('leaving').verbs().toInfinitive().debug(); //leav

console.log(nlp('they\'re cool. they are fun').terms().out('freq'));

// 5) sentence .topast/.toNegative/toPlural
