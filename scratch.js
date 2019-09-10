var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))

/*
    ✖ sort
    ✖ replaceWith
    ✖ splitOn
    ✖ flatten
*/

var doc = nlp('one. two, two. three, three, three.')
  .words()
  .sort('freq')
  .debug()

// console.log('|' + doc.text() + '|')
