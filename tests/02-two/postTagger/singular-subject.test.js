import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/singular-subject] '

test('a singular determiner means the last word is the verb', function (t) {
  const arr = [
    ['A good morning routine helps', 'routine', 'helps'],
    ['A good morning routine works', 'routine', 'works'],
    ['A morning routine helps', 'routine', 'helps'],
    ['A routine helps', 'routine', 'helps'],
    ['This routine helps', 'routine', 'helps'],
    ['That routine helps', 'routine', 'helps'],
    ['A good plan helps', 'plan', 'helps'],
    ['A very good plan helps', 'plan', 'helps'],
    ['A big new plan helps', 'plan', 'helps'],
    ['Another plan works', 'plan', 'works'],
    ['I think a good plan helps', 'plan', 'helps'],
    ['Every child counts', 'child', 'counts'],
    ['Each step matters', 'step', 'matters'],
    ['A good diet matters', 'diet', 'matters'],
    ['A new system works', 'system', 'works'],
    ['An idea matters', 'idea', 'matters'],
    ['A representative helps', 'representative', 'helps'],
  ]
  arr.forEach(([str, noun, verb]) => {
    const doc = nlp(str)
    t.ok(doc.match(noun).has('#Noun'), here + `noun: '${str}'`)
    t.notOk(doc.match(noun).has('#Adjective'), here + `not adjective: '${str}'`)
    t.ok(doc.match(verb).has('#PresentTense'), here + `verb: '${str}'`)
    t.notOk(doc.match(verb).has('#Plural'), here + `not plural: '${str}'`)
  })
  t.end()
})

test('good morning stays a noun phrase here', function (t) {
  const doc = nlp('A good morning routine helps')
  t.ok(doc.has('^#Determiner #Adjective #Noun #Noun #PresentTense$'), here + 'whole sentence')
  t.notOk(doc.has('#Expression'), here + 'no expression')
  t.end()
})

test('the plural reading is kept', function (t) {
  const arr = [
    // the determiner does not lead this noun
    ["a friend's plans", 'plans'],
    ["A friend's needs", 'needs'],
    ['A friend’s needs', 'needs'],
    ["An old man's dreams", 'dreams'],
    ['once a year updates', 'updates'],
    // quantities
    ['a few plans', 'plans'],
    ['a couple plans', 'plans'],
    ['a great many plans', 'plans'],
    ['this many plans', 'plans'],
    ['a dozen plans', 'plans'],
    ['a hundred signs', 'signs'],
    ['Every few steps', 'steps'],
    // no singular determiner
    ['ambitious sales targets', 'targets'],
    ['near death experiences', 'experiences'],
    // mid-clause modifier
    ['a fantasy sports league', 'sports'],
    // a verb, or punctuation, splits the phrase
    ["I'd love to have a job cleaning mirrors.", 'mirrors'],
    ['(a) In future reports, the office should act.', 'reports'],
  ]
  arr.forEach(([str, word]) => {
    t.ok(nlp(str).match(word).has('#Plural'), here + `plural: '${str}'`)
  })
  t.end()
})

test('an adjective before a noun is unchanged', function (t) {
  const arr = [
    ['plug it into a classic port', 'classic'],
    ['a general trend away from it', 'general'],
  ]
  arr.forEach(([str, word]) => {
    t.ok(nlp(str).match(word).has('#Adjective'), here + `adjective: '${str}'`)
  })
  t.end()
})
