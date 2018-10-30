// var nlp = require('./src/index');
var inflect = require('./src/transforms/inflect/index');
// nlp.verbose(false);

// let doc = nlp(`i didn't know. I wouldn't see tuxedo`);
// doc.debug();
console.log(inflect('church'));
