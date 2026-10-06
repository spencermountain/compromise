import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/aliases/penn] '

test(here + 'common Penn-style aliases use canonical tags', t => {
  const aliases = {
    NN: 'Noun',
    NNS: 'Plural',
    NNP: 'ProperNoun',
    JJ: 'Adjective',
    JJR: 'Comparative',
    JJS: 'Superlative',
    RB: 'Adverb',
    Inf: 'Infinitive',
    VBD: 'PastTense',
    VBG: 'Gerund',
    VBN: 'Participle',
    PRP: 'Pronoun',
    DT: 'Determiner',
    IN: 'Preposition',
    CC: 'Conjunction',
    MD: 'Modal',
  }
  Object.entries(aliases).forEach(([alias, canonical]) => {
    const doc = nlp.tokenize('example').tag(`#${alias}`)
    t.ok(doc.has(`#${canonical}`), `${alias} tags as ${canonical}`)
    t.equal(doc.match(`#${alias}`).text(), 'example', `${alias} matches`)
    t.notOk(doc.json()[0].terms[0].tags.includes(alias), `${alias} is not stored`)
    doc.unTag(alias)
    t.notOk(doc.has(`#${canonical}`), `${alias} removes canonical tag`)
  })
  t.end()
})

test(here + 'localized plugin aliases preserve tag definitions', t => {
  const model = nlp.world().model.one
  const { tagSet, tagAliases } = model
  t.teardown(() => {
    model.tagSet = tagSet
    model.tagAliases = tagAliases
  })
  nlp.plugin({ tags: { Noun: { aliases: ['Nomen', 'Substantiv', 'NN'] } } })
  const doc = nlp.tokenize('das haus')
  doc.match('haus').tag('Nomen')
  t.equal(doc.match('das #Nomen').text(), 'das haus', 'localized match')
  t.ok(doc.has('(#Substantiv|#JJ)'), 'aliases in alternatives')
  t.ok(doc.has('#NN'), 'Penn-style alias alongside localized names')
  nlp.addTags({ AliasTestAnimal: { isA: 'Noun', aliases: ['AliasTestTier'] } })
  t.ok(nlp.tokenize('hund').tag('AliasTestTier').has('#Nomen'), 'plugin inheritance')
  nlp.addTags({ NN: {} })
  t.notOk(doc.has('#NN'), 'explicit plugin tag takes precedence')
  t.ok(doc.has('#Noun'), 'canonical stored tags remain unchanged')
  t.end()
})
