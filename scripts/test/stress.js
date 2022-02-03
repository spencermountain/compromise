/* eslint-disable no-console */
import corpus from 'nlp-corpus' //install with `npm i nlp-corpus --no-save`
import nlp from '../../src/three.js'
console.log(`\n\n--- running compromise on 100 random texts---\n`)
console.log('    --should take a few minutes--')

/** add spaces at the end */
const padEnd = function (str = '', width = 10) {
  str = str.toString()
  while (str.length < width) {
    str += ' '
  }
  return str
}

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
