/* eslint-disable no-console, no-unused-vars */
import corpus from 'nlp-corpus' //install with `npm i nlp-corpus --no-save`
import nlp from '../../src/three.js'
console.log(`\n\n--- running compromise on 100 random texts---\n`)
console.log('    --should take a few minutes--')


let texts = corpus.all()
for (let i = 0; i < texts.length; i++) {
  let txt = texts[i]
  // console.log('\n--- ' + i + ' ---')
  // console.log(txt.substr(0, 60).trim() + ' ... ')
  nlp(txt)
    .sentences()
    .forEach(s => {
      let vb = s.verbs(0)
      // let subj = vb.subject()
      // console.log(padEnd(subj.text('reduced'), 16), '  -  ', vb.text('reduced'))
      // if (!subj.found) {
      //   console.log(s.text('normal'), '\n')
      // }
    })
}

console.log('\n\n - done!')
