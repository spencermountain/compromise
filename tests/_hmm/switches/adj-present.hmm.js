import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[hmm/switches/adj-present] '

const spec = `
# Independently authored whole-sentence expectations; not checked against the tagger.

# alert
The alert guard surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We alert the authorities. {Pronoun,Inf,Det,Plural}

# approximate
I noticed the approximate estimate. {Pronoun,Past,Det,Adj|!Verb,Noun}
They approximate the distance. {Pronoun,Inf,Det,Noun}

# average
They described the average score. {Pronoun,Past,Det,Adj|!Verb,Noun}
You can average the results. {Pronoun,Modal,Inf,Det,Plural}

# bare
We discussed her bare wall. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She will bare our teeth. {Pronoun,Modal,Inf,Poss,Plural}

# blunt
The blunt knife surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
I blunt the blade. {Pronoun,Inf,Det,Noun}

# brave
I noticed the brave soldier. {Pronoun,Past,Det,Adj|!Verb,Noun}
He might brave the storm. {Pronoun,Modal,Inf,Det,Noun}

# clean
They described the clean shirt. {Pronoun,Past,Det,Adj|!Verb,Noun}
We clean the kitchen. {Pronoun,Inf,Det,Noun}

# complete
We discussed her complete set. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They complete the form. {Pronoun,Inf,Det,Noun}

# conjugate
The conjugate pair surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
You can conjugate the verb. {Pronoun,Modal,Inf,Det,Noun}

# content
I noticed the content child. {Pronoun,Past,Det,Adj|!Verb,Noun}
She will content ourselves with soup. {Pronoun,Modal,Inf,Pronoun,Prep,Noun}

# cool
They described the cool breeze. {Pronoun,Past,Det,Adj|!Verb,Noun}
I cool the cake. {Pronoun,Inf,Det,Noun}

# correct
We discussed her correct answer. {Pronoun,Past,Poss,Adj|!Verb,Noun}
He might correct the mistake. {Pronoun,Modal,Inf,Det,Noun}

# damp
The damp cloth surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We damp the vibrations. {Pronoun,Inf,Det,Plural}

# deliberate
I noticed the deliberate choice. {Pronoun,Past,Det,Adj|!Verb,Noun}
They deliberate over the evidence. {Pronoun,Inf,Prep,Det,Noun}

# diffuse
They described the diffuse light. {Pronoun,Past,Det,Adj|!Verb,Noun}
You can diffuse the light. {Pronoun,Modal,Inf,Det,Noun}

# dim
We discussed her dim room. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She will dim the lamps. {Pronoun,Modal,Inf,Det,Plural}

# direct
The direct route surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
I direct the traffic. {Pronoun,Inf,Det,Noun}

# double
I noticed the double portion. {Pronoun,Past,Det,Adj|!Verb,Noun}
He might double the amount. {Pronoun,Modal,Inf,Det,Noun}

# dry
They described the dry towel. {Pronoun,Past,Det,Adj|!Verb,Noun}
We dry the dishes. {Pronoun,Inf,Det,Plural}

# elaborate
We discussed her elaborate costume. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They elaborate on the proposal. {Pronoun,Inf,Prep,Det,Noun}

# empty
The empty box surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
You can empty the bin. {Pronoun,Modal,Inf,Det,Noun}

# fine
I noticed the fine fabric. {Pronoun,Past,Det,Adj|!Verb,Noun}
She will fine the driver. {Pronoun,Modal,Inf,Det,Noun}
She paid the fine. {Pronoun,Past,Det,Noun}

# firm
They described the firm mattress. {Pronoun,Past,Det,Adj|!Verb,Noun}
I firm the soil. {Pronoun,Inf,Det,Noun}

# free
We discussed her free ticket. {Pronoun,Past,Poss,Adj|!Verb,Noun}
He might free the prisoner. {Pronoun,Modal,Inf,Det,Noun}

# hollow
The hollow log surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We hollow out the pumpkin. {Pronoun,Inf,Particle,Det,Noun}

# idle
I noticed the idle engine. {Pronoun,Past,Det,Adj|!Verb,Noun}
They idle beside the gate. {Pronoun,Inf,Prep,Det,Noun}

# lay
They described the lay preacher. {Pronoun,Past,Det,Adj|!Verb,Noun}
You can lay the blanket here. {Pronoun,Modal,Inf,Det,Noun,Adv}
She lay on the grass. {Pronoun,Past,Prep,Det,Noun}

# lean
We discussed her lean meat. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She will lean against the wall. {Pronoun,Modal,Inf,Prep,Det,Noun}

# live
The live broadcast surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
I live near the coast. {Pronoun,Inf,Prep,Det,Noun}

# mature
I noticed the mature cheese. {Pronoun,Past,Det,Adj|!Verb,Noun}
He might mature with experience. {Pronoun,Modal,Inf,Prep,Noun}

# mean
They described the mean remark. {Pronoun,Past,Det,Adj|!Verb,Noun}
We mean every word. {Pronoun,Inf,Det,Noun}
The mean temperature increased. {Det,Adj,Noun,Past}
The mean was higher. {Det,Noun,Copula,Comparative}

# moderate
We discussed her moderate temperature. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They moderate the debate. {Pronoun,Inf,Det,Noun}

# narrow
The narrow path surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
You can narrow the search. {Pronoun,Modal,Inf,Det,Noun}

# obscure
I noticed the obscure reference. {Pronoun,Past,Det,Adj|!Verb,Noun}
She will obscure the view. {Pronoun,Modal,Inf,Det,Noun}

# open
They described the open door. {Pronoun,Past,Det,Adj|!Verb,Noun}
I open the window. {Pronoun,Inf,Det,Noun}

# own
She has her own room. {Pronoun,Pres,Poss,Adj,Noun}
He might own the house. {Pronoun,Modal,Inf,Det,Noun}

# pale
The pale complexion surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We pale beside the original. {Pronoun,Inf,Prep,Det,Noun}

# parallel
I noticed the parallel line. {Pronoun,Past,Det,Adj|!Verb,Noun}
They parallel the earlier experiment. {Pronoun,Inf,Det,Adj,Noun}

# present
They described the present situation. {Pronoun,Past,Det,Adj|!Verb,Noun}
You can present the award. {Pronoun,Modal,Inf,Det,Noun}
The present contained a book. {Det,Noun,Past,Det,Noun}

# prime
We discussed her prime example. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She will prime the pump. {Pronoun,Modal,Inf,Det,Noun}

# prompt
The prompt reply surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
I prompt a discussion. {Pronoun,Inf,Det,Noun}

# quack
I noticed the quack doctor. {Pronoun,Past,Det,Adj|!Verb,Noun}
He might quack like a duck. {Pronoun,Modal,Inf,Prep,Det,Noun}

# replicate
They described the replicate sample. {Pronoun,Past,Det,Adj|!Verb,Noun}
We replicate the experiment. {Pronoun,Inf,Det,Noun}

# ready
We discussed her ready meal. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They ready the boat. {Pronoun,Inf,Det,Noun}

# right
The right answer surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
You can right the canoe. {Pronoun,Modal,Inf,Det,Noun}

# round
I noticed the round table. {Pronoun,Past,Det,Adj|!Verb,Noun}
She will round the corner. {Pronoun,Modal,Inf,Det,Noun}

# secure
They described the secure building. {Pronoun,Past,Det,Adj|!Verb,Noun}
I secure the door. {Pronoun,Inf,Det,Noun}

# sedate
We discussed her sedate gathering. {Pronoun,Past,Poss,Adj|!Verb,Noun}
He might sedate the patient. {Pronoun,Modal,Inf,Det,Noun}

# select
The select group surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We select the winner. {Pronoun,Inf,Det,Noun}

# separate
I noticed the separate room. {Pronoun,Past,Det,Adj|!Verb,Noun}
They separate the eggs. {Pronoun,Inf,Det,Plural}

# slick
They described the slick surface. {Pronoun,Past,Det,Adj|!Verb,Noun}
You can slick back my hair. {Pronoun,Modal,Inf,Particle,Poss,Noun}

# slow
We discussed her slow train. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She will slow the car. {Pronoun,Modal,Inf,Det,Noun}

# smooth
The smooth surface surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
I smooth the fabric. {Pronoun,Inf,Det,Noun}

# sour
I noticed the sour milk. {Pronoun,Past,Det,Adj|!Verb,Noun}
He might sour the mood. {Pronoun,Modal,Inf,Det,Noun}

# spare
They described the spare key. {Pronoun,Past,Det,Adj|!Verb,Noun}
We spare the details. {Pronoun,Inf,Det,Plural}

# square
We discussed her square table. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They square the corners. {Pronoun,Inf,Det,Plural}

# sure
# No ordinary present-tense verb sense; adjective only.
She was sure of the answer. {Pronoun,Copula,Adj|!Verb,Prep,Det,Noun}

# suspect
The suspect package surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
You can suspect a mistake. {Pronoun,Modal,Inf,Det,Noun}

# tense
I noticed the tense atmosphere. {Pronoun,Past,Det,Adj|!Verb,Noun}
She will tense my muscles. {Pronoun,Modal,Inf,Poss,Plural}

# thin
They described the thin fabric. {Pronoun,Past,Det,Adj|!Verb,Noun}
I thin the paint. {Pronoun,Inf,Det,Noun}

# utter
We discussed her utter nonsense. {Pronoun,Past,Poss,Adj|!Verb,Noun}
He might utter a word. {Pronoun,Modal,Inf,Det,Noun}

# warm
The warm coat surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We warm the soup. {Pronoun,Inf,Det,Noun}

# wet
I noticed the wet floor. {Pronoun,Past,Det,Adj|!Verb,Noun}
They wet the cloth. {Pronoun,Inf,Det,Noun}

# wrong
They described the wrong answer. {Pronoun,Past,Det,Adj|!Verb,Noun}
You can wrong an innocent person. {Pronoun,Modal,Inf,Det,Adj,Noun}

# express
We discussed her express train. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She will express my gratitude. {Pronoun,Modal,Inf,Poss,Noun}

# elicit
# No ordinary adjective sense; do not substitute illicit.
They elicit useful responses. {Pronoun,Inf,Adj,Plural}

# fringe
The fringe party surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
I fringe the shawl. {Pronoun,Inf,Det,Noun}

# consummate
I noticed the consummate professional. {Pronoun,Past,Det,Adj|!Verb,Noun}
He might consummate the agreement. {Pronoun,Modal,Inf,Det,Noun}

# defuse
# No ordinary adjective sense; do not substitute diffuse.
We defuse the situation. {Pronoun,Inf,Det,Noun}

# wrought
# The verbal sense is past tense, not present tense.
She admired the wrought iron. {Pronoun,Past,Det,Adj|!Verb,Noun}
The storm wrought terrible damage. {Det,Noun,Past,Adj,Noun}

# counterfeit
They described the counterfeit coin. {Pronoun,Past,Det,Adj|!Verb,Noun}
We counterfeit the documents. {Pronoun,Inf,Det,Plural}

# alight
The branches were alight with flames. {Det,Noun,Copula,Adj|!Verb,Prep,Plural}
They alight from the carriage. {Pronoun,Inf,Prep,Det,Noun}

# tender
The tender meat surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
You can tender my resignation. {Pronoun,Modal,Inf,Poss,Noun}

# lower
I noticed the lower shelf. {Pronoun,Past,Det,Adj|!Verb,Noun}
She will lower the flag. {Pronoun,Modal,Inf,Det,Noun}

# close
They described the close friend. {Pronoun,Past,Det,Adj|!Verb,Noun}
I close the gate. {Pronoun,Inf,Det,Noun}
The race was close. {Det,Noun,Copula,Adj}

# last
We discussed her last chapter. {Pronoun,Past,Poss,Adj|!Verb,Noun}
He might last through the winter. {Pronoun,Modal,Inf,Prep,Det,Noun}

# faint
The faint sound surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We faint from exhaustion. {Pronoun,Inf,Prep,Noun}

# bankrupt
I noticed the bankrupt company. {Pronoun,Past,Det,Adj|!Verb,Noun}
They bankrupt the business. {Pronoun,Inf,Det,Noun}

# corrupt
They described the corrupt official. {Pronoun,Past,Det,Adj|!Verb,Noun}
You can corrupt the data. {Pronoun,Modal,Inf,Det,Noun}

# fast
We discussed her fast car. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She will fast before the ceremony. {Pronoun,Modal,Inf,Prep,Det,Noun}
They run fast. {Pronoun,Inf,Adv}

# short
The short visit surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
I short the stock. {Pronoun,Inf,Det,Noun}

# foul
I noticed the foul smell. {Pronoun,Past,Det,Adj|!Verb,Noun}
He might foul the water. {Pronoun,Modal,Inf,Det,Noun}

# fake
They described the fake diamond. {Pronoun,Past,Det,Adj|!Verb,Noun}
We fake an injury. {Pronoun,Inf,Det,Noun}

# fancy
We discussed her fancy hat. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They fancy a cup of tea. {Pronoun,Inf,Det,Noun,Prep,Noun}

# clear
The clear sky surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
You can clear the table. {Pronoun,Modal,Inf,Det,Noun}

# calm
I noticed the calm sea. {Pronoun,Past,Det,Adj|!Verb,Noun}
She will calm the child. {Pronoun,Modal,Inf,Det,Noun}

# dull
They described the dull blade. {Pronoun,Past,Det,Adj|!Verb,Noun}
I dull the pain. {Pronoun,Inf,Det,Noun}

# stray
We discussed her stray cat. {Pronoun,Past,Poss,Adj|!Verb,Noun}
He might stray from the path. {Pronoun,Modal,Inf,Prep,Det,Noun}

# perfect
The perfect circle surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We perfect the technique. {Pronoun,Inf,Det,Noun}

# exempt
I noticed the exempt employee. {Pronoun,Past,Det,Adj|!Verb,Noun}
They exempt the charity from taxes. {Pronoun,Inf,Det,Noun,Prep,Plural}

# articulate
They described the articulate speaker. {Pronoun,Past,Det,Adj|!Verb,Noun}
You can articulate my concerns. {Pronoun,Modal,Inf,Poss,Plural}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
