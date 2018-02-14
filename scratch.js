var nlp = require('./src/index');
// nlp.verbose('tagger');

console.log(nlp('Simon, how is Jason?')
  .match('#Person')
  .replace('PERSON')
  .all()
  .out());

console.log(nlp('trust me folks, big league.').replace('big league', 'bigly').all().out());
