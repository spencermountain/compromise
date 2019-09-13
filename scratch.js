var nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/verbs/src'))

/*
    ✖ sort
    ✖ replaceWith
    ✖ splitOn
    ✖ flatten
*/

var doc = nlp('spencer is really great! Spencer really, really was superb.')
// doc.append('really')
// doc.verbs().toNegative()
doc
  .verbs()
  .adverbs()
  .remove()

doc.out()
