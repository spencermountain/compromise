var nlp = require('./src/index');
// nlp.verbose('tagger');

//1) - busted
var doc = nlp('7.5 -8').values().debug();
doc.values().toText();
// doc.debug();
// doc.out();

//2) en-dash
// var doc = nlp('The 2010–2011 season was our best yet.');
// doc.values().toText();
// doc.out();

// 3) lookin'
// var doc=nlp("I’m lookin’ for amanda")
// doc.verbs().toPastTense()
// doc.out();

// 4) support demo words
//wee
//the very model of
// how come
// they're ruffled
// major general
// bel-air
//there's
// nlp("Mr. Putin's").people()

// 5) sentence .topast/.toNegative/toPlural
