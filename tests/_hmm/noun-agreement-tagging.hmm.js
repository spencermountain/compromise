import test from 'tape'
import assertSpec from '../lib/spec.js'
const here = '[hmm/noun-agreement-tagging] '

// Tagging misses found while building noun and verb agreement. Each one stops a conversion
// from finding the noun, or its verb. Expected tags come from the language,
// not the tagger, so these lines fail today. '.' skips a word this line is not about.
const spec = `
# --- a verb after a plural subject, read as a second noun
Cats purr. {Plural,Inf}
Why do cats purr? {.,.,Plural,Inf}
He knows that cats purr. {Pronoun,Pres,.,Plural,Inf}
These old houses creak. {Det,Adj,Plural,Inf}
Old houses creak. {Adj,Plural,Inf}
The dogs he saw bark. {Det,Plural,Pronoun,Past,Inf}
A dog that he likes barks. {Det,Noun,.,Pronoun,Pres,Pres}
The students who study hard pass. {Det,Plural,.,Inf,Adv,Inf}
Were the kids home? {Copula,Det,Plural,!Noun}

# --- a verb after a singular subject, read as a plural noun
The baby cries. {Det,Noun,Pres}
The student studies. {Det,Noun,Pres}
She dreams of castles. {Pronoun,Pres,Prep,Plural}
The dog barks and runs. {Det,Noun,Pres,.,Pres}

# --- a bare verb after its object
I let the dog run. {Pronoun,.,Det,Noun,Inf}

# --- a plural noun, read as a verb
He hired NASA engineers. {Pronoun,Past,Acronym,Plural}
He read NASA reports. {Pronoun,Past,Acronym,Plural}
She called the boys' parents. {Pronoun,Past,Det,.,Plural}
We need plates, forks and knives. {Pronoun,.,Plural,Plural,.,Plural}

# --- plural possessives and acronyms
It is in the dogs' bowls. {Pronoun,Copula,Prep,Det,Poss,Plural}
She called the boys' parents. {Pronoun,Past,Det,Poss,.}
He bought CDs. {Pronoun,Past,Plural}

# --- found while checking verb agreement
Everyone walks. {Noun,Pres}
I walk or run. {Pronoun,Inf,.,Inf}
She lets him go. {Pronoun,Pres|!Modal,Pronoun,Inf}
He lay down. {Pronoun,Past,.}

# --- small words
I wonder why the lights are on. {Pronoun,.,!Prep,Det,Plural,Copula,.}
He knows that cats purr. {Pronoun,Pres,!Det,Plural,.}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
