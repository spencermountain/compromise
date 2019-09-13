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

let doc = nlp('one two. one two')
doc.append('ooooooooo')
// doc.debug()
// doc.match('two').append('ooooooooo')

// doc.verbs().toNegative()

// var doc = nlp('spencer is nice, warm and tired.')
// doc.lists().add('CRAAZY')
doc.replaceWith()
console.log(doc.out())
