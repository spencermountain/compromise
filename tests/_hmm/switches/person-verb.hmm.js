import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[hmm/switches/person-verb] '

const spec = `
# Independently authored whole-sentence expectations; not checked against the tagger.

# biff
Biff handed me the keys. {Person,Past,Pronoun,Det,Plural}
We biff the ball. {Pronoun,Inf|!Person,Det,Noun}

# bill
I spoke with Bill after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
They bill the client. {Pronoun,Inf|!Person,Det,Noun}
The bill arrived after lunch. {Det,Noun|!Person,Past,Prep,Noun}

# blaze
My friend Blaze arrived early. {Poss,Noun,Person,Past,Adv}
You can blaze a trail. {Pronoun,Modal,Inf|!Person,Det,Noun}

# blossom
We invited Blossom to dinner. {Pronoun,Past,Person,Prep,Noun}
The trees blossom in spring. {Det,Noun,Inf|!Person,Prep,Noun}

# bob
Bob handed me the keys. {Person,Past,Pronoun,Det,Plural}
I bob on the waves. {Pronoun,Inf|!Person,Prep,Det,Plural}
Her bob framed her face. {Poss,Noun|!Person,Past,Poss,Noun}

# buck
I spoke with Buck after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
He might buck the trend. {Pronoun,Modal,Inf|!Person,Det,Noun}

# chase
My friend Chase arrived early. {Poss,Noun,Person,Past,Adv}
We chase the ball. {Pronoun,Inf|!Person,Det,Noun}

# chuck
We invited Chuck to dinner. {Pronoun,Past,Person,Prep,Noun}
They chuck the rubbish outside. {Pronoun,Inf|!Person,Det,Noun,Adv}

# drew
Drew handed me the keys. {Person,Past,Pronoun,Det,Plural}
She drew a map. {Pronoun,Past|!Person,Det,Noun}

# foster
I spoke with Foster after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
You can foster a child. {Pronoun,Modal,Inf|!Person,Det,Noun}

# grace
My friend Grace arrived early. {Poss,Noun,Person,Past,Adv}
She will grace the occasion. {Pronoun,Modal,Inf|!Person,Det,Noun}

# grant
We invited Grant to dinner. {Pronoun,Past,Person,Prep,Noun}
I grant the request. {Pronoun,Inf|!Person,Det,Noun}

# jack
Jack handed me the keys. {Person,Past,Pronoun,Det,Plural}
He might jack up the car. {Pronoun,Modal,Inf|!Person,Particle,Det,Noun}

# lance
I spoke with Lance after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
We lance the boil. {Pronoun,Inf|!Person,Det,Noun}

# mack
My friend Mack arrived early. {Poss,Noun,Person,Past,Adv}
They mack on her at the party. {Pronoun,Inf|!Person,Prep,Pronoun,Prep,Det,Noun}

# mark
We invited Mark to dinner. {Pronoun,Past,Person,Prep,Noun}
You can mark the page. {Pronoun,Modal,Inf|!Person,Det,Noun}

# marshal
Marshal handed me the keys. {Person,Past,Pronoun,Det,Plural}
She will marshal the evidence. {Pronoun,Modal,Inf|!Person,Det,Noun}

# nick
I spoke with Nick after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
I nick the paint. {Pronoun,Inf|!Person,Det,Noun}

# ollie
My friend Ollie arrived early. {Poss,Noun,Person,Past,Adv}
He might ollie over the curb. {Pronoun,Modal,Inf|!Person,Prep,Det,Noun}

# pat
We invited Pat to dinner. {Pronoun,Past,Person,Prep,Noun}
We pat the dog. {Pronoun,Inf|!Person,Det,Noun}

# peg
Peg handed me the keys. {Person,Past,Pronoun,Det,Plural}
They peg the tent. {Pronoun,Inf|!Person,Det,Noun}

# pierce
I spoke with Pierce after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
You can pierce the fabric. {Pronoun,Modal,Inf|!Person,Det,Noun}

# rob
My friend Rob arrived early. {Poss,Noun,Person,Past,Adv}
She will rob the bank. {Pronoun,Modal,Inf|!Person,Det,Noun}

# spike
We invited Spike to dinner. {Pronoun,Past,Person,Prep,Noun}
I spike the punch. {Pronoun,Inf|!Person,Det,Noun}

# stew
Stew handed me the keys. {Person,Past,Pronoun,Det,Plural}
He might stew the apples. {Pronoun,Modal,Inf|!Person,Det,Plural}

# sue
I spoke with Sue after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
We sue the company. {Pronoun,Inf|!Person,Det,Noun}

# skip
My friend Skip arrived early. {Poss,Noun,Person,Past,Adv}
They skip the introduction. {Pronoun,Inf|!Person,Det,Noun}

# wade
We invited Wade to dinner. {Pronoun,Past,Person,Prep,Noun}
You can wade across the stream. {Pronoun,Modal,Inf|!Person,Prep,Det,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
