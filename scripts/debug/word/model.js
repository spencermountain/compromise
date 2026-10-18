import sources from './sources.js'
import context from './context.js'
import patterns from './patterns.js'
import adhoc from '../../../src/2-two/preTagger/compute/tagger/3rd-pass/_adhoc.js'

const own = (obj, key) => Object.hasOwn(obj, key) ? obj[key] : null
const array = value => [value].flat().filter(Boolean)

const entry = (model, word) => ({
  word,
  tags: own(model.one.lexicon, word),
  switch: own(model.two.switches, word),
  frozen: own(model.one.frozenLex, word),
})

const tagFamily = (model, tags) => [...new Set(array(tags).flatMap(tag => [tag, ...(model.one.tagSet[tag]?.parents || [])]))]

const related = (nlp, item) => {
  const model = nlp.model()
  const tags = tagFamily(model, item.tags)
  const form = item.switch || ''
  const transform = nlp.methods().two.transform
  const forms = []
  if (tags.includes('Noun') || form.includes('Noun') || form.includes('Plural')) {
    forms.push(...transform.noun.all(item.word, model))
  }
  if (tags.includes('Verb') || /Verb|Gerund|Past|Present/.test(form)) {
    let tense = array(item.tags).find(tag => ['Gerund', 'PastTense', 'Participle', 'PresentTense'].includes(tag))
    if (form.includes('Gerund')) {
      tense = 'Gerund'
    }
    const base = transform.verb.toInfinitive(item.word, model, tense)
    forms.push(...transform.verb.all(base, model))
  }
  if (tags.includes('Adjective') || form.includes('Adj')) {
    forms.push(...transform.adjective.all(item.word, model))
  }
  return [...new Set(forms)].filter(word => word && word !== item.word).map(word => entry(model, word))
}

const inspect = (nlp, word, sentence) => {
  const model = nlp.model()
  const lexical = entry(model, word)
  const sourceCandidates = sources(word)
  const rules = model.two.leftRight
  const family = tagFamily(model, lexical.tags)
  const indexed = (index, keys) => keys.flatMap(key => (own(index, key) || []).map(rule => ({ key, rule: rule.reason })))
  const report = {
    ...lexical,
    sourceCandidates,
    patterns: patterns(model.two, word),
    related: related(nlp, lexical),
    clues: model.two.clues[lexical.switch] || null,
    clueSource: null,
    adHoc: Object.hasOwn(adhoc, lexical.switch),
    rules: {
      byWord: indexed(rules.byWord, [word]),
      bySwitch: indexed(rules.bySwitch, [lexical.switch].filter(Boolean)),
      byDefaultTag: indexed(rules.byTag, family),
    },
    notes: [
      'Source hits are candidates, not proven provenance; maintained data may differ from packed runtime data.',
      'Related forms are morphology suggestions, not proof that an entry was generated from this word.',
      'Pattern candidates show the first match per stage, in suffix → suffix regex → prefix order. These require an untagged term; earlier stages and other regex rules may take precedence.',
      'Indexed rules are candidates. Default-tag rules omit rules enabled by later tag changes; general postTagger patterns are not listed.',
    ],
  }
  // Keep disabled clue entries visible in JSON, including undefined overrides.
  if (report.clues) {
    let file = lexical.switch.toLowerCase().replace('|', '-')
    if (lexical.switch === 'Plural|Verb') {
      file = 'index'
    }
    report.clueSource = `src/2-two/preTagger/model/clues/${file}.js`
    report.clues = Object.fromEntries(Object.entries(report.clues).map(([key, values]) => [key,
      Object.fromEntries(Object.entries(values).map(([name, tag]) => [name, tag ?? null])),
    ]))
  }
  if (!sourceCandidates.length && lexical.tags) {
    report.notes.push('No literal source hit: this entry may be generated, or its source may be outside the scanned files.')
  }
  if (sentence !== undefined) {
    const { doc, events } = context(nlp, word, sentence)
    report.context = {
      sentence,
      events,
      occurrences: doc.docs.flat().filter(term => (term.normal || term.implicit || '').toLowerCase() === word).map(term => ({
        text: term.text, index: term.index, tags: [...term.tags], switch: term.switch || null,
      })),
    }
    report.notes.push('Context traces match exact terms; multiword lexical keys may have no matching occurrence.')
  }
  return report
}

export default inspect
