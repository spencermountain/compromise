import test from 'tape'
import assertSpec from '../../_spec.js'
const here = '[two/tagger/grammar/verb-noun-context] '

test(here + 'two/tagger/verb-noun-context: verb/noun ambiguity', t => {
  assertSpec(t, `
# index.js: verb/noun ambiguity
The dog treats. {Det,Noun,Plural}
He can solve the puzzle. {Pronoun,Modal,Inf,Det,Noun}
Keeping the matter a secret. {Ger,Det,Noun,Det,Noun}
The slide makes noise. {Det,Noun,Pres,Noun}
Use a pointed stick (a pencil) or a similar tool. {Inf,Det,Adj,Noun,Det,Noun,Conj,Det,Adj,Noun}
The next career read is brief. {Det,Adj,Noun,Noun,Copula,Adj}
He goes to sleep. {Pronoun,Pres,Prep,Noun}
A dog retrieve in the field. {Det,Noun,Noun,Prep,Det,Noun}
A software reinstall. {Det,Noun,Noun}
They make sense. {Pronoun,Inf,Noun}
Append is cloned. {Noun,Aux,Past}
Cause I gotta go. {Conj,Pronoun,Verb,Past,Connector,Inf}
The US air force. {Det,Place,Noun,Noun}
This rocks. {Pronoun,Pres}
The thing that runs. {Det,Noun,Conj,Pres}
Let him father a child. {Inf,Pronoun,Inf,Det,Noun}
A very big dream. {Det,Adv,Adj,Noun}
For comparison or contrast. {Prep,Noun,Conj,Noun}
To write people thanks for helping. {Connector,Inf,Noun,Plural,Prep,Ger}
Hope I helped. {Inf,Pronoun,Past}
Its proper functioning. {Poss,Adj,Noun}
It tastes good. {Pronoun,Pres,Adj}
The shed. {Det,Noun}
How to watch. {QuestionWord,Connector,Inf}
Ready to stream. {Adj,Connector,Inf}
Bring to market. {Inf,Prep,Noun}
Can I sleep? {Modal,Pronoun,Inf}
Would you look? {Modal,Pronoun,Inf}
It is just spam. {Pronoun,Copula,Adv,Noun}
Request copies. {Inf,Plural}
Homemade pickles and drinks. {Adj,Plural,Conj,Plural}
The break up. {Det,Noun,Noun}
The individual goals. {Det,Adj,Plural}
Work or prepare. {Inf,Conj,Inf}
To give thanks. {Connector,Inf,Plural}
It removes wrinkles. {Pronoun,Pres,Plural}
I Google the answer. {Pronoun,Inf,Det,Noun}
Did the engine stop? {Past,Det,Noun,Inf}
40 gallons of water. {Cardinal,Unit,Prep,Noun}
When the rain stops, we will leave. {Conj,Det,Noun,Pres,Pronoun,Modal,Inf}
Whenever the bell rings, the dog barks. {Conj,Det,Noun,Pres,Det,Noun,Pres}
When the dog looks. {Conj,Det,Noun,Pres}
The sun rose. {Det,Noun,Past}
The river rose quickly. {Det,Noun,Past,Adv}
The cat woke. {Det,Noun,Past}
Before the dog and the cat woke, she left. {Conj,Det,Noun,Conj,Det,Noun,Past,Pronoun,Past}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: causatives retain infinitive complements', t => {
  assertSpec(t, `
# (let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)
Let John shoulder the burden. {Vb,Person,Inf,Det,Noun}
They made Canada shoulder the cost. {Noun,Past,Place,Inf,Det,Noun}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: coordinated people followed by a verb', t => {
  assertSpec(t, `
# #Person and #Person [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$
John and Mary work. {Person,Conj,Person,Inf}
Alice and Bob dance. {Person,Conj,Person,Inf}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: locative subjects retain their final verb', t => {
  assertSpec(t, `
# #Plural [on] #Determiner #Adjective+? #Noun [%Noun|Verb%]$
Dogs on the porch bark. {Plural,Prep,Det,Noun,Inf}
Children on the playground play. {Plural,Prep,Det,Noun,Inf}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: some as a pronoun subject', t => {
  assertSpec(t, `
# ^[some] #Infinitive #Noun
Some like coffee. {Pronoun,Inf,Noun}
Some prefer tea. {Pronoun,Inf,Noun}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: Locative subjects: preserve both the preposition and the final verb.', t => {
  assertSpec(t, `
# Locative subjects: preserve both the preposition and the final verb.
Dogs near the porch bark. {Plural,Prep,Det,Noun,Inf}
Dogs on the porch bark. {Plural,Prep,Det,Noun,Inf}
Dogs under the porch bark. {Plural,Prep,Det,Noun,Inf}
Dogs beside the porch bark. {Plural,Prep,Det,Noun,Inf}
Dogs behind the porch bark. {Plural,Prep,Det,Noun,Inf}
Children on the playground play. {Plural,Prep,Det,Noun,Inf}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: Lists need their comma context; coordinated subjects still take verbs.', t => {
  assertSpec(t, `
# Lists need their comma context; coordinated subjects still take verbs.
We sell books, toys and watches. {Pronoun,Inf,Plural,Plural,Conj,Plural}
I enjoy music, art and dance. {Pronoun,Inf,Noun,Noun,Conj,Noun}
On Friday, John and Mary work. {Prep,Date,Person,Conj,Person,Inf}
John and Mary work. {Person,Conj,Person,Inf}
Is it a joke, Dad, or do I need help? {Copula,Pronoun,Det,Noun,Noun,Conj,Vb,Pronoun,Vb,Noun}
It has fins, Jim, and has a motor. {Pronoun,Pres,Plural,Person,Conj,Pres,Det,Noun}
We discussed the engine, bag, and evacuating the building. {Pronoun,Past,Det,Noun,Noun,Conj,Ger,Det,Noun}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: Share locative patterns without losing adjective context.', t => {
  assertSpec(t, `
# Share locative patterns without losing adjective context.
Dogs on the wooden porch bark. {Plural,Prep,Det,Adj,Noun,Inf}
Children behind the tall fence play. {Plural,Prep,Det,Adj,Noun,Inf}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: coordinated subjects', t => {
  assertSpec(t, `
On Friday, food and drinks are free. {Prep,Date,Noun,Conj,Noun,Vb,Adj}
On Friday, food or drinks will be provided. {Prep,Date,Noun,Conj,Noun,Vb,Vb,Vb}
On Tuesday, gifts and thanks arrived. {Prep,Date,Noun,Conj,Noun,Past}
We discussed London, Paris and travel. {Noun,Past,Noun,Noun,Conj,Noun}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: singular subjects', t => {
  assertSpec(t, `
The dog runs. {Det,Noun,Pres}
My dog barks loudly. {Poss,Noun,Pres,Adv}
The small child walks slowly. {Det,Adj,Noun,Pres,Adv}
Her cat usually sleeps peacefully. {Poss,Noun,Adv,Pres,Adv}
The young athlete swims well. {Det,Adj,Noun,Pres,Adv}
Our old dog often barks loudly. {Poss,Adj,Noun,Adv,Pres,Adv}
A tired baby sleeps soundly. {Det,Adj,Noun,Pres,Adv}
`)
  t.end()
})

test(here + 'two/tagger/verb-noun-context: causative verbs', t => {
  assertSpec(t, `
Let John shoulder the burden. {Vb,Noun,Inf,Det,Noun}
Make Sarah shoulder the responsibility. {Vb,Noun,Inf,Det,Noun}
We made John shoulder the burden. {Noun,Past,Noun,Inf,Det,Noun}
Let her shoulder the burden. {Vb,Noun,Inf,Det,Noun}
Make Google shoulder the cost. {Vb,Noun,Inf,Det,Noun}
They made Canada shoulder the cost. {Noun,Past,Noun,Inf,Det,Noun}
`)
  t.end()
})
