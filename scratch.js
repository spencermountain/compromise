const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/ngrams/src'))
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

// .toQuotation()
// .toParentheses()

// [, 'tony hawk'],
// ['I live Toronto. I think Toronto is cool.', 'toronto'],
// ['The EACD united in 1972. EACD must follow regulations.', 'eacd'],
// // ['The Elkjsdflkjsdf sells hamburgers. I think the Elkjsdflkjsdf eats turky.', 'elkjsdflkjsdf'],
// ["Toronto's citizens love toronto!", 'toronto'],

// const doc = nlp('I live Toronto. I think Toronto is cool.').debug()
const doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan')
doc.places().debug()

nlp.verbose(true) // open the dev console, to see the output
nlp('supercalifragilisticexpialidocious')
