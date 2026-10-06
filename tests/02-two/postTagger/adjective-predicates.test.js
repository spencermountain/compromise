import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/postTagger/adjective-predicates] '

test(here + 'passive and adjective examples', t => {
  assertSpec(t, `
# index.js: passive and adjective examples
We do not go. {Pronoun,Aux,Negative,Inf}
He got walked. {Pronoun,Aux,Past|Passive}
He was being walked. {Pronoun,Aux,Aux,Past|Passive}
He had been walked. {Pronoun,Aux,Aux,Past|Passive}
It will be cleaned. {Pronoun,Modal,Aux,Past|Passive}
The dog was walked by the man. {Det,Noun,Aux,Past|Passive,Prep,Det,Noun}
Off-white. {Adj,Adj}
It is off white. {Pronoun,Copula,Adj,Adj}
All the dogs. {Noun,Det,Plural}
The door is closed. {Det,Noun,Copula,Adj}
Forgotten art is rediscovered. {Adj,Noun,Aux,Past}
Forgotten stories are lost. {Adj,Plural,Copula,Adj}
It is fucked up. {Pronoun,Copula,Adj,Adj}
The door seems opened. {Det,Noun,Pres,Adj}
The jury is out. {Det,Noun,Copula,Adj}
Quiet the room. {Inf,Det,Noun}
Blue-tinted. {Adj,Adj}
Blue-tinted glasses. {Adj,Adj,Plural}
Non-breaking spaces. {Adj,Adj,Plural}
Two-fold. {Adj,Adj}
Too much. {Adv,Adj}
A bit much. {Det,Adv,Adj}
Dark green. {Adv,Adj}
It is far too cold. {Pronoun,Copula,Adv,Adv,Adj}
She shops direct. {Pronoun,Pres,Adv}
Be late. {Inf,Adj}
Be early. {Inf,Adj}
He moons a lot. {Pronoun,Pres,Adv,Adv}
It is amusing. {Pronoun,Copula,Adj}
It is annoying. {Pronoun,Copula,Adj}
She found it interesting. {Pronoun,Past,Pronoun,Adj}
She found it isolating. {Pronoun,Past,Pronoun,Adj}
She found it isolating cells. {Pronoun,Past,Pronoun,Ger,Plural}
Repairing crumbling roads. {Ger,Adj,Plural}
She looked amazing. {Pronoun,Past,Adj}
He is boring the audience. {Pronoun,Aux,Ger,Det,Noun}
Meaning alluring. {Ger,Adj}
His fine. {Poss,Noun}
Have fun with it. {Inf,Noun,Prep,Pronoun}
A brewing giant. {Det,Noun,Noun}
In a perfect. {Prep,Det,Noun}
Some kind of teacher. {Det,Noun,Prep,Noun}
Her favourite sport. {Poss,Adj,Noun}
The present. {Det,Noun}
They are that crazy. {Pronoun,Copula,Adv,Adj}
Company-wide. {Adj,Adj}
The poor were hungry. {Det,Noun,Copula,Adj}
A professional bodybuilder. {Det,Adj,Noun}
`)
  t.end()
})

test(here + 'Woke adjective contrasts', t => {
  assertSpec(t, `
# Woke adjective contrasts
a woke activist {Det,Adj,Actor}
the woke movement {Det,Adj,Noun}
a woke audience {Det,Adj,Noun}
`)
  t.end()
})

test(here + 'Predicate vacuum-sealed', t => {
  assertSpec(t, `
# Predicate vacuum-sealed
the package is vacuum-sealed {Det,Noun,Copula,Adj,Adj}
`)
  t.end()
})

test(here + 'guards on later adjective and question corrections', t => {
  assertSpec(t, `
# rule cleanup: guards on later adjective and question corrections
the individual goals {Det,Adj,Plural}
a standard procedure {Det,Adj,Noun}
how he walks {Preposition,Pronoun,Pres}
where she lives {Preposition,Pronoun,Pres}
when they arrived {Conjunction,Pronoun,Past}
`)
  t.end()
})

