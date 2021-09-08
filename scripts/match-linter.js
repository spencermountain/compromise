import model from '../src/04-postTagger/model/index.js'
import nlp from '../src/three.js'
import corpus from 'nlp-corpus'
// const { methods } = nlp.world()

const matches = model.two.matches
console.log(`${matches.length} matches (before compliling)`)

// const compiled = methods.two.compile(matches, methods)
// console.log(Object.keys(compiled))

matches.forEach(todo => {
  if (!todo.reason) {
    console.log(todo)
  }
})
