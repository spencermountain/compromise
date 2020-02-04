const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/scan/src'))

let doc = nlp('wee ooh, one two three four five. Oh yeah I do two.')

// let trie = doc.buildTrie({
//   two: 'One',
//   'two three': 'Two',
//   four: 'One',
//   'sveventy eight': 'None',
// })
let trie = doc.buildTrie(['oh yeah', 'two', 'two three', 'four seven', 'one', 'sveventy eight'])
// console.log(trie)
// console.log(doc.scan('lkjsdf helsk one jfjf two three', trie))
console.log(doc.scan(trie))
