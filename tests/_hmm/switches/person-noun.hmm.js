import test from 'tape'
import assertSpec from '../../lib/spec.js'
import assertNoOverlap from './_lib.js'
const here = '[hmm/switches/person-noun] '

const spec = `
# Independently authored whole-sentence expectations.

# alfredo
Alfredo handed me the keys. {Person,Past,Pronoun,Det,Plural}
She ordered pasta with alfredo sauce. {Pronoun,Past,Noun,Prep,Noun|!Person,Noun}

# alma
# Common-noun use occurs within an established borrowed phrase.
I spoke with Alma after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The choir honored its alma mater. {Det,Noun,Past,Poss,Noun|!Person,Noun}

# art
My friend Art arrived early. {Poss,Noun,Person,Past,Adv}
The art filled the gallery. {Det,Noun|!Person,Past,Det,Noun}

# baker
We invited Baker to dinner. {Pronoun,Past,Person,Prep,Noun}
The baker kneaded the dough. {Det,Actor,Past,Det,Noun}

# benedict
Benedict handed me the keys. {Person,Past,Pronoun,Det,Plural}
She ordered eggs benedict for breakfast. {Pronoun,Past,Noun,Noun|!Person,Prep,Noun}

# berg
I spoke with Berg after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
A berg drifted past the ship. {Det,Noun|!Person,Past,Prep,Det,Noun}

# brandy
My friend Brandy arrived early. {Poss,Noun,Person,Past,Adv}
He poured some brandy. {Pronoun,Past,Det,Noun|!Person}

# brook
We invited Brook to dinner. {Pronoun,Past,Person,Prep,Noun}
The brook flowed under the bridge. {Det,Noun|!Person,Past,Prep,Det,Noun}

# cam
Cam handed me the keys. {Person,Past,Pronoun,Det,Plural}
The cam rotates inside the engine. {Det,Noun|!Person,Pres,Prep,Det,Noun}

# charity
I spoke with Charity after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
They donated to a charity. {Pronoun,Past,Prep,Det,Noun|!Person}

# chin
My friend Chin arrived early. {Poss,Noun,Person,Past,Adv}
She rested her chin on her hand. {Pronoun,Past,Poss,Noun|!Person,Prep,Poss,Noun}

# christian
We invited Christian to dinner. {Pronoun,Past,Person,Prep,Noun}
A Christian spoke at the gathering. {Det,Noun,Past,Prep,Det,Noun}

# cliff
Cliff handed me the keys. {Person,Past,Pronoun,Det,Plural}
The cliff rose above the sea. {Det,Noun|!Person,Past,Prep,Det,Noun}

# crystal
I spoke with Crystal after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The crystal caught the light. {Det,Noun|!Person,Past,Det,Noun}

# daisy
My friend Daisy arrived early. {Poss,Noun,Person,Past,Adv}
A daisy grew beside the path. {Det,Noun|!Person,Past,Prep,Det,Noun}

# dawn
We invited Dawn to dinner. {Pronoun,Past,Person,Prep,Noun}
We left before dawn. {Pronoun,Past,Prep,Noun|!Person}

# deja
# Common-noun use occurs within an established borrowed phrase.
Deja handed me the keys. {Person,Past,Pronoun,Det,Plural}
She felt a sense of deja vu. {Pronoun,Past,Det,Noun,Prep,Noun|!Person,Noun}

# dick
I spoke with Dick after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
He behaved like a dick. {Pronoun,Past,Prep,Det,Noun|!Person}

# dixie
My friend Dixie arrived early. {Poss,Noun,Person,Past,Adv}
The soldier washed the dixie. {Det,Noun,Past,Det,Noun|!Person}

# dolly
We invited Dolly to dinner. {Pronoun,Past,Person,Prep,Noun}
They moved the piano on a dolly. {Pronoun,Past,Det,Noun,Prep,Det,Noun|!Person}

# earl
Earl handed me the keys. {Person,Past,Pronoun,Det,Plural}
The earl greeted the guests. {Det,Noun,Past,Det,Plural}

# eddy
I spoke with Eddy after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
An eddy swirled beside the rock. {Det,Noun|!Person,Past,Prep,Det,Noun}

# emir
My friend Emir arrived early. {Poss,Noun,Person,Past,Adv}
The emir addressed the council. {Det,Noun,Past,Det,Noun}

# eula
We invited Eula to dinner. {Pronoun,Past,Person,Prep,Noun}
She read the EULA before installation. {Pronoun,Past,Det,Noun|!Person,Prep,Noun}

# eve
Eve handed me the keys. {Person,Past,Pronoun,Det,Plural}
We met on the eve of the wedding. {Pronoun,Past,Prep,Det,Noun|!Person,Prep,Det,Noun}

# faith
I spoke with Faith after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
Her faith never wavered. {Poss,Noun|!Person,Adv,Past}

# fern
My friend Fern arrived early. {Poss,Noun,Person,Past,Adv}
A fern grew in the shade. {Det,Noun|!Person,Past,Prep,Det,Noun}

# flo
# No ordinary standalone English common-noun sense supplied; name only.
We invited Flo to dinner. {Pronoun,Past,Person,Prep,Noun}

# gail
# No ordinary standalone English common-noun sense supplied; name only.
Gail handed me the keys. {Person,Past,Pronoun,Det,Plural}

# gene
I spoke with Gene after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The gene affects eye color. {Det,Noun|!Person,Pres,Noun,Noun}

# guy
My friend Guy arrived early. {Poss,Noun,Person,Past,Adv}
A guy opened the door. {Det,Noun|!Person,Past,Det,Noun}

# hall
We invited Hall to dinner. {Pronoun,Past,Person,Prep,Noun}
They waited in the hall. {Pronoun,Past,Prep,Det,Noun|!Person}

# hazel
Hazel handed me the keys. {Person,Past,Pronoun,Det,Plural}
The hazel grew beside the stream. {Det,Noun|!Person,Past,Prep,Det,Noun}

# hill
I spoke with Hill after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
They climbed the hill. {Pronoun,Past,Det,Noun|!Person}

# holly
My friend Holly arrived early. {Poss,Noun,Person,Past,Adv}
The holly bears red berries. {Det,Noun|!Person,Pres,Adj,Plural}

# jade
We invited Jade to dinner. {Pronoun,Past,Person,Prep,Noun}
The pendant contains jade. {Det,Noun,Pres,Noun|!Person}

# jasmine
Jasmine handed me the keys. {Person,Past,Pronoun,Det,Plural}
The jasmine scented the garden. {Det,Noun|!Person,Past,Det,Noun}

# jay
I spoke with Jay after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
A jay perched on the fence. {Det,Noun|!Person,Past,Prep,Det,Noun}

# jean
My friend Jean arrived early. {Poss,Noun,Person,Past,Adv}
The tailor chose sturdy jean for the trousers. {Det,Noun,Past,Adj,Noun|!Person,Prep,Det,Plural}

# jewel
We invited Jewel to dinner. {Pronoun,Past,Person,Prep,Noun}
The jewel glittered. {Det,Noun|!Person,Past}

# jolie
# No ordinary standalone English common-noun sense supplied; name only.
Jolie handed me the keys. {Person,Past,Pronoun,Det,Plural}

# joy
I spoke with Joy after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
Her joy was obvious. {Poss,Noun|!Person,Copula,Adj}

# king
My friend King arrived early. {Poss,Noun,Person,Past,Adv}
The king addressed the court. {Det,Noun,Past,Det,Noun}

# kitty
We invited Kitty to dinner. {Pronoun,Past,Person,Prep,Noun}
They added money to the kitty. {Pronoun,Past,Noun,Prep,Det,Noun|!Person}

# lane
Lane handed me the keys. {Person,Past,Pronoun,Det,Plural}
The lane leads to the farm. {Det,Noun|!Person,Pres,Prep,Det,Noun}

# leo
I spoke with Leo after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
She is a Leo. {Pronoun,Copula,Det,Noun|!Person}

# lily
My friend Lily arrived early. {Poss,Noun,Person,Past,Adv}
A lily floated on the pond. {Det,Noun|!Person,Past,Prep,Det,Noun}

# max
We invited Max to dinner. {Pronoun,Past,Person,Prep,Noun}
We pushed the engine to the max. {Pronoun,Past,Det,Noun,Prep,Det,Noun|!Person}

# maya
Maya handed me the keys. {Person,Past,Pronoun,Det,Plural}
The philosopher explained maya as illusion. {Det,Noun,Past,Noun|!Person,Prep,Noun}

# melody
I spoke with Melody after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The melody sounded familiar. {Det,Noun|!Person,Past,Adj}

# olive
My friend Olive arrived early. {Poss,Noun,Person,Past,Adv}
She ate an olive. {Pronoun,Past,Det,Noun|!Person}

# patsy
We invited Patsy to dinner. {Pronoun,Past,Person,Prep,Noun}
They used him as a patsy. {Pronoun,Past,Pronoun,Prep,Det,Noun|!Person}

# page
Page handed me the keys. {Person,Past,Pronoun,Det,Plural}
She turned the page. {Pronoun,Past,Det,Noun|!Person}

# pearl
I spoke with Pearl after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
An oyster produced the pearl. {Det,Noun,Past,Det,Noun|!Person}

# penny
My friend Penny arrived early. {Poss,Noun,Person,Past,Adv}
A penny fell from his pocket. {Det,Noun|!Person,Past,Prep,Poss,Noun}

# pol
We invited Pol to dinner. {Pronoun,Past,Person,Prep,Noun}
The pol promised reform. {Det,Noun|!Person,Past,Noun}

# ray
Ray handed me the keys. {Person,Past,Pronoun,Det,Plural}
A ray swam beneath the boat. {Det,Noun|!Person,Past,Prep,Det,Noun}
A ray of sunlight crossed the room. {Det,Noun|!Person,Prep,Noun,Past,Det,Noun}

# reed
I spoke with Reed after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
A reed bent in the wind. {Det,Noun|!Person,Past,Prep,Det,Noun}

# rex
My friend Rex arrived early. {Poss,Noun,Person,Past,Adv}
The rex rabbit has soft fur. {Det,Noun|!Person,Noun,Pres,Adj,Noun}

# robin
We invited Robin to dinner. {Pronoun,Past,Person,Prep,Noun}
A robin sang outside. {Det,Noun|!Person,Past,Adv}

# rod
Rod handed me the keys. {Person,Past,Pronoun,Det,Plural}
The rod bent under pressure. {Det,Noun|!Person,Past,Prep,Noun}

# rose
I spoke with Rose after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The rose smelled sweet. {Det,Noun|!Person,Past,Adj}
The balloon rose above the roof. {Det,Noun,Past,Prep,Det,Noun}

# ruby
My friend Ruby arrived early. {Poss,Noun,Person,Past,Adv}
The ring contains a ruby. {Det,Noun,Pres,Det,Noun|!Person}

# sky
We invited Sky to dinner. {Pronoun,Past,Person,Prep,Noun}
The sky darkened. {Det,Noun|!Person,Past}

# sonny
Sonny handed me the keys. {Person,Past,Pronoun,Det,Plural}
Come here, sonny. {Imperative,Adv,Noun|!Person}

# summer
I spoke with Summer after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The summer was hot. {Det,Date,Copula,Adj}

# trinity
My friend Trinity arrived early. {Poss,Noun,Person,Past,Adv}
The design combines a trinity of colors. {Det,Noun,Pres,Det,Noun|!Person,Prep,Plural}

# van
We invited Van to dinner. {Pronoun,Past,Person,Prep,Noun}
The van stopped outside. {Det,Noun|!Person,Past,Adv}

# viola
Viola handed me the keys. {Person,Past,Pronoun,Det,Plural}
She plays the viola. {Pronoun,Pres,Det,Noun|!Person}

# violet
I spoke with Violet after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
A violet bloomed beside the wall. {Det,Noun|!Person,Past,Prep,Det,Noun}

# wang
My friend Wang arrived early. {Poss,Noun,Person,Past,Adv}
He drew a wang on the wall. {Pronoun,Past,Det,Noun|!Person,Prep,Det,Noun}

# venus
We invited Venus to dinner. {Pronoun,Past,Person,Prep,Noun}
Venus shone above the horizon. {Noun|!Person,Past,Prep,Det,Noun}

# dj
Dj handed me the keys. {Person,Past,Pronoun,Det,Plural}
The DJ played our song. {Det,Actor,Past,Poss,Noun}

# paddy
I spoke with Paddy after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The farmer flooded the paddy. {Det,Noun,Past,Det,Noun|!Person}

# herb
My friend Herb arrived early. {Poss,Noun,Person,Past,Adv}
She added a fresh herb to the soup. {Pronoun,Past,Det,Adj,Noun|!Person,Prep,Det,Noun}

# fanny
We invited Fanny to dinner. {Pronoun,Past,Person,Prep,Noun}
She landed on her fanny. {Pronoun,Past,Prep,Poss,Noun|!Person}

# norm
Norm handed me the keys. {Person,Past,Pronoun,Det,Plural}
Silence became the norm. {Noun,Past,Det,Noun|!Person}

# bo
I spoke with Bo after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
He practiced with a wooden bo. {Pronoun,Past,Prep,Det,Adj,Noun|!Person}

# bud
My friend Bud arrived early. {Poss,Noun,Person,Past,Adv}
A bud appeared on the branch. {Det,Noun|!Person,Past,Prep,Det,Noun}

# finn
We invited Finn to dinner. {Pronoun,Past,Person,Prep,Noun}
A Finn spoke about her homeland. {Det,Noun,Past,Prep,Poss,Noun}

# mat
Mat handed me the keys. {Person,Past,Pronoun,Det,Plural}
The mat lay beside the door. {Det,Noun|!Person,Past,Prep,Det,Noun}

# mats
I spoke with Mats after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The mats covered the floor. {Det,Plural,Past,Det,Noun}

# nat
My friend Nat arrived early. {Poss,Noun,Person,Past,Adv}
The router uses NAT. {Det,Noun,Pres,Noun|!Person}

# hunter
We invited Hunter to dinner. {Pronoun,Past,Person,Prep,Noun}
The hunter followed the tracks. {Det,Actor,Past,Det,Plural}

# ward
Ward handed me the keys. {Person,Past,Pronoun,Det,Plural}
The ward has ten beds. {Det,Noun|!Person,Pres,Value,Plural}

# dean
I spoke with Dean after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The dean welcomed the students. {Det,Actor,Past,Det,Plural}

# gill
My friend Gill arrived early. {Poss,Noun,Person,Past,Adv}
The fish injured a gill. {Det,Noun,Past,Det,Noun|!Person}
She measured one gill of cream. {Pronoun,Past,Value,Unit,Prep,Noun}

# chambers
We invited Chambers to dinner. {Pronoun,Past,Person,Prep,Noun}
The chambers were empty. {Det,Plural,Copula,Adj}

# watts
Watts handed me the keys. {Person,Past,Pronoun,Det,Plural}
The lamp consumes sixty watts. {Det,Noun,Pres,Value,Unit}

# banks
I spoke with Banks after lunch. {Pronoun,Past,Prep,Person,Prep,Noun}
The banks closed early. {Det,Plural,Past,Adv}
The banks of the river flooded. {Det,Plural,Prep,Det,Noun,Past}

# fields
My friend Fields arrived early. {Poss,Noun,Person,Past,Adv}
The fields were green. {Det,Plural,Copula,Adj}

# potter
We invited Potter to dinner. {Pronoun,Past,Person,Prep,Noun}
The potter shaped the clay. {Det,Actor,Past,Det,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  // Person is a noun subtype; its overlap with Noun is valid.
  assertNoOverlap(t, spec, here, ['(#Person && #Verb)', '(#Person && #Adjective)'])
  t.end()
})
