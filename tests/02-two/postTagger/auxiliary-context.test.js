import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[two/postTagger/auxiliary-context] '

test(here + 'auxiliaries, phrasal verbs and commands', t => {
  assertSpec(t, `
# index.js: auxiliaries, phrasal verbs and commands
He will have walked. {Pronoun,Modal,Aux,Past}
He was walking. {Pronoun,Aux,Ger}
He would walk. {Pronoun,Modal,Inf}
He has walked. {Pronoun,Aux,Past}
He will walk. {Pronoun,Modal,Inf}
He would be walking. {Pronoun,Modal,Aux,Ger}
He was being driven. {Pronoun,Aux,Aux,Past}
He may want it. {Pronoun,Modal,Inf,Pronoun}
He has been walking. {Pronoun,Aux,Aux,Ger}
He used to walk. {Pronoun,Aux,Aux,Inf}
He was going to walk. {Pronoun,Aux,Aux,Aux,Inf}
He is going to be watched. {Pronoun,Aux,Aux,Aux,Aux,Past}
There is no food. {There,Copula,Negative,Noun}
He has been told. {Pronoun,Aux,Aux,Past}
Better go. {Modal,Inf}
Even better. {Adv,Comparative}
Walk-off. {Inf,Particle}
Walk-out. {Inf,Particle}
Walk in on them. {Inf,Particle,Prep,Pronoun}
It went on for hours. {Pronoun,Past,Particle,Prep,Plural}
The curtains come down. {Det,Plural,Inf,Particle}
They work in the office. {Pronoun,Inf,Prep,Det,Noun}
He runs around the lake. {Pronoun,Pres,Prep,Det,Noun}
Do not go. {Aux,Negative,Imperative}
Please go. {Expression,Imperative}
Just go. {Adv,Imperative}
Go quickly. {Imperative,Adv}
Turn down the noise. {Imperative,Particle,Det,Noun}
Tell him the story. {Imperative,Pronoun,Det,Noun}
Avoid loud noises. {Imperative,Adj,Plural}
Come and have a drink. {Imperative,Conj,Inf,Det,Noun}
Let's leave. {Verb,Pronoun,Imperative}
Shut the door. {Imperative,Det,Noun}
Turn off the light. {Imperative,Particle,Det,Noun}
Can you please walk? {Modal,Pronoun,Expression,Imperative}
Please can you walk? {Expression,Modal,Pronoun,Imperative}
Can you walk please? {Modal,Pronoun,Imperative,Expression}
Come have a drink. {Imperative,Inf,Det,Noun}
Allow yourself. {Imperative,Pronoun}
Look what happened. {Imperative,QuestionWord,Past}
Go to it. {Imperative,Prep,Pronoun}
Maintain eye contact. {Imperative,Noun,Noun}
Don't forget to clean. {Aux,Negative,Inf,Connector,Inf}
Add 2 eggs. {Imperative,Cardinal,Plural}
`)
  t.end()
})

test(here + 'has and had before past verbs', t => {
  assertSpec(t, `
# rule cleanup: has and had before past verbs
she has walked home {Pronoun,Auxiliary,Past,Adv}
he had quietly finished {Pronoun,Auxiliary,Adverb,Past}
she has not really eaten {Pronoun,Auxiliary,Negative,Adverb,Past}
they had already left {Pronoun,Auxiliary,Adverb,Past}
she has a bicycle {Pronoun,Pres|!Auxiliary,Det,Noun}
they had lunch {Pronoun,Past|!Auxiliary,Noun}
`)
  t.end()
})

test(here + 'better as a modal', t => {
  assertSpec(t, `
# rule cleanup: better as a modal
I better go {Pronoun,Modal,Inf}
you better go {Pronoun,Modal,Inf}
she feels better {Pronoun,Pres,Comparative|!Modal}
a better plan {Det,Comparative|!Modal,Noun}
`)
  t.end()
})

test(here + 'may before verbs', t => {
  assertSpec(t, `
# rule cleanup: may before verbs
she may leave {Pronoun,Modal|Auxiliary,Inf}
they may quietly leave {Pronoun,Modal|Auxiliary,Adv,Inf}
we may not go {Pronoun,Modal|Auxiliary,Negative,Inf}
early May {Adj,Month}
Ms. May Smith arrived {Honorific,Person,Person,Past}
`)
  t.end()
})

test(here + 'perfect passive auxiliaries', t => {
  assertSpec(t, `
# rule cleanup: perfect passive auxiliaries
it has been smoked {Pronoun,Auxiliary,Auxiliary,Past}
they have been cleaned {Pronoun,Auxiliary,Auxiliary,Past}
it had been painted {Pronoun,Auxiliary,Auxiliary,Past}
it had already been carefully painted {Pronoun,Auxiliary,Adverb,Auxiliary,Adverb,Past}
`)
  t.end()
})

test(here + 'had in questions without objects', t => {
  assertSpec(t, `
# ^[had] #Noun+ (#Adverb|not)+? (#PastTense && @hasQuestionMark)$
Had he walked? {Aux,Noun,Past}
Had they already finished? {Aux,Noun,Adv,Past}
`)
  t.end()
})

test(here + 'had in questions with objects', t => {
  assertSpec(t, `
# ^[had] #Noun+ (#Adverb|not)+? #PastTense * @hasQuestionMark$
Had she walked the dog? {Aux,Noun,Past,Det,Noun}
Had they already finished their homework? {Aux,Noun,Adv,Past,Poss,Noun}
`)
  t.end()
})

test(here + 'perfect auxiliaries with intervening modifiers', t => {
  assertSpec(t, `
# [(#Modal|had|has)] (#Adverb|not)+? [been] (#Adverb|not)+? #Verb
She had been walking. {Noun,Aux,Vb,Ger}
He has not been sleeping. {Noun,Aux,Negative,Vb,Ger}
`)
  t.end()
})

test(here + 'Perfect progressives: preserve auxiliaries with and without intervening adverbs.', t => {
  assertSpec(t, `
# Perfect progressives: preserve auxiliaries with and without intervening adverbs.
She had been walking. {Pronoun,Aux,Aux,Ger}
He has not been sleeping. {Pronoun,Aux,Negative,Aux,Ger}
They had already been working. {Pronoun,Aux,Adv,Aux,Ger}
She would have been walking. {Pronoun,Modal|Aux,Aux,Aux,Ger}
`)
  t.end()
})

test(here + 'Synthetic overlap probes: preserve coverage of the second had.', t => {
  assertSpec(t, `
# Synthetic overlap probes: preserve coverage of the second had.
John would have had not been walking. {Person,Modal|Aux,Aux,Aux,Negative,Aux,Ger}
John would not have had really been walking. {Person,Modal|Aux,Negative,Aux,Aux,Adv,Aux,Ger}
`)
  t.end()
})

test(here + 'Copula variants share passive syntax; adjectives remain adjectives.', t => {
  assertSpec(t, `
# Copula variants share passive syntax; adjectives remain adjectives.
I am watched by everyone. {Pronoun,Aux|Passive,Past|Passive,Prep,Noun}
The parcel is delivered. {Det,Noun,Aux|Passive,Past|Passive}
The parcels are delivered. {Det,Plural,Aux|Passive,Past|Passive}
The parcel was delivered. {Det,Noun,Aux|Passive,Past|Passive}
The parcels were delivered. {Det,Plural,Aux|Passive,Past|Passive}
The parcel was quickly delivered. {Det,Noun,Aux,Adv,Past}
She was tired. {Pronoun,Copula,Adj}
`)
  t.end()
})
