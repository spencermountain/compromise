import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[two/postTagger/lexical-corrections] '

test(here + 'born is a participle', t => {
  assertSpec(t, `
I was born in 1985. {Pronoun,Copula,Past,Prep,Date}
He was born yesterday. {Pronoun,Copula,Past,Date}
I was born on 12.03.1985 {Pronoun,Copula,Past,Prep,Date}
Born on 10.11.12 {Past,Prep,Date}
Born in 1985, he left. {Past,Prep,Date,Pronoun,Past}
She was born to run. {Pronoun,Copula,Past,.,Inf}
They are born free. {Pronoun,.,Past,Adj}
a born leader {Det,Adj,Actor}
`, here)
  t.end()
})

test(here + 'soon is an adverb', t => {
  assertSpec(t, `
Come back soon. {.,.,Adv}
It will soon be over. {Pronoun,Modal,Adv,Inf,.}
You will soon find out. {Pronoun,Modal,Adv,.,.}
Soon we may leave. {Adv,Pronoun,Modal,Inf}
See you soon {.,Pronoun,Adv}
The shop is closing soon. {Det,Noun,Aux,Ger,Adv}
soon after the fall {Adv,.,Det,Noun}
As soon as you can {.,.,.,Pronoun,Modal}
Pretty soon I left. {Adv,Adv,Pronoun,Past}
soon enough {Adv,Adv}
This may be way too soon {.,Modal,Inf,Adv,Adv,Adv}
# its other forms keep their tags
sooner or later {Comparative,.,.}
no sooner had he left {.,Comparative,.,Pronoun,Past}
the soonest time {Det,Superlative,Noun}
`, here)
  t.end()
})

test(here + 'a right with a determiner is a noun', t => {
  assertSpec(t, `
She has a right to vote. {Pronoun,Vb,Det,Noun,.,Inf}
the right to vote {Det,Noun,.,Inf}
You have the right to keep it. {Pronoun,Vb,Det,Noun,.,Inf,Pronoun}
our right to life {Poss,Noun,Prep,Noun}
to the right of me {Prep,Det,Noun,Prep,Pronoun}
right to the end {Adv,Prep,Det,Noun}
go right to the store {.,Adv,Prep,Det,Noun}
it happened right after lunch {.,.,Adv,.,Noun}
call or text her right after the date {.,.,.,Pronoun,Adv,.,Det,Noun}
the right thing to do {Det,Adj,Noun,.,.}
`, here)
  t.end()
})

test(here + 'that before a plural is a conjunction', t => {
  assertSpec(t, `
I know that dogs bark. {Pronoun,Inf,Conj,Plural,Inf}
we found that problems remain {Pronoun,Past,Conj,Plural,Inf}
People always say that tattoos are bad {Plural,Adv,Inf,Conj,Plural,Copula,Adj}
he said that eggs came {Pronoun,Past,Conj,Plural,Past}
# a determiner before a compound, or a name
He owns that sports car. {Pronoun,Pres,Det,Plural,Noun}
See that Staples Center {.,Det,.,.}
I know that dog. {Pronoun,Inf,Det,Noun}
`, here)
  t.end()
})

test(here + 'prepositions before numbers and months', t => {
  assertSpec(t, `
I went to 888 for lunch {Pronoun,Past,Prep,Val,.,Noun}
She moved to 5 October Drive {Pronoun,Past,Prep,Addr,Addr,Addr}
it dated to 1500 BC {.,Past,Prep,.,.}
They may come in June. {Pronoun,Modal,Inf,Prep,Month}
the shop closed in July {Det,Noun,Past,Prep,Month}
# a range, and a real particle
from 3 to 5 {Prep,Val,!Prep,Val}
3 to 5 {Val,!Prep,Val}
They came in. {Pronoun,Vb,Particle}
`, here)
  t.end()
})

test(here + 'an -s word before are or were is a plural noun', t => {
  assertSpec(t, `
sports records are made {Plural,Plural,Copula,.}
Media markets are growing. {.,Plural,Aux,Ger}
Human rights abuses were reported. {.,Plural,Plural,.,.}
The Arctic lands were subjected. {Det,.,Plural,.,.}
The Arab states are divided. {Det,.,Plural,.,.}
my plans are big {Poss,Plural,Copula,Adj}
# a subject means it is still the verb
what he wants are apples {.,Pronoun,Pres,Copula,Plural}
the cars that he drives are all foreign {Det,Plural,.,Pronoun,Pres,Copula,.,Adj}
# the word before is not an adjective, after a subject
forgotten stories are lost {Adj,Plural,Copula,.}
His forgotten stories are lost {Poss,Adj,Plural,Copula,.}
I said times are changing {Pronoun,Past,Plural,Aux,Ger}
They said prices are high {Pronoun,Past,Plural,Copula,Adj}
`, here)
  t.end()
})

test(here + 'since a year', t => {
  assertSpec(t, `
I have lived here since 2010. {Pronoun,Aux,Past,.,Prep,Date}
the capital since 1849 {Det,Noun,Prep,Date}
`, here)
  t.end()
})

test(here + 'a noun after a number and a unit of time', t => {
  assertSpec(t, `
a 4 hour drive away {Det,Val,Noun,Noun,.}
a 10 minute wait {Det,Val,Noun,Noun}
a 7 week stay under the sun {Det,Val,Noun,Noun,Prep,Det,Noun}
`, here)
  t.end()
})

test(here + 'a fraction is not a date', t => {
  assertSpec(t, `
a quarter of the pie {.,Fraction|!Date,Prep,Det,Noun}
quarter of the pie {Fraction|!Date,Prep,Det,Noun}
about a quarter of a mile {.,.,Fraction|!Date,Prep,Det,Noun}
he ate a quarter of it {Pronoun,Past,.,Fraction|!Date,Prep,Pronoun}
half of them left {Fraction,Prep,Pronoun,Past}
in a quarter of an hour {Prep,.,Fraction,Prep,Det,Noun}
# a named part
my half of it {Poss,Noun|!Fraction,Prep,Pronoun}
the second half of it {Det,Ordinal,Noun|!Fraction,Prep,Pronoun}
`, here)
  t.end()
})

test(here + 'a march with a determiner is not a month', t => {
  assertSpec(t, `
The march on Monday was long {Det,Noun|!Month,Prep,Date,Copula,Adj}
A march on Monday {Det,Noun|!Month,Prep,Date}
the march 5 deadline {Det,Month,Date,Noun}
`, here)
  t.end()
})
