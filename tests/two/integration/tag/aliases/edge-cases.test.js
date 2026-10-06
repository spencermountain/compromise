import test from 'tape'
import nlp from '../../../_lib.js'
const here = '[two/integration/tag/aliases/edge-cases] '

const restore = t => {
  const model = nlp.world().model.one
  const { tagSet, tagAliases } = model
  t.teardown(() => {
    model.tagSet = tagSet
    model.tagAliases = tagAliases
  })
}

test(here + 'aliases in plugin relationships', t => {
  restore(t)
  nlp.addTags({
    AliasParent: { aliases: ['AliasParentShort'] },
    AliasExtra: { aliases: ['AliasExtraShort'] },
    AliasExcluded: { aliases: ['AliasExcludedShort'] },
    AliasChild: { isA: 'AliasParentShort', also: ['AliasExtraShort'], notA: ['AliasExcludedShort'] },
  })
  const doc = nlp.tokenize('example').tag('AliasChild')
  t.ok(doc.has('#AliasParent'), 'parent alias resolves')
  t.ok(doc.has('#AliasExtra'), 'additional parent alias resolves')
  t.notOk(nlp.world().model.one.tagSet.AliasParentShort, 'no phantom alias tag')
  doc.tagSafe('AliasExcluded')
  t.notOk(doc.has('#AliasExcluded'), 'exclusion alias resolves')
  doc.unTag('AliasParentShort')
  t.notOk(doc.has('#AliasChild'), 'removing aliased parent removes descendants')
  t.end()
})

test(here + 'compiled rules resolve aliases before applying actions', t => {
  restore(t)
  nlp.addTags({ AliasRuleNoun: { isA: 'Noun', aliases: ['AliasRuleShort'] } })
  const removed = nlp.tokenize('example').tag('AliasRuleNoun')
  removed.sweep(nlp.buildNet([{ match: '#AliasRuleShort', unTag: 'AliasRuleShort' }]))
  t.notOk(removed.has('#AliasRuleNoun'), 'rule removes canonical tag')
  const safe = nlp.tokenize('alpha beta')
  safe.match('alpha').tag('Verb')
  safe.sweep(nlp.buildNet([{ match: 'alpha beta', tag: 'AliasRuleShort', safe: true }]))
  t.notOk(safe.has('#AliasRuleNoun'), 'safe rule rejects entire conflicting span')
  const blocked = nlp.tokenize('example').tag('AliasRuleNoun')
  blocked.sweep(nlp.buildNet([{ match: 'example', ifNo: '#AliasRuleShort', tag: 'AliasRuleMarker' }]))
  t.notOk(blocked.has('#AliasRuleMarker'), 'aliased exclusion blocks rule')
  t.doesNotThrow(() => {
    const net = nlp.buildNet([{ match: '#AliasRuleShort', hook: '#AliasRuleShort', tag: 'AliasRuleMarker' }])
    blocked.sweep(net)
  }, 'aliased hook is valid')
  t.ok(blocked.has('#AliasRuleMarker'), 'aliased hook finds canonical tags')
  t.end()
})

test(here + 'spec output never uses a shadowed alias', t => {
  restore(t)
  nlp.addTags({ AliasSpecRoot: { aliases: ['AliasSpecShort'] } })
  const doc = nlp.tokenize('example').tag('AliasSpecRoot')
  t.equal(doc.out('spec'), 'example {AliasSpecShort}', 'uses preferred alias')
  nlp.addTags({ AliasSpecShort: {} })
  t.equal(doc.out('spec'), 'example {AliasSpecRoot}', 'falls back when alias becomes a real tag')
  t.ok(doc.has('#AliasSpecRoot'), 'canonical match remains correct')
  t.notOk(doc.has('#AliasSpecShort'), 'real tag wins over alias')
  t.end()
})

test(here + 'invalid aliases are rejected without changing the model', t => {
  restore(t)
  const previous = nlp.world().model.one.tagSet
  const invalid = ['Bad+', 'Bad?', 'Bad|Name', 'Bad Name', '#Bad', '', false, 42]
  invalid.forEach(alias => {
    t.throws(() => nlp.addTags({ AliasInvalid: { aliases: [alias] } }), /alias/i, `rejects ${String(alias)}`)
    t.ok(nlp.world().model.one.tagSet === previous, 'registration is atomic')
  })
  nlp.addTags({ AliasUnicode: { aliases: [null, '名詞', 'Nómen'] } })
  const doc = nlp.tokenize('example').tag('名詞')
  t.ok(doc.has('#Nómen'), 'Unicode aliases work')
  t.equal(doc.out('spec'), 'example {AliasUnicode}', 'null remains a valid preference')
  t.end()
})

test(here + 'normalized aliases cannot claim another canonical name', t => {
  restore(t)
  t.throws(
    () => nlp.addTags({ AliasAccentConflict: { aliases: ['Nóun'] } }),
    /alias/i,
    'rejects normalized canonical collision'
  )
  nlp.addTags({ Noun: { aliases: [null, 'Nóun'] } })
  t.ok(nlp.tokenize('example').tag('Nóun').has('#Nóun'), 'normalized spelling of its own canonical name works')
  t.end()
})
