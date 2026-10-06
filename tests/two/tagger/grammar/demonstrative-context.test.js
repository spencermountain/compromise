import test from 'tape'
import assertSpec from '../../_spec.js'

test('two/tagger/demonstrative-context: demonstrative questions', t => {
  assertSpec(t, `
# frequent failed-rule cleanup preserves demonstrative questions
Can those really fly? {Modal,Pronoun,Adv,Inf}
Can that bird fly? {Modal,Det,Noun,Inf}
These machines work. {Det,Plural,Inf}
Those birds can fly. {Det,Plural,Modal,Inf}
`)
  t.end()
})

test('two/tagger/demonstrative-context: demonstrative subjects and text dates', t => {
  assertSpec(t, `
# second-pass cleanup: demonstrative subjects and text dates
this helps {Pronoun,Pres}
this really works {Pronoun,Adv,Pres}
this is useful {Pronoun,Copula,Adj}
this machine works {Det,Noun,Pres}
this red boat floats {Det,Adj,Noun,Pres}
this helps, but that hurts {Pronoun,Pres,Conj,Pronoun,Pres}
May twenty five {Month,Date,Date}
June twenty one {Month,Date,Date}
August thirty one {Month,Date,Date}
twenty five apples {Cardinal|!Date,Cardinal|!Date,Plural}
`)
  t.end()
})

test('two/tagger/demonstrative-context: this across adverbs and clause boundaries', t => {
  assertSpec(t, `
# second-pass cleanup: this across adverbs and clause boundaries
this really helps {Pronoun|!Determiner,Adv,Pres}
this almost always works {Pronoun|!Determiner,Adv,Adv,Pres}
we waited, but this really helps {Pronoun,Past,Conj,Pronoun|!Determiner,Adv,Pres}
this really useful tool works {Det,Adv,Adj,Noun,Pres}
this very old house stands {Det,Adv,Adj,Noun,Pres}
this running water helps {Det,Adj,Noun,Pres}
`)
  t.end()
})

test('two/tagger/demonstrative-context: this still helps keeps an adverb between subject and verb', t => {
  assertSpec(t, `
# this still helps keeps an adverb between subject and verb
this still helps {Pronoun,Adv,Pres|!Noun}
we waited, but this still helps {Pronoun,Past,Conj,Pronoun,Adv,Pres|!Noun}
this still works {Pronoun,Adv,Pres|!Noun}
this still water {Det,Adj,Noun}
a still night {Det,Adj,Noun}
the still air {Det,Adj,Noun}
`)
  t.end()
})

test('two/tagger/demonstrative-context: still distinguishes demonstrative predicates from plural noun phrases', t => {
  assertSpec(t, `
# still distinguishes demonstrative predicates from plural noun phrases
this still helps me {Pronoun,Adv,Pres,Pronoun}
that still works {Pronoun,Adv,Pres}
that still helps us {Pronoun,Adv,Pres,Pronoun}
the still waters {Det,Adj,Plural|!Verb}
these still waters {Det,Adj,Plural|!Verb}
those still waters {Det,Adj,Plural|!Verb}
`)
  t.end()
})

test('two/tagger/demonstrative-context: demonstrative questions after auxiliaries', t => {
  assertSpec(t, `
# rule cleanup: demonstrative questions after auxiliaries
can this work? {Modal,Pronoun|!Determiner,Inf}
could those really help? {Modal,Pronoun|!Determiner,Adv,Inf}
will these actually work? {Modal,Pronoun|!Determiner,Adv,Inf}
can those birds fly? {Modal,Det,Plural,Inf}
`)
  t.end()
})
