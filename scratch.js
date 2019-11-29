const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/numbers/src'))

// let doc = nlp(`i walked to the moon when it was shining`)
// doc.verbs().forEach(d => {
//   d.matchOne('walked').replaceWith('sat')
// })
// doc.sentences().toPastTense()
// doc.debug()

// let doc = nlp.tokenize(`between june 5th and june 7th`)
// doc.match('between [#Date+] and').debug()
// doc.match('between [.*] and').debug()

// let doc = nlp('falls over')
// let doc = nlp('i paid $5.20 for the thing')
// let doc = nlp('i got 1 peso and £30.').debug()
// doc.money().debug()

// nlp.verbose('tagger')

// nlp('His is green.').debug()

// nlp('her glue').debug()
// nlp('let Toronto Ontario glue it').debug()
nlp('his fines') //.debug()
