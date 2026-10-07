import test from 'tape'
import nlp from '../../lib/two.js'
const here = '[two/tag/aliases-additional-short-forms] '

test(here + 'additional short forms preserve canonical tags and spec output', t => {
  const aliases = {
    SG: 'Singular',
    PL: 'Plural',
    PRS: 'PresentTense',
    PST: 'PastTense',
    AJ0: 'Adjective',
    AJC: 'Comparative',
    AJS: 'Superlative',
    NN1: 'Singular',
    NN2: 'Plural',
    NP0: 'ProperNoun',
    VVI: 'Infinitive',
  }
  const specNames = {
    Singular: 'Noun',
    Plural: 'Noun',
    PresentTense: 'Vb',
    PastTense: 'Vb',
    Adjective: 'Adj',
    Comparative: 'Adj',
    Superlative: 'Adj',
    ProperNoun: 'Noun',
    Infinitive: 'Vb',
  }
  Object.entries(aliases).forEach(([alias, canonical]) => {
    const doc = nlp.tokenize('example').tag(alias)
    t.ok(doc.has(`#${canonical}`), `${alias} tags as ${canonical}`)
    t.ok(nlp.tokenize('example').tag(canonical).has(`#${alias}`), `${alias} matches canonical tags`)
    t.notOk(doc.json()[0].terms[0].tags.includes(alias), `${alias} is not stored`)
    t.equal(doc.out('spec'), `example {${specNames[canonical]}}`, `${alias} preserves spec output`)
  })
  t.end()
})
