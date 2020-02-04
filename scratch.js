const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/scan/src'))

let doc = nlp('asf asdf one asdf two three four five.')

// let trie = doc.buildTrie(['two three four', 'three'])
// let trie = doc.buildTrie({ 'two three four': 'Three', 'three four': 'Two', 'four five': 'Two', two: 'One' })
let trie = doc.buildTrie(['fsfsfs'])
// console.log(JSON.stringify(trie, null, 2))
// console.log('----\n\n\n')
let out = doc.scan(trie) //.json({ terms: false })
console.log(out)
