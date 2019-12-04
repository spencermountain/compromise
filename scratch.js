const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/numbers/src'))

// let doc = nlp('i worked at the F.B.I')
// doc = doc.match('(#Acronym|#Abbreviation)').replaceWith(d => {
//   return d
// })
// doc.debug()

// let doc = nlp('the cat that was mean attacked the cute dog')
// doc
//   .nouns()
//   .eq(0)
//   .nouns()
//   .adjectives()
//   .debug()

// Lookahead - look forward
// Lookbehind - look backward

// nlp(`yet soft and yielding like a nerf ball`).debug()

// let doc = nlp(`Getting ready for whacking day? What's whacking day?`)
// doc.post('  ', true)

// let doc = nlp(`Your dreams may vary from those of Globex Corporation, its subsidiaries and shareholders.`)
// doc.organizations().post('©', true)

// doc
// .match('whacking day')
// .pre(`'`, true)
// .post(`'`, true)
// console.log(doc.text())

// console.log(
//   nlp(`...and my butt smells, and i like to kiss my own butt`)
//     .clauses()
//     .find(d => d.has('@hasEllipses'))
//     .text()
// )
