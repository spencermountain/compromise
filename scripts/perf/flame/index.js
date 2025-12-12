/* eslint-disable no-console */
import txt from './_sotu-text.js'

console.log('\n-- testing:  --')
console.time('load')
import nlp from '../../../src/three.js'
console.timeEnd('load')

console.time('parse')
const doc = nlp(txt)
console.timeEnd('parse')

console.time('match')
doc.match('#Noun')
console.timeEnd('match')
console.log('\n   v' + nlp.version, '\n')
