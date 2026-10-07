import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[hmm/switches/person-date] '

const spec = `
# Independently authored whole-sentence expectations; not checked against the tagger.

# april
April handed me the keys. {Person,Past,Pronoun,Det,Plural}
The festival begins in April. {Det,Noun,Pres,Prep,Month|!Person}

# august
I spoke with August after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
We travel in August. {Pronoun,Inf,Prep,Month|!Person}
An august assembly gathered. {Det,Adj|!Person,Noun,Past}

# jan
My friend Jan arrived early. {Poss,Noun,Person,Past,Adv}
The deadline is Jan 12. {Det,Noun,Copula,Month|!Person,Date}

# january
We invited January to dinner. {Pronoun,Past,Person,Prep,Noun}
Snow fell throughout January. {Noun,Past,Prep,Month|!Person}

# june
June handed me the keys. {Person,Past,Pronoun,Det,Plural}
The roses bloom in June. {Det,Noun,Inf,Prep,Month|!Person}

# sep
I spoke with Sep after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The letter was dated Sep 14. {Det,Noun,Aux,Verb,Month|!Person,Date}

# avril
# French month name; included explicitly in a French calendar context.
My friend Avril arrived early. {Poss,Noun,Person,Past,Adv}
The French calendar labels the month avril. {Det,Adj,Noun,Pres,Det,Noun,Month|!Person}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
