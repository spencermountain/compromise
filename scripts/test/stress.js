const corpus = require('nlp-corpus') //install with `npm i nlp-corpus --no-save`
const nlp = require('../../src')
console.log(`\n\n--- running compromise on 100 random texts---\n`)
console.log('    --should take a few minutes--')

for (let i = 0; i < 100; i++) {
  console.log('\n--- ' + i + ' ---')
  let txt = corpus.random()
  console.log(txt.substr(0, 60).trim() + ' ... ')
  nlp(txt)
}

console.log('\n\n - done!')
