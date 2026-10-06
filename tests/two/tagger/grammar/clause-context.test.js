import test from 'tape'
import assertSpec from '../../_spec.js'
const here = '[two/tagger/grammar/clause-context] '

test(here + 'two/tagger/clause-context: connectors and clause predicates', t => {
  assertSpec(t, `
# index.js: connectors, expressions and promoted rules
Things that seem cool. {Plural,Conj,Inf,Adj}
He was that wide. {Pronoun,Copula,Adv,Adj}
To the store. {Prep,Det,Noun}
To lunch. {Prep,Noun}
Well above the clouds. {Adv,Prep,Det,Plural}
Directly under the bridge. {Adv,Prep,Det,Noun}
I heard rumors that drivers save gas. {Pronoun,Past,Plural,Conj,Plural,Inf,Noun}
Tuesday, which he liked. {Date,Prep,Pronoun,Past}
She treated them like sons. {Pronoun,Past,Pronoun,Prep,Plural}
A day like this. {Det,Noun,Prep,Pronoun}
I really like it. {Pronoun,Adv,Inf,Pronoun}
He is not like me. {Pronoun,Copula,Negative,Prep,Pronoun}
Treat them like family. {Inf,Pronoun,Prep,Noun}
Before dinner. {Prep,Noun}
Where? {QuestionWord}
Why? {QuestionWord}
When? {QuestionWord}
Who? {QuestionWord}
Whom? {QuestionWord}
Whose? {QuestionWord}
What? {QuestionWord}
Which? {QuestionWord}
How he escaped. {Prep,Pronoun,Past}
When stolen. {Prep,Participle}
How is he? {QuestionWord,Copula,Pronoun}
Children who dance. {Plural,Prep,Inf}
Holy shit. {Expression,Expression}
Come on. {Expression,Expression}
Well, we left. {Expression,Pronoun,Past}
So, we left. {Expression,Pronoun,Past}
Okay, we left. {Expression,Pronoun,Past}
Now, we left. {Expression,Pronoun,Past}
Shoot, we missed. {Expression,Pronoun,Past}
Say, can you help? {Expression,Modal,Pronoun,Inf}
Like, hello. {Expression,Expression}
Veggies, like kale. {Plural,Prep,Noun}
We looked under the bed. {Pronoun,Past,Prep,Det,Noun}
Images on a screen like humans do. {Plural,Prep,Det,Noun,Prep,Plural,Inf}
Cities like New York, Boston. {Plural,Prep,Place,Place,Place}
Like his brother, he enjoys chess. {Prep,Poss,Noun,Pronoun,Pres,Noun}
I like tea, like my sister does. {Pronoun,Inf,Noun,Conj,Poss,Noun,Pres}
We talked about the fact that she resigned. {Pronoun,Past,Prep,Det,Noun,Conj,Pronoun,Past}
I have heard that story before. {Pronoun,Aux,Past,Det,Noun,Adv}
We met shortly after. {Pronoun,Past,Adv,Adv}
She has not arrived yet. {Pronoun,Aux,Negative,Past,Adv}
Who did she arrive before? {QuestionWord,Past,Pronoun,Inf,Prep}
We will leave when the rain stops. {Pronoun,Modal,Inf,Conj,Det,Noun,Pres}
Although he was tired, he smiled. {Conj,Pronoun,Copula,Adj,Pronoun,Past}
He was tired. {Pronoun,Copula,Adj}
He had been tired. {Pronoun,Aux,Copula,Adj}
The sleeping dog. {Det,Adj,Noun}
Water broke the pipe. {Noun,Past,Det,Noun}
She opened the present immediately. {Pronoun,Past,Det,Noun,Adv}
It falls in June. {Pronoun,Pres,Prep,Month}
Had he walked. {Condition,Pronoun,Past}
Were he to walk. {Condition,Pronoun,Connector,Inf}
Had he walked the dog? {Aux,Pronoun,Past,Det,Noun}
This will be one sentence. {Pronoun,Modal,Inf,Cardinal,Noun}
This might help. {Pronoun,Modal,Inf}
He has read. {Pronoun,Aux,Participle}
He had put it there. {Pronoun,Aux,Participle,Pronoun,Adv}
What work he did. {QuestionWord,Noun,Pronoun,Past}
What walks he took. {QuestionWord,Plural,Pronoun,Past}
John and Mary walk. {Person,Conj,Person,Inf}
Dogs near the house bark. {Plural,Prep,Det,Noun,Inf}
He has eaten and drunk. {Pronoun,Aux,Past,Conj,Participle}
She drew a picture. {Pronoun,Past,Det,Noun}
`)
  t.end()
})

