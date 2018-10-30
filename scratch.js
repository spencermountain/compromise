var nlp = require('./src/index');
nlp.verbose(true);

let doc = nlp(`undermine, undermining, undermined, undermines`);
console.log(doc.world.stats());
doc.debug();
