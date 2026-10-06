import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/left-right/neighbour-context] '

test(here + 'left/right dates, units and local prepositions', t => {
  assertSpec(t, `
# left/right dates, units and local prepositions
It costs five bucks. {Pronoun,Pres,Money,Unit|Currency}
The board is five feet long. {Det,Noun,Copula,Cardinal,Unit,Adj}
The park covers three square miles. {Det,Noun,Pres,Cardinal,Unit,Unit}
We need five gb of storage. {Pronoun,Inf,Cardinal,Unit,Prep,Noun}
Wait a half second. {Imperative,Det,Value,Unit}
We meet on sat. {Pronoun,Inf,Prep,WeekDay}
We meet on wed. {Pronoun,Inf,Prep,WeekDay}
We arrive in March. {Pronoun,Inf,Prep,Month}
We arrive in early May. {Pronoun,Inf,Prep,Adj,Month}
They march quickly. {Pronoun,Inf,Adv}
We need some kind of help. {Pronoun,Inf,Det,Noun,Prep,Noun}
She teaches dance music. {Pronoun,Pres,Noun,Noun}
We meet at 5pm eastern. {Pronoun,Inf,Prep,Time,Timezone}
The plane is right above the clouds. {Det,Noun,Copula,Adv,Prep,Det,Plural}
The boat is directly below the bridge. {Det,Noun,Copula,Adv,Prep,Det,Noun}
They stood just under our balcony. {Pronoun,Past,Adv,Prep,Poss,Noun}
The bird flew well over them. {Det,Noun,Past,Adv,Prep,Pronoun}
`)
  t.end()
})

test(here + 'migrated tag-based left/right contexts', t => {
  assertSpec(t, `
# migrated tag-based left/right contexts
a well made table {Det,Adv,Adj,Noun}
more amusing than a movie {Adv,Adj,Prep,Det,Noun}
very annoying {Adv,Adj}
a blown motor {Det,Adj,Noun}
any charge {Det,Noun}
the above is clear {Det,Singular,Copula,Adj}
who he knows {Preposition,Pronoun,Pres}
`)
  t.end()
})

test(here + 'more left/right tagging contexts', t => {
  assertSpec(t, `
# more left/right tagging contexts
They have running water. {Pronoun,Inf,Adj,Noun}
It left an enduring legacy. {Pronoun,Past,Det,Adj,Noun}
She is pretty happy. {Pronoun,Copula,Adv,Adj}
Even the dog left. {Adv,Det,Noun,Past}
He looks happy. {Pronoun,Pres,Adj}
She sounds happy. {Pronoun,Pres,Adj}
They start singing. {Pronoun,Inf,Ger}
We left right after lunch. {Pronoun,Past,Adv,Prep,Noun}
It is always there. {Pronoun,Copula,Adv,Adjective}
I said sorry. {Pronoun,Past,Expression}
We flew to Turkey. {Pronoun,Past,Prep,Country}
Is there any more? {Copula,There,Det,Singular}
`)
  t.end()
})

test(here + 'left/right rules in the tagging pipeline', t => {
  assertSpec(t, `
# left/right rules in the tagging pipeline
The said elephant vanished. {Det,Adj,Noun,Past}
She still sings. {Pronoun,Adv,Pres}
The shelf is high enough. {Det,Noun,Copula,Adj,Adv}
A ticket is a must. {Det,Noun,Copula,Det,Singular}
We must march. {Pronoun,Modal,Inf}
She will dance. {Pronoun,Modal,Inf}
They said that she left. {Pronoun,Past,Conj,Pronoun,Past}
There is plenty of food. {There,Copula,Uncountable,Prep,Noun}
I waited a while. {Pronoun,Past,Det,Singular}
`)
  t.end()
})