test(here + 'two/tagger/clause-context: clause boundaries and modifiers', t => {
  assertSpec(t, `
# second-pass.js: clause boundaries and remaining corrections
Before the meal ended, we left. {Conj,Det,Noun,Past,Pronoun,Past}
Before the meal, we left. {Prep,Det,Noun,Pronoun,Past}
After the news that she resigned, we called. {Prep,Det,Noun,Conj,Pronoun,Past,Pronoun,Past}
Before she left. {Conj,Pronoun,Past}
After she left. {Conj,Pronoun,Past}
Since she left. {Conj,Pronoun,Past}
Before the guests from the village arrived, we ate. {Conj,Det,Plural,Prep,Det,Noun,Past,Pronoun,Past}
After the guests from the village arrived, we ate. {Conj,Det,Plural,Prep,Det,Noun,Past,Pronoun,Past}
Since the guests from the village arrived, we ate. {Conj,Det,Plural,Prep,Det,Noun,Past,Pronoun,Past}
Before the dog and the cat woke. {Conj,Det,Noun,Conj,Det,Noun,Past}
After the dog and the cat woke. {Conj,Det,Noun,Conj,Det,Noun,Past}
She bought flowers, for I was ill. {Pronoun,Past,Plural,Conj,Pronoun,Copula,Adj}
The cat slept under the table. {Det,Noun,Past,Prep,Det,Noun}
He sat beside me. {Pronoun,Past,Prep,Pronoun}
The plane flew well above the clouds. {Det,Noun,Past,Adv,Prep,Det,Plural}
She stood directly below the window. {Pronoun,Past,Adv,Prep,Det,Noun}
She sings like her mother. {Pronoun,Pres,Prep,Poss,Noun}
She sings like her mother does. {Pronoun,Pres,Conj,Poss,Noun,Pres}
Which chair did she sit on? {QuestionWord,Noun,Past,Pronoun,Inf,Prep}
What cushion can he sit on? {QuestionWord,Noun,Modal,Pronoun,Inf,Prep}
He ate, and left. {Pronoun,Past,Conj,Past}
Does this work? {Verb,Pronoun,Inf}
This is useful. {Pronoun,Copula,Adj}
Hope this helps. {Inf,Pronoun,Pres}
This really rocks. {Pronoun,Adv,Pres}
Being injured and treated. {Aux,Past,Conj,Past}
Dogs, including the poodle. {Plural,Prep,Det,Noun}
Can you walk, please? {Modal,Pronoun,Imperative,Expression}
Can you walk the dog, please? {Modal,Pronoun,Imperative,Det,Noun,Expression}
Will walked home. {FirstName,Past,Noun}
Jack the ripper. {Person,Person,Person}
Keep the lid closed. {Imperative,Det,Noun,Adj}
`)
  t.end()
})

