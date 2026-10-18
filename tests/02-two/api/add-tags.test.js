import test from 'tape'
import nlp from '../../lib/two.js'
import isolateModel from '../../lib/isolate-model.js'
const here = '[two/api/add-tags] '

test('tagset-change-isA-basic', function (t) {
  isolateModel(t, nlp.model().one, ['tagSet', 'tagAliases', 'lexicon', '_multiCache'])
  nlp.addTags({
    Doctor: {
      is: 'Person',
    },
  })
  nlp.addWords({
    surgeon: 'Doctor',
    'surgeon general': 'Doctor',
  })
  let doc = nlp('the surgeon operated')

  //basic isA
  t.equal(doc.match('#Doctor').out('normal'), 'surgeon', here + 'surgeon is a doctor')
  t.equal(doc.match('#Person+').length, 1, here + 'doctor is a person')

  doc = nlp('lkjsdf').tag('#Person')
  t.equal(doc.match('#Doctor').length, 0, here + 'person isnt a doctor, necessarily')

  doc = nlp('lkjsdf').tag('#Doctor')
  t.equal(doc.match('#Person').length, 1, here + 'post-hoc tags work, too')

  //multi-word
  doc = nlp('the surgeon general operated')
  t.equal(doc.match('#Doctor').out('normal'), 'surgeon general', here + 'multi-word')
  t.equal(doc.match('#Person').out('normal'), 'surgeon general', here + 'multi-word-isA')
  t.end()
})

test('tagset-change-isA', function (t) {
  isolateModel(t, nlp.model().one, ['tagSet', 'tagAliases', 'lexicon', '_multiCache'])
  nlp.addTags({
    Doctor: {
      is: 'Person',
      not: 'Foo',
    },
  })
  nlp.addWords({
    lkjj: 'Foo',
  })
  const doc = nlp('he is lkjj')
  t.equal(doc.match('#Foo').out('normal'), 'lkjj', here + 'init-there')
  doc.match('lkjj').tag('#Doctor')

  t.equal(doc.match('#Doctor').out('normal'), 'lkjj', here + 'doctor-tag-there')
  t.equal(doc.match('#Foo').out('normal'), '', here + 'foo-is-gone')

  t.end()
})

test('tagset-remove-downward', function (t) {
  isolateModel(t, nlp.model().one, ['tagSet', 'tagAliases', 'lexicon', '_multiCache'])
  nlp.addTags({
    Doctor: {
      is: 'Person',
    },
    Surgeon: {
      is: 'Doctor',
    },
  })
  const doc = nlp('george is a person.')
  doc.match('george').tag('Surgeon')

  t.ok(doc.has('#Surgeon'), here + 'Surgeon-tag-there')
  t.ok(doc.has('#Doctor'), here + 'doctor-tag-there')
  t.ok(doc.has('#Person'), here + 'person-tag-there')

  //remove one in the middle..
  doc.match('george').unTag('Person')
  t.ok(doc.has('#Person') === false, here + 'person-tag-gone')
  t.ok(doc.has('#Doctor') === false, here + 'doctor-tag-gone1')
  t.ok(doc.has('#Surgeon') === false, here + 'Surgeon-tag-gone')
  t.end()
})

test('tagset-remove-half-downward', function (t) {
  isolateModel(t, nlp.model().one, ['tagSet', 'tagAliases', 'lexicon', '_multiCache'])
  nlp.addTags({
    Doctor: {
      is: 'Person',
    },
    Surgeon: {
      is: 'Doctor',
    },
  })
  const doc = nlp('george is a person.')
  doc.match('george').tag('Surgeon')

  //remove one just under the top..
  doc.match('george').unTag('Doctor')
  t.ok(doc.has('#Person') === true, here + 'person-tag-there')
  t.ok(doc.has('#Doctor') === false, here + 'doctor-tag-gone2')
  t.ok(doc.has('#Surgeon') === false, here + 'Surgeon-tag-gone')
  t.end()
})

test('tagset-tree', function (t) {
  isolateModel(t, nlp.model().one, ['tagSet', 'tagAliases', 'lexicon', '_multiCache'])
  nlp.addTags({
    One: {},
    Two: {},
    Three: { is: 'Two' },
  })
  const doc = nlp(`have fun in toronto`, { toronto: 'Three' })
  const m = doc.match('toronto')
  t.ok(m.has('#Three'), 'three')
  t.ok(m.has('#Two'), 'two')
  t.equal(m.has('#One'), false, 'no one')
  t.equal(m.has('#Adjective'), false, here + 'no Adjective')
  t.end()
})
