var nlp = require('./src/index');
nlp.verbose(true);

var str = 'i wrote';
// var str = 'the FBI';
var doc = nlp(str);
// console.log(doc.values().toNumber());
// console.log(doc.match(['hello', 'academy']));
doc.terms().debug();
