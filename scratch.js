import nlp from './src/three.js'
// let result = nlp('This is a "test". Hello "World."').quotations().out('text')
// console.log(result)

const d = nlp("Isn't he happy (again)?")
d.sentences().toFutureTense() // fine
// d.sentences().debug()
const json = d.sentences().json() // out of heap, exit 134
console.log(json)

console.log('done')
