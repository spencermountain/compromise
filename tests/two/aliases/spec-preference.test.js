import test from 'tape'
import nlp from '../_lib.js'

test('alias order selects spec output', t => {
  const model = nlp.world().model.one
  const { tagSet, tagAliases } = model
  t.teardown(() => {
    model.tagSet = tagSet
    model.tagAliases = tagAliases
  })
  nlp.addTags({ SpecAliasRoot: { aliases: ['SpecShort', 'SpecOther'] } })
  const doc = nlp.tokenize('example').tag('SpecOther')
  t.equal(doc.out('spec'), 'example {SpecShort}', 'first alias is preferred')
  t.ok(doc.has('#SpecShort'), 'first alias matches')
  t.ok(doc.has('#SpecOther'), 'other aliases match')
  nlp.addTags({ SpecAliasRoot: { aliases: [null, 'SpecShort', 'SpecOther'] } })
  t.equal(doc.out('spec'), 'example {SpecAliasRoot}', 'null selects canonical name')
  t.ok(doc.has('#SpecShort'), 'null does not disable input aliases')
  t.ok(nlp.tokenize('example').tag('SpecOther').has('#SpecAliasRoot'), 'tagging resolves input alias')
  nlp.addTags({ SpecAliasRoot: { aliases: [] } })
  t.equal(doc.out('spec'), 'example {SpecAliasRoot}', 'empty array selects canonical name')
  t.end()
})

test('legacy alias is a fallback only', t => {
  const model = nlp.world().model.one
  const { tagSet, tagAliases } = model
  t.teardown(() => {
    model.tagSet = tagSet
    model.tagAliases = tagAliases
  })
  nlp.addTags({ SpecLegacyRoot: { alias: 'SpecLegacy' } })
  const doc = nlp.tokenize('example').tag('SpecLegacy')
  t.equal(doc.out('spec'), 'example {SpecLegacy}', 'legacy output preference')
  nlp.addTags({ SpecLegacyRoot: { aliases: [null, 'SpecNew'] } })
  t.equal(doc.out('spec'), 'example {SpecLegacyRoot}', 'explicit null overrides legacy')
  t.ok(doc.has('#SpecNew'), 'new alias registered')
  t.notOk(doc.has('#SpecLegacy'), 'explicit aliases replace legacy input names')
  nlp.addTags({ SpecLegacyRoot: { aliases: ['SpecNew'] } })
  t.equal(doc.out('spec'), 'example {SpecNew}', 'new preference overrides legacy')
  nlp.addTags({ SpecLegacyRoot: { aliases: [] } })
  t.equal(doc.out('spec'), 'example {SpecLegacyRoot}', 'empty aliases override legacy')
  t.notOk(doc.has('#SpecNew'), 'empty aliases remove input aliases')
  t.end()
})
