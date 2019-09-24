var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/ngrams/src'))

// nlp('jean jacket. jean Slkje').debug()

var lexicon = {
  'bed bath and beyond': 'Organization',
}

let r = nlp('shopping at Bed, Bath, and-beyond the store', lexicon)
let str = r.organizations().out('normal')
console.log(str)
