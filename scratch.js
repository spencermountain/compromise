const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// nlp('WE’RE NOT WORTHY!').debug()

// #585
// nlp('the second test message').debug()
// nlp('the generative approach and the discriminative approach." ').debug()

//#369
console.log(
  nlp('ached')
    .verbs()
    .conjugate()[0]
)