test(here + 'two/tagger/clause-context: short contextual rules', t => {
  assertSpec(t, `
# rule cleanup: short contextual rules
dark green paint {Adv,Adj,Noun}
bright red shoes {Adv,Adj,Plural}
pale blue water {Adv,Adj,Noun}
in March {Prep,Month}
during May {Prep,Month}
before March {Prep,Month}
we all swim {Pronoun,Noun,Inf}
this helps us all {Pronoun,Pres,Pronoun,Noun}
we all agree {Pronoun,Noun,Inf}
what the hell {QuestionWord,Det,Noun}
the damn was audible {Det,Noun,Copula,Adj}
go to hell {Imperative,Prep,Noun}
it went to shit {Pronoun,Past,Prep,Noun}
they sent him to hell {Pronoun,Past,Pronoun,Prep,Noun}
they over-estimate it {Pronoun,Verb|Prefix,Inf,Pronoun}
tell him the story {Imperative,Pronoun,Det,Noun}
give me the book {Imperative,Pronoun,Det,Noun}
show us the way {Imperative,Pronoun,Det,Noun}
go to the store {Imperative,Prep|!Conjunction,Det,Noun}
send it to her {Imperative,Pronoun,Prep|!Conjunction,Pronoun}
walk to my house {Imperative,Prep|!Conjunction,Poss,Noun}
before the meal {Prep,Det,Noun}
before my birthday {Prep,Poss,Noun}
before Monday {Prep,WeekDay}
the dark room {Det,Adj,Noun}
the bright light {Det,Adj,Noun}
we march home {Pronoun,Inf,Noun}
she may leave {Pronoun,Modal,Inf}
he tells us stories {Pronoun,Pres,Pronoun,Plural}
I do the work {Pronoun,Inf,Det,Noun}
she does the work {Pronoun,Pres,Det,Noun}
before she left, we ate {Conj,Pronoun,Past,Pronoun,Past}
`)
  t.end()
})

test(here + 'two/tagger/clause-context: introductory like before a comma', t => {
  assertSpec(t, `
# ^(like && @hasComma)
Like, I understand. {Expr,Noun,Vb}
Like, what happened? {Expr,QuestionWord,Past}
`)
  t.end()
})

test(here + 'two/tagger/clause-context: relative clauses retain finite verbs', t => {
  assertSpec(t, `
# that [#Plural] to
A path that leads to the river. {Det,Noun,Conj,Pres,Prep,Det,Noun}
A road that winds to the coast. {Det,Noun,Conj,Pres,Prep,Det,Noun}
`)
  t.end()
})

test(here + 'two/tagger/clause-context: Relative clause: preserve the finite verb after that.', t => {
  assertSpec(t, `
# Relative clause: preserve the finite verb after that.
A path that leads to the river. {Det,Noun,Conj,Pres,Prep,Det,Noun}
`)
  t.end()
})

test(here + 'two/tagger/clause-context: Multiple alternatives in one sentence must retain each correction.', t => {
  assertSpec(t, `
# Multiple alternatives in one sentence must retain each correction.
They let John shoulder the burden and made Mary shoulder the cost. {Pronoun,Vb,Person,Inf,Det,Noun,Conj,Past,Person,Inf,Det,Noun}
She had to Google the answer and he has to Google the address. {Pronoun,Vb,Connector,Inf,Det,Noun,Conj,Pronoun,Vb,Connector,Inf,Det,Noun}
We scheduled a software reinstall on Monday. {Pronoun,Past,Det,Noun,Noun,Prep,Date}
We scheduled an engine rebuild on Tuesday. {Pronoun,Past,Det,Noun,Noun,Prep,Date}
I know why he is happy and where she is working. {Pronoun,Inf,Connector,Pronoun,Copula,Adj,Conj,Connector,Pronoun,Aux,Ger}
`)
  t.end()
})

test(here + 'two/tagger/clause-context: Smaller word-hook families: exceptions, particles, and perfect forms.', t => {
  assertSpec(t, `
# Smaller word-hook families: exceptions, particles, and perfect forms.
Everyone but me agreed. {Noun,Prep,Pronoun,Past}
Anybody but him could help. {Noun,Prep,Pronoun,Modal,Inf}
She picked it up and put it down. {Pronoun,Past,Pronoun,Adv,Conj,Vb,Pronoun,Adv}
She has read the note and he has put the book on the table. {Pronoun,Aux,Participle,Det,Noun,Conj,Pronoun,Aux,Participle,Det,Noun,Prep,Det,Noun}
The plane flew directly above the clouds. {Det,Noun,Past,Adv,Prep,Det,Plural}
She stood right below the window. {Pronoun,Past,Adv,Prep,Det,Noun}
They slept just under the bridge. {Pronoun,Past,Adv,Prep,Det,Noun}
The plane flew well over the hill. {Det,Noun,Past,Adv,Prep,Det,Noun}
`)
  t.end()
})
