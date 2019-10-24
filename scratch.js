const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/dates/src'))

/*
2. ~walk~ match
3. .swap()
*/

let r = nlp('hello q3 there')

r.match('q3')
  .tag('Foo')
  .tag('Keep')
  .tag('FinancialQuarter')
r.debug()
