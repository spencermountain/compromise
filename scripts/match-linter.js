/* eslint-disable no-console */
import model from '../src/04-postTagger/model/index.js'
import nlp from '../src/three.js'
import corpus from 'nlp-corpus'
// const { methods } = nlp.world()

const matches = model.two.matches
console.log(`${matches.length} matches (before compliling)`)

const n = 1000
console.log(` -- pre-processing ${n.toLocaleString()} sentences-`)
let docs = corpus.all().slice(0, n)
docs = docs.map(str => nlp(str))
console.log(` -- ok, ready --`)

// qa
const already = {}
matches.forEach(todo => {
  const regs = nlp.parseMatch(todo.match)
  if (!todo.tag || !todo.reason || !todo.match || regs.length === 0 || already[todo.reason]) {
    console.log('Issue: ', todo) // eslint-disable-line
  }
  already[todo.reason] = true
})

const counts = {}
docs.forEach(doc => {
  matches.forEach(todo => {
    if (doc.has(todo.match)) {
      counts[todo.reason] = counts[todo.reason] || 0
      counts[todo.reason] += 1
    }
  })
})

const ranked = matches
  .map(todo => todo.reason)
  .sort((a, b) => {
    counts[a] = counts[a] || 0
    counts[b] = counts[b] || 0
    if (counts[a] > counts[b]) {
      return -1
    } else if (counts[a] < counts[b]) {
      return 1
    }
    return 0
  })
ranked.forEach(reason => {
  console.log(reason, counts[reason])
})
