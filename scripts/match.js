/* eslint-disable no-console */
import repl from 'repl'
import corpus from 'nlp-corpus'
import nlp from '../src/three.js'

const n = 7500
console.log(` -- pre-processing ${n} sentences-`)
let docs = corpus.some(n)
docs = docs.map(str => nlp(str).compute('offset'))
console.log(` -- ok, ready --`)

const doMatch = function (match) {
  docs.forEach(doc => {
    let m = doc.match(match)
    if (m.found) {
      m.debug({ highlight: true, tags: false })
    }
  })
  console.log('--')
}

let arg = process.argv.slice(2).join(' ')
arg = arg.trim()
if (arg) {
  doMatch(arg)
}

repl.start({
  eval: function (match) {
    doMatch(match)
  },
})
