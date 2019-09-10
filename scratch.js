var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))

/*
    ✖ sort
    ✖ replaceWith
    ✖ splitOn
    ✖ flatten
*/

var doc = nlp('one. two, two.    Three,   three, three.').words()
// .sort('freq')
// .debug()
console.log(
  doc.text({
    case: true,
  })
)
// console.log('|' + doc.text('clean') + '|')
