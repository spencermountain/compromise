import test from 'tape'
import nlp from './_lib.js'

test('cant tag frozen term', function (t) {
  let doc = nlp('one two three four.')
  let m = doc.match('two three')
  m.freeze()
  doc.tag('Person')
  t.eq(doc.match('one').has('#Person'), true, 'not-frozen has tag')
  t.eq(!doc.match('two three').has('#Person'), false, 'frozen has no tag')
  t.eq(doc.match('four').has('#Person'), true, 'after has tag')
})
