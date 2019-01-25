var nlp = require('./src/index');
nlp.verbose(true);

//TODO:
// core:
//     splitAfter()
// selections:
//     copy+paste more of them
// tagger:
//    neighbour-fallback
//    more inference
// 
// --expose-subclass prototypes


var str = 'spencers\' innermost sanctum';
// var str = 'the FBI';
var doc = nlp(str);
// console.log(doc.values().toNumber());
// console.log(doc.match(['hello', 'academy']));
doc.terms().debug();
