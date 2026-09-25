import test from 'tape'
import nlp from '../_lib.js'

const blank = () => nlp('xyz').unTag('*')

test('tag regressions: inherited exclusions', function (t) {
  const cases = [
    ['Noun', 'Verb', 'Noun'],
    ['FirstName', 'Plural', 'FirstName'],
    ['Value', 'Month', 'Value'],
    ['Month', 'Value', 'Month'],
    ['Person', 'Prefix', 'Person'],
    ['Country', 'Timezone', 'Country'],
  ]
  cases.forEach(([first, second, removed]) => {
    const doc = blank().tag(first).tag(second)
    t.ok(doc.has(`#${second}`), `${first} -> ${second}: new tag is present`)
    t.notOk(doc.has(`#${removed}`), `${first} -> ${second}: conflicting tag is removed`)
  })
  t.ok(blank().tag('Value').tag('Year').has('#Value'), 'Year remains compatible with Value')
  t.ok(blank().tag('Unit').tag('Acronym').has('#Unit'), 'Acronym remains compatible with Unit')
  t.end()
})

test('tag regressions: Month requires Noun', function (t) {
  const doc = blank().tag('Value')
  const before = [...doc.termList()[0].tags].sort()
  t.equal(doc.canBe('Month').found, false, 'Value cannot also become Month/Noun')
  doc.tagSafe('Month')
  t.deepEqual([...doc.termList()[0].tags].sort(), before, 'rejected safe tag leaves tags unchanged')
  const month = blank().tag('Month').unTag('Noun')
  t.notOk(month.has('#Noun'), 'Noun was removed')
  t.notOk(month.has('#Month'), 'Month is removed with its Noun parent')
  t.end()
})
