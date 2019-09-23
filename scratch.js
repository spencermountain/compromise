var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/ngrams/src'))

// var doc = nlp('i am in houston texas. i am a good person. so i think he is a good person.')
// let arr = doc.endgrams({ size: 2 })
// console.log(arr)

nlp('Hey, Laura. Dr. Tongue has arrived')
  .match('#Person+')
  .forEach((m, i) => console.log(m.toLowerCase().out('normal')))
