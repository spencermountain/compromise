import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/api/json] '

test(here + 'date selection and normalized json', function (t) {
  const doc = nlp('my birthday is June 5th 1998')
  t.equal(doc.dates().length, 1, 'one-date')

  const json = doc.dates().json({ normal: true })
  t.equal(json[0].normal, 'june 5th 1998', 'date-normal')

  t.end()
})
