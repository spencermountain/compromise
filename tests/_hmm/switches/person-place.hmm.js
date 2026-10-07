import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[hmm/switches/person-place] '

const spec = `
# Independently authored whole-sentence expectations; not checked against the tagger.

# alexandria
Alexandria handed me the keys. {Person,Past,Pronoun,Det,Plural}
We drove to Alexandria after lunch. {Pronoun,Past,Prep,Place|!Person,Prep,Noun}

# austin
I spoke with Austin after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The museum in Austin closed early. {Det,Noun,Prep,Place|!Person,Past,Adv}

# darwin
My friend Darwin arrived early. {Poss,Noun,Person,Past,Adv}
She moved to Darwin with her family. {Pronoun,Past,Prep,Place|!Person,Prep,Poss,Noun}

# diego
We invited Diego to dinner. {Pronoun,Past,Person,Prep,Noun}
They explored San Diego on foot. {Pronoun,Past,Place,Place|!Person,Prep,Noun}

# hamilton
Hamilton handed me the keys. {Person,Past,Pronoun,Det,Plural}
We drove to Hamilton after lunch. {Pronoun,Past,Prep,Place|!Person,Prep,Noun}

# houston
I spoke with Houston after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The museum in Houston closed early. {Det,Noun,Prep,Place|!Person,Past,Adv}

# jordan
My friend Jordan arrived early. {Poss,Noun,Person,Past,Adv}
She moved to Jordan with her family. {Pronoun,Past,Prep,Place|!Person,Prep,Poss,Noun}

# kent
We invited Kent to dinner. {Pronoun,Past,Person,Prep,Noun}
They explored Kent on foot. {Pronoun,Past,Place|!Person,Prep,Noun}

# kobe
Kobe handed me the keys. {Person,Past,Pronoun,Det,Plural}
We drove to Kobe after lunch. {Pronoun,Past,Prep,Place|!Person,Prep,Noun}

# orlando
I spoke with Orlando after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The museum in Orlando closed early. {Det,Noun,Prep,Place|!Person,Past,Adv}

# salvador
My friend Salvador arrived early. {Poss,Noun,Person,Past,Adv}
She moved to Salvador with her family. {Pronoun,Past,Prep,Place|!Person,Prep,Poss,Noun}

# samara
We invited Samara to dinner. {Pronoun,Past,Person,Prep,Noun}
They explored Samara on foot. {Pronoun,Past,Place|!Person,Prep,Noun}

# santiago
Santiago handed me the keys. {Person,Past,Pronoun,Det,Plural}
We drove to Santiago after lunch. {Pronoun,Past,Prep,Place|!Person,Prep,Noun}

# sydney
I spoke with Sydney after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The museum in Sydney closed early. {Det,Noun,Prep,Place|!Person,Past,Adv}

# victoria
My friend Victoria arrived early. {Poss,Noun,Person,Past,Adv}
She moved to Victoria with her family. {Pronoun,Past,Prep,Place|!Person,Prep,Poss,Noun}

# virginia
We invited Virginia to dinner. {Pronoun,Past,Person,Prep,Noun}
They explored Virginia on foot. {Pronoun,Past,Place|!Person,Prep,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
