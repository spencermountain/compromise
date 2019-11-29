const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/numbers/src'))

// nlp(`wayne's world, party time`)
//   .match('#Noun+? wayne')
//   .debug()

// console.log('aaaab'.match(/a+?[a|b]/))

// nlp(`And how come Batman doesn't dance anymore? Remember the Batusi?`)
// .match('#Place+ .')
// .debug()

let doc = nlp('Spencer is a very famous company.')
  .match('spencer')
  .replaceWith('jogging')

doc.debug()
console.log(doc.text())
