const corpus = require('nlp-corpus')
const nlp = require('../src')
console.log(`\n\n--- running  compromise on random texts---\n`)
console.log('    --should take a few minutes--')

for (let i = 0; i < 100; i++) {
  console.log('\n\n\n---', i)
  let txt = corpus.random()
  console.log(txt.substr(0, 300))
  nlp(txt)
}

console.log('done!')
