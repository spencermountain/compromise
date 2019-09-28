var nlp = require('./src/index')
const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/entities/src'))
process.tagged = []
let txt = corpus.sotu
  .array()
  .slice(0, 5)
  .join(' ')

// txt = ' critical thinking'
console.time('parse')
let doc = nlp(txt)
console.timeEnd('parse')

// let obj = {}
// process.tagged.forEach(tag => {
//   obj[tag] = obj[tag] || 0
//   obj[tag] += 1
// })
// let arr = Object.keys(obj)
//   .map(k => [k, obj[k]])
//   .sort((a, b) => {
//     if (a[1] > b[1]) {
//       return -1
//     }
//     return 1
//   })
// // console.log(JSON.stringify(arr, null, 2))
// arr.forEach(a => {
//   console.log(a[0] + ' \t ' + a[1])
// })
