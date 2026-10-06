import fs from 'node:fs'
import nlp from './src/two.js'
// const book = fs.readFileSync(new URL('./scripts/bench/infinite-jest.txt', import.meta.url), 'utf8')

// lexicon:        512ms
// preTagger:      968ms
// contractionTwo: 155ms
// left-right:     104ms
// main-sweep:    2731ms
// second-sweep:   696ms

// const doc = nlp('dude we should').debug()
// const doc = nlp('the poor eat rice').debug()

nlp.verbose(true)
const doc = nlp('chaser')
