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

var doc = nlp('He is cool.')
doc.sentences().prepend('so i think')

// doc.match('spencer').append('really')
// doc.match('spencer').prepend('really')
// doc.verbs().toNegative()
doc.debug()

// var doc = nlp('spencer is nice, warm and tired.')
// doc.lists().add('CRAAZY')
// console.log(doc.out())
