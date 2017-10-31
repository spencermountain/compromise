var nlp = require('./src/index');
// nlp.verbose('tagger');


// nlp('was not').contractions().debug(); //contract().debug();

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
