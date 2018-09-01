var nlp = require("./src/index");
// nlp.verbose('tagger');

// var doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan');
// doc.places().debug();

let text = "hello (No. 08462148) world";
let doc = nlp(text);
doc.debug();
