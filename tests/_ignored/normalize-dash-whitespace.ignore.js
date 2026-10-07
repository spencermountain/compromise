import test from 'tape'
import nlp from '../lib/three.js'
const here = '[ignored/normalize-dash-whitespace] '

// Deferred: Whitespace normalization retains this dash instead of removing it.
test(here + 'dash-whitespace:', function (t) {
  const str = `a dash seperates words - like that`
  const doc = nlp(str)
  doc.normalize({ whitespace: true, punctuation: false })
  t.equal(doc.text(), `a dash seperates words like that`, here + 'dont keep the dash')
  t.end()
})
