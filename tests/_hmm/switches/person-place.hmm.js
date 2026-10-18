import test from 'tape'
import assertSpec from '../../lib/spec.js'
import assertNoOverlap from './_lib.js'
const here = '[hmm/switches/person-place] '

const spec = `
# Independently authored whole-sentence expectations.

# alexandria
Alexandria handed me the keys. {Person,Past,Pronoun,Det,Plural}
We drove to Alexandria after lunch. {Pronoun,Past,Prep,Place,Prep,Noun}

# austin
I spoke with Austin after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The museum in Austin closed early. {Det,Noun,Prep,Place,Past,Adv}

# darwin
My friend Darwin arrived early. {Poss,Noun,Person,Past,Adv}
She moved to Darwin with her family. {Pronoun,Past,Prep,Place,Prep,Poss,Noun}

# diego
We invited Diego to dinner. {Pronoun,Past,Person,Prep,Noun}
They explored San Diego on foot. {Pronoun,Past,Place,Place,Prep,Noun}

# hamilton
Hamilton handed me the keys. {Person,Past,Pronoun,Det,Plural}
We drove to Hamilton after lunch. {Pronoun,Past,Prep,Place,Prep,Noun}

# houston
I spoke with Houston after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The museum in Houston closed early. {Det,Noun,Prep,Place,Past,Adv}

# jordan
My friend Jordan arrived early. {Poss,Noun,Person,Past,Adv}
She moved to Jordan with her family. {Pronoun,Past,Prep,Place,Prep,Poss,Noun}

# kent
We invited Kent to dinner. {Pronoun,Past,Person,Prep,Noun}
They explored Kent on foot. {Pronoun,Past,Place,Prep,Noun}

# kobe
Kobe handed me the keys. {Person,Past,Pronoun,Det,Plural}
We drove to Kobe after lunch. {Pronoun,Past,Prep,Place,Prep,Noun}

# orlando
I spoke with Orlando after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The museum in Orlando closed early. {Det,Noun,Prep,Place,Past,Adv}

# salvador
My friend Salvador arrived early. {Poss,Noun,Person,Past,Adv}
She moved to Salvador with her family. {Pronoun,Past,Prep,Place,Prep,Poss,Noun}

# samara
We invited Samara to dinner. {Pronoun,Past,Person,Prep,Noun}
They explored Samara on foot. {Pronoun,Past,Place,Prep,Noun}

# santiago
Santiago handed me the keys. {Person,Past,Pronoun,Det,Plural}
We drove to Santiago after lunch. {Pronoun,Past,Prep,Place,Prep,Noun}

# sydney
I spoke with Sydney after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The museum in Sydney closed early. {Det,Noun,Prep,Place,Past,Adv}

# victoria
My friend Victoria arrived early. {Poss,Noun,Person,Past,Adv}
She moved to Victoria with her family. {Pronoun,Past,Prep,Place,Prep,Poss,Noun}

# virginia
We invited Virginia to dinner. {Pronoun,Past,Person,Prep,Noun}
They explored Virginia on foot. {Pronoun,Past,Place,Prep,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  assertNoOverlap(t, spec, here, ['(#Person && #Place)'])
  t.end()
})
