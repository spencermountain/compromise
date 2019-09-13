var nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/verbs/src'))
nlp.extend(require('./plugins/sentences/src'))

/*
    ✖ sort
    ✖ replaceWith
    ✖ splitOn
    ✖ flatten
*/

let doc = nlp('spencer is cool. Spencer is nice')
doc.match('is').prepend('really')
doc.debug()

// doc.verbs().toNegative()

// var doc = nlp('spencer is nice, warm and tired.')
// doc.lists().add('CRAAZY')
// console.log(doc.out())
