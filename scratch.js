import fs from 'node:fs'
import nlp from './src/two.js'

const book = fs.readFileSync(new URL('./infinite-jest.txt', import.meta.url), 'utf8')

// lexicon:        512ms
// preTagger:      968ms
// contractionTwo: 155ms
// left-right:     104ms
// main-sweep:    2731ms
// second-sweep:   696ms

const doc = nlp(book)
console.log(`${doc.docs.length.toLocaleString()} sentences; ${doc.wordCount().toLocaleString()} words`)
