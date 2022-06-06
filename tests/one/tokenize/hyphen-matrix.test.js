import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/hyphen-matrix] '

test('hyphen-input', (t) => {
  let doc = nlp(`before follow-up after`)
  t.equal(doc.has('follow-up'), true, here + 'hyphen -> follow-up')
  t.equal(doc.has('follow up'), true, here + 'hyphen -> follow up')
  t.equal(doc.has('followup'), true, here + 'hyphen -> followup')
  t.end()
})

test('no-hyphen-input', (t) => {
  let doc = nlp(`before follow up after`)
  t.equal(doc.has('follow-up'), true, here + 'no-hyphen -> follow-up')
  t.equal(doc.has('follow up'), true, here + 'no-hyphen ->follow up')
  t.equal(doc.has('followup'), false, here + 'no-hyphen ->followup')
  t.end()
})

test('compound-hyphen-input', (t) => {
  let doc = nlp(`before followup after`)
  t.equal(doc.has('follow-up'), false, here + 'compound -> follow-up')//maybe?
  t.equal(doc.has('follow up'), false, here + 'compound -> follow up')
  t.equal(doc.has('followup'), true, here + 'compound -> followup')
  t.end()
})


// ==================

test('hyphen-skipping', (t) => {
  let doc = nlp(`before super-cool after`)
  t.equal(doc.has('before super'), true, here + '[hyphen] before')
  t.equal(doc.has('before super cool'), true, here + '[hyphen] before-mid')
  t.equal(doc.has('cool after'), true, here + '[hyphen] after')
  t.equal(doc.has('super cool after'), true, here + '[hyphen] after-mid')
  // 
  t.equal(doc.has('before after'), false, here + '[hyphen] no-jump')
  t.equal(doc.has('before super after'), false, here + '[hyphen] no-mid-jump')
  t.equal(doc.has('before cool after'), false, here + '[hyphen] no-mid-2-jump')
  t.end()
})