/* eslint-disable no-console, no-unused-vars */
import corpus from 'nlp-corpus' //install with `npm i nlp-corpus --no-save`
import nlp from './src/three.js'
let texts = corpus.all()
console.log(`\n\n--- running compromise on ${texts.length.toLocaleString()} random sentences---\n`)
console.log('    --should take a few minutes--')

for (let i = 0; i < texts.length; i++) {
  let txt = texts[i]
  nlp(txt)
    .sentences()
    .forEach(s => {
      s.verbs().notIf('#Infinitive').if('#PastTense').forEach(vb => {
        let str = vb.text('normal')
        let inf = vb.toInfinitive().text('normal')
        if (inf === str) {
          console.log(vb.text('normal'), '  -> ', inf)
        }
      })

    })
}

console.log('\n\n - done!')
