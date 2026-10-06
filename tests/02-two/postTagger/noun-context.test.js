import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/postTagger/noun-context] '

test(here + 'nouns, actors, possessives and gerunds', t => {
  assertSpec(t, `
# index.js: nouns, actors, possessives and gerunds
Rights of man. {Noun,Prep,Noun}
We all agree. {Pronoun,Noun,Inf}
My first thought. {Poss,Ordinal,Noun}
The nice walk. {Det,Adj,Noun}
The truly nice swim. {Det,Adv,Adj,Noun}
The message from Danny. {Det,Noun,Prep,Person}
A type of shout. {Det,Noun,Prep,Noun}
A walk-in microwave. {Det,Noun,Noun,Noun}
Aircraft designer. {Actor,Actor}
Lighting designer. {Actor,Actor}
Captain Sanders. {Honorific,Person}
Co founder. {Actor,Actor}
Fine-artist. {Actor,Actor}
Dance coach. {Actor,Actor}
Chief design officer. {Actor,Actor,Actor}
Chief of police. {Actor,Actor,Actor}
President of marketing. {Actor,Actor,Actor}
He did a 900. {Pronoun,Past,Det,Singular}
He paid a 20. {Pronoun,Past,Det,Singular}
The can. {Det,Singular}
John Smith's dog. {Poss,Poss,Noun}
Microsoft Research's office. {Poss,Poss,Noun}
Los Angeles's fundraiser. {Poss,Poss,Noun}
Anna's eating. {Poss,Noun}
Anna's eating lunch. {Person,Aux,Ger,Noun}
My teachers dog. {Poss,Poss,Noun}
10th of a second. {Ordinal,Prep,Det,Singular}
The euro sense. {Det,Noun,Noun}
Thanks for the gift are overdue. {Plural,Prep,Det,Noun,Copula,Adj}
You eat and sleep. {Pronoun,Inf,Conj,Inf}
Dogs and running and cats. {Plural,Conj,Noun,Conj,Plural}
The 1992 classic. {Det,Cardinal,Noun}
This is the premier university in Virginia. {Pronoun,Copula,Det,Adj,Noun,Prep,Place}
I ate me sandwich. {Pronoun,Past,Poss,Noun}
35 signs. {Cardinal,Plural}
Instant access. {Adj,Noun}
Near death experiences. {Adj,Noun,Plural}
Ambitious sales targets. {Adj,Noun,Plural}
Your guild colors. {Poss,Noun,Plural}
Lexical tagging. {Adj,Noun}
Walking is cool. {Activity,Copula,Adj}
Responsibility for setting goals. {Noun,Prep,Ger,Plural}
Better for training. {Comparative,Prep,Ger}
He apologized for shouting. {Pronoun,Past,Prep,Ger}
He reads the upcoming. {Pronoun,Pres,Det,Noun}
`)
  t.end()
})

test(here + 'Noun list with clothing preserves watches as a noun', t => {
  assertSpec(t, `
# Noun list with clothing preserves watches as a noun
We sell food, clothing and watches. {Pronoun,Inf,Noun,Noun,Conj,Plural|!Verb}
`)
  t.end()
})

test(here + 'nouns and predicates retain contextual readings', t => {
  assertSpec(t, `
# frequent failed-rule cleanup preserves nouns and predicates
She watched the ducks. {Pronoun,Past,Det,Plural|!Verb}
He plans a walk. {Pronoun,Pres,Det,Noun|!Verb}
They had high hopes. {Pronoun,Past,Adj,Plural|!Verb}
She has big plans. {Pronoun,Pres,Adj,Plural|!Verb}
He had great looks. {Pronoun,Past,Adj,Plural|!Verb}
The river flows quickly. {Det,Noun,Pres|!Noun,Adv}
The engine-controls failed. {Det,Noun,Plural|!Verb,Past}
The artist paints murals. {Det,Actor,Pres|!Noun,Plural}
The cook can sing. {Det,Noun|!Verb,Modal,Inf}
The fish swim. {Det,Noun|!Verb,Inf|!Noun}
The shops close early. {Det,Plural|!Verb,Inf|!Noun,Adv}
We sell books, toys and watches. {Pronoun,Inf,Plural,Plural,Conj,Plural|!Verb}
I enjoy music, art and dance. {Pronoun,Inf,Noun,Noun,Conj,Noun|!Verb}
She talks, laughs and dances. {Pronoun,Pres,Pres,Conj,Pres|!Noun}
John and Mary work. {Person,Conj,Person,Inf|!Noun}
`)
  t.end()
})

