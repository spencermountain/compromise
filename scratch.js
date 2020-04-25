const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))

/** add spaces at the end */
const padEnd = function (str, width) {
  str = str.toString()
  while (str.length < width) {
    str += ' '
  }
  return str
}

let doc = nlp('a b c d')
doc.replace('b', "added i'm")
console.log('\n\n-----')

let arr = []
doc.list[0].terms().map((t) => {
  arr.push('   ' + padEnd(t.reduced, 10) + t.next)
})

console.log(arr.join('\n'))
