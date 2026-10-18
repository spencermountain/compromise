import test from 'tape'
import nlp, { streamFile } from './_lib.js'
import fs from 'node:fs'
import path from 'node:path'
nlp.plugin(streamFile)


import { fileURLToPath } from 'node:url'
const here = '[plugins/speed/tests/stream] '
const dir = path.dirname(fileURLToPath(import.meta.url))

const file = path.join(dir, `./files/freshPrince.txt`)

test(here + 'stream the whole document', function (t) {
  const want = fs.readFileSync(file).toString()
  nlp.streamFile(file, (s) => {
    return s.match('.')
  }).then(doc => {
    t.equal(doc.text(), want, 'full-text')
    t.end()
  })
})

test(here + 'return no matches', function (t) {
  nlp.streamFile(file, (s) => {
    return s.match('coconut')
  }).then(doc => {
    t.equal(doc.text(), '', 'no-text')
    t.end()
  })
})