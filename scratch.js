var nlp = require('./src/index');
// nlp.verbose('tagger');

let doc = nlp('they\'d said').debug();
doc.verbs().toPastTense();
doc.debug();

// coming => com
// moving => mov
// joking => jok
// poking => pok
// naming => nam
// aching => ach
// tuning => tun
// bling => ble
// hazing => haz
// oozing => ooz
// gazing => gaz
// easing => eas
// dozing => doz
// raring => rar
// honing => hon
// fuming => fum
// razing => raz

// lied => ly
// shed => sh
// owed => ow
// aged => ag
// aced => ac
// axed => ax
// egged => eg

// Refactor
// Release
// Revert
// repeat
// rebuild
// reconcile
// record
// redefine
// recover
// restructure
// resolve

// nlp('pulled').verbs().toInfinitive().debug(); //pulle
// nlp('leaving').verbs().toInfinitive().debug(); //leav

// 5) sentence .topast/.toNegative/toPlural
// nlp('are really fun').verbs().toPastTense().debug();
// nlp('i am really walking on').verbs().toPastTense().debug();
// nlp('we\'re really fun').sentences().toPastTense().debug();
// console.log(nlp('we\'re really fun').verbs().data());
// console.log(nlp('i\'m really fun').verbs().data());
nlp('we\'re really fun').sentences().toPlural().debug();
