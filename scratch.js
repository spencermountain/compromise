const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

nlp
  .tokenize('one two three four')
  .match('one [two] three [four]')
  .debug()

// 'one two three four'.match(/one (?<two>two) three/)
