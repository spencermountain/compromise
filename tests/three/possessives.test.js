import test from 'tape'
import nlp from './_lib.js'
const here = '[three/possessives] '

test('possessives tagger', function (t) {
  const arr = [`Spencer's`, `Spencer Kelly's`, `Spencer C. Kelly's`, `Union Corp's`, `Los Angeles's`]
  arr.forEach(a => {
    const doc = nlp(a)
    const m = doc.possessives()
    t.equal(m.length, 1, here + 'one possessive -' + a)
    t.equal(m.out(), a, here + 'possessive match -' + a)
  })
  t.end()
})

test('possessives-strip', function (t) {
  const arr = [
    [`Spencer's`, 'Spencer'],
    [`Corey Hart's`, 'Corey Hart'],
    [`Corey M. Hart's`, 'Corey M. Hart'],
    [`Spencer C. Kelly's`, 'Spencer C. Kelly'],
    [`Agility Inc's`, 'Agility Inc'],
    [`University of Wisconsin's`, 'University of Wisconsin'],
    [`Los Angeles's`, 'Los Angeles'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.possessives().strip()
    t.equal(doc.out('text'), a[1], here + a[0])
  })
  t.end()
})


test('strip-all', function (t) {
  let doc = nlp(`frank's (open) 'bar'.`)
  doc.possessives().strip()
  doc.parentheses().strip()
  doc.quotations().strip()
  t.equal(doc.text(), 'frank open bar.', here + 'strip-1')

  doc = nlp(`(frank's open "bar".)`)
  doc.possessives().strip()
  doc.parentheses().strip()
  doc.quotations().strip()
  t.equal(doc.text(), 'frank open bar.', here + 'strip-2')
  t.end()
})
