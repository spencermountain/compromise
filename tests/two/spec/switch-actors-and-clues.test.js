import test from 'tape'
import nlp from '../_lib.js'
import assertSpec from '../_spec.js'

// Hand-written expectations for common actor/verb and contextual ambiguities.
const cases = [
  // Actor|Verb candidates; plural forms also need Plural|Verb membership.
  'They author the report. {Noun,Vb,Det,Noun}',
  'The author is famous. {Det,Actor,Vb,Adj}',
  'She authors the report. {Noun,Vb,Det,Noun}',
  'The authors are famous. {Det,Actor,Vb,Adj}',
  'They mentor young students. {Noun,Vb,Adj,Noun}',
  'The mentor is helpful. {Det,Actor,Vb,Adj}',
  'She mentors young students. {Noun,Vb,Adj,Noun}',
  'The mentors are helpful. {Det,Actor,Vb,Adj}',
  'They tutor young students. {Noun,Vb,Adj,Noun}',
  'The tutor is helpful. {Det,Actor,Vb,Adj}',
  'She tutors young students. {Noun,Vb,Adj,Noun}',
  'The tutors are helpful. {Det,Actor,Vb,Adj}',
  'They partner with schools. {Noun,Vb,Prep,Noun}',
  'The partner is helpful. {Det,Actor,Vb,Adj}',
  'She partners with schools. {Noun,Vb,Prep,Noun}',
  'The partners are helpful. {Det,Actor,Vb,Adj}',

  // Distributive each must not hide a preceding subject from switch clues.
  'We each pay rent. {Noun,Det,Vb,Noun}',
  'They each book rooms. {Noun,Det,Vb,Noun}',
  'They each own a car. {Noun,Det,Vb,Det,Noun}',
  'Each work permit expired. {Det,Noun,Noun,Vb}',
  'Each book costs money. {Det,Noun,Vb,Noun}',

  // rival needs a noun reading as well as its adjective and verb uses.
  'Their rival is strong. {Poss,Noun,Vb,Adj}',
  'Our rival won. {Poss,Noun,Vb}',
  'The rival team won. {Det,Adj,Noun,Vb}',
  'They rival the best teams. {Noun,Vb,Det,Adj,Noun}',
]

test('actor switches and contextual clues spec', t => {
  assertSpec(t, cases)
  // Keep these controls focused on the switch, not unrelated neighbouring tags.
  t.ok(nlp('We each work here').match('work').has('#Verb'), 'each after a subject: work is a verb')
  t.ok(nlp('Each pay rise helps').match('pay').has('#Noun'), 'each before a noun phrase: pay is a noun')
  t.end()
})
