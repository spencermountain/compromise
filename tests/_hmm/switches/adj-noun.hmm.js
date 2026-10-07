import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[hmm/switches/adj-noun] '

const spec = `
# Independently authored whole-sentence expectations; not checked against the tagger.

# academic
The academic debate surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The academic published a paper. {Det,Actor,Past,Det,Noun}

# adolescent
I noticed the adolescent behavior. {Pronoun,Past,Det,Adj|!Verb,Noun}
The adolescent needed advice. {Det,Noun|!Adjective,Past,Noun}

# adult
They described the adult education. {Pronoun,Past,Det,Adj|!Verb,Noun}
An adult opened the door. {Det,Noun|!Adjective,Past,Det,Noun}

# alternative
We discussed her alternative route. {Pronoun,Past,Poss,Adj|!Verb,Noun}
We need an alternative. {Pronoun,Inf,Det,Noun|!Adjective}

# antarctic
The antarctic wildlife surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
They explored the Antarctic. {Pronoun,Past,Det,Place}

# arab
I noticed the arab poetry. {Pronoun,Past,Det,Adj|!Verb,Noun}
The Arab spoke softly. {Det,Noun|!Adjective,Past,Adv}

# arctic
They described the arctic climate. {Pronoun,Past,Det,Adj|!Verb,Noun}
She visited the Arctic. {Pronoun,Past,Det,Place}

# best
We discussed her best friend. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She did her best. {Pronoun,Past,Poss,Noun}

# blank
The blank page surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
He filled the blank. {Pronoun,Past,Det,Noun|!Adjective}

# bottom
I noticed the bottom shelf. {Pronoun,Past,Det,Adj|!Verb,Noun}
The bottom was wet. {Det,Noun|!Adjective,Copula,Adj}

# bourgeois
They described the bourgeois taste. {Pronoun,Past,Det,Adj|!Verb,Noun}
The bourgeois owned a factory. {Det,Noun|!Adjective,Past,Det,Noun}

# brief
We discussed her brief visit. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She read the brief. {Pronoun,Past,Det,Noun|!Adjective}

# brute
The brute force surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The brute broke the door. {Det,Noun|!Adjective,Past,Det,Noun}

# chief
I noticed the chief concern. {Pronoun,Past,Det,Adj|!Verb,Noun}
The chief greeted us. {Det,Actor,Past,Pronoun}

# classic
They described the classic design. {Pronoun,Past,Det,Adj|!Verb,Noun}
That novel became a classic. {Det,Noun,Past,Det,Noun|!Adjective}

# comic
We discussed her comic timing. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The comic entertained us. {Det,Actor,Past,Pronoun}

# commercial
The commercial success surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We watched the commercial. {Pronoun,Past,Det,Noun|!Adjective}

# communist
I noticed the communist ideology. {Pronoun,Past,Det,Adj|!Verb,Noun}
A communist joined the debate. {Det,Noun|!Adjective,Past,Det,Noun}

# companion
They described the companion volume. {Pronoun,Past,Det,Adj|!Verb,Noun}
Her companion waited outside. {Poss,Noun|!Adjective,Past,Adv}

# complex
We discussed her complex problem. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The complex contains offices. {Det,Noun|!Adjective,Pres,Plural}

# concrete
The concrete evidence surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The concrete cracked. {Det,Noun|!Adjective,Past}

# constituent
I noticed the constituent part. {Pronoun,Past,Det,Adj|!Verb,Noun}
A constituent wrote to her. {Det,Noun|!Adjective,Past,Prep,Pronoun}

# contemporary
They described the contemporary art. {Pronoun,Past,Det,Adj|!Verb,Noun}
He was a contemporary of mine. {Pronoun,Copula,Det,Noun|!Adjective,Prep,Pronoun}

# convertable
# Dictionary spelling retained; intended senses of convertible.
We discussed her convertable roof. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She drove a convertable. {Pronoun,Past,Det,Noun|!Adjective}

# cooperative
The cooperative attitude surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The cooperative sells milk. {Det,Noun|!Adjective,Pres,Noun}

# crude
I noticed the crude drawing. {Pronoun,Past,Det,Adj|!Verb,Noun}
The crude spilled into the sea. {Det,Noun|!Adjective,Past,Prep,Det,Noun}

# cunning
They described the cunning plan. {Pronoun,Past,Det,Adj|!Verb,Noun}
His cunning saved him. {Poss,Noun|!Adjective,Past,Pronoun}

# dark
We discussed her dark room. {Pronoun,Past,Poss,Adj|!Verb,Noun}
We waited in the dark. {Pronoun,Past,Prep,Det,Noun|!Adjective}

# darling
The darling child surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
Her darling smiled. {Poss,Noun|!Adjective,Past}

# demographic
I noticed the demographic change. {Pronoun,Past,Det,Adj|!Verb,Noun}
That demographic buys more books. {Det,Noun|!Adjective,Pres,Det,Plural}

# derivative
They described the derivative style. {Pronoun,Past,Det,Adj|!Verb,Noun}
She calculated the derivative. {Pronoun,Past,Det,Noun|!Adjective}

# elder
We discussed her elder brother. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The elder offered advice. {Det,Noun|!Adjective,Past,Noun}

# elite
The elite athlete surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The elite controlled the council. {Det,Noun|!Adjective,Past,Det,Noun}

# epic
I noticed the epic journey. {Pronoun,Past,Det,Adj|!Verb,Noun}
She translated an epic. {Pronoun,Past,Det,Noun|!Adjective}

# excess
They described the excess baggage. {Pronoun,Past,Det,Adj|!Verb,Noun}
We removed the excess. {Pronoun,Past,Det,Noun|!Adjective}

# executive
We discussed her executive decision. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The executive resigned. {Det,Actor,Past}

# expert
The expert advice surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
An expert examined it. {Det,Actor,Past,Pronoun}

# fair
I noticed the fair decision. {Pronoun,Past,Det,Adj|!Verb,Noun}
We visited the fair. {Pronoun,Past,Det,Noun|!Adjective}
Her fair hair shone. {Poss,Adj,Noun,Past}

# fat
They described the fat cat. {Pronoun,Past,Det,Adj|!Verb,Noun}
The fat melted. {Det,Noun|!Adjective,Past}

# favorite
We discussed her favorite song. {Pronoun,Past,Poss,Adj|!Verb,Noun}
This remains my favorite. {Pronoun,Pres,Poss,Noun|!Adjective}

# favourite
The favourite song surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She chose her favourite. {Pronoun,Past,Poss,Noun|!Adjective}

# fellow
I noticed the fellow traveler. {Pronoun,Past,Det,Adj|!Verb,Noun}
That fellow knows me. {Det,Noun|!Adjective,Pres,Pronoun}

# female
They described the female voice. {Pronoun,Past,Det,Adj|!Verb,Noun}
The female laid eggs. {Det,Noun|!Adjective,Past,Plural}

# feminist
We discussed her feminist critique. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The feminist addressed the crowd. {Det,Noun|!Adjective,Past,Det,Noun}

# fluid
The fluid motion surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The fluid leaked. {Det,Noun|!Adjective,Past}

# fugitive
I noticed the fugitive slave. {Pronoun,Past,Det,Adj|!Verb,Noun}
The fugitive escaped. {Det,Noun|!Adjective,Past}

# future
They described the future project. {Pronoun,Past,Det,Adj|!Verb,Noun}
The future looks bright. {Det,Noun|!Adjective,Pres,Adj}

# general
We discussed her general advice. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The general saluted. {Det,Actor,Past}

# genious
# Dictionary spelling retained; intended informal genius senses.
The genious idea surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
He is a genious. {Pronoun,Copula,Det,Noun|!Adjective}

# gold
I noticed the gold ring. {Pronoun,Past,Det,Adj|!Verb,Noun}
They discovered gold. {Pronoun,Past,Noun|!Adjective}

# graphic
They described the graphic description. {Pronoun,Past,Det,Adj|!Verb,Noun}
She designed the graphic. {Pronoun,Past,Det,Noun|!Adjective}

# grave
We discussed her grave mistake. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They dug a grave. {Pronoun,Past,Det,Noun|!Adjective}
His expression was grave. {Poss,Noun,Copula,Adj}

# half
The half portion surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
I ate half. {Pronoun,Past,Noun|!Adjective}

# hobby
I noticed the hobby farm. {Pronoun,Past,Det,Adj|!Verb,Noun}
Gardening is her hobby. {Noun,Copula,Poss,Noun|!Adjective}

# homeless
They described the homeless family. {Pronoun,Past,Det,Adj|!Verb,Noun}
They sheltered the homeless. {Pronoun,Past,Det,Noun|!Adjective}

# humdrum
We discussed her humdrum existence. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She escaped the humdrum of routine. {Pronoun,Past,Det,Noun|!Adjective,Prep,Noun}

# ideal
The ideal candidate surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
Freedom remains an ideal. {Noun,Pres,Det,Noun|!Adjective}

# impressionist
I noticed the impressionist painting. {Pronoun,Past,Det,Adj|!Verb,Noun}
The impressionist painted outdoors. {Det,Actor,Past,Adv}

# incumbent
They described the incumbent president. {Pronoun,Past,Det,Adj|!Verb,Noun}
The incumbent won again. {Det,Noun|!Adjective,Past,Adv}

# individual
We discussed her individual choice. {Pronoun,Past,Poss,Adj|!Verb,Noun}
An individual approached us. {Det,Noun|!Adjective,Past,Pronoun}

# innocent
The innocent question surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
They protected an innocent. {Pronoun,Past,Det,Noun|!Adjective}

# instant
I noticed the instant reply. {Pronoun,Past,Det,Adj|!Verb,Noun}
The instant passed quickly. {Det,Noun|!Adjective,Past,Adv}

# interim
They described the interim report. {Pronoun,Past,Det,Adj|!Verb,Noun}
She managed the office in the interim. {Pronoun,Past,Det,Noun,Prep,Det,Noun|!Adjective}

# justice
# Justice system has an attributive noun; no ordinary adjective sense supplied.
The justice system needs reform. {Det,Noun|!Adjective,Noun,Pres,Noun}
They demanded justice. {Pronoun,Past,Noun|!Adjective}

# juvenile
The juvenile behavior surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The juvenile appeared in court. {Det,Noun|!Adjective,Past,Prep,Noun}

# latter
I noticed the latter option. {Pronoun,Past,Det,Adj|!Verb,Noun}
I prefer the latter. {Pronoun,Inf,Det,Noun|!Adjective}

# liberal
They described the liberal policy. {Pronoun,Past,Det,Adj|!Verb,Noun}
The liberal opposed the ban. {Det,Noun|!Adjective,Past,Det,Noun}

# light
We discussed her light suitcase. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The light flickered. {Det,Noun|!Adjective,Past}
The light breeze cooled us. {Det,Adj,Noun,Past,Pronoun}

# liquid
The liquid soap surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The liquid evaporated. {Det,Noun|!Adjective,Past}

# lush
I noticed the lush garden. {Pronoun,Past,Det,Adj|!Verb,Noun}
The lush ordered another drink. {Det,Noun|!Adjective,Past,Det,Noun}

# male
They described the male voice. {Pronoun,Past,Det,Adj|!Verb,Noun}
The male guarded the nest. {Det,Noun|!Adjective,Past,Det,Noun}

# marine
We discussed her marine life. {Pronoun,Past,Poss,Adj|!Verb,Noun}
A marine saluted. {Det,Actor,Past}

# median
The median income surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We calculated the median. {Pronoun,Past,Det,Noun|!Adjective}

# medium
I noticed the medium size. {Pronoun,Past,Det,Adj|!Verb,Noun}
Clay is her favorite medium. {Noun,Copula,Poss,Adj,Noun|!Adjective}
The medium claimed contact with spirits. {Det,Noun|!Adjective,Past,Noun,Prep,Plural}

# metric
They described the metric system. {Pronoun,Past,Det,Adj|!Verb,Noun}
This metric measures performance. {Det,Noun|!Adjective,Pres,Noun}

# miniature
We discussed her miniature train. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She painted a miniature. {Pronoun,Past,Det,Noun|!Adjective}

# mobile
The mobile clinic surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The mobile hung above the crib. {Det,Noun|!Adjective,Past,Prep,Det,Noun}

# modernist
I noticed the modernist architecture. {Pronoun,Past,Det,Adj|!Verb,Noun}
The modernist rejected tradition. {Det,Noun|!Adjective,Past,Noun}

# moral
They described the moral duty. {Pronoun,Past,Det,Adj|!Verb,Noun}
The story has a moral. {Det,Noun,Pres,Det,Noun|!Adjective}

# mortal
We discussed her mortal danger. {Pronoun,Past,Poss,Adj|!Verb,Noun}
He is merely a mortal. {Pronoun,Copula,Adv,Det,Noun|!Adjective}

# nagging
The nagging doubt surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The nagging continued all evening. {Det,Noun|!Adjective,Past,Det,Noun}

# novel
I noticed the novel approach. {Pronoun,Past,Det,Adj|!Verb,Noun}
She finished the novel. {Pronoun,Past,Det,Noun|!Adjective}

# nuts
That idea is nuts. {Det,Noun,Copula,Adj|!Verb}
The nuts fell from the tree. {Det,Plural,Past,Prep,Det,Noun}

# offensive
We discussed her offensive remark. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The offensive began at dawn. {Det,Noun|!Adjective,Past,Prep,Noun}

# official
The official statement surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
An official checked the documents. {Det,Actor,Past,Det,Plural}

# opposite
I noticed the opposite direction. {Pronoun,Past,Det,Adj|!Verb,Noun}
She said the opposite. {Pronoun,Past,Det,Noun|!Adjective}

# oval
They described the oval mirror. {Pronoun,Past,Det,Adj|!Verb,Noun}
Draw an oval. {Imperative,Det,Noun|!Adjective}

# past
We discussed her past experience. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The past can never return. {Det,Noun|!Adjective,Modal,Adv,Inf}

# patient
The patient teacher surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The patient recovered. {Det,Noun|!Adjective,Past}
She remained patient during the delay. {Pronoun,Past,Adj,Prep,Det,Noun}

# periodical
I noticed the periodical inspection. {Pronoun,Past,Det,Adj|!Verb,Noun}
She reads a scientific periodical. {Pronoun,Pres,Det,Adj,Noun|!Adjective}

# plastic
They described the plastic container. {Pronoun,Past,Det,Adj|!Verb,Noun}
The plastic melted. {Det,Noun|!Adjective,Past}

# potential
We discussed her potential danger. {Pronoun,Past,Poss,Adj|!Verb,Noun}
Her potential impressed us. {Poss,Noun|!Adjective,Past,Pronoun}

# premier
The premier venue surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The premier resigned. {Det,Actor,Past}

# premium
I noticed the premium service. {Pronoun,Past,Det,Adj|!Verb,Noun}
She paid a premium. {Pronoun,Past,Det,Noun|!Adjective}

# principal
They described the principal reason. {Pronoun,Past,Det,Adj|!Verb,Noun}
The principal welcomed us. {Det,Actor,Past,Pronoun}

# pro
We discussed her pro athlete. {Pronoun,Past,Poss,Adj|!Verb,Noun}
A pro repaired it. {Det,Noun|!Adjective,Past,Pronoun}

# professional
The professional advice surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We hired a professional. {Pronoun,Past,Det,Noun|!Adjective}

# racist
I noticed the racist remark. {Pronoun,Past,Det,Adj|!Verb,Noun}
The racist shouted insults. {Det,Noun|!Adjective,Past,Plural}

# rash
They described the rash decision. {Pronoun,Past,Det,Adj|!Verb,Noun}
The rash spread. {Det,Noun|!Adjective,Past}

# rear
We discussed her rear entrance. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They waited at the rear. {Pronoun,Past,Prep,Det,Noun|!Adjective}

# rebel
The rebel army surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
A rebel surrendered. {Det,Noun|!Adjective,Past}

# relative
I noticed the relative importance. {Pronoun,Past,Det,Adj|!Verb,Noun}
A relative visited us. {Det,Noun|!Adjective,Past,Pronoun}

# rental
They described the rental agreement. {Pronoun,Past,Det,Adj|!Verb,Noun}
The rental needs repairs. {Det,Noun|!Adjective,Pres,Plural}

# representative
We discussed her representative sample. {Pronoun,Past,Poss,Adj|!Verb,Noun}
Our representative spoke first. {Poss,Actor,Past,Adv}

# republican
The republican government surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
A republican opposed the monarchy. {Det,Noun|!Adjective,Past,Det,Noun}

# resident
I noticed the resident expert. {Pronoun,Past,Det,Adj|!Verb,Noun}
A resident complained. {Det,Noun|!Adjective,Past}

# routine
They described the routine inspection. {Pronoun,Past,Det,Adj|!Verb,Noun}
The routine became tedious. {Det,Noun|!Adjective,Past,Adj}

# rubbish
We discussed her rubbish idea. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They collected the rubbish. {Pronoun,Past,Det,Noun|!Adjective}

# sage
The sage advice surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The sage offered wisdom. {Det,Noun|!Adjective,Past,Noun}
She added sage to the soup. {Pronoun,Past,Noun|!Adjective,Prep,Det,Noun}

# secret
I noticed the secret passage. {Pronoun,Past,Det,Adj|!Verb,Noun}
She kept the secret. {Pronoun,Past,Det,Noun|!Adjective}

# senior
They described the senior partner. {Pronoun,Past,Det,Adj|!Verb,Noun}
The senior graduated. {Det,Noun|!Adjective,Past}

# serial
We discussed her serial number. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The serial ended abruptly. {Det,Noun|!Adjective,Past,Adv}

# silver
The silver bracelet surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The silver tarnished. {Det,Noun|!Adjective,Past}

# slack
I noticed the slack rope. {Pronoun,Past,Det,Adj|!Verb,Noun}
We tightened the slack. {Pronoun,Past,Det,Noun|!Adjective}

# socialist
They described the socialist policy. {Pronoun,Past,Det,Adj|!Verb,Noun}
A socialist addressed the meeting. {Det,Noun|!Adjective,Past,Det,Noun}

# sole
We discussed her sole survivor. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The sole came loose. {Det,Noun|!Adjective,Past,Adj}
They served sole with rice. {Pronoun,Past,Noun|!Adjective,Prep,Noun}

# solvent
The solvent company surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The solvent dissolved the paint. {Det,Noun|!Adjective,Past,Det,Noun}

# sovereign
I noticed the sovereign state. {Pronoun,Past,Det,Adj|!Verb,Noun}
The sovereign addressed her subjects. {Det,Noun|!Adjective,Past,Poss,Plural}

# squat
They described the squat building. {Pronoun,Past,Det,Adj|!Verb,Noun}
He performed a squat. {Pronoun,Past,Det,Noun|!Adjective}

# stable
We discussed her stable condition. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The stable housed horses. {Det,Noun|!Adjective,Past,Plural}

# standard
The standard procedure surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
They raised the standard. {Pronoun,Past,Det,Noun|!Adjective}

# subordinate
I noticed the subordinate clause. {Pronoun,Past,Det,Adj|!Verb,Noun}
Her subordinate resigned. {Poss,Noun|!Adjective,Past}

# superior
They described the superior quality. {Pronoun,Past,Det,Adj|!Verb,Noun}
I consulted my superior. {Pronoun,Past,Poss,Noun|!Adjective}

# swell
We discussed her swell party. {Pronoun,Past,Poss,Adj|!Verb,Noun}
The swell rocked the boat. {Det,Noun|!Adjective,Past,Det,Noun}

# taboo
The taboo subject surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
They broke a taboo. {Pronoun,Past,Det,Noun|!Adjective}

# tan
I noticed the tan coat. {Pronoun,Past,Det,Adj|!Verb,Noun}
Her tan faded. {Poss,Noun|!Adjective,Past}

# teen
They described the teen audience. {Pronoun,Past,Det,Adj|!Verb,Noun}
The teen waved. {Det,Noun|!Adjective,Past}

# terminal
We discussed her terminal illness. {Pronoun,Past,Poss,Adj|!Verb,Noun}
We entered the terminal. {Pronoun,Past,Det,Noun|!Adjective}
The terminal displayed a prompt. {Det,Noun|!Adjective,Past,Det,Noun}

# terrorist
The terrorist attack surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
The terrorist surrendered. {Det,Noun|!Adjective,Past}

# token
I noticed the token gesture. {Pronoun,Past,Det,Adj|!Verb,Noun}
She inserted a token. {Pronoun,Past,Det,Noun|!Adjective}

# trial
They described the trial period. {Pronoun,Past,Det,Adj|!Verb,Noun}
The trial lasted weeks. {Det,Noun|!Adjective,Past,Plural}

# undergraduate
We discussed her undergraduate course. {Pronoun,Past,Poss,Adj|!Verb,Noun}
An undergraduate asked a question. {Det,Noun|!Adjective,Past,Det,Noun}

# underground
The underground tunnel surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
We took the underground. {Pronoun,Past,Det,Noun|!Adjective}

# upstairs
I noticed the upstairs bedroom. {Pronoun,Past,Det,Adj|!Verb,Noun}
The upstairs needs paint. {Det,Noun|!Adjective,Pres,Noun}

# vagabond
They described the vagabond life. {Pronoun,Past,Det,Adj|!Verb,Noun}
The vagabond slept outside. {Det,Noun|!Adjective,Past,Adv}

# vanilla
We discussed her vanilla flavor. {Pronoun,Past,Poss,Adj|!Verb,Noun}
Add the vanilla. {Imperative,Det,Noun|!Adjective}

# variable
The variable rate surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She isolated the variable. {Pronoun,Past,Det,Noun|!Adjective}

# variant
I noticed the variant reading. {Pronoun,Past,Det,Adj|!Verb,Noun}
They identified a variant. {Pronoun,Past,Det,Noun|!Adjective}

# visionary
They described the visionary plan. {Pronoun,Past,Det,Adj|!Verb,Noun}
A visionary founded the company. {Det,Noun|!Adjective,Past,Det,Noun}

# watershed
We discussed her watershed moment. {Pronoun,Past,Poss,Adj|!Verb,Noun}
They mapped the watershed. {Pronoun,Past,Det,Noun|!Adjective}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
