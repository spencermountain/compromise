import test from 'tape'
import assertSpec from '../two/_spec.js'
const here = '[hmm/rule-examples]'

const spec = `
We each work here {Pronoun,Det,Inf,Adv}
# Tag conventions, tokenization, and expectations needing review
Our leading manufacturer closed. {Poss,Adj,Actor,Past}
She drew closer. {Pronoun,Past,Adv}
Quickly warm the milk. {Adv,Imperative,Det,Noun}
Somebody call the police. {Pronoun,Imperative,Det,Noun}
Never say never. {Adv,Imperative,Adv}
Do you know? {Aux|QuestionWord,Pronoun,Inf}
Does she know? {Aux|QuestionWord,Pronoun,Inf}
as entertaining as a movie {Adv,Adj,Prep,Det,Noun}
no doubt {Det,Noun}
It looks nothing like a cat. {Pronoun,Pres,Pronoun,Prep,Det,Noun}
they out-run us {Pronoun,Prefix,Inf,Pronoun}
all dogs bark {Det,Plural,Inf}
an un-skilled worker {Det,Adj,Adj,Actor}
The repairs took all day. {Det,Plural|!Verb,Past,Det,Noun}
Does this work? {Aux,Pronoun,Inf}
Does that really help? {Aux,Pronoun,Adv,Inf}
Do these work? {Aux,Pronoun,Inf}
Does this machine work? {Aux,Det,Noun,Inf}
There is no hurry. {There,Copula,Det,Noun|!Imperative}
see ya tomorrow {Imperative,Pronoun,Date}
all this shit {Det,Det,Noun}
under cook the meat {Prefix,Imperative,Det,Noun}
over cook the rice {Prefix,Imperative,Det,Noun}
do you swim? {QuestionWord|Aux,Pronoun,Inf}
do we agree? {QuestionWord|Aux,Pronoun,Inf}
do they work? {QuestionWord|Aux,Pronoun,Inf}
does he swim? {QuestionWord|Aux,Pronoun,Inf}
does she work? {QuestionWord|Aux,Pronoun,Inf}
does it help? {QuestionWord|Aux,Pronoun,Inf}
eastern Canada {Adj,Country}
a professional bodybuilder {Det,Adj,Actor}
he drew closer {Pronoun,Past,Adv}
wash-dried clothes {Adj,Adj,Plural}
spin-dried clothes {Adj,Adj,Plural}
we near the coast {Pronoun,Inf|!Preposition,Det,Noun}
how did they leave? {QuestionWord,Aux,Pronoun,Inf}
do these work? {Aux,Pronoun|!Determiner,Inf}
do those really help? {Aux,Pronoun|!Determiner,Adv,Inf}
do these actually work? {Aux,Pronoun|!Determiner,Adv,Inf}
does this work? {Aux,Pronoun|!Determiner,Inf}
does that really help? {Aux,Pronoun|!Determiner,Adv,Inf}
does this always work? {Aux,Pronoun|!Determiner,Adv,Inf}
did this work? {Aux,Pronoun|!Determiner,Inf}
did that really help? {Aux,Pronoun|!Determiner,Adv,Inf}
did these actually work? {Aux,Pronoun|!Determiner,Adv,Inf}
do these machines work? {Aux,Det,Plural,Inf}
does this machine work? {Aux,Det,Noun,Inf}
did that machine work? {Aux,Det,Noun,Inf}
does this very old machine work? {Aux,Det,Adv,Adj,Noun,Inf}
you had better leave {Pronoun,Auxiliary,Modal,Inf}
go or eat {Imperative,Conj,Imperative}
speak clearly and go {Imperative,Adv,Conj,Imperative}
speak clearly or go {Imperative,Adv,Conj,Imperative}

# Currently failing examples
Saint Foo. {Honorific,Person}
Due to weather. {Prep,Prep,Noun}
A bit confused. {Det,Adv,Adj}
Brand new. {Adv,Adj}
Sun the 5th. {WeekDay,Date,Date}
There is no going back. {There,Copula,Negative,Noun,Adv}
And check this out! {Conj,Inf,Pronoun,Particle}
The upcoming thank-you. {Det,Noun,Noun,Noun}
With heads and arms rolling around. {Prep,Plural,Conj,Plural,Ger,Adv}
The-only-reason. {Det,Adj,Noun}
The American thank-you letter. {Det,Demonym,Noun,Noun,Noun}
At some thank-you party. {Prep,Det,Noun,Noun,Noun}
Working for thank-you letters. {Ger,Prep,Noun,Noun,Plural}
Artists on thank-you cards. {Plural,Prep,Noun,Noun,Plural}
Number of thank-yous. {Noun,Prep,Noun,Plural}
We get much thank-you mail. {Pronoun,Inf,Det,Noun,Noun,Noun}
That leads to trouble. {Pronoun,Pres,Prep,Noun}
One big thank-you. {Cardinal,Adj,Noun,Noun}
We found all upcoming words. {Pronoun,Past,Det,Adj,Plural}
Many thanks. {Det,Plural}
Cute little thank-you bags. {Adj,Adj,Noun,Noun,Plural}
Writing bigger thank-you notes. {Ger,Comparative,Noun,Noun,Plural}
Selling like hot thank-you cards. {Ger,Prep,Adj,Noun,Noun,Plural}
Some nice thank-you notes. {Det,Adj,Noun,Noun,Plural}
For some thank-you letters. {Prep,Det,Noun,Noun,Plural}
Looking good in thank-you photos. {Ger,Adj,Prep,Noun,Noun,Plural}
Get better thank-you notes. {Inf,Comparative,Noun,Noun,Plural}
Give up on thank-you letters. {Inf,Particle,Prep,Noun,Noun,Plural}
There are thank-you notes. {There,Copula,Noun,Noun,Plural}
A thousand thanks of gratitude. {Value,Value,Plural,Prep,Noun}
Thanks are appreciated. {Plural,Aux,Past}
She is writing thank-you letters. {Pronoun,Aux,Ger,Noun,Noun,Plural}
The 1968 stand-off. {Det,Year,Noun,Noun}
$5 and $6. {Money,Conj,Money}
6 dollars and 5 cents. {Money,Unit,Conj,Money,Unit}
Toronto John. {Person,Person}
Baker Jenna Smith. {Actor,Person,Person}
First lady. {Honorific,Honorific}
Second admiral. {Honorific,Honorific}
March up. {Inf,Particle}
Jobs that fit. {Plural,Conj,Inf}
He was under-paid. {Pronoun,Aux,Adv,Past}
She is being cool. {Pronoun,Aux,Copula,Adj}
He ought not to walk. {Pronoun,Modal,Negative,Connector,Inf}
He ought to be walking. {Pronoun,Modal,Connector,Aux,Ger}
He would have had to go. {Pronoun,Modal,Aux,Aux,Connector,Inf}
He is about to go. {Pronoun,Aux,Aux,Aux,Inf}
Back it up. {Inf,Pronoun,Particle}
Eat my shorts. {Imperative,Poss,Plural}
Long live the king. {Expression,Expression,Det,Noun}
There she is. {Adv,Pronoun,Copula}
Microsoft of Canada. {Organization,Organization,Organization}
A lot like ours. {Det,Noun,Prep,Pronoun}
23 Main Street in Toronto. {Address,Address,Address,Place,Place}

# Noun/verb switches and the plural actor butchers
They lunch at noon. {Noun,Vb,Prep,Noun}
The lunch was delicious. {Det,Noun,Vb,Adj}
They picnic in the park. {Noun,Vb,Prep,Det,Noun}
The picnic was fun. {Det,Noun,Vb,Adj}
She butchers the meat. {Noun,Vb,Det,Noun}
The butchers are helpful. {Det,Actor,Vb,Adj}

`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
