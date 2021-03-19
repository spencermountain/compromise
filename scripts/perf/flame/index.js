const txt = require('./_sotu-text')
const path = '../../../src'

console.log('\n-- testing:  --')
console.time('load')
const nlp = require(path)
console.timeEnd('load')

console.time('parse')
let doc = nlp(txt)
console.timeEnd('parse')

console.time('match')
doc.match('#Noun')
console.timeEnd('match')
console.log('\n   v' + nlp.version, '\n')
