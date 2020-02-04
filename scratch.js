const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/scan/src'))

let doc = nlp('one two three four five')

// let trie = doc.buildTrie({
//   two: 'One',
//   'two three': 'Two',
//   four: 'One',
//   'sveventy eight': 'None',
// })
let trie = doc.buildTrie(['two', 'two three', 'four', 'one', 'sveventy eight'])
console.log(trie)
// console.log(doc.scan('lkjsdf helsk one jfjf two three', trie))
console.log(doc.scan(trie))
