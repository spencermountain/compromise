import test from 'tape'
import nlp from '../lib.js'
const here = '[three/replace-possessive] '

const b = '██████████'
const possessives = { possessives: true }

test(here + 'redact keeps each possessive', function (t) {
  const arr = [
    [`Tom's dog is eating.`, `${b}'s dog is eating.`],
    [`John walked to the big store. Tom's dog is quickly eating 20 treats.`, `${b} walked to the big store. ${b}'s dog is quickly eating 20 treats.`],
    [`Tom's dog ate. John walked.`, `${b}'s dog ate. ${b} walked.`],
    [`Tom's dog ate. Sue's cat ran.`, `${b}'s dog ate. ${b}'s cat ran.`],
    [`John ran. Bob ate. Tom's dog sat.`, `${b} ran. ${b} ate. ${b}'s dog sat.`],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0]).redact()
    t.equal(doc.text(), a[1], here + a[0])
  })
  t.end()
})

// these pointers shift as each match is replaced
test(here + 'possessives in one sentence', function (t) {
  const arr = [
    [`Bob and Tom's dog and Sue's cat ran.`, `${b} and ${b}'s dog and ${b}'s cat ran.`],
    [`Tom's dog and Sue's cat and Bob ran.`, `${b}'s dog and ${b}'s cat and ${b} ran.`],
    [`Bob and Sue saw Tom's dog.`, `${b} and ${b} saw ${b}'s dog.`],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0]).redact()
    t.equal(doc.text(), a[1], here + a[0])
  })
  t.end()
})

test(here + 'replaceWith keeps each possessive', function (t) {
  const arr = [
    [`John ran. Tom's dog sat.`, 'X', `X ran. X's dog sat.`],
    [`Tom's dog sat. John ran.`, 'X', `X's dog sat. X ran.`],
    [`Tom's dog sat. Sue's cat ran.`, 'X', `X's dog sat. X's cat ran.`],
    // longer replacements only end in a possessive
    [`John ran. Tom's dog sat.`, 'X Y', `X Y ran. X Y's dog sat.`],
    [`Bob and Tom's dog and Sue's cat ran.`, 'X Y', `X Y and X Y's dog and X Y's cat ran.`],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.people().replaceWith(a[1], possessives)
    t.equal(doc.text(), a[2], here + a[0])
  })
  t.end()
})

test(here + 'new possessive is tagged', function (t) {
  const doc = nlp(`John ran. Tom's dog sat. Sue's cat ate.`)
  doc.people().replaceWith('Bobby', possessives)
  t.deepEqual(doc.match('#Possessive').out('array'), [`Bobby's`, `Bobby's`], here + 'only the two possessives')
  t.end()
})

test(here + 'possessives are only kept on request', function (t) {
  const doc = nlp(`John ran. Tom's dog sat.`)
  doc.people().replaceWith('X')
  t.equal(doc.text(), 'X ran. X dog sat.', here + 'no-option')
  t.end()
})

test(here + 'replacing a possessive with nothing', function (t) {
  let doc = nlp(`Tom's dog sat.`)
  doc.people().replaceWith('', possessives)
  t.equal(doc.text(), 'dog sat.', here + 'one')

  doc = nlp(`Tom's dog sat. Sue's cat ran.`)
  doc.people().replaceWith('', possessives)
  t.equal(doc.text(), 'dog sat. cat ran.', here + 'two')
  t.end()
})
