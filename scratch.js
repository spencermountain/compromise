var nlp = require('./src/index');
// nlp.verbose('tagger');

//(private|general|major)

console.log(nlp('about this ...').normalize().out('text'));

// nlp('about this ...').normalize().debug()
// console.log(nlp('word ...').toLowerCase().out());

// console.log(nlp('word ...').list[0].terms);
