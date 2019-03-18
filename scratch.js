var nlp = require('./src/index');
// nlp.verbose(true);

//TODO:
// selections:
//     copy+paste more of them
// tagger:
//    neighbour-fallback
//    more inference
//
// --expose-subclass prototypes


var str = 'he said spencer, where are you?';
// var str = 'the FBI';
var doc = nlp(str);
// doc.splitAfter('spencer').debug();
// doc.splitBefore('spencer').debug();
doc.clauses().debug();
