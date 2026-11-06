import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/subject-verb-agreement] '

test('a verb after a prepositional phrase is unchanged', function (t) {
  const arr = [
    ['Heaviest rain in four decades hits Delhi', 'hits'],
    ['A recent survey of 126 countries shows that it is true', 'shows'],
    ['The first set of regulations focuses on equipment', 'focuses'],
    ['Plan to phase out old vehicles hits roadblock', 'hits'],
  ]
  arr.forEach(([str, word]) => {
    t.ok(nlp(str).match(word).has('#Verb'), here + `verb: '${str}'`)
  })
  t.end()
})

test('a plural subject does not take an -s verb', function (t) {
  const arr = [
    ['sales targets', 'targets'],
    ['the sales targets', 'targets'],
    ['these sales targets', 'targets'],
    ['few sales targets', 'targets'],
    ['a few sales targets', 'targets'],
    ['a lot of sales targets', 'targets'],
    ['many sales targets', 'targets'],
    ['ambitious sales targets', 'targets'],
    ['the new sales targets.', 'targets'],
    ['near death experiences', 'experiences'],
    ['the near death experiences', 'experiences'],
  ]
  arr.forEach(([str, word]) => {
    t.ok(nlp(str).match(word).has('#Plural'), here + `plural: '${str}'`)
    t.notOk(nlp(str).match(word).has('#Verb'), here + `not a verb: '${str}'`)
  })
  t.end()
})

test('a possessive leads a plural noun', function (t) {
  const arr = [
    ["This year's plans", 'plans'],
    ["Each child's needs", 'needs'],
    ["A friend's needs", 'needs'],
    ["John's plans", 'plans'],
  ]
  arr.forEach(([str, word]) => {
    t.ok(nlp(str).match(word).has('#Plural'), here + `plural: '${str}'`)
  })
  t.end()
})

test('a gerund noun can head a singular subject', function (t) {
  const arr = [
    ['a good meeting helps', 'meeting', 'helps'],
    ['a meeting helps', 'meeting', 'helps'],
    ['A wedding matters', 'wedding', 'matters'],
  ]
  arr.forEach(([str, noun, verb]) => {
    const doc = nlp(str)
    t.ok(doc.match(noun).has('#Noun'), here + `noun: '${str}'`)
    t.notOk(doc.match(noun).has('#Adjective'), here + `not adjective: '${str}'`)
    t.ok(doc.match(verb).has('#PresentTense'), here + `verb: '${str}'`)
  })
  t.end()
})

test('noun phrases keep the plural', function (t) {
  const arr = [
    ['the bus stops', 'stops'],
    ['The new plans', 'plans'],
    ['your guild colors', 'colors'],
    ['Trembling hands.', 'hands'],
    ['Near death experiences.', 'experiences'],
    ['Quick service and fun flavors.', 'flavors'],
    ['I saw the bus stops.', 'stops'],
    ['She likes the new plans.', 'plans'],
    ['The dog treats.', 'treats'],
    ['the sweet potato fries.', 'fries'],
    ['the health services', 'services'],
    ["I'd love to have a job cleaning mirrors.", 'mirrors'],
  ]
  arr.forEach(([str, word]) => {
    t.ok(nlp(str).match(word).has('#Plural'), here + `plural: '${str}'`)
  })
  t.end()
})
