/* eslint-disable no-console */
import { readFileSync } from 'node:fs'
import { setImmediate } from 'node:timers/promises'

const rounds = 10
const copies = 1000
const json = process.argv.includes('--json')
const sample = readFileSync(new URL('./freshPrince.txt', import.meta.url), 'utf8')
const mib = bytes => `${(bytes / 1024 / 1024).toFixed(2)} Mb`

const measure = async () => {
  // Let temporary documents leave the stack before collecting them.
  await setImmediate()
  globalThis.gc()
  return process.memoryUsage()
}

const exercise = nlp => {
  const doc = nlp(sample)
  doc.people().out('array')
  doc.places().out('array')
  doc.match('#Adjective #Noun').out('array')
  doc.numbers().toNumber()
  doc.nouns().toPlural()
  doc.verbs().toPastTense()
  doc.sentences().json()
  doc.text()
}

if (typeof globalThis.gc !== 'function') {
  throw new Error('Run with pnpm debug:memory (requires node --expose-gc).')
}

const baseline = await measure()
// A dynamic import keeps library initialization out of the baseline.
const log = console.log
let nlp
try {
  // Keep startup diagnostics out of JSON stdout.
  if (json) {
    console.log = console.error
  }
  nlp = (await import('../../../src/three.js')).default
} finally {
  console.log = log
}
for (let i = 0; i < rounds; i += 1) {
  exercise(nlp)
}
const warmed = await measure()

// Average many retained documents to reduce noise from small heap changes.
const documents = Array.from({ length: copies }, () => nlp(sample))
const retained = await measure()
const perDocument = (retained.heapUsed - warmed.heapUsed) / documents.length

const initBytes = warmed.heapUsed - baseline.heapUsed
if (json) {
  console.log(JSON.stringify({ init: Math.round(initBytes/1000), freshPrince: Math.round(perDocument/1000) }, null, 2))
} else {
  console.log(`Init: ~${mib(initBytes)}`)
  console.log(`Avg fresh-prince: ~${Math.round(perDocument/1000)} KiB`)
}
