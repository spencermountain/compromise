var nlp = require('./src/index');
// nlp.verbose('tagger');


// console.log(nlp('12, 34, 56').values().out('array')); //-> (2) ["12", "34 56"]
// console.log(nlp('12 34 56').values().out('array')); //-> (2) ["12", "34 56"]
// console.log(nlp('12, 34, 56').normalize().values().out('array')); //-> (2) ["12", "56"]

// nlp('12 34 56').values().debug();
// nlp('ninety nine quadrillion, two hundred thousand').values().debug();
