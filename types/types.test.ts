// a smoke-test for our typescipt typings
// to run:
// npm install -g typescript
// npm install -g ts-node
// npm install --no-save @types/tape @types/node
// npm run test:types

const test = require('tape')
import nlp from '../'

test('typefile smoketest', (t: any) => {
  const doc = nlp('hello world')
  t.equal(doc.text(), 'hello world', 'basic-smoketest')
  t.end()
})