test(here + 'adjective and noun pairs outside timezone names', t => {
  assertSpec(t, `
# rule cleanup: adjective and noun pairs outside timezone names
instant access {Adj,Noun}
professional support {Adj,Noun}
individual work {Adj,Noun}
`)
  t.end()
})

test(here + 'degree modifiers and proper names', t => {
  assertSpec(t, `
# second-pass cleanup: degree modifiers and proper names
the very professional actor {Det,Adv,Adj,Actor}
a remarkably professional teacher {Det,Adv,Adj,Actor}
the extremely professional designer {Det,Adv,Adj,Actor}
Will walked home {FirstName,Past,Adv}
Will called yesterday {FirstName,Past,Date}
Will arrived late {FirstName,Past,Adv}
will she walk home? {Modal,Pronoun,Inf,Adv}
they will arrive tomorrow {Pronoun,Modal,Inf,Date}
`)
  t.end()
})

test(here + 'degree adjectives preserve their noun context', t => {
  assertSpec(t, `
# second-pass cleanup: degree adjectives preserve their noun context
the quite professional actor {Det,Adv,Adj|!Noun,Actor}
an unusually professional teacher {Det,Adv,Adj|!Noun,Actor}
the very professional designer {Det,Adv,Adj|!Noun,Actor}
she hired a professional {Pronoun,Past,Det,Noun}
`)
  t.end()
})

test(here + 'even before better', t => {
  assertSpec(t, `
# rule cleanup: even before better
this is even better {Pronoun,Copula,Adverb,Comparative}
she made an even better cake {Pronoun,Past,Det,Adverb,Comparative,Noun}
we feel even better today {Pronoun,Inf,Adverb,Comparative,Date}
`)
  t.end()
})

test(here + 'gerunds followed by adjective modifiers', t => {
  assertSpec(t, `
# #Gerund [#Gerund] #Plural
They are repairing crumbling roads. {Noun,Vb,Ger,Adj,Plural}
They are repairing leaking pipes. {Noun,Vb,Ger,Adj,Plural}
`)
  t.end()
})

test(here + 'adjectives between comparative connectors', t => {
  assertSpec(t, `
# as [#Infinitive] as
She is as fit as ever. {Noun,Vb,Connector,Adj,Connector,Adv}
They are as welcome as ever. {Noun,Vb,Connector,Adj,Connector,Adv}
`)
  t.end()
})

test(here + 'adjective modifiers after copulas', t => {
  assertSpec(t, `
# #Copula the [%Adj|Noun%] #Noun
It is the premier university. {Noun,Vb,Det,Adj,Noun}
This is the principal reason. {Noun,Vb,Det,Adj,Noun}
`)
  t.end()
})

test(here + 'under and over modify participles', t => {
  assertSpec(t, `
# (is|was|were) [(under|over) #PastTense]
They were under paid. {Noun,Vb,Adv,Adj}
It is over rated. {Noun,Vb,Adv,Adj}
`)
  t.end()
})

test(here + 'Consecutive gerunds: preserve the action and the adjective modifier.', t => {
  assertSpec(t, `
# Consecutive gerunds: preserve the action and the adjective modifier.
They are repairing crumbling roads. {Pronoun,Aux,Ger,Adj,Plural}
They are repairing leaking pipes. {Pronoun,Aux,Ger,Adj,Plural}
`)
  t.end()
})

test(here + 'A later adjective correction must survive intervening Actor rules.', t => {
  assertSpec(t, `
# A later adjective correction must survive intervening Actor rules.
a semiprofessional bodyworker {Det,Adj,Noun}
on stable foundations {Prep,Adj,Plural}
`)
  t.end()
})

test(here + 'Adjective correction before a proper noun.', t => {
  assertSpec(t, `
# Adjective correction before a proper noun.
This is the classic London. {Pronoun,Copula,Det,Adj,Place}
It is the premier university. {Pronoun,Copula,Det,Adj,Noun}
`)
  t.end()
})
