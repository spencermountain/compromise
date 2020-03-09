const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// let doc = nlp('i paid $5.50.')
// let doc = nlp('$5.32')

let doc = nlp('hello 4 / 2 * 5 - 1 world').debug()
doc
  .match('/[0-9] \\/ [0-9]/')
  .debug()
  .tag('Formula')
// doc.match('#Value+ (*|+|-) #Value+').tag('#Formula')
