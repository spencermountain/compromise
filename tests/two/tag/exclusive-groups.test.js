import test from 'tape'
import nlp from '../_lib.js'

const blank = () => nlp('xyz').unTag('*')
const groups = {
  'number formats': ['TextValue', 'NumericValue', 'RomanNumeral'],
  'text formats': ['Url', 'Email', 'PhoneNumber', 'AtMention', 'Emoji', 'Emoticon'],
  'date components': ['Month', 'WeekDay', 'Year', 'FinancialQuarter', 'Season', 'Time', 'Timezone'],
}

Object.entries(groups).forEach(([name, tags]) => {
  test('exclusive groups: ' + name, function (t) {
    tags.forEach(first => {
      tags.filter(second => second !== first).forEach(second => {
        const doc = blank().tag(first)
        const before = [...doc.termList()[0].tags].sort()
        t.notOk(doc.canBe(second).found, `${first} cannot be ${second}`)
        doc.tagSafe(second)
        t.deepEqual([...doc.termList()[0].tags].sort(), before, `${first} rejects ${second} safely`)
        doc.tag(second)
        t.ok(doc.has(`#${second}`), `${second} is assigned`)
        t.notOk(doc.has(`#${first}`), `${first} is removed`)
      })
    })
    t.end()
  })
})

test('exclusive groups: independent attributes still overlap', function (t) {
  const pairs = [
    ['NumericValue', 'Year'], ['NumericValue', 'Money'], ['TextValue', 'Money'],
    ['NumericValue', 'Percent'], ['NumericValue', 'Fraction'], ['Cardinal', 'Fraction'],
    ['Holiday', 'Duration'], ['Holiday', 'WeekDay'], ['Holiday', 'Month'],
    ['Acronym', 'Plural'], ['AtMention', 'Person'], ['Modal', 'Auxiliary'],
  ]
  pairs.forEach(([a, b]) => {
    for (const [first, second] of [[a, b], [b, a]]) {
      const doc = blank().tag(first).tagSafe(second)
      t.ok(doc.has(`#${first}`) && doc.has(`#${second}`), `${first} and ${second} coexist`)
    }
  })
  t.end()
})
