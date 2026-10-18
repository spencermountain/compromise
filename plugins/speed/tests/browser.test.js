import test from 'tape'
import nlp from 'compromise'
import { readFile } from 'node:fs/promises'
import { createContext, runInContext } from 'node:vm'
import { createRequire } from 'node:module'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { rollup } from 'rollup'

const require = createRequire(import.meta.url)
const execute = promisify(execFile)
const entry = process.env.TESTENV === 'prod' ? '../builds/compromise-speed.browser.mjs' : '../src/browser.js'
const browser = await import(new URL(entry, import.meta.url).href)

test('browser entry exports only browser methods', t => {
  t.deepEqual(Object.keys(browser).sort(), ['default', 'keyPress', 'lazyParse'], 'named exports')
  t.deepEqual(Object.keys(browser.default.lib).sort(), ['keyPress', 'lazy'], 'default plugin methods')
  t.equal(typeof browser.default.version, 'string', 'version is available')
  nlp.extend(browser.default)
  t.equal(nlp.keyPress('A cat sleeps.').text(), 'A cat sleeps.', 'cached parsing works')
  t.equal(nlp.lazy('A cat sleeps.', 'cat').text(), 'cat', 'lazy matching works')
  t.end()
})

test('browser package subpath works with ESM and CommonJS', async t => {
  const esm = await import('compromise-speed/browser')
  const cjs = require('compromise-speed/browser')
  t.deepEqual(Object.keys(esm.default.lib).sort(), ['keyPress', 'lazy'], 'ESM package export')
  t.deepEqual(Object.keys(cjs.default.lib).sort(), ['keyPress', 'lazy'], 'CommonJS package export')
  t.deepEqual(Object.keys(cjs).sort(), ['default', 'keyPress', 'lazyParse'], 'CommonJS named exports')
  t.end()
})

test('browser condition selects browser methods automatically', async t => {
  for (const expression of [
    "(await import('compromise-speed')).default",
    "require('compromise-speed').default",
  ]) {
    const script = `(async () => { console.log(Object.keys(${expression}.lib).sort().join(',')) })()`
    const { stdout, stderr } = await execute(process.execPath, ['--conditions=browser', '-e', script], {
      cwd: fileURLToPath(new URL('..', import.meta.url)),
      timeout: 10000,
    })
    t.equal(stdout.trim(), 'keyPress,lazy', 'browser condition: ' + expression)
    t.equal(stderr, '', 'no loading errors')
  }
  t.end()
})

test('browser entry bundles without external modules', async t => {
  const bundle = await rollup({ input: fileURLToPath(new URL(entry, import.meta.url)) })
  try {
    const { output } = await bundle.generate({ format: 'es' })
    const chunks = output.filter(item => item.type === 'chunk')
    t.equal(chunks.length, 1, 'single browser bundle')
    t.deepEqual(chunks[0].imports, [], 'no Node or other external imports')
    t.deepEqual(chunks[0].dynamicImports, [], 'no deferred Node imports')
  } finally {
    await bundle.close()
  }
  t.end()
})

test('standalone browser build runs without Node globals', async t => {
  const code = await readFile(new URL('../builds/compromise-speed.browser.min.js', import.meta.url), 'utf8')
  const context = createContext({ nlp, structuredClone: globalThis.structuredClone })
  runInContext(code, context)
  t.equal(runInContext('typeof process', context), 'undefined', 'no process global')
  t.equal(runInContext('typeof require', context), 'undefined', 'no require global')
  const previous = { keyPress: nlp.keyPress, lazy: nlp.lazy, addWords: nlp.addWords }
  try {
    runInContext('nlp.extend(compromiseSpeed.default)', context)
    t.equal(runInContext("nlp.keyPress('A cat sleeps.').text()", context), 'A cat sleeps.', 'script-tag caching works')
    t.equal(runInContext("nlp.lazy('A cat sleeps.', 'cat').text()", context), 'cat', 'script-tag lazy parsing works')
  } finally {
    Object.assign(nlp, previous)
  }
  t.end()
})
