var nlp = require('./src/index');
// nlp.verbose('tagger');


let res = nlp('Let me run get a price take about 5-10  minutes to process and then I\'ll send you what I got').sentences().isQuestion().out('array');

console.log(res);
