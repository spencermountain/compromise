import test from 'tape'
import nlp from './_lib.js'
import fs from 'fs'
import path from 'path'
import { streamFile } from '../src/plugin.js'
nlp.plugin(streamFile)

let dir = new URL('./', import.meta.url).pathname
let file = path.join(dir, `./files/freshPrince.txt`)

test('stream the whole document', function (t) {
  let want = fs.readFileSync(file).toString()
  nlp.streamFile(file, (s) => {
    return s.match('.')
  }).then(doc => {
    t.equal(doc.text(), want, 'full-text')
    t.end()
  })
})

test('return no matches', function (t) {
  nlp.streamFile(file, (s) => {
    return s.match('coconut')
  }).then(doc => {
    t.equal(doc.text(), '', 'no-text')
    t.end()
  })
})