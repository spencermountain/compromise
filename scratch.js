var nlp = require('./src/index');
// nlp.verbose('tagger');

//(private|general|major)

// console.log(nlp('the so-called ❛singer-songwriter❜').normalize().out('text'));
// let doc = nlp(`"seven"`);
// console.log(doc.list[0].terms[0]);
// console.log(doc.values().toNumber().out('text'));

var doc = nlp('the so-called “fascist  dictator”');
doc = doc.normalize();
console.log(doc.out('text'));
doc.debug();
// doc.quotations().debug();


// console.log(nlp('Director of the F.B.I').acronyms().addPeriods().out('text'));

// nlp('about this ...').normalize().debug()
// console.log(nlp('word ...').toLowerCase().out());

// console.log(nlp('word ...').list[0].terms);
