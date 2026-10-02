import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import vm from 'node:vm'

const require = createRequire(import.meta.url)

// Use only Node built-ins: development tools may require a newer runtime.
for (const tier of ['one', 'two', 'three']) {
  const source = (await import(`../../src/${tier}.js`)).default
  const esm = (await import(`../../builds/${tier}/compromise-${tier}.mjs`)).default
  const cjs = require(`../../builds/${tier}/compromise-${tier}.cjs`)
  for (const nlp of [source, esm, cjs]) {
    assert.equal(nlp('hello world').text(), 'hello world')
    assert.equal(nlp('hello world').match('world').text(), 'world')
    if (tier !== 'one') {
      assert.equal(nlp('she walks').has('#Verb'), true)
    }
    if (tier === 'three') {
      const doc = nlp('she walks')
      doc.verbs().toPastTense()
      assert.equal(doc.text(), 'she walked')
    }
  }
}

const context = vm.createContext({ console })
const browser = fs.readFileSync(new URL('../../builds/compromise.js', import.meta.url), 'utf8')
vm.runInContext(browser, context)
assert.equal(context.nlp('hello world').text(), 'hello world')
console.log(`Source and bundles passed on ${process.version}`) // eslint-disable-line no-console
