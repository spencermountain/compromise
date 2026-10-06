import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/spec/grammar-spec]'

const spec = `
# grammar-spec verb tenses + auxiliaries
she walked home. {Noun,Vb|Past,Noun}
she walks quickly. {Noun,Vb|Pres,Adv}
she has walked home. {Noun,Vb|Aux,Vb|Past,Noun}
she will walk home. {Noun,Vb|Aux,Vb|Inf,Noun}
she is walking home. {Noun,Vb|Aux,Vb|Ger,Noun}
she could swim faster. {Noun,Vb|Modal,Vb|Inf,Adj|Comparative}

# grammar-spec copulas + adjectives
the sky is blue. {Det,Noun,Vb|Copula,Adj}
the biggest dog won. {Det,Adj|Superlative,Noun,Vb|Past}
she is taller than him. {Noun,Vb|Copula,Adj|Comparative,Prep,Noun|Pronoun}
running is fun. {Noun,Vb|Copula,Adj}

# grammar-spec negation + contractions
# contractions split into two terms - the implicit term is matchable too
she did not walk. {Noun,Vb|Aux,Negative,Vb|Inf}
she didn't walk. {Noun|Pronoun,Vb|Aux,Negative,Vb|Inf}
he cannot swim. {Noun|Pronoun,Vb,Negative,Vb|Inf}
The dog don't bark. {Det,Noun,Vb,Negative,Vb}

# grammar-spec questions
where did she go? {QuestionWord,Vb,Noun|Pronoun,Vb}
who is that? {QuestionWord,Vb|Copula,Noun|Pronoun}
is he going? {Vb|Copula,Noun|Pronoun,Vb|Ger}

# grammar-spec imperatives
please close the door. {Expr,Vb|Imp,Det,Noun}
record the record. {Vb|Imp,Det,Noun}
go home! {Vb|Imp,Noun}

# grammar-spec noun inflection
the dogs barked. {Det,Noun|Plural,Vb|Past}
the dog's tail wagged. {Det,Noun|Poss,Noun,Vb|Past}
spencer's house is nice. {Noun|Poss,Noun,Vb|Copula,Adj}
he gave her the book. {Noun|Pronoun,Vb|Past,Noun|Pronoun,Det,Noun}

# grammar-spec proper nouns
Dr. Smith arrived in Toronto. {Noun|Hon,Noun|Prop,Vb|Past,Prep,Noun|Prop}
Google hired spencer in May. {Noun|Org,Vb|Past,Noun,Prep,Date}
the FBI met NASA. {Det,Noun|Acronym,Vb|Past,Noun|Acronym}

# grammar-spec phrases + clauses
she gave up quickly. {Noun,Vb|Phrasal,Vb|Particle,Adv}
she walked to the store. {Noun,Vb,Prep,Det,Noun}
give it to her. {Vb,Noun|Pronoun,Prep,Noun|Pronoun}
the book on the table is mine. {Det,Noun,Prep,Det,Noun,Vb|Copula,Noun}
there are many options. {There,Vb|Pres,Adj,Noun|Plural}
unless it rains, we go. {Condition,Noun|Pronoun,Vb,Noun|Pronoun,Vb}
the cake was eaten by the dog. {Det,Noun,Vb|Copula,Vb|Participle,Prep,Det,Noun}

# grammar-spec values + dates
i bought two tickets for $50 on friday. {Noun|Pronoun,Vb|Past,Val,Noun|Plural,Prep,Val,Prep,Date}
the meeting is at 5pm on june 5th. {Det,Noun,Vb,Prep,Date,Prep,Date,Date}

# grammar-spec noun-verb ambiguity
# same word, both jobs - the tagger disambiguates from context
she saw a saw. {Noun,Vb|Past,Det,Noun}
i run a run club. {Noun,Vb,Det,Noun,Noun}
fruit flies like a banana. {Noun,Noun,Vb,Det,Noun}
if it rains, we will stay home. {Conj|Condition,Noun,Vb,Noun,Vb,Vb,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
