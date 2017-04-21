'use strict';
//free bugs!

// const nlp = require('./src/index');
// const nlp = require('./builds/compromise.min');
// nlp.verbose('tagger');

//bug 1. - support greedy +
// nlp('would have not had been walking').match('#Auxillary+ #Verb').debug();

//bug 2. - gerund as nouns
// nlp('i like running').sentences().toNegative().debug();

//bug 3. - missing whitespace
// console.log(nlp('june 5-7 1999').out());

//bug 4. - apostrophe years
// nlp('1998\'s collection').debug();

//bug 5. - would not
// nlp('I would like that').sentences(0).toNegative().debug()

//bug 6. - inline clone
//nlp('parent should not be uppercase').clone().toUpperCase().parent.debug()

//bug 7. - adds 'a' when making singular
// nlp('men go').sentences().toPastTense().nouns().toSingular().debug();

//bug 8
// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());

//bug 9
// r = nlp('he walks');
// r.match('walks').tag('Foo');
// r.verbs().toPastTense();
// r.debug();
