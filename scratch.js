/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
nlp.plugin(plg)
// nlp.verbose('tagger')

// let txt = ''
// let doc
// let m

// bug 1
// doc = nlp('we swim')
// console.log(doc.verbs().conjugate())

// bug 2
// doc = nlp('blew').debug()
// console.log(doc.verbs().conjugate())

// bug 3
// doc = nlp(' 18e').debug()



// const text = `Remove me 1:
// - A some text
// - B some text
// - C some text`

// const doc = nlp(text)
// doc.match('Remove me #NumericValue').forEach((m) => doc.remove(m))
// doc.match('* some text$').forEach((m) => m.prepend('prefix'))
// console.log(doc.out())

// remove bug 1
// const txt = `before SW1A 2AA Remove me after`
// const doc = nlp(txt)
// const matches = doc.match('Remove me')
// matches.forEach((m) => doc.remove(m))
// console.log(doc.text())


// remove bug 2
const text = `Remove 1. Remove 2. Remove 3. Remove 4. Remove 5. Remove 6. Remove 7. Remove 8. after 1. after 2. after 3. after 4. after 5.`
// const text = `Remove 1. Remove 2. after 1. after 2. after 3. after 4. after 5.`
const doc = nlp(text)
let matches = doc.match('Remove #NumericValue')
matches.forEach((m) => doc.remove(m))
// doc.remove(matches)
console.log(doc)
console.log(doc.out())
console.log(doc.text() === 'after 1. after 2. after 3. after 4. after 5.')

// console.log(doc.verbs().conjugate())
// console.log(doc.verbs().toGerund().text())


// date issues:
// 'the month before christmas' vs 'a month before christmas'
// middle september
// end of september
// first half of march
// week of june 3rd
// fridays in june
// every saturday
// now
// until christmas