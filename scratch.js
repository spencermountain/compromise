const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/numbers/src'))

// nlp(`wayne's world, party time`)
//   .match('#Noun+? wayne')
//   .debug()

// console.log('aaaab'.match(/a+?[a|b]/))

nlp('Toronto Ontario foo')
  .match('#Place+ .')
  .debug()
