const assert = require('assert')

console.log('\n==sanity-test builds==')
//sanity-test the builds

console.log('  - - main')
const main = require('../../../builds/compromise.js')
let doc = main('John and Joe walked to the store')
assert(doc.people().data().length === 2)
assert(doc.verbs().data().length === 1)

console.log('\n  - - min')
const min = require('../../../builds/compromise.min.js')
let r = min('John and Joe walked to the store')
assert(r.people().data().length === 2)
assert(r.verbs().data().length === 1)
console.log('\n  👍')
