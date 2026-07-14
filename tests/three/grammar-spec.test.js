import test from 'tape'
import nlp from './_lib.js'
const here = '[three/grammar-spec] '

// real grammatical parsing, expressed in the spec format (docs/spec-format.md).
// each line is a sentence + its expected tagging - nlp.testSpec() checks every
// line against the tagger, and returns a doc of only the *failing* lines,
// so an empty result means the whole block parsed correctly.
const check = function (t, lines, msg) {
  const failing = nlp.testSpec(lines.join('\n'), false, false)
  t.deepEqual(failing.out('array'), [], here + msg)
}

test('grammar-spec verb tenses + auxiliaries', function (t) {
  let arr = [
    'she walked home. {Noun,Vb|Past,Noun}',
    'she walks quickly. {Noun,Vb|Pres,Adv}',
    'she has walked home. {Noun,Vb|Aux,Vb|Past,Noun}',
    'she will walk home. {Noun,Vb|Aux,Vb|Inf,Noun}',
    'she is walking home. {Noun,Vb|Aux,Vb|Ger,Noun}',
    'she could swim faster. {Noun,Vb|Modal,Vb|Inf,Adj|Comparative}',
  ]
  check(t, arr, 'tenses + auxiliaries')
  t.end()
})

test('grammar-spec copulas + adjectives', function (t) {
  let arr = [
    'the sky is blue. {Det,Noun,Vb|Copula,Adj}',
    'the biggest dog won. {Det,Adj|Superlative,Noun,Vb|Past}',
    'she is taller than him. {Noun,Vb|Copula,Adj|Comparative,Prep,Noun|Pronoun}',
    'running is fun. {Noun,Vb|Copula,Adj}',
  ]
  check(t, arr, 'copulas + adjectives')
  t.end()
})

test('grammar-spec negation + contractions', function (t) {
  // contractions split into two terms - the implicit term is matchable too
  let arr = [
    'she did not walk. {Noun,Vb|Aux,Negative,Vb|Inf}',
    `she didn't walk. {Noun|Pronoun,Vb|Aux,Negative,Vb|Inf}`,
    'he cannot swim. {Noun|Pronoun,Vb,Negative,Vb|Inf}',
    `The dog don't bark. {Det,Noun,Vb,Negative,Vb}`,
  ]
  check(t, arr, 'negation + contractions')
  t.end()
})

test('grammar-spec questions', function (t) {
  let arr = [
    'where did she go? {QuestionWord,Vb,Noun|Pronoun,Vb}',
    'who is that? {QuestionWord,Vb|Copula,Det}',
    'is he going? {Vb|Copula,Noun|Pronoun,Vb|Ger}',
  ]
  check(t, arr, 'questions')
  t.end()
})

test('grammar-spec imperatives', function (t) {
  let arr = [
    'please close the door. {Expr,Vb|Imp,Det,Noun}',
    'record the record. {Vb|Imp,Det,Noun}',
  ]
  check(t, arr, 'imperatives')
  t.end()
})

test('grammar-spec noun inflection', function (t) {
  let arr = [
    'the dogs barked. {Det,Noun|Plural,Vb|Past}',
    `the dog's tail wagged. {Det,Noun|Poss,Noun,Vb|Past}`,
    `spencer's house is nice. {Noun|Poss,Noun,Vb|Copula,Adj}`,
    'he gave her the book. {Noun|Pronoun,Vb|Past,Noun|Pronoun,Det,Noun}',
  ]
  check(t, arr, 'plurals, possessives, pronouns')
  t.end()
})

test('grammar-spec proper nouns', function (t) {
  let arr = [
    'Dr. Smith arrived in Toronto. {Noun|Hon,Noun|Prop,Vb|Past,Prep,Noun|Prop}',
    'Google hired spencer in May. {Noun|Org,Vb|Past,Noun,Prep,Date}',
    'the FBI met NASA. {Det,Noun|Acronym,Vb|Past,Noun|Acronym}',
  ]
  check(t, arr, 'honorifics, orgs, acronyms')
  t.end()
})

test('grammar-spec phrases + clauses', function (t) {
  let arr = [
    'she gave up quickly. {Noun,Vb|Phrasal,Vb|Particle,Adv}',
    'she walked to the store. {Noun,Vb,Prep,Det,Noun}',
    'give it to her. {Vb,Noun|Pronoun,Prep,Noun|Pronoun}',
    'the book on the table is mine. {Det,Noun,Prep,Det,Noun,Vb|Copula,Noun}',
    'there are many options. {There,Vb|Pres,Adj,Noun|Plural}',
    'unless it rains, we go. {Condition,Noun|Pronoun,Vb,Noun|Pronoun,Vb}',
    'the cake was eaten by the dog. {Det,Noun,Vb|Copula,Vb|Participle,Prep,Det,Noun}',
  ]
  check(t, arr, 'phrasal verbs, preposition-phrases, there, conditions, passives')
  t.end()
})

test('grammar-spec values + dates', function (t) {
  let arr = [
    'i bought two tickets for $50 on friday. {Noun|Pronoun,Vb|Past,Val,Noun|Plural,Prep,Val,Prep,Date}',
    'the meeting is at 5pm on june 5th. {Det,Noun,Vb,Prep,Date,Prep,Date,Date}',
  ]
  check(t, arr, 'values + dates')
  t.end()
})

test('grammar-spec noun-verb ambiguity', function (t) {
  // same word, both jobs - the tagger disambiguates from context
  let arr = [
    'she saw a saw. {Noun,Vb|Past,Det,Noun}',
    'i run a run club. {Noun,Vb,Det,Noun,Noun}',
    'fruit flies like a banana. {Noun,Noun,Vb,Det,Noun}',
    'if it rains, we will stay home. {Conj,Noun,Vb,Noun,Vb,Vb,Noun}',
  ]
  check(t, arr, 'noun-verb disambiguation')
  t.end()
})