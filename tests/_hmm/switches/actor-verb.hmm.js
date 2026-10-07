import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[hmm/switches/actor-verb] '

const spec = `
# Independently authored whole-sentence expectations; not checked against the tagger.

# addict
The addict surprised us. {Det,Actor|!Verb,Past,Pronoun}
We addict users to nicotine. {Pronoun,Inf,Noun,Prep,Noun}

# architect
We discussed the architect. {Pronoun,Past,Det,Actor|!Verb}
They architect a reliable system. {Pronoun,Inf,Det,Adj,Noun}

# author
They described the author. {Pronoun,Past,Det,Actor|!Verb}
You can author several books. {Pronoun,Modal,Inf,Det,Plural}

# affiliate
That affiliate seemed unusual. {Det,Actor|!Verb,Past,Adj}
She will affiliate with a union. {Pronoun,Modal,Inf,Prep,Det,Noun}

# bully
Her bully was memorable. {Poss,Actor|!Verb,Copula,Adj}
I bully the younger children. {Pronoun,Inf,Det,Adj,Plural}

# boss
I noticed the boss. {Pronoun,Past,Det,Actor|!Verb}
He might boss everyone around. {Pronoun,Modal,Inf,Pronoun,Particle}

# captain
The captain surprised us. {Det,Actor|!Verb,Past,Pronoun}
We captain the ship. {Pronoun,Inf,Det,Noun}

# champion
We discussed the champion. {Pronoun,Past,Det,Actor|!Verb}
They champion equal rights. {Pronoun,Inf,Adj,Plural}

# chauffeur
They described the chauffeur. {Pronoun,Past,Det,Actor|!Verb}
You can chauffeur the guests home. {Pronoun,Modal,Inf,Det,Noun,Adv}

# coach
That coach seemed unusual. {Det,Actor|!Verb,Past,Adj}
She will coach a local team. {Pronoun,Modal,Inf,Det,Adj,Noun}

# cook
Her cook was memorable. {Poss,Actor|!Verb,Copula,Adj}
I cook fresh vegetables. {Pronoun,Inf,Adj,Plural}
The cook stirred the soup. {Det,Actor,Past,Det,Noun}

# doctor
I noticed the doctor. {Pronoun,Past,Det,Actor|!Verb}
He might doctor the records. {Pronoun,Modal,Inf,Det,Plural}

# butcher
The butcher surprised us. {Det,Actor|!Verb,Past,Pronoun}
We butcher the meat. {Pronoun,Inf,Det,Noun}

# engineer
We discussed the engineer. {Pronoun,Past,Det,Actor|!Verb}
They engineer a peaceful solution. {Pronoun,Inf,Det,Adj,Noun}

# fool
They described the fool. {Pronoun,Past,Det,Actor|!Verb}
You can fool the guards. {Pronoun,Modal,Inf,Det,Plural}

# geek
That geek seemed unusual. {Det,Actor|!Verb,Past,Adj}
She will geek out over computers. {Pronoun,Modal,Inf,Particle,Prep,Plural}

# goof
Her goof was memorable. {Poss,Actor|!Verb,Copula,Adj}
I goof around after lunch. {Pronoun,Inf,Particle,Prep,Noun}

# graduate
I noticed the graduate. {Pronoun,Past,Det,Actor|!Verb}
He might graduate with honors. {Pronoun,Modal,Inf,Prep,Plural}

# groom
The groom surprised us. {Det,Actor|!Verb,Past,Pronoun}
We groom the horse. {Pronoun,Inf,Det,Noun}
The groom waited beside the bride. {Det,Actor,Past,Prep,Det,Noun}

# guide
We discussed the guide. {Pronoun,Past,Det,Actor|!Verb}
They guide visitors through the museum. {Pronoun,Inf,Noun,Prep,Det,Noun}

# host
They described the host. {Pronoun,Past,Det,Actor|!Verb}
You can host a party. {Pronoun,Modal,Inf,Det,Noun}
The host welcomed the guests. {Det,Actor,Past,Det,Plural}

# judge
That judge seemed unusual. {Det,Actor|!Verb,Past,Adj}
She will judge the contest. {Pronoun,Modal,Inf,Det,Noun}
The judge sentenced the prisoner. {Det,Actor,Past,Det,Noun}

# man
Her man was memorable. {Poss,Actor|!Verb,Copula,Adj}
I man the phones. {Pronoun,Inf,Det,Plural}

# mentor
I noticed the mentor. {Pronoun,Past,Det,Actor|!Verb}
He might mentor young musicians. {Pronoun,Modal,Inf,Adj,Plural}

# mime
The mime surprised us. {Det,Actor|!Verb,Past,Pronoun}
We mime the entire scene. {Pronoun,Inf,Det,Adj,Noun}

# nerd
We discussed the nerd. {Pronoun,Past,Det,Actor|!Verb}
They nerd out over grammar. {Pronoun,Inf,Particle,Prep,Noun}

# parent
They described the parent. {Pronoun,Past,Det,Actor|!Verb}
You can parent with patience. {Pronoun,Modal,Inf,Prep,Noun}

# partner
That partner seemed unusual. {Det,Actor|!Verb,Past,Adj}
She will partner with a charity. {Pronoun,Modal,Inf,Prep,Det,Noun}

# pilot
Her pilot was memorable. {Poss,Actor|!Verb,Copula,Adj}
I pilot the aircraft. {Pronoun,Inf,Det,Noun}

# pioneer
I noticed the pioneer. {Pronoun,Past,Det,Actor|!Verb}
He might pioneer a new technique. {Pronoun,Modal,Inf,Det,Adj,Noun}

# recruit
The recruit surprised us. {Det,Actor|!Verb,Past,Pronoun}
We recruit more volunteers. {Pronoun,Inf,Det,Plural}

# scout
We discussed the scout. {Pronoun,Past,Det,Actor|!Verb}
They scout the area. {Pronoun,Inf,Det,Noun}

# shepherd
They described the shepherd. {Pronoun,Past,Det,Actor|!Verb}
You can shepherd the children indoors. {Pronoun,Modal,Inf,Det,Noun,Adv}

# tutor
That tutor seemed unusual. {Det,Actor|!Verb,Past,Adj}
She will tutor students after school. {Pronoun,Modal,Inf,Noun,Prep,Noun}

# usher
Her usher was memorable. {Poss,Actor|!Verb,Copula,Adj}
I usher the visitors inside. {Pronoun,Inf,Det,Noun,Adv}

# volunteer
I noticed the volunteer. {Pronoun,Past,Det,Actor|!Verb}
He might volunteer at the shelter. {Pronoun,Modal,Inf,Prep,Det,Noun}

# conscript
The conscript surprised us. {Det,Actor|!Verb,Past,Pronoun}
We conscript young soldiers. {Pronoun,Inf,Adj,Plural}

# wimp
We discussed the wimp. {Pronoun,Past,Det,Actor|!Verb}
They wimp out under pressure. {Pronoun,Inf,Particle,Prep,Noun}

# witness
They described the witness. {Pronoun,Past,Det,Actor|!Verb}
You can witness the ceremony. {Pronoun,Modal,Inf,Det,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
