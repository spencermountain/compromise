# How compromise uses parts of speech

Examples use [spec syntax](spec-format.md): one tag slot per term.

## #Participle is rare

Distinct forms usually get `Participle`; ordinary past forms keep `Past`.

- She has driven. {Pronoun,Aux,Participle}
- She has walked. {Pronoun,Aux,Past} # has does not require Participle
- She has bought it. {Pronoun,Aux,Past,Pronoun}
- She has read it. {Pronoun,Aux,Participle,Pronoun} # a contextual exception

## #Auxiliary is for verb spans

`Auxiliary` marks helpers in a verb chain. A subject generally breaks the chain.

- She has been walking. {Pronoun,Aux,Aux,Ger} # both helpers get Aux
- She has not walked. {Pronoun,Aux,Negative,Past} # negation can intervene
- Where did you park? {QuestionWord,Past,Pronoun,Inf} # did is separated from park
- She is happy. {Pronoun,Copula,Adj} # no main verb follows is

## #Gerund must be a verb

An -ing word used as a noun gets `Noun`, sometimes also `Activity`.

- She is swimming. {Pronoun,Aux,Ger} # swimming is a verb
- Swimming was fun. {Noun,Copula,Adj} # swimming is a noun
- The swimming pool is open. {Det,Noun,Noun,Copula,Adj}

## Some prepositions are #Adjective

Spatial words such as near and inside can get `Adjective`.

- My house is near the school. {Poss,Noun,Copula,Adj,Det,Noun}
- The cat is inside. {Det,Noun,Copula,Adj}
- She walked to school. {Pronoun,Past,Prep,Noun} # to remains a preposition

## #PhrasalVerb includes its particle

`Particle` inherits `PhrasalVerb`, so both parts match #PhrasalVerb.

- She turned down the invitation. {Pronoun,Phrasal,Particle,Det,Noun}
- They called off the expedition. {Pronoun,Phrasal,Particle,Det,Noun}
- She walked down the street. {Pronoun,Past,Prep,Det,Noun} # down introduces a location

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
