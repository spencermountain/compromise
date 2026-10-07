import test from 'tape'
import assertSpec from '../../lib/spec.js'
import assertNoOverlap from './_lib.js'
const here = '[hmm/switches/person-date] '

const spec = `
# Independently authored whole-sentence expectations.

# april
April handed me the keys. {Person,Past,Pronoun,Det,Plural}
The festival begins in April. {Det,Noun,Pres,Prep,Month}

# august
I spoke with August after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
We travel in August. {Pronoun,Inf,Prep,Month}
An august assembly gathered. {Det,Adj,Noun,Past}

# jan
My friend Jan arrived early. {Poss,Noun,Person,Past,Adv}
The deadline is Jan 12. {Det,Noun,Copula,Month,Date}

# january
We invited January to dinner. {Pronoun,Past,Person,Prep,Noun}
Snow fell throughout January. {Noun,Past,Prep,Month}

# june
June handed me the keys. {Person,Past,Pronoun,Det,Plural}
The roses bloom in June. {Det,Noun,Inf,Prep,Month}

# sep
I spoke with Sep after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The letter was dated Sep 14. {Det,Noun,Aux,Verb,Month,Date}

# avril
# French month name; included explicitly in a French calendar context.
My friend Avril arrived early. {Poss,Noun,Person,Past,Adv}
The French calendar labels the month avril. {Det,Adj,Noun,Pres,Det,Noun,Month}
`

test(here, t => {
  assertSpec(t, spec, here)
  assertNoOverlap(t, spec, here, ['(#Person && #Date)'])
  t.end()
})
