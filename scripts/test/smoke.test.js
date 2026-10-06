import test from 'tape'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import vm from 'node:vm'
const here = '[scripts/test/smoke] '

const require = createRequire(import.meta.url)

for (const tier of ['one', 'two', 'three']) {
  test(here + `${tier} ESM and CommonJS bundles`, async t => {
    const file = `../../builds/${tier}/compromise-${tier}`
    const esm = (await import(`${file}.mjs`)).default
    const cjs = require(`${file}.cjs`)
    for (const nlp of [esm, cjs]) {
      t.equal(nlp('hello world').text(), 'hello world', 'parses text')
      t.deepEqual(
        nlp('constructor constructor').terms().out('freq'),
        [{ normal: 'constructor', count: 2 }],
        'bundled dictionary counting is safe'
      )
    }
    t.end()
  })
}

test(here + 'browser bundle without Node globals', t => {
  const code = fs.readFileSync(new URL('../../builds/compromise.js', import.meta.url), 'utf8')
  const context = vm.createContext({ console })
  vm.runInContext(code, context)
  t.equal(context.nlp('hello world').text(), 'hello world', 'parses without process or self')
  t.doesNotThrow(() => context.nlp.verbose(false), 'environment detection works without Node globals')
  t.end()
})
