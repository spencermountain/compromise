const corpus = require('nlp-corpus') //install with `npm i nlp-corpus --no-save`
const nlp = require('../../src')
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

for (let i = 0; i < 100; i++) {
  console.log('\n--- ' + i + ' ---')
  let txt = corpus.random()
  // console.log(txt.substr(0, 60).trim() + ' ... ')
  nlp(txt)
    .sentences()
    .forEach(s => {
      let vb = s.verbs(0)
      let subj = vb.subject()
      console.log(padEnd(subj.text('reduced'), 16), '  -  ', vb.text('reduced'))
      // if (!subj.found) {
      //   console.log(s.text('normal'), '\n')
      // }
    })
}

console.log('\n\n - done!')
