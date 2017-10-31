var nlp = require('./src/index');
nlp.verbose('tagger');

// let doc = nlp(`doesn't there's i'd i'll can't won't wasn't weren't wouldn't haven't`);
// doc.contractions().expand();
// doc.contractions().contract();
// console.log(doc.out());

// let text = 'i want to pull out some money';
// let lexicon = {
//   broken: 'Adjective',
//   address: 'Noun',
//   'pull out': 'PhrasalVerb'
// };
// nlp.addWords(lexicon);
// let doc = nlp(text);
// doc.debug();

// nlp('pulled out').verbs().toInfinitive().out()//pulle
// doc.match('#PhrasalVerb+').out()

// nlp('leaving').verbs().toInfinitive().out()//leav

// 4) support demo words
//wee
//the very model of
// how come
// they're ruffled
// major general
// bel-air
//there's
nlp('Mr. putin\'s').debug();

// 5) sentence .topast/.toNegative/toPlural
