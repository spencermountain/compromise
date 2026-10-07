import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[two/postTagger/lexical-context] '

test(here + 'lexical ambiguity in sentence context', t => {
  assertSpec(t, `
#switch-keyed tagging examples
Her favourite book disappeared. {Poss,Adj,Noun,Past}
Drew said hello. {Person,Past,Expression}
We visited East Sydney. {Pronoun,Past,Place,Place}
We visited Sydney harbour. {Pronoun,Past,Place,Noun}
They are asking questions. {Pronoun,Aux,Ger,Plural}
Visit https://example.com. {Imperative,Url}
Commit to the plan. {Imperative,Prep,Det,Noun}
`)
  t.end()
})

test(here + 'lexical phrase readings', t => {
  assertSpec(t, `
# Phrase readings carried over from the pending rule-cleanup tests
we have since finished {Pronoun,Aux,Adv,Past}
we have not finished yet {Pronoun,Aux,Negative,Past,Adv}
we under-estimate costs {Pronoun,Prefix,Inf,Plural}
a holy book {Det,Adj,Noun}
an even number {Det,Adj,Noun}
`)
  t.end()
})

test(here + 'fixed lexical phrases', t => {
  assertSpec(t, `
# rule cleanup: fixed lexical phrases
Manchester United won {SportsTeam,SportsTeam,Past}
we support Newcastle United {Pronoun,Inf,SportsTeam,SportsTeam}
Sheffield United played well {SportsTeam,SportsTeam,Past,Adv}
the school board met {Det,Organization,Organization,Past}
our health board voted {Poss,Organization,Organization,Past}
the commerce board agreed {Det,Organization,Organization,Past}
the steering committee met {Det,Organization,Organization,Past}
a special committee investigated {Det,Organization,Organization,Past}
the executive committee voted {Det,Organization,Organization,Past}
eastern time {Timezone,Timezone}
pacific daylight time {Timezone,Timezone,Timezone}
atlantic standard time {Timezone,Timezone,Timezone}
central european time {Timezone,Timezone,Timezone}
western european time {Timezone,Timezone,Timezone}
eastern european time {Timezone,Timezone,Timezone}
holy shit! {Expression,Expression}
holy fuck! {Expression,Expression}
holy hell! {Expression,Expression}
I barely even noticed {Pronoun,Adv,Adv,Past}
we hardly even spoke {Pronoun,Adv,Adv,Past}
she barely even smiled {Pronoun,Adv,Adv,Past}
the school opened {Det,Noun,Past}
`)
  t.end()
})

test(here + 'u r shorthand', t => {
  assertSpec(t, `
# rule cleanup: u r shorthand
u r cool {Pronoun,Copula,Adj}
u r very kind {Pronoun,Copula,Adverb,Adj}
u r a friend {Pronoun,Copula,Det,Noun}
`)
  t.end()
})

test('rule cleanup: modal words used as nouns', t => {
  assertSpec(t, `
    the can {Det,Singular}
    the will {Det,Singular}
    the may {Det,Singular}
    she can swim {Pronoun,Modal,Inf}
    they will leave {Pronoun,Modal,Inf}
    we may go {Pronoun,Modal,Inf}
  `, here.trim())
  t.end()
})
