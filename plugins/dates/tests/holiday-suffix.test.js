import test from 'tape'
import nlp from './_lib.js'

test('holiday day and eve suffixes', t => {
  const phrases = ['Christmas eve', 'Diwali eve', 'Easter day', 'Halloween eve']
  phrases.forEach(text => {
    t.ok(nlp(text).has('^#Holiday+$'), text)
  })
  t.notOk(nlp('school day').has('#Holiday'), 'ordinary days are not holidays')
  t.end()
})