test(here + 'noun corrections retain compound and nominal contexts', t => {
  assertSpec(t, `
# noun corrections retain compound and nominal contexts
The slide makes noise. {Det,Noun|!Verb,Pres,Noun}
The ride costs money. {Det,Noun|!Verb,Pres,Noun}
They had good timing. {Pronoun,Past,Adj,Noun|!Verb}
We have great hopes. {Pronoun,Inf,Adj,Plural|!Verb}
They offered food, shelter and thanks. {Pronoun,Past,Noun,Noun,Conj,Noun|!Verb}
They sell shoes, hats and dresses. {Pronoun,Inf,Plural,Plural,Conj,Plural|!Verb}
They took short drill-breaks. {Pronoun,Past,Adj,Noun,Plural|!Verb}
The panel has a recess-lock. {Det,Noun,Pres,Det,Noun,Noun|!Verb}
`)
  t.end()
})

test(here + 'nominal subjects before past verbs', t => {
  assertSpec(t, `
# ^[%Noun|Verb%] #PastTense (#Determiner|#Possessive) #Adjective+? #Noun
Hope changed the world. {Noun,Past,Det,Noun}
Love changed my life. {Noun,Past,Poss,Noun}
`)
  t.end()
})

test(here + 'gerunds as clause subjects', t => {
  assertSpec(t, `
# #Pronoun #Infinitive [#Gerund] #PresentTense
I think tipping sucks. {Noun,Inf,Noun,Pres}
We believe running improves health. {Noun,Inf,Noun,Pres,Noun}
`)
  t.end()
})

test(here + 'nominal objects after prepositions', t => {
  assertSpec(t, `
# #PastTense (until|as|through|without) [(#PresentTense && !#Gerund && !#Copula)]
We waited until release. {Noun,Past,Prep,Noun}
`)
  t.end()
})

test(here + 'coordinated plural nouns before gerunds', t => {
  assertSpec(t, `
# #Preposition #Plural and [%Plural|Verb%] #Gerund
We watched with smiles and waves greeting us. {Noun,Past,Prep,Plural,Conj,Plural,Ger,Noun}
With dogs and bears running, we left. {Prep,Plural,Conj,Plural,Ger,Noun,Past}
`)
  t.end()
})

test(here + 'A verb-shaped word used as a noun after a preposition.', t => {
  assertSpec(t, `
# A verb-shaped word used as a noun after a preposition.
We waited until release. {Pronoun,Past,Prep,Noun}
It served as cover. {Pronoun,Past,Prep,Noun}
She acted as judge. {Pronoun,Past,Prep,Noun}
`)
  t.end()
})

test(here + 'nominal subjects before past verbs', t => {
  assertSpec(t, `
Hope changed the world. {Noun,Past,Det,Noun}
Love changed my life. {Noun,Past,Poss,Noun}
Work consumed his time. {Noun,Past,Poss,Noun}
Rain ruined the picnic. {Noun,Past,Det,Noun}
Support exceeded our expectations. {Noun,Past,Poss,Noun}
Change brought a new opportunity. {Noun,Past,Det,Adj,Noun}
Fear gripped the small town. {Noun,Past,Det,Adj,Noun}
Trust saved our friendship. {Noun,Past,Poss,Noun}
`)
  t.end()
})

test('rule cleanup: right of and rights of', t => {
  assertSpec(t, `
    right of way {Noun,Prep,Noun}
    rights of citizens {Noun,Prep,Noun}
    to the right of me {Prep,Det,Noun,Prep,Pronoun}
    the right answer {Det,Adj,Noun}
  `, here.trim())
  t.end()
})
