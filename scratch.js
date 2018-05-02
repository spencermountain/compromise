var nlp = require('./src/index');
// nlp.verbose('tagger');

// let doc = nlp('100+').debug();

// nlp('the united states senate').match('the (canadian|united states)').debug();
// nlp('really pretty cool').debug(); //.match('#Copula [(just|alone)$]').debug();
// nlp('i am pretty confused').debug();

// nlp('the united states congress').match('the (united states|canada) .');
// nlp('is it fun').questions().debug();

// console.log(nlp('the cool, version of a fun canadian senate').match('#Adjective').setPunctuation('?').debug().getPunctuation());

// nlp('Jim is nice, funny, cool').match('is #Adjective+').out();

//isQuestion(), .not(Text)
let doc = nlp('Dogs are funny. Are they funny? Yes they are.');
doc = doc.sentences().join('so');
doc.debug();
// console.log(doc.sentences().isQuestion().out('array'));
// console.log(doc.sentences()[0].mainVerb());
// let questions = doc.questions();
// let sentences = doc.not(questions);
// console.log(sentences.out('array'));
