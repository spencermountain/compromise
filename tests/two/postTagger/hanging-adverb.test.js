import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/postTagger/hanging-adverb] '

const spec = `
The gardener waters the roses daily. {Det,Singular,Pres,Det,Plural,Adv}
There are fresh towels upstairs. {There,Copula,Adj,Plural,Adv}
We ate breakfast together. {Pronoun,Past,Noun,Adv}
They left the house early. {Pronoun,Past,Det,Singular,Adv}
She takes her tablets daily. {Pronoun,Pres,Poss,Plural,Adv}
Can we sit here? {Modal,Pronoun,Inf,Adv}
She charged her tablet overnight. {Pronoun,Past,Poss,Singular,Adv}
They decorated the hall together. {Pronoun,Past,Det,Singular,Adv}
Which bus goes downtown? {QuestionWord,Singular,Pres,Adv}

Please wait here. {Expr,Vb,Adv}
Leave the bowls here. {Imp,Det,Plural,Adv}
Hang your coat here. {Imp,Poss,Singular,Adv}
She is here. {Pronoun,Copula,Adv}
Come here. {Imp,Adv}
Put it there. {Imp,Pronoun,Adv}
There are bowls here. {There,Copula,Plural,Adv}
The children played outside. {Det,Plural,Past,Adv}
We waited inside. {Pronoun,Past,Adv}
She carried the laundry upstairs. {Pronoun,Past,Det,Noun,Adv}
He left his boots downstairs. {Pronoun,Past,Poss,Plural,Adv}
They parked nearby. {Pronoun,Past,Adv}
We ate lunch outdoors. {Pronoun,Past,Noun,Adv}
They walked home together. {Pronoun,Past,Adv,Adv}
She works downtown. {Pronoun,Pres,Adv}

The clinic opens early. {Det,Singular,Pres,Adv}
They arrived late. {Pronoun,Past,Adv}
We check the mailbox daily. {Pronoun,Pres,Det,Singular,Adv}
She visits her parents weekly. {Pronoun,Pres,Poss,Plural,Adv}
The committee meets monthly. {Det,Singular,Pres,Adv}
The guests stayed overnight. {Det,Plural,Past,Adv}
Let the dough rest overnight. {Imp,Det,Noun,Inf,Adv}
We assembled the shelves together. {Pronoun,Past,Det,Plural,Adv}
They solved the puzzle together. {Pronoun,Past,Det,Singular,Adv}

The early train was crowded. {Det,Adj,Singular,Copula,Adj}
Our daily walk was pleasant. {Poss,Adj,Singular,Copula,Adj}
The weekly meeting was short. {Det,Adj,Singular,Copula,Adj}
She booked an overnight flight. {Pronoun,Past,Det,Adj,Singular}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})

test(here + 'adverb readings', t => {
  assertSpec(t, `
She reads the newspaper daily. {Pronoun,Pres,Det,Singular,Adv}
They visit their grandmother weekly. {Pronoun,Pres,Poss,Singular,Adv}
We pay the bills monthly. {Pronoun,Pres,Det,Plural,Adv}
They left the party early. {Pronoun,Past,Det,Singular,Adv}
We finished the work late. {Pronoun,Past,Det,Noun,Adv}
She left her bag outside. {Pronoun,Past,Poss,Singular,Adv}
They waited here yesterday. {Pronoun,Past,Adv,Date}
Come here now. {Imp,Adv,Adv}
We came here yesterday. {Pronoun,Past,Adv,Date}
They stored their coats upstairs. {Pronoun,Past,Poss,Plural,Adv}
We worked together yesterday. {Pronoun,Past,Adv,Date}
Let the children play outside. {Imp,Det,Plural,Inf,Adv}
`, here)
  t.end()
})

test(here + 'other readings remain valid', t => {
  assertSpec(t, `
The early train arrived. {Det,Adj,Singular,Past}
We booked an overnight flight. {Pronoun,Past,Det,Adj,Singular}
Our weekly meeting ended. {Poss,Adj,Singular,Past}
The upstairs room is quiet. {Det,Adj,Singular,Copula,Adj}
The outside wall is blue. {Det,Adj,Singular,Copula,Adj}
They stayed outside the house. {Pronoun,Past,Prep,Det,Singular}
They are together. {Pronoun,Copula,Adj}
They bought a home. {Pronoun,Past,Det,Singular}
We visited downtown. {Pronoun,Past,Noun}
She is early. {Pronoun,Copula,Adj}
They need a rest overnight. {Pronoun,Pres,Det,Singular,Adv}
`, here)
  t.end()
})
