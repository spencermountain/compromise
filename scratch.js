var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))

/*
    ✖ sort
    ✖ replaceWith
    ✖ splitOn
    ✖ flatten
*/

var doc = nlp('one, two three.   blah blah. One, two, five. ')
doc.canBe()
doc.debug()
// doc.forEach()
// console.log('|' + doc.text() + '|')
