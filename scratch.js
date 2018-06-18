var nlp = require('./src/index');
// nlp.verbose('tagger');

//(private|general|major)

console.log(nlp('Björk, the “singer-songwriter”').normalize().out('text'));

// nlp('about this ...').normalize().debug()
// console.log(nlp('word ...').toLowerCase().out());

// console.log(nlp('word ...').list[0].terms);
