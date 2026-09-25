Compromise has a custom tagset that is broadly compatible with a penn tagset. It has made some selective decisions about tagging that diverge from other taggers, which are documented here.

Examples use [spec syntax](spec-format.md).

## #Auxiliary is for verb spans

`Auxiliary` marks helpers in a verb chain. A subject generally breaks the chain.

- She has been walking. {Pronoun,Aux,Aux,Ger} # both helpers get Aux
- She has not walked. {Pronoun,Aux,Negative,Past} # negation can intervene
- Where did you park? {QuestionWord,Past,Pronoun,Inf} # did is separated from park
- She is happy. {Pronoun,Copula,Adj} # no main verb follows is
- They will swim. {Pronoun,Modal|Aux,Inf} # Modal and Auxiliary can overlap
- Had she finished? {Aux,Pronoun,Past} # an explicit exception for an inverted question

## #Gerund must be a verb

An -ing word used as a noun gets `Noun`, sometimes also `Activity`.

- She is swimming. {Pronoun,Aux,Ger} # swimming is a verb
- Swimming was fun. {Noun,Copula,Adj} # swimming is a noun
- The swimming pool is open. {Det,Noun,Noun,Copula,Adj}
- She was swimming. {Pronoun,Aux,Ger} # Gerund applies in past-tense sentences too
- Her swimming was impressive. {Poss,Noun,Copula,Adj}

## #Participle is rare

Distinct forms usually get `Participle`; ordinary past forms keep `Past`.

- She has driven. {Pronoun,Aux,Participle}
- She has walked. {Pronoun,Aux,Past} # has does not require Participle
- She has bought it. {Pronoun,Aux,Past,Pronoun}
- She has read it. {Pronoun,Aux,Participle,Pronoun} # a contextual exception
- She has taken it. {Pronoun,Aux,Past|Participle,Pronoun} # Participle inherits Past
- The roses were watered yesterday. {Det,Noun,Aux,Past|Passive,Date} # passive does not require Participle

## #QuestionWord can be #Preposition

Words such as where and when often get `Preposition` when introducing a clause;
some patterns also get `Conjunction`. This is compromise's convention:
[UD treats these wh-adverbs as ADV](https://universaldependencies.org/en/pos/ADV.html).

- Where did she go? {QuestionWord,Past,Pronoun,Inf} # direct question
- Do you know where she went? {Vb,Pronoun,Inf,Prep,Pronoun,Past} # embedded where, even with a question mark
- When did she leave? {QuestionWord,Past,Pronoun,Inf}
- I was cooking when you called. {Pronoun,Aux,Ger,Prep,Pronoun,Past} # when links a time clause
- Do you know how she did it? {Vb,Pronoun,Inf,Prep,Pronoun,Past,Pronoun}
- Who called? {QuestionWord,Past}
- The woman who called is here. {Det,Noun,Prep,Past,Copula,Noun} # relative who
- I know where she is going. {Pronoun,Inf,Conj|Prep,Pronoun,Aux,Ger} # both linking tags can coexist
- She asked whether we agreed. {Pronoun,Past,Conj,Pronoun,Past} # introducing a question does not require QuestionWord

## #Negative marks negation

Words such as not and never get `Negative`, a tag of its own. Contracted negation
gets a separate term and slot.

- She did not leave. {Pronoun,Aux,Negative,Inf}
- She didn't leave. {Pronoun,Aux,Negative,Inf} # didn't expands to did + not
- He cannot swim. {Pronoun,Modal,Negative,Inf} # cannot also has two slots
- She never swims. {Pronoun,Negative,Pres}
- She has no money. {Pronoun,Vb,Expr,Noun} # no gets Expression, despite its negative meaning

## #Expression covers conversational words

Greetings, reactions, and words such as yes, no, and please get `Expression`.
Its spec alias is `Expr`.

- Hello, Alice! {Expr,Person} # greeting
- Wow! {Expr} # reaction
- Yes, I agree. {Expr,Pronoun,Inf} # response
- No. {Expr} # Expression rather than Negative
- Please close the door. {Expr,Imp,Det,Noun} # polite request
- Oh well, we tried. {Expr,Expr,Pronoun,Past} # one slot per term

## Some prepositions are #Adjective

Spatial words such as near and inside can get `Adjective`.

- My house is near the school. {Poss,Noun,Copula,Adj,Det,Noun}
- The cat is inside. {Det,Noun,Copula,Adj}
- She walked to school. {Pronoun,Past,Prep,Noun} # to remains a preposition
- The bird flew directly above the house. {Det,Noun,Past,Adv,Prep,Det,Noun} # context can select Preposition

## #PhrasalVerb marks a verb span
"threw up" is not a direction of "threw", but a different sense, so compromise takes care to identify phrasal verbs as meaningful units, and not `#Verb #Preposition` sequence.
Both words are tagged as `#PhrasalVerb`, and the second word is also tagged as a `#Particle`.
Both parts belong to the verb family. The words remain separate terms. Recognition includes literal
directions and focuses on adjacent words, rather than requiring an idiomatic meaning.

For comparison, [UD links a verb to its particle with compound:prt](https://universaldependencies.org/en/dep/compound-prt.html),
including across an object, and excludes purely directional uses from that relation.

- She turned down the invitation. {Pronoun,Phrasal,Particle,Det,Noun} # both turned and down match #PhrasalVerb
- They called off the expedition. {Pronoun,Phrasal,Particle,Det,Noun} # off also matches #Verb
- They picked up the parcel. {Pronoun,Past|Phrasal,Particle,Det,Noun} # the verb keeps its tense tag
- They picked up the parcel. {Pronoun,Vb,Vb,Det,Noun} # broad tags include the particle as a verb
- They picked it up. {Pronoun,Past,Pronoun,Adv} # the intervening object changes the tagging
- She walked out. {Pronoun,Past|Phrasal,Particle} # literal movement can count too
- She walked down the street. {Pronoun,Past,Prep,Det,Noun} # down introduces a location
- We waited for the bus. {Pronoun,Past,Prep,Det,Noun} # a following preposition does not automatically form a phrasal verb
- She took care of him. {Pronoun,Past,Noun,Prep,Pronoun} # not every multiword expression gets PhrasalVerb

## Noun phrases retain individual tags

A noun phrase can contain both adjectives and nouns modifying other nouns.

- orange juice {Adj,Noun} # orange keeps its adjective tag
- apple juice {Noun,Noun} # a noun can modify another noun
- a wooden table {Det,Adj,Noun}
- a school bus {Det,Noun,Noun}

## Numbers are #Value, not #Adjective

Numbers keep their `Value` tags when modifying nouns.

- three red apples {Val,Adj,Plural}
- 21 apples {Numeric,Plural} # Numeric is a subtype of Value
- the first train {Det,Ordinal,Noun} # Ordinal is also a subtype of Value
- two hundred people {Val,Val,Noun} # one slot per term
- five hundred dollars {Val,Val,Currency} # the currency word is a noun subtype
