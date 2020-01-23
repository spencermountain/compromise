import nlp from '../../builds/compromise.mjs'
import assert from 'assert'

let r = nlp('John and Joe walked, to the store')
assert(r.has('joe walked'))
assert(r.match('#Verb to').found === true)
console.log('\n module build: 👍')