test(here + 'Local left/right corrections', t => {
  assertSpec(t, `
# Local left/right corrections
That is all. {Pronoun,Copula,Noun}
She even left. {Pronoun,Adv,Past}
She had time. {Pronoun,Past,Noun}
Same kind of shouts. {Adj,Noun,Prep,Plural}
Google me. {Inf,Pronoun}
Half a penny. {Fraction,Det,Currency}
I frequent this restaurant. {Pronoun,Inf,Det,Noun}
The station was closing. {Det,Noun,Aux,Ger}
The shop is closing soon. {Det,Noun,Aux,Ger,Adv}
Plants that were growing. {Plural,Conj,Aux,Ger}
That is when he arrived. {Pronoun,Copula,Conj,Pronoun,Past}
She has since moved. {Pronoun,Aux,Adv,Past}

1pm next sun. {Time,Date,WeekDay}
He bowed his head in prayer. {Pronoun,Past,Poss,Noun,Prep,Noun}
Assign all tasks. {Inf,Det,Plural}
From start to finish. {Prep,Noun,Prep,Noun}
Pope Francis. {Honorific,Person}
Prince Paris. {Honorific,Person}
Shit them. {Inf,Pronoun}
Damn them. {Inf,Pronoun}
Being born. {Aux,Past}
How he is driving. {Conj,Pronoun,Aux,Ger}
The very professional actor. {Det,Adv,Adj,Actor}
A dammed-up river. {Det,Adj,Adj,Noun}
A must-win game. {Det,Adj,Adj,Noun}
Vacuum-sealed. {Adj,Adj}
What the hell? {QuestionWord,Det,Noun}
What they are doing is useful. {Conj,Pronoun,Aux,Ger,Copula,Adj}
`)
  t.end()
})

test(here + 'left/right migrated tag and untag phrases', t => {
  assertSpec(t, `
# left/right migrated tag and untag phrases
I ate turkey {Pronoun,Past,Uncountable|!Place|!Country}
a turkey sandwich {Det,Uncountable|!Place|!Country,Noun}
we visited Turkey {Pronoun,Past,Country}
I waited ten seconds {Pronoun,Past,Cardinal|!Fraction,Plural|!Value}
make me talk to his hand {Imperative,Pronoun,Inf|!Noun,Prep,Poss,Noun}
a left-out-type existence {Det,Adj,Adj,Noun|!Verb,Noun}
send it to her {Imperative,Pronoun,Prep|!Conjunction,Pronoun}
go to the store {Imperative,Prep|!Conjunction,Det,Noun}
an un skilled worker {Det,Adjective|Prefix,Adj,Actor}
they over-estimate it {Pronoun,Verb|Prefix,Inf,Pronoun}
she bought a Warhol {Pronoun,Past,Det,Noun|!Person|!LastName}
she spoke to Warhol {Pronoun,Past,Prep,Person}
`)
  t.end()
})

test(here + 'existing neighbour equivalents', t => {
  assertSpec(t, `
# rule cleanup: existing neighbour equivalents
boring the audience {Ger,Det,Noun}
amusing the children {Ger,Det,Plural}
annoying the neighbours {Ger,Det,Plural}
her favourite sport {Poss,Adj,Noun}
his professional opinion {Poss,Adj,Noun}
their individual goals {Poss,Adj,Plural}
some kind of teacher {Det,Noun,Prep,Actor}
a different kind of music {Det,Adj,Noun,Prep,Noun}
a new kind of engine {Det,Adj,Noun,Prep,Noun}
on Sat {Prep,WeekDay}
before Sat {Prep,WeekDay}
until Sat {Prep,WeekDay}
five feet {Cardinal,Unit}
one foot {Cardinal,Unit}
twelve feet long {Cardinal,Unit,Adj}
to dream of home {Conjunction,Inf,Prep,Noun}
to talk about music {Conjunction,Inf,Prep,Noun}
to walk through town {Conjunction,Inf,Prep,Noun}
how are ya {QuestionWord,Copula,Pronoun}
this is for ya {Pronoun,Copula,Prep,Pronoun}
we met shortly after {Pronoun,Past,Adv,Adv}
she arrived soon after {Pronoun,Past,Adv,Adv}
they returned long after {Pronoun,Past,Adv,Adv}
she has since moved {Pronoun,Aux,Adv,Past}
we have since moved {Pronoun,Aux,Adv,Past}
they had since resigned {Pronoun,Aux,Adv,Past}
she has not arrived yet {Pronoun,Aux,Negative,Past,Adv}
we have not arrived yet {Pronoun,Aux,Negative,Past,Adv}
he has not called yet {Pronoun,Aux,Negative,Past,Adv}
what work he did {QuestionWord,Noun,Pronoun,Past}
which book she read {QuestionWord,Noun,Pronoun,Past}
whose watch he borrowed {QuestionWord,Noun,Pronoun,Past}
what walks he took {QuestionWord,Plural,Pronoun,Past}
which books she read {QuestionWord,Plural,Pronoun,Past}
whose watches he repaired {QuestionWord,Plural,Pronoun,Past}
`)
  t.end()
})
