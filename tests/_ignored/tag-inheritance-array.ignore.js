import test from 'tape'
import nlp from '../lib/two.js'
import isolateModel from '../lib/isolate-model.js'
const here = '[ignored/tag-inheritance-array] '

// Deferred: Array-valued tag inheritance does not currently propagate these parent tags.
test(here + 'tagset-tree-array', function (t) {
  isolateModel(t, nlp.model().one, ['tagSet', 'tagAliases', 'lexicon', '_multiCache'])
  nlp.addTags({
    One: {},
    Two: {},
    Three: { is: ['Two', 'One', 'FirstName'] },
  })
  const doc = nlp(`have fun in toronto`, { toronto: 'Three' })
  const m = doc.match('toronto')
  t.ok(m.has('#Three'), here + 'three')
  t.ok(m.has('#Two'), here + 'two')
  t.ok(m.has('#One'), here + 'one')
  t.ok(m.has('#FirstName'), here + 'FirstName')
  t.ok(m.has('#Person'), here + 'Person')
  t.ok(m.has('#Noun'), here + 'Noun')
  t.end()
})
