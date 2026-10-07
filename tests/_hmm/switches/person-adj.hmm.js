import test from 'tape'
import assertSpec from '../../lib/spec.js'
import assertNoOverlap from './_lib.js'
const here = '[hmm/switches/person-adj] '

const spec = `
# Independently authored whole-sentence expectations.

# misty
Misty handed me the keys. {Person,Past,Pronoun,Det,Plural}
The valley was misty. {Det,Noun,Copula,Adj}

# rusty
I spoke with Rusty after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The rusty gate creaked. {Det,Adj,Noun,Past}

# dusty
My friend Dusty arrived early. {Poss,Noun,Person,Past,Adv}
She wiped the dusty shelf. {Pronoun,Past,Det,Adj,Noun}

# rich
We invited Rich to dinner. {Pronoun,Past,Person,Prep,Noun}
The soup was rich. {Det,Noun,Copula,Adj}

# randy
Randy handed me the keys. {Person,Past,Pronoun,Det,Plural}
The randy stallion escaped. {Det,Adj,Noun,Past}

# sandy
I spoke with Sandy after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
We crossed a sandy beach. {Pronoun,Past,Det,Adj,Noun}

# earnest
My friend Earnest arrived early. {Poss,Noun,Person,Past,Adv}
He made an earnest appeal. {Pronoun,Past,Det,Adj,Noun}

# frank
We invited Frank to dinner. {Pronoun,Past,Person,Prep,Noun}
Her reply was frank. {Poss,Noun,Copula,Adj}

# brown
Brown handed me the keys. {Person,Past,Pronoun,Det,Plural}
The brown dog barked. {Det,Adj,Noun,Past}
She will brown the onions. {Pronoun,Modal,Inf,Det,Plural}

# bella
# No ordinary standalone English adjective sense supplied; name only.
I spoke with Bella after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}

# woody
My friend Woody arrived early. {Poss,Noun,Person,Past,Adv}
The plant has a woody stem. {Det,Noun,Pres,Det,Adj,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  assertNoOverlap(t, spec, here, ['(#Person && #Adjective)'])
  t.end()
})
