import test from 'tape'
import assertSpec from '../../lib/spec.js'
import assertNoOverlap from './_lib.js'
const here = '[hmm/switches/adj-noun] '

const spec = `
# Independently authored whole-sentence expectations.

# academic
The academic debate surprised us. {Det,Adj,Noun,Past,Pronoun}
The academic published a paper. {Det,Actor,Past,Det,Noun}

# adolescent
I noticed the adolescent behavior. {Pronoun,Past,Det,Adj,Noun}
The adolescent needed advice. {Det,Noun,Past,Noun}

# adult
They described the adult education. {Pronoun,Past,Det,Adj,Noun}
An adult opened the door. {Det,Noun,Past,Det,Noun}

# alternative
We discussed her alternative route. {Pronoun,Past,Poss,Adj,Noun}
We need an alternative. {Pronoun,Inf,Det,Noun}

# antarctic
The antarctic wildlife surprised us. {Det,Adj,Noun,Past,Pronoun}
They explored the Antarctic. {Pronoun,Past,Det,Place}

# arab
I noticed the arab poetry. {Pronoun,Past,Det,Adj,Noun}
The Arab spoke softly. {Det,Noun,Past,Adv}

# arctic
They described the arctic climate. {Pronoun,Past,Det,Adj,Noun}
She visited the Arctic. {Pronoun,Past,Det,Place}

# best
We discussed her best friend. {Pronoun,Past,Poss,Adj,Noun}
She did her best. {Pronoun,Past,Poss,Noun}

# blank
The blank page surprised us. {Det,Adj,Noun,Past,Pronoun}
He filled the blank. {Pronoun,Past,Det,Noun}

# bottom
I noticed the bottom shelf. {Pronoun,Past,Det,Adj,Noun}
The bottom was wet. {Det,Noun,Copula,Adj}

# bourgeois
They described the bourgeois taste. {Pronoun,Past,Det,Adj,Noun}
The bourgeois owned a factory. {Det,Noun,Past,Det,Noun}

# brief
We discussed her brief visit. {Pronoun,Past,Poss,Adj,Noun}
She read the brief. {Pronoun,Past,Det,Noun}

# brute
The brute force surprised us. {Det,Adj,Noun,Past,Pronoun}
The brute broke the door. {Det,Noun,Past,Det,Noun}

# chief
I noticed the chief concern. {Pronoun,Past,Det,Adj,Noun}
The chief greeted us. {Det,Actor,Past,Pronoun}

# classic
They described the classic design. {Pronoun,Past,Det,Adj,Noun}
That novel became a classic. {Det,Noun,Past,Det,Noun}

# comic
We discussed her comic timing. {Pronoun,Past,Poss,Adj,Noun}
The comic entertained us. {Det,Actor,Past,Pronoun}

# commercial
The commercial success surprised us. {Det,Adj,Noun,Past,Pronoun}
We watched the commercial. {Pronoun,Past,Det,Noun}

# communist
I noticed the communist ideology. {Pronoun,Past,Det,Adj,Noun}
A communist joined the debate. {Det,Noun,Past,Det,Noun}

# companion
They described the companion volume. {Pronoun,Past,Det,Adj,Noun}
Her companion waited outside. {Poss,Noun,Past,Adv}

# complex
We discussed her complex problem. {Pronoun,Past,Poss,Adj,Noun}
The complex contains offices. {Det,Noun,Pres,Plural}

# concrete
The concrete evidence surprised us. {Det,Adj,Noun,Past,Pronoun}
The concrete cracked. {Det,Noun,Past}

# constituent
I noticed the constituent part. {Pronoun,Past,Det,Adj,Noun}
A constituent wrote to her. {Det,Noun,Past,Prep,Pronoun}

# contemporary
They described the contemporary art. {Pronoun,Past,Det,Adj,Noun}
He was a contemporary of mine. {Pronoun,Copula,Det,Noun,Prep,Pronoun}

# convertible
We discussed her convertible roof. {Pronoun,Past,Poss,Adj,Noun}
She drove a convertible. {Pronoun,Past,Det,Noun}

# cooperative
The cooperative attitude surprised us. {Det,Adj,Noun,Past,Pronoun}
The cooperative sells milk. {Det,Noun,Pres,Noun}

# crude
I noticed the crude drawing. {Pronoun,Past,Det,Adj,Noun}
The crude spilled into the sea. {Det,Noun,Past,Prep,Det,Noun}

# cunning
They described the cunning plan. {Pronoun,Past,Det,Adj,Noun}
His cunning saved him. {Poss,Noun,Past,Pronoun}

# dark
We discussed her dark room. {Pronoun,Past,Poss,Adj,Noun}
We waited in the dark. {Pronoun,Past,Prep,Det,Noun}

# darling
The darling child surprised us. {Det,Adj,Noun,Past,Pronoun}
Her darling smiled. {Poss,Noun,Past}

# demographic
I noticed the demographic change. {Pronoun,Past,Det,Adj,Noun}
That demographic buys more books. {Det,Noun,Pres,Det,Plural}

# derivative
They described the derivative style. {Pronoun,Past,Det,Adj,Noun}
She calculated the derivative. {Pronoun,Past,Det,Noun}

# elder
We discussed her elder brother. {Pronoun,Past,Poss,Adj,Noun}
The elder offered advice. {Det,Noun,Past,Noun}

# elite
The elite athlete surprised us. {Det,Adj,Noun,Past,Pronoun}
The elite controlled the council. {Det,Noun,Past,Det,Noun}

# epic
I noticed the epic journey. {Pronoun,Past,Det,Adj,Noun}
She translated an epic. {Pronoun,Past,Det,Noun}

# excess
They described the excess baggage. {Pronoun,Past,Det,Adj,Noun}
We removed the excess. {Pronoun,Past,Det,Noun}

# executive
We discussed her executive decision. {Pronoun,Past,Poss,Adj,Noun}
The executive resigned. {Det,Actor,Past}

# expert
The expert advice surprised us. {Det,Adj,Noun,Past,Pronoun}
An expert examined it. {Det,Actor,Past,Pronoun}

# fair
I noticed the fair decision. {Pronoun,Past,Det,Adj,Noun}
We visited the fair. {Pronoun,Past,Det,Noun}
Her fair hair shone. {Poss,Adj,Noun,Past}

# fat
They described the fat cat. {Pronoun,Past,Det,Adj,Noun}
The fat melted. {Det,Noun,Past}

# favorite
We discussed her favorite song. {Pronoun,Past,Poss,Adj,Noun}
This remains my favorite. {Pronoun,Pres,Poss,Noun}

# favourite
The favourite song surprised us. {Det,Adj,Noun,Past,Pronoun}
She chose her favourite. {Pronoun,Past,Poss,Noun}

# fellow
I noticed the fellow traveler. {Pronoun,Past,Det,Adj,Noun}
That fellow knows me. {Det,Noun,Pres,Pronoun}

# female
They described the female voice. {Pronoun,Past,Det,Adj,Noun}
The female laid eggs. {Det,Noun,Past,Plural}

# feminist
We discussed her feminist critique. {Pronoun,Past,Poss,Adj,Noun}
The feminist addressed the crowd. {Det,Noun,Past,Det,Noun}

# fluid
The fluid motion surprised us. {Det,Adj,Noun,Past,Pronoun}
The fluid leaked. {Det,Noun,Past}

# fugitive
I noticed the fugitive slave. {Pronoun,Past,Det,Adj,Noun}
The fugitive escaped. {Det,Noun,Past}

# future
They described the future project. {Pronoun,Past,Det,Adj,Noun}
The future looks bright. {Det,Noun,Pres,Adj}

# general
We discussed her general advice. {Pronoun,Past,Poss,Adj,Noun}
The general saluted. {Det,Actor,Past}

# genius
The genius idea surprised us. {Det,Adj,Noun,Past,Pronoun}
He is a genius. {Pronoun,Copula,Det,Noun}

# gold
I noticed the gold ring. {Pronoun,Past,Det,Adj,Noun}
They discovered gold. {Pronoun,Past,Noun}

# graphic
They described the graphic description. {Pronoun,Past,Det,Adj,Noun}
She designed the graphic. {Pronoun,Past,Det,Noun}

# grave
We discussed her grave mistake. {Pronoun,Past,Poss,Adj,Noun}
They dug a grave. {Pronoun,Past,Det,Noun}
His expression was grave. {Poss,Noun,Copula,Adj}

# half
The half portion surprised us. {Det,Adj,Noun,Past,Pronoun}
I ate half. {Pronoun,Past,Noun}

# hobby
I noticed the hobby farm. {Pronoun,Past,Det,Adj,Noun}
Gardening is her hobby. {Noun,Copula,Poss,Noun}

# homeless
They described the homeless family. {Pronoun,Past,Det,Adj,Noun}
They sheltered the homeless. {Pronoun,Past,Det,Noun}

# humdrum
We discussed her humdrum existence. {Pronoun,Past,Poss,Adj,Noun}
She escaped the humdrum of routine. {Pronoun,Past,Det,Noun,Prep,Noun}

# ideal
The ideal candidate surprised us. {Det,Adj,Noun,Past,Pronoun}
Freedom remains an ideal. {Noun,Pres,Det,Noun}

# impressionist
I noticed the impressionist painting. {Pronoun,Past,Det,Adj,Noun}
The impressionist painted outdoors. {Det,Actor,Past,Adv}

# incumbent
They described the incumbent president. {Pronoun,Past,Det,Adj,Noun}
The incumbent won again. {Det,Noun,Past,Adv}

# individual
We discussed her individual choice. {Pronoun,Past,Poss,Adj,Noun}
An individual approached us. {Det,Noun,Past,Pronoun}

# innocent
The innocent question surprised us. {Det,Adj,Noun,Past,Pronoun}
They protected an innocent. {Pronoun,Past,Det,Noun}

# instant
I noticed the instant reply. {Pronoun,Past,Det,Adj,Noun}
The instant passed quickly. {Det,Noun,Past,Adv}

# interim
They described the interim report. {Pronoun,Past,Det,Adj,Noun}
She managed the office in the interim. {Pronoun,Past,Det,Noun,Prep,Det,Noun}

# justice
# Justice system has an attributive noun; no ordinary adjective sense supplied.
The justice system needs reform. {Det,Noun,Noun,Pres,Noun}
They demanded justice. {Pronoun,Past,Noun}

# juvenile
The juvenile behavior surprised us. {Det,Adj,Noun,Past,Pronoun}
The juvenile appeared in court. {Det,Noun,Past,Prep,Noun}

# latter
I noticed the latter option. {Pronoun,Past,Det,Adj,Noun}
I prefer the latter. {Pronoun,Inf,Det,Noun}

# liberal
They described the liberal policy. {Pronoun,Past,Det,Adj,Noun}
The liberal opposed the ban. {Det,Noun,Past,Det,Noun}

# light
We discussed her light suitcase. {Pronoun,Past,Poss,Adj,Noun}
The light flickered. {Det,Noun,Past}
The light breeze cooled us. {Det,Adj,Noun,Past,Pronoun}

# liquid
The liquid soap surprised us. {Det,Adj,Noun,Past,Pronoun}
The liquid evaporated. {Det,Noun,Past}

# lush
I noticed the lush garden. {Pronoun,Past,Det,Adj,Noun}
The lush ordered another drink. {Det,Noun,Past,Det,Noun}

# male
They described the male voice. {Pronoun,Past,Det,Adj,Noun}
The male guarded the nest. {Det,Noun,Past,Det,Noun}

# marine
We discussed her marine life. {Pronoun,Past,Poss,Adj,Noun}
A marine saluted. {Det,Actor,Past}

# median
The median income surprised us. {Det,Adj,Noun,Past,Pronoun}
We calculated the median. {Pronoun,Past,Det,Noun}

# medium
I noticed the medium size. {Pronoun,Past,Det,Adj,Noun}
Clay is her favorite medium. {Noun,Copula,Poss,Adj,Noun}
The medium claimed contact with spirits. {Det,Noun,Past,Noun,Prep,Plural}

# metric
They described the metric system. {Pronoun,Past,Det,Adj,Noun}
This metric measures performance. {Det,Noun,Pres,Noun}

# miniature
We discussed her miniature train. {Pronoun,Past,Poss,Adj,Noun}
She painted a miniature. {Pronoun,Past,Det,Noun}

# mobile
The mobile clinic surprised us. {Det,Adj,Noun,Past,Pronoun}
The mobile hung above the crib. {Det,Noun,Past,Prep,Det,Noun}

# modernist
I noticed the modernist architecture. {Pronoun,Past,Det,Adj,Noun}
The modernist rejected tradition. {Det,Noun,Past,Noun}

# moral
They described the moral duty. {Pronoun,Past,Det,Adj,Noun}
The story has a moral. {Det,Noun,Pres,Det,Noun}

# mortal
We discussed her mortal danger. {Pronoun,Past,Poss,Adj,Noun}
He is merely a mortal. {Pronoun,Copula,Adv,Det,Noun}

# nagging
The nagging doubt surprised us. {Det,Adj,Noun,Past,Pronoun}
The nagging continued all evening. {Det,Noun,Past,Det,Noun}

# novel
I noticed the novel approach. {Pronoun,Past,Det,Adj,Noun}
She finished the novel. {Pronoun,Past,Det,Noun}

# nuts
That idea is nuts. {Det,Noun,Copula,Adj}
The nuts fell from the tree. {Det,Plural,Past,Prep,Det,Noun}

# offensive
We discussed her offensive remark. {Pronoun,Past,Poss,Adj,Noun}
The offensive began at dawn. {Det,Noun,Past,Prep,Noun}

# official
The official statement surprised us. {Det,Adj,Noun,Past,Pronoun}
An official checked the documents. {Det,Actor,Past,Det,Plural}

# opposite
I noticed the opposite direction. {Pronoun,Past,Det,Adj,Noun}
She said the opposite. {Pronoun,Past,Det,Noun}

# oval
They described the oval mirror. {Pronoun,Past,Det,Adj,Noun}
Draw an oval. {Imperative,Det,Noun}

# past
We discussed her past experience. {Pronoun,Past,Poss,Adj,Noun}
The past can never return. {Det,Noun,Modal,Adv,Inf}

# patient
The patient teacher surprised us. {Det,Adj,Noun,Past,Pronoun}
The patient recovered. {Det,Noun,Past}
She remained patient during the delay. {Pronoun,Past,Adj,Prep,Det,Noun}

# periodical
I noticed the periodical inspection. {Pronoun,Past,Det,Adj,Noun}
She reads a scientific periodical. {Pronoun,Pres,Det,Adj,Noun}

# plastic
They described the plastic container. {Pronoun,Past,Det,Adj,Noun}
The plastic melted. {Det,Noun,Past}

# potential
We discussed her potential danger. {Pronoun,Past,Poss,Adj,Noun}
Her potential impressed us. {Poss,Noun,Past,Pronoun}

# premier
The premier venue surprised us. {Det,Adj,Noun,Past,Pronoun}
The premier resigned. {Det,Actor,Past}

# premium
I noticed the premium service. {Pronoun,Past,Det,Adj,Noun}
She paid a premium. {Pronoun,Past,Det,Noun}

# principal
They described the principal reason. {Pronoun,Past,Det,Adj,Noun}
The principal welcomed us. {Det,Actor,Past,Pronoun}

# pro
We discussed her pro athlete. {Pronoun,Past,Poss,Adj,Noun}
A pro repaired it. {Det,Noun,Past,Pronoun}

# professional
The professional advice surprised us. {Det,Adj,Noun,Past,Pronoun}
We hired a professional. {Pronoun,Past,Det,Noun}

# racist
I noticed the racist remark. {Pronoun,Past,Det,Adj,Noun}
The racist shouted insults. {Det,Noun,Past,Plural}

# rash
They described the rash decision. {Pronoun,Past,Det,Adj,Noun}
The rash spread. {Det,Noun,Past}

# rear
We discussed her rear entrance. {Pronoun,Past,Poss,Adj,Noun}
They waited at the rear. {Pronoun,Past,Prep,Det,Noun}

# rebel
The rebel army surprised us. {Det,Adj,Noun,Past,Pronoun}
A rebel surrendered. {Det,Noun,Past}

# relative
I noticed the relative importance. {Pronoun,Past,Det,Adj,Noun}
A relative visited us. {Det,Noun,Past,Pronoun}

# rental
They described the rental agreement. {Pronoun,Past,Det,Adj,Noun}
The rental needs repairs. {Det,Noun,Pres,Plural}

# representative
We discussed her representative sample. {Pronoun,Past,Poss,Adj,Noun}
Our representative spoke first. {Poss,Actor,Past,Adv}

# republican
The republican government surprised us. {Det,Adj,Noun,Past,Pronoun}
A republican opposed the monarchy. {Det,Noun,Past,Det,Noun}

# resident
I noticed the resident expert. {Pronoun,Past,Det,Adj,Noun}
A resident complained. {Det,Noun,Past}

# routine
They described the routine inspection. {Pronoun,Past,Det,Adj,Noun}
The routine became tedious. {Det,Noun,Past,Adj}

# rubbish
We discussed her rubbish idea. {Pronoun,Past,Poss,Adj,Noun}
They collected the rubbish. {Pronoun,Past,Det,Noun}

# sage
The sage advice surprised us. {Det,Adj,Noun,Past,Pronoun}
The sage offered wisdom. {Det,Noun,Past,Noun}
She added sage to the soup. {Pronoun,Past,Noun,Prep,Det,Noun}

# secret
I noticed the secret passage. {Pronoun,Past,Det,Adj,Noun}
She kept the secret. {Pronoun,Past,Det,Noun}

# senior
They described the senior partner. {Pronoun,Past,Det,Adj,Noun}
The senior graduated. {Det,Noun,Past}

# serial
We discussed her serial number. {Pronoun,Past,Poss,Adj,Noun}
The serial ended abruptly. {Det,Noun,Past,Adv}

# silver
The silver bracelet surprised us. {Det,Adj,Noun,Past,Pronoun}
The silver tarnished. {Det,Noun,Past}

# slack
I noticed the slack rope. {Pronoun,Past,Det,Adj,Noun}
We tightened the slack. {Pronoun,Past,Det,Noun}

# socialist
They described the socialist policy. {Pronoun,Past,Det,Adj,Noun}
A socialist addressed the meeting. {Det,Noun,Past,Det,Noun}

# sole
We discussed her sole survivor. {Pronoun,Past,Poss,Adj,Noun}
The sole came loose. {Det,Noun,Past,Adj}
They served sole with rice. {Pronoun,Past,Noun,Prep,Noun}

# solvent
The solvent company surprised us. {Det,Adj,Noun,Past,Pronoun}
The solvent dissolved the paint. {Det,Noun,Past,Det,Noun}

# sovereign
I noticed the sovereign state. {Pronoun,Past,Det,Adj,Noun}
The sovereign addressed her subjects. {Det,Noun,Past,Poss,Plural}

# squat
They described the squat building. {Pronoun,Past,Det,Adj,Noun}
He performed a squat. {Pronoun,Past,Det,Noun}

# stable
We discussed her stable condition. {Pronoun,Past,Poss,Adj,Noun}
The stable housed horses. {Det,Noun,Past,Plural}

# standard
The standard procedure surprised us. {Det,Adj,Noun,Past,Pronoun}
They raised the standard. {Pronoun,Past,Det,Noun}

# subordinate
I noticed the subordinate clause. {Pronoun,Past,Det,Adj,Noun}
Her subordinate resigned. {Poss,Noun,Past}

# superior
They described the superior quality. {Pronoun,Past,Det,Adj,Noun}
I consulted my superior. {Pronoun,Past,Poss,Noun}

# swell
We discussed her swell party. {Pronoun,Past,Poss,Adj,Noun}
The swell rocked the boat. {Det,Noun,Past,Det,Noun}

# taboo
The taboo subject surprised us. {Det,Adj,Noun,Past,Pronoun}
They broke a taboo. {Pronoun,Past,Det,Noun}

# tan
I noticed the tan coat. {Pronoun,Past,Det,Adj,Noun}
Her tan faded. {Poss,Noun,Past}

# teen
They described the teen audience. {Pronoun,Past,Det,Adj,Noun}
The teen waved. {Det,Noun,Past}

# terminal
We discussed her terminal illness. {Pronoun,Past,Poss,Adj,Noun}
We entered the terminal. {Pronoun,Past,Det,Noun}
The terminal displayed a prompt. {Det,Noun,Past,Det,Noun}

# terrorist
The terrorist attack surprised us. {Det,Adj,Noun,Past,Pronoun}
The terrorist surrendered. {Det,Noun,Past}

# token
I noticed the token gesture. {Pronoun,Past,Det,Adj,Noun}
She inserted a token. {Pronoun,Past,Det,Noun}

# trial
They described the trial period. {Pronoun,Past,Det,Adj,Noun}
The trial lasted weeks. {Det,Noun,Past,Plural}

# undergraduate
We discussed her undergraduate course. {Pronoun,Past,Poss,Adj,Noun}
An undergraduate asked a question. {Det,Noun,Past,Det,Noun}

# underground
The underground tunnel surprised us. {Det,Adj,Noun,Past,Pronoun}
We took the underground. {Pronoun,Past,Det,Noun}

# upstairs
I noticed the upstairs bedroom. {Pronoun,Past,Det,Adj,Noun}
The upstairs needs paint. {Det,Noun,Pres,Noun}

# vagabond
They described the vagabond life. {Pronoun,Past,Det,Adj,Noun}
The vagabond slept outside. {Det,Noun,Past,Adv}

# vanilla
We discussed her vanilla flavor. {Pronoun,Past,Poss,Adj,Noun}
Add the vanilla. {Imperative,Det,Noun}

# variable
The variable rate surprised us. {Det,Adj,Noun,Past,Pronoun}
She isolated the variable. {Pronoun,Past,Det,Noun}

# variant
I noticed the variant reading. {Pronoun,Past,Det,Adj,Noun}
They identified a variant. {Pronoun,Past,Det,Noun}

# visionary
They described the visionary plan. {Pronoun,Past,Det,Adj,Noun}
A visionary founded the company. {Det,Noun,Past,Det,Noun}

# watershed
We discussed her watershed moment. {Pronoun,Past,Poss,Adj,Noun}
They mapped the watershed. {Pronoun,Past,Det,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  assertNoOverlap(t, spec, here, ['(#Adjective && #Noun)'])
  t.end()
})
