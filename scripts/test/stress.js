/* eslint-disable no-console, no-unused-vars */
import corpus from 'nlp-corpus' //install with `npm i nlp-corpus --no-save`
import nlp from '../../src/three.js'
let texts = corpus.all()
console.log(`\n\n--- running compromise on ${texts.length.toLocaleString()} random sentences---\n`)
console.log('    --should take a few minutes--')

for (let i = 0; i < texts.length; i++) {
  let txt = texts[i]
  nlp(txt)
    .sentences()
    .forEach(s => {
      let vb = s.verbs(0)
    })
}

console.log('\n\n - done!')
