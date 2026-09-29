import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/untag] '

test('tag inference:', function (t) {
  const m = nlp('aasdf2').unTag('Noun').unTag('NounPhrase')
  const term = m.docs[0][0]
  t.equal(term.tags.size, 0, here + 'aasdf2 has no tags')
  //give it a specific tag-
  m.tag('SportsTeam')
  // term = m.eq(0).terms(0)
  t.equal(term.tags.has('Noun'), true, here + 'aasdf2 now has Noun')
  t.equal(term.tags.has('Organization'), true, here + 'aasdf2 now has Organization(inferred)')
  //give it a redundant tag-
  m.tag('Organization')
  // term = m.eq(0).terms(0)
  t.equal(term.tags.has('Noun'), true, here + 'aasdf2 still has Noun')
  t.equal(term.tags.has('Organization'), true, here + 'aasdf2 still has Organization')
  t.end()
})

test('untag inference:', function (t) {
  const m = nlp('aasdf')
  m.tag('FemaleName')
  const term = m.docs[0][0]
  t.equal(term.tags.has('FemaleName'), true, here + 'aasdf first has FemaleName')
  t.equal(term.tags.has('Person'), true, here + 'aasdf first has person')
  t.equal(term.tags.has('Noun'), true, here + 'aasdf first has noun')
  //remove the assumption..
  m.unTag('Noun')
  t.equal(term.tags.has('Noun'), false, here + 'aasdf now has no noun')
  t.equal(term.tags.has('Person'), false, here + 'aasdf now has no person(inferred)')
  t.equal(term.tags.has('FemaleName'), false, here + 'aasdf now has no FemaleName(inferred)')
  t.end()
})

test('tag idempodence:', function (t) {
  const m = nlp('walk').tag('Verb')
  const term = m.docs[0][0]
  t.equal(term.tags.has('Verb'), true, here + 'walk has Verb')
  t.equal(term.tags.has('Value'), false, here + 'walk has no Value')
  //untag irrelevant stuff
  m.unTag('Value')
  m.unTag('Determiner')
  m.unTag('Country')
  m.unTag('Place')
  t.equal(term.tags.has('Verb'), true, here + 'walk has Verb after')
  t.equal(term.tags.has('Value'), false, here + 'walk has no Value after')
  t.end()
})

test('tags are self-removing', function (t) {
  const terms = ['Person', 'Place', 'PastTense', 'FemaleName', 'Infinitive', 'HashTag', 'Month']
  terms.forEach(function (tag) {
    const m = nlp('aasdf').tag(tag).unTag(tag)
    const t0 = m.docs[0][0]
    t.equal(t0.tags.has(tag), false, here + 'tag removes self ' + tag)
  })
  t.end()
})

test('untag wildcard', function (t) {
  const r = nlp('we live in Toronto Canada and it is cold')
  r.match('#Place+').unTag('*')
  t.equal(r.match('#Place').found, false, here + 'place-tag-is-gone')
  const term = r.docs[0][3] || {}
  t.equal(term.tags.size, 0, here + 'toronto-has-no-tags-now')
  t.end()
})

test('tagset conflict:', function (t) {
  const doc = nlp('april 5th')
  doc.match('april').tag('Person')
  t.equal(doc.has('#Month'), false, here + 'no-month')
  t.equal(doc.firstTerm().has('#Date'), false, here + 'no-date')
  doc.match('april').tag('Imperative')
  t.equal(doc.has('#Person'), false, here + 'no-person')
  t.equal(doc.has('#Noun'), false, here + 'no-noun')
  t.end()
})

