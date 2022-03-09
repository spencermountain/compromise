import test from 'tape'
import nlp from './_lib.js'
import { streamFile } from '../src/index.js'
nlp.plugin(streamFile)
import fs from 'fs'

test('stream the whole document', function (t) {
  let file = `./tests/files/freshPrince.txt`
  let want = fs.readFileSync(file).toString()
  nlp.streamFile(file, (s) => {
    return s.match('.')
  }).then(doc => {
    t.equal(doc.text(), want, 'full-text')
    t.end()
  })
})

test('return no matches', function (t) {
  let file = `./tests/files/freshPrince.txt`
  nlp.streamFile(file, (s) => {
    return s.match('coconut')
  }).then(doc => {
    t.equal(doc.text(), '', 'no-text')
    t.end()
  })
})