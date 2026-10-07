import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[hmm/switches/adj-past] '

const spec = `
# Independently authored whole-sentence expectations; not checked against the tagger.

# woke
The woke activist surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She woke before sunrise. {Pronoun,Past,Prep,Noun}

# abandoned
I noticed the abandoned house. {Pronoun,Past,Det,Adj|!Verb,Noun}
She abandoned the project. {Pronoun,Past,Det,Noun}

# absorbed
They described the absorbed reader. {Pronoun,Past,Det,Adj|!Verb,Noun}
She absorbed the information. {Pronoun,Past,Det,Noun}

# accepted
We discussed her accepted practice. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She accepted the invitation. {Pronoun,Past,Det,Noun}

# acknowledged
The acknowledged expert surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She acknowledged the mistake. {Pronoun,Past,Det,Noun}

# adjusted
I noticed the adjusted estimate. {Pronoun,Past,Det,Adj|!Verb,Noun}
She adjusted the mirror. {Pronoun,Past,Det,Noun}

# adopted
They described the adopted child. {Pronoun,Past,Det,Adj|!Verb,Noun}
She adopted a puppy. {Pronoun,Past,Det,Noun}

# advanced
We discussed her advanced course. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She advanced toward the gate. {Pronoun,Past,Prep,Det,Noun}

# affected
The affected manner surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She affected the outcome. {Pronoun,Past,Det,Noun}

# aged
I noticed the aged cheese. {Pronoun,Past,Det,Adj|!Verb,Noun}
She aged the wine. {Pronoun,Past,Det,Noun}

# alarmed
They described the alarmed neighbor. {Pronoun,Past,Det,Adj|!Verb,Noun}
She alarmed the visitors. {Pronoun,Past,Det,Plural}

# alleged
We discussed her alleged thief. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She alleged a conspiracy. {Pronoun,Past,Det,Noun}

# altered
The altered state surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She altered the schedule. {Pronoun,Past,Det,Noun}

# amazed
I noticed the amazed spectator. {Pronoun,Past,Det,Adj|!Verb,Noun}
She amazed the audience. {Pronoun,Past,Det,Noun}

# animated
They described the animated film. {Pronoun,Past,Det,Adj|!Verb,Noun}
She animated the character. {Pronoun,Past,Det,Noun}

# anticipated
We discussed her anticipated arrival. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She anticipated the question. {Pronoun,Past,Det,Noun}

# applied
The applied science surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She applied the paint. {Pronoun,Past,Det,Noun}

# appreciated
I noticed the appreciated gesture. {Pronoun,Past,Det,Adj|!Verb,Noun}
She appreciated the advice. {Pronoun,Past,Det,Noun}

# armed
They described the armed guard. {Pronoun,Past,Det,Adj|!Verb,Noun}
She armed the soldiers. {Pronoun,Past,Det,Plural}

# associated
We discussed her associated risk. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She associated the smell with summer. {Pronoun,Past,Det,Noun,Prep,Noun}

# assumed
The assumed name surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She assumed the responsibility. {Pronoun,Past,Det,Noun}

# assured
I noticed the assured manner. {Pronoun,Past,Det,Adj|!Verb,Noun}
She assured us of success. {Pronoun,Past,Pronoun,Prep,Noun}

# augmented
They described the augmented reality. {Pronoun,Past,Det,Adj|!Verb,Noun}
She augmented the collection. {Pronoun,Past,Det,Noun}

# authorized
We discussed her authorized representative. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She authorized the payment. {Pronoun,Past,Det,Noun}

# awarded
The awarded prize surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She awarded the contract. {Pronoun,Past,Det,Noun}

# baffled
I noticed the baffled scientist. {Pronoun,Past,Det,Adj|!Verb,Noun}
She baffled the experts. {Pronoun,Past,Det,Plural}

# baked
They described the baked potato. {Pronoun,Past,Det,Adj|!Verb,Noun}
She baked a cake. {Pronoun,Past,Det,Noun}

# balanced
We discussed her balanced diet. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She balanced the tray. {Pronoun,Past,Det,Noun}

# based
The based opinion surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She based the argument on evidence. {Pronoun,Past,Det,Noun,Prep,Noun}

# battered
I noticed the battered suitcase. {Pronoun,Past,Det,Adj|!Verb,Noun}
She battered the door. {Pronoun,Past,Det,Noun}

# bewildered
They described the bewildered tourist. {Pronoun,Past,Det,Adj|!Verb,Noun}
She bewildered the students. {Pronoun,Past,Det,Plural}

# biased
We discussed her biased report. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She biased the sample. {Pronoun,Past,Det,Noun}

# blessed
The blessed relief surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She blessed the congregation. {Pronoun,Past,Det,Noun}

# blinded
I noticed the blinded soldier. {Pronoun,Past,Det,Adj|!Verb,Noun}
She blinded the attacker. {Pronoun,Past,Det,Noun}

# boiled
They described the boiled egg. {Pronoun,Past,Det,Adj|!Verb,Noun}
She boiled the water. {Pronoun,Past,Det,Noun}

# bored
We discussed her bored child. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She bored the audience. {Pronoun,Past,Det,Noun}

# bottled
The bottled water surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She bottled the juice. {Pronoun,Past,Det,Noun}

# bound
I noticed the bound volume. {Pronoun,Past,Det,Adj|!Verb,Noun}
She bound the pages. {Pronoun,Past,Det,Plural}
The rabbits bound across the meadow. {Det,Noun,Inf,Prep,Det,Noun}

# broken
The broken window surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She has broken the vase. {Pronoun,Aux,Verb|!Adjective,Det,Noun}

# bruised
They described the bruised apple. {Pronoun,Past,Det,Adj|!Verb,Noun}
She bruised her knee. {Pronoun,Past,Poss,Noun}

# burned
We discussed her burned toast. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She burned the letter. {Pronoun,Past,Det,Noun}

# burnt
The burnt toast surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She burnt the evidence. {Pronoun,Past,Det,Noun}

# caged
I noticed the caged bird. {Pronoun,Past,Det,Adj|!Verb,Noun}
She caged the animal. {Pronoun,Past,Det,Noun}

# calculated
They described the calculated risk. {Pronoun,Past,Det,Adj|!Verb,Noun}
She calculated the total. {Pronoun,Past,Det,Noun}

# celebrated
We discussed her celebrated artist. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She celebrated the victory. {Pronoun,Past,Det,Noun}

# centralized
The centralized system surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She centralized the records. {Pronoun,Past,Det,Plural}

# certified
I noticed the certified copy. {Pronoun,Past,Det,Adj|!Verb,Noun}
She certified the results. {Pronoun,Past,Det,Plural}

# charged
They described the charged atmosphere. {Pronoun,Past,Det,Adj|!Verb,Noun}
She charged the battery. {Pronoun,Past,Det,Noun}

# charmed
We discussed her charmed life. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She charmed the guests. {Pronoun,Past,Det,Plural}

# chilled
The chilled soup surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She chilled the wine. {Pronoun,Past,Det,Noun}

# classified
I noticed the classified document. {Pronoun,Past,Det,Adj|!Verb,Noun}
She classified the specimens. {Pronoun,Past,Det,Plural}

# closed
They described the closed door. {Pronoun,Past,Det,Adj|!Verb,Noun}
She closed the shop. {Pronoun,Past,Det,Noun}

# cluttered
We discussed her cluttered desk. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She cluttered the room with furniture. {Pronoun,Past,Det,Noun,Prep,Noun}

# coded
The coded message surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She coded the application. {Pronoun,Past,Det,Noun}

# colored
I noticed the colored paper. {Pronoun,Past,Det,Adj|!Verb,Noun}
She colored the drawing. {Pronoun,Past,Det,Noun}

# coloured
They described the coloured glass. {Pronoun,Past,Det,Adj|!Verb,Noun}
She coloured the fabric. {Pronoun,Past,Det,Noun}

# combined
We discussed her combined effort. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She combined the ingredients. {Pronoun,Past,Det,Plural}

# complicated
The complicated puzzle surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She complicated the situation. {Pronoun,Past,Det,Noun}

# concentrated
I noticed the concentrated juice. {Pronoun,Past,Det,Adj|!Verb,Noun}
She concentrated on the problem. {Pronoun,Past,Prep,Det,Noun}

# confused
They described the confused student. {Pronoun,Past,Det,Adj|!Verb,Noun}
She confused the names. {Pronoun,Past,Det,Plural}

# considered
We discussed her considered opinion. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She considered the proposal. {Pronoun,Past,Det,Noun}

# consolidated
The consolidated account surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She consolidated the loans. {Pronoun,Past,Det,Plural}

# controlled
I noticed the controlled experiment. {Pronoun,Past,Det,Adj|!Verb,Noun}
She controlled the temperature. {Pronoun,Past,Det,Noun}

# cooked
They described the cooked rice. {Pronoun,Past,Det,Adj|!Verb,Noun}
She cooked the dinner. {Pronoun,Past,Det,Noun}

# covered
We discussed her covered bridge. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She covered the food. {Pronoun,Past,Det,Noun}

# cracked
The cracked cup surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She cracked the code. {Pronoun,Past,Det,Noun}

# cramped
I noticed the cramped room. {Pronoun,Past,Det,Adj|!Verb,Noun}
She cramped the muscles in her hand. {Pronoun,Past,Det,Noun,Prep,Poss,Noun}

# crowded
They described the crowded train. {Pronoun,Past,Det,Adj|!Verb,Noun}
She crowded the shelf with books. {Pronoun,Past,Det,Noun,Prep,Plural}

# crushed
We discussed her crushed ice. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She crushed the garlic. {Pronoun,Past,Det,Noun}

# cultivated
The cultivated taste surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She cultivated the soil. {Pronoun,Past,Det,Noun}

# cured
I noticed the cured meat. {Pronoun,Past,Det,Adj|!Verb,Noun}
She cured the patient. {Pronoun,Past,Det,Noun}

# customized
They described the customized software. {Pronoun,Past,Det,Adj|!Verb,Noun}
She customized the interface. {Pronoun,Past,Det,Noun}

# damaged
We discussed her damaged parcel. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She damaged the carpet. {Pronoun,Past,Det,Noun}

# dampened
The dampened enthusiasm surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She dampened the cloth. {Pronoun,Past,Det,Noun}

# dated
I noticed the dated furniture. {Pronoun,Past,Det,Adj|!Verb,Noun}
She dated the letter. {Pronoun,Past,Det,Noun}

# dazed
They described the dazed survivor. {Pronoun,Past,Det,Adj|!Verb,Noun}
She dazed the opponent. {Pronoun,Past,Det,Noun}

# dazzled
We discussed her dazzled audience. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She dazzled the judges. {Pronoun,Past,Det,Plural}

# decayed
The decayed tooth surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She decayed the wood with acid. {Pronoun,Past,Det,Noun,Prep,Noun}

# decentralized
I noticed the decentralized network. {Pronoun,Past,Det,Adj|!Verb,Noun}
She decentralized the administration. {Pronoun,Past,Det,Noun}

# decorated
They described the decorated officer. {Pronoun,Past,Det,Adj|!Verb,Noun}
She decorated the room. {Pronoun,Past,Det,Noun}

# dedicated
We discussed her dedicated teacher. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She dedicated the book to her mother. {Pronoun,Past,Det,Noun,Prep,Poss,Noun}

# deferred
The deferred payment surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She deferred the decision. {Pronoun,Past,Det,Noun}

# defined
I noticed the defined boundary. {Pronoun,Past,Det,Adj|!Verb,Noun}
She defined the term. {Pronoun,Past,Det,Noun}

# deformed
They described the deformed limb. {Pronoun,Past,Det,Adj|!Verb,Noun}
She deformed the metal. {Pronoun,Past,Det,Noun}

# delayed
We discussed her delayed reaction. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She delayed the announcement. {Pronoun,Past,Det,Noun}

# delighted
The delighted child surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She delighted the crowd. {Pronoun,Past,Det,Noun}

# depressed
I noticed the depressed patient. {Pronoun,Past,Det,Adj|!Verb,Noun}
She depressed the pedal. {Pronoun,Past,Det,Noun}

# deranged
They described the deranged mind. {Pronoun,Past,Det,Adj|!Verb,Noun}
She deranged the mechanism. {Pronoun,Past,Det,Noun}

# detailed
We discussed her detailed map. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She detailed the procedure. {Pronoun,Past,Det,Noun}

# determined
The determined athlete surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She determined the cause. {Pronoun,Past,Det,Noun}

# developed
I noticed the developed country. {Pronoun,Past,Det,Adj|!Verb,Noun}
She developed the photograph. {Pronoun,Past,Det,Noun}

# devoted
They described the devoted friend. {Pronoun,Past,Det,Adj|!Verb,Noun}
She devoted the afternoon to research. {Pronoun,Past,Det,Noun,Prep,Noun}

# dignified
We discussed her dignified manner. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She dignified the insult with a reply. {Pronoun,Past,Det,Noun,Prep,Det,Noun}

# diminished
The diminished appetite surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She diminished the risk. {Pronoun,Past,Det,Noun}

# directed
I noticed the directed graph. {Pronoun,Past,Det,Adj|!Verb,Noun}
She directed the film. {Pronoun,Past,Det,Noun}

# disabled
They described the disabled vehicle. {Pronoun,Past,Det,Adj|!Verb,Noun}
She disabled the alarm. {Pronoun,Past,Det,Noun}

# disciplined
We discussed her disciplined team. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She disciplined the offender. {Pronoun,Past,Det,Noun}

# discounted
The discounted price surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She discounted the merchandise. {Pronoun,Past,Det,Noun}

# discouraged
I noticed the discouraged worker. {Pronoun,Past,Det,Adj|!Verb,Noun}
She discouraged the attempt. {Pronoun,Past,Det,Noun}

# disgruntled
The disgruntled employee resigned. {Det,Adj|!Verb,Noun,Past}
The delay disgruntled the passengers. {Det,Noun,Past,Det,Plural}

# distorted
They described the distorted image. {Pronoun,Past,Det,Adj|!Verb,Noun}
She distorted the facts. {Pronoun,Past,Det,Plural}

# distressed
We discussed her distressed parent. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She distressed the family. {Pronoun,Past,Det,Noun}

# disturbed
The disturbed sleep surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She disturbed the neighbors. {Pronoun,Past,Det,Plural}

# drained
I noticed the drained swamp. {Pronoun,Past,Det,Adj|!Verb,Noun}
She drained the sink. {Pronoun,Past,Det,Noun}

# dried
They described the dried fruit. {Pronoun,Past,Det,Adj|!Verb,Noun}
She dried the dishes. {Pronoun,Past,Det,Plural}

# edified
We discussed her edified reader. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She edified the audience. {Pronoun,Past,Det,Noun}

# educated
The educated guess surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She educated the children. {Pronoun,Past,Det,Plural}

# elated
I noticed the elated fan. {Pronoun,Past,Det,Adj|!Verb,Noun}
She elated the crowd. {Pronoun,Past,Det,Noun}

# emaciated
They described the emaciated animal. {Pronoun,Past,Det,Adj|!Verb,Noun}
She emaciated the captive through starvation. {Pronoun,Past,Det,Noun,Prep,Noun}

# embarrassed
We discussed her embarrassed guest. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She embarrassed her brother. {Pronoun,Past,Poss,Noun}

# enchanted
The enchanted forest surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She enchanted the audience. {Pronoun,Past,Det,Noun}

# engaged
I noticed the engaged couple. {Pronoun,Past,Det,Adj|!Verb,Noun}
She engaged the gears. {Pronoun,Past,Det,Plural}

# enhanced
They described the enhanced image. {Pronoun,Past,Det,Adj|!Verb,Noun}
She enhanced the photograph. {Pronoun,Past,Det,Noun}

# ensured
We discussed her ensured supply. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She ensured our safety. {Pronoun,Past,Poss,Noun}

# equipped
The equipped kitchen surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She equipped the expedition. {Pronoun,Past,Det,Noun}

# escaped
I noticed the escaped prisoner. {Pronoun,Past,Det,Adj|!Verb,Noun}
She escaped the trap. {Pronoun,Past,Det,Noun}

# established
They described the established practice. {Pronoun,Past,Det,Adj|!Verb,Noun}
She established the company. {Pronoun,Past,Det,Noun}

# exaggerated
We discussed her exaggerated gesture. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She exaggerated the danger. {Pronoun,Past,Det,Noun}

# excited
The excited child surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She excited the crowd. {Pronoun,Past,Det,Noun}

# expanded
I noticed the expanded edition. {Pronoun,Past,Det,Adj|!Verb,Noun}
She expanded the business. {Pronoun,Past,Det,Noun}

# expected
They described the expected arrival. {Pronoun,Past,Det,Adj|!Verb,Noun}
She expected a reply. {Pronoun,Past,Det,Noun}

# experienced
We discussed her experienced teacher. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She experienced the same problem. {Pronoun,Past,Det,Adj,Noun}

# exposed
The exposed beam surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She exposed the fraud. {Pronoun,Past,Det,Noun}

# extended
I noticed the extended family. {Pronoun,Past,Det,Adj|!Verb,Noun}
She extended the deadline. {Pronoun,Past,Det,Noun}

# faded
They described the faded curtain. {Pronoun,Past,Det,Adj|!Verb,Noun}
She faded the photograph deliberately. {Pronoun,Past,Det,Noun,Adv}

# failed
We discussed her failed experiment. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She failed the exam. {Pronoun,Past,Det,Noun}

# fascinated
The fascinated spectator surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She fascinated the children. {Pronoun,Past,Det,Plural}

# feared
I noticed the feared opponent. {Pronoun,Past,Det,Adj|!Verb,Noun}
She feared the consequences. {Pronoun,Past,Det,Plural}

# finished
They described the finished product. {Pronoun,Past,Det,Adj|!Verb,Noun}
She finished the assignment. {Pronoun,Past,Det,Noun}

# fitted
We discussed her fitted sheet. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She fitted the new window. {Pronoun,Past,Det,Adj,Noun}

# fixed
The fixed price surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She fixed the bicycle. {Pronoun,Past,Det,Noun}

# flavored
I noticed the flavored water. {Pronoun,Past,Det,Adj|!Verb,Noun}
She flavored the soup. {Pronoun,Past,Det,Noun}

# flavoured
They described the flavoured yogurt. {Pronoun,Past,Det,Adj|!Verb,Noun}
She flavoured the custard. {Pronoun,Past,Det,Noun}

# flustered
We discussed her flustered waiter. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She flustered the speaker. {Pronoun,Past,Det,Noun}

# focused
The focused student surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She focused the camera. {Pronoun,Past,Det,Noun}

# fractured
I noticed the fractured wrist. {Pronoun,Past,Det,Adj|!Verb,Noun}
She fractured her ankle. {Pronoun,Past,Poss,Noun}

# fragmented
They described the fragmented market. {Pronoun,Past,Det,Adj|!Verb,Noun}
She fragmented the coalition. {Pronoun,Past,Det,Noun}

# framed
We discussed her framed picture. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She framed the photograph. {Pronoun,Past,Det,Noun}

# fried
The fried egg surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She fried the onions. {Pronoun,Past,Det,Plural}

# frozen
The frozen lake surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She has frozen the soup. {Pronoun,Aux,Verb|!Adjective,Det,Noun}

# gifted
I noticed the gifted musician. {Pronoun,Past,Det,Adj|!Verb,Noun}
She gifted the painting to us. {Pronoun,Past,Det,Noun,Prep,Pronoun}

# gratified
They described the gratified teacher. {Pronoun,Past,Det,Adj|!Verb,Noun}
She gratified the audience. {Pronoun,Past,Det,Noun}

# grilled
We discussed her grilled fish. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She grilled the vegetables. {Pronoun,Past,Det,Plural}

# guarded
The guarded reply surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She guarded the entrance. {Pronoun,Past,Det,Noun}

# guided
I noticed the guided tour. {Pronoun,Past,Det,Adj|!Verb,Noun}
She guided the visitors. {Pronoun,Past,Det,Plural}

# hammered
They described the hammered metal. {Pronoun,Past,Det,Adj|!Verb,Noun}
She hammered the nail. {Pronoun,Past,Det,Noun}

# harmed
We discussed her harmed animal. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She harmed the plants. {Pronoun,Past,Det,Plural}

# heated
The heated argument surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She heated the soup. {Pronoun,Past,Det,Noun}

# hooked
I noticed the hooked nose. {Pronoun,Past,Det,Adj|!Verb,Noun}
She hooked the fish. {Pronoun,Past,Det,Noun}

# horrified
They described the horrified spectator. {Pronoun,Past,Det,Adj|!Verb,Noun}
She horrified the guests. {Pronoun,Past,Det,Plural}

# humbled
We discussed her humbled champion. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She humbled the favorite. {Pronoun,Past,Det,Noun}

# illuminated
The illuminated manuscript surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She illuminated the room. {Pronoun,Past,Det,Noun}

# implied
I noticed the implied threat. {Pronoun,Past,Det,Adj|!Verb,Noun}
She implied a connection. {Pronoun,Past,Det,Noun}

# imported
They described the imported cheese. {Pronoun,Past,Det,Adj|!Verb,Noun}
She imported the wine. {Pronoun,Past,Det,Noun}

# improved
We discussed her improved design. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She improved the recipe. {Pronoun,Past,Det,Noun}

# inbred
The inbred strain surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She inbred the cattle. {Pronoun,Past,Det,Noun}

# increased
I noticed the increased demand. {Pronoun,Past,Det,Adj|!Verb,Noun}
She increased the pressure. {Pronoun,Past,Det,Noun}

# indebted
# Ordinary adjective use; no natural modern simple-past example supplied.
We are deeply indebted to her. {Pronoun,Copula,Adv,Adj|!Verb,Prep,Pronoun}

# infected
They described the infected wound. {Pronoun,Past,Det,Adj|!Verb,Noun}
She infected the computer. {Pronoun,Past,Det,Noun}

# inflated
We discussed her inflated price. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She inflated the balloon. {Pronoun,Past,Det,Noun}

# informed
The informed opinion surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She informed the police. {Pronoun,Past,Det,Noun}

# infuriated
I noticed the infuriated customer. {Pronoun,Past,Det,Adj|!Verb,Noun}
She infuriated the manager. {Pronoun,Past,Det,Noun}

# injured
They described the injured bird. {Pronoun,Past,Det,Adj|!Verb,Noun}
She injured her shoulder. {Pronoun,Past,Poss,Noun}

# inspired
We discussed her inspired choice. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She inspired the students. {Pronoun,Past,Det,Plural}

# integrated
The integrated circuit surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She integrated the software. {Pronoun,Past,Det,Noun}

# intended
I noticed the intended recipient. {Pronoun,Past,Det,Adj|!Verb,Noun}
She intended a different outcome. {Pronoun,Past,Det,Adj,Noun}

# intensified
They described the intensified effort. {Pronoun,Past,Det,Adj|!Verb,Noun}
She intensified the campaign. {Pronoun,Past,Det,Noun}

# interested
We discussed her interested buyer. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She interested the children in astronomy. {Pronoun,Past,Det,Noun,Prep,Noun}

# intoxicated
The intoxicated driver surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She intoxicated the crowd with her music. {Pronoun,Past,Det,Noun,Prep,Poss,Noun}

# invited
I noticed the invited guest. {Pronoun,Past,Det,Adj|!Verb,Noun}
She invited the neighbors. {Pronoun,Past,Det,Plural}

# involved
They described the involved explanation. {Pronoun,Past,Det,Adj|!Verb,Noun}
She involved the community. {Pronoun,Past,Det,Noun}

# isolated
We discussed her isolated village. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She isolated the cause. {Pronoun,Past,Det,Noun}

# jagged
The jagged edge surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She jagged the metal with a file. {Pronoun,Past,Det,Noun,Prep,Det,Noun}

# joined
I noticed the joined hand. {Pronoun,Past,Det,Adj|!Verb,Noun}
She joined the club. {Pronoun,Past,Det,Noun}

# judged
They described the judged competition. {Pronoun,Past,Det,Adj|!Verb,Noun}
She judged the contest. {Pronoun,Past,Det,Noun}

# justified
We discussed her justified complaint. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She justified the expense. {Pronoun,Past,Det,Noun}

# knotted
The knotted rope surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She knotted the ribbon. {Pronoun,Past,Det,Noun}

# known
The known risk surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She has known the answer. {Pronoun,Aux,Verb|!Adjective,Det,Noun}

# left
I noticed the left hand. {Pronoun,Past,Det,Adj|!Verb,Noun}
She left the office. {Pronoun,Past,Det,Noun}

# leveled
They described the leveled site. {Pronoun,Past,Det,Adj|!Verb,Noun}
She leveled the ground. {Pronoun,Past,Det,Noun}

# licensed
We discussed her licensed driver. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She licensed the software. {Pronoun,Past,Det,Noun}

# limited
The limited edition surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She limited the damage. {Pronoun,Past,Det,Noun}

# listed
I noticed the listed building. {Pronoun,Past,Det,Adj|!Verb,Noun}
She listed the ingredients. {Pronoun,Past,Det,Plural}

# loaded
They described the loaded question. {Pronoun,Past,Det,Adj|!Verb,Noun}
She loaded the truck. {Pronoun,Past,Det,Noun}

# locked
We discussed her locked door. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She locked the gate. {Pronoun,Past,Det,Noun}

# lost
The lost child surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She lost the key. {Pronoun,Past,Det,Noun}

# loved
I noticed the loved child. {Pronoun,Past,Det,Adj|!Verb,Noun}
She loved the performance. {Pronoun,Past,Det,Noun}

# managed
They described the managed forest. {Pronoun,Past,Det,Adj|!Verb,Noun}
She managed the hotel. {Pronoun,Past,Det,Noun}

# manufactured
We discussed her manufactured product. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She manufactured the parts. {Pronoun,Past,Det,Plural}

# marked
The marked improvement surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She marked the page. {Pronoun,Past,Det,Noun}

# measured
I noticed the measured response. {Pronoun,Past,Det,Adj|!Verb,Noun}
She measured the room. {Pronoun,Past,Det,Noun}

# melted
They described the melted butter. {Pronoun,Past,Det,Adj|!Verb,Noun}
She melted the chocolate. {Pronoun,Past,Det,Noun}

# mixed
We discussed her mixed reaction. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She mixed the paint. {Pronoun,Past,Det,Noun}

# modified
The modified engine surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She modified the design. {Pronoun,Past,Det,Noun}

# motivated
I noticed the motivated student. {Pronoun,Past,Det,Adj|!Verb,Noun}
She motivated the team. {Pronoun,Past,Det,Noun}

# mounted
They described the mounted officer. {Pronoun,Past,Det,Adj|!Verb,Noun}
She mounted the horse. {Pronoun,Past,Det,Noun}

# muted
We discussed her muted color. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She muted the microphone. {Pronoun,Past,Det,Noun}

# mystified
The mystified audience surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She mystified the experts. {Pronoun,Past,Det,Plural}

# nagged
I noticed the nagged husband. {Pronoun,Past,Det,Adj|!Verb,Noun}
She nagged her brother. {Pronoun,Past,Poss,Noun}

# needed
They described the needed rest. {Pronoun,Past,Det,Adj|!Verb,Noun}
She needed a holiday. {Pronoun,Past,Det,Noun}

# neglected
We discussed her neglected garden. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She neglected the paperwork. {Pronoun,Past,Det,Noun}

# noted
The noted scholar surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She noted the difference. {Pronoun,Past,Det,Noun}

# nourished
I noticed the nourished child. {Pronoun,Past,Det,Adj|!Verb,Noun}
She nourished the patient. {Pronoun,Past,Det,Noun}

# observed
They described the observed behavior. {Pronoun,Past,Det,Adj|!Verb,Noun}
She observed the birds. {Pronoun,Past,Det,Plural}

# occupied
We discussed her occupied seat. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She occupied the room. {Pronoun,Past,Det,Noun}

# oppressed
The oppressed minority surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She oppressed the villagers. {Pronoun,Past,Det,Plural}

# organized
I noticed the organized desk. {Pronoun,Past,Det,Adj|!Verb,Noun}
She organized the conference. {Pronoun,Past,Det,Noun}

# overlooked
They described the overlooked detail. {Pronoun,Past,Det,Adj|!Verb,Noun}
She overlooked the error. {Pronoun,Past,Det,Noun}

# overwhelmed
We discussed her overwhelmed nurse. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She overwhelmed the opposition. {Pronoun,Past,Det,Noun}

# packed
The packed lunch surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She packed the suitcase. {Pronoun,Past,Det,Noun}

# painted
I noticed the painted ceiling. {Pronoun,Past,Det,Adj|!Verb,Noun}
She painted the fence. {Pronoun,Past,Det,Noun}

# paralleled
They described the paralleled circuit. {Pronoun,Past,Det,Adj|!Verb,Noun}
She paralleled the earlier experiment. {Pronoun,Past,Det,Adj,Noun}

# parked
We discussed her parked car. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She parked the van. {Pronoun,Past,Det,Noun}

# pasted
The pasted label surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She pasted the notice on the wall. {Pronoun,Past,Det,Noun,Prep,Det,Noun}

# perfected
I noticed the perfected technique. {Pronoun,Past,Det,Adj|!Verb,Noun}
She perfected the recipe. {Pronoun,Past,Det,Noun}

# picked
They described the picked team. {Pronoun,Past,Det,Adj|!Verb,Noun}
She picked the apples. {Pronoun,Past,Det,Plural}

# pierced
We discussed her pierced ear. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She pierced the balloon. {Pronoun,Past,Det,Noun}

# pissed
The pissed customer surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She pissed behind the hedge. {Pronoun,Past,Prep,Det,Noun}

# planned
I noticed the planned visit. {Pronoun,Past,Det,Adj|!Verb,Noun}
She planned the journey. {Pronoun,Past,Det,Noun}

# pleased
They described the pleased parent. {Pronoun,Past,Det,Adj|!Verb,Noun}
She pleased the audience. {Pronoun,Past,Det,Noun}

# plugged
We discussed her plugged drain. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She plugged the leak. {Pronoun,Past,Det,Noun}

# pointed
The pointed remark surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She pointed at the map. {Pronoun,Past,Prep,Det,Noun}

# polished
I noticed the polished floor. {Pronoun,Past,Det,Adj|!Verb,Noun}
She polished the silver. {Pronoun,Past,Det,Noun}

# preferred
They described the preferred option. {Pronoun,Past,Det,Adj|!Verb,Noun}
She preferred the original. {Pronoun,Past,Det,Noun}

# preoccupied
We discussed her preoccupied teacher. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She preoccupied herself with minor details. {Pronoun,Past,Pronoun,Prep,Adj,Plural}

# prepared
The prepared speech surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She prepared the meal. {Pronoun,Past,Det,Noun}

# pressed
I noticed the pressed flower. {Pronoun,Past,Det,Adj|!Verb,Noun}
She pressed the button. {Pronoun,Past,Det,Noun}

# printed
They described the printed page. {Pronoun,Past,Det,Adj|!Verb,Noun}
She printed the poster. {Pronoun,Past,Det,Noun}

# processed
We discussed her processed food. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She processed the application. {Pronoun,Past,Det,Noun}

# produced
The produced sound surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She produced the evidence. {Pronoun,Past,Det,Noun}

# prolonged
I noticed the prolonged silence. {Pronoun,Past,Det,Adj|!Verb,Noun}
She prolonged the discussion. {Pronoun,Past,Det,Noun}

# pronounced
They described the pronounced accent. {Pronoun,Past,Det,Adj|!Verb,Noun}
She pronounced the name. {Pronoun,Past,Det,Noun}

# proposed
We discussed her proposed solution. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She proposed a compromise. {Pronoun,Past,Det,Noun}

# protected
The protected species surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She protected the children. {Pronoun,Past,Det,Plural}

# proved
I noticed the proved reserve. {Pronoun,Past,Det,Adj|!Verb,Noun}
She proved the theorem. {Pronoun,Past,Det,Noun}

# pumped
They described the pumped athlete. {Pronoun,Past,Det,Adj|!Verb,Noun}
She pumped the water. {Pronoun,Past,Det,Noun}

# puzzled
We discussed her puzzled student. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She puzzled the experts. {Pronoun,Past,Det,Plural}

# qualified
The qualified applicant surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She qualified for the final. {Pronoun,Past,Prep,Det,Noun}

# quoted
I noticed the quoted price. {Pronoun,Past,Det,Adj|!Verb,Noun}
She quoted the poem. {Pronoun,Past,Det,Noun}

# rained
# No ordinary standalone adjective sense; rained-out is a different form.
It rained throughout the night. {Pronoun,Past,Prep,Det,Noun}

# rallied
They described the rallied troop. {Pronoun,Past,Det,Adj|!Verb,Noun}
She rallied the supporters. {Pronoun,Past,Det,Plural}

# ratified
We discussed her ratified treaty. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She ratified the agreement. {Pronoun,Past,Det,Noun}

# received
The received wisdom surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She received the parcel. {Pronoun,Past,Det,Noun}

# recommended
I noticed the recommended dose. {Pronoun,Past,Det,Adj|!Verb,Noun}
She recommended the restaurant. {Pronoun,Past,Det,Noun}

# recorded
They described the recorded message. {Pronoun,Past,Det,Adj|!Verb,Noun}
She recorded the interview. {Pronoun,Past,Det,Noun}

# recovered
We discussed her recovered property. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She recovered the missing suitcase. {Pronoun,Past,Det,Adj,Noun}

# recycled
The recycled paper surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She recycled the bottles. {Pronoun,Past,Det,Plural}

# reduced
I noticed the reduced price. {Pronoun,Past,Det,Adj|!Verb,Noun}
She reduced the temperature. {Pronoun,Past,Det,Noun}

# refined
They described the refined taste. {Pronoun,Past,Det,Adj|!Verb,Noun}
She refined the technique. {Pronoun,Past,Det,Noun}

# registered
We discussed her registered nurse. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She registered the vehicle. {Pronoun,Past,Det,Noun}

# regulated
The regulated industry surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She regulated the pressure. {Pronoun,Past,Det,Noun}

# rejected
I noticed the rejected proposal. {Pronoun,Past,Det,Adj|!Verb,Noun}
She rejected the offer. {Pronoun,Past,Det,Noun}

# related
They described the related issue. {Pronoun,Past,Det,Adj|!Verb,Noun}
She related the story. {Pronoun,Past,Det,Noun}

# released
We discussed her released prisoner. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She released the bird. {Pronoun,Past,Det,Noun}

# removed
The removed cousin surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She removed the stain. {Pronoun,Past,Det,Noun}

# renewed
I noticed the renewed interest. {Pronoun,Past,Det,Adj|!Verb,Noun}
She renewed the subscription. {Pronoun,Past,Det,Noun}

# repeated
They described the repeated attempt. {Pronoun,Past,Det,Adj|!Verb,Noun}
She repeated the question. {Pronoun,Past,Det,Noun}

# replaced
We discussed her replaced part. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She replaced the battery. {Pronoun,Past,Det,Noun}

# requested
The requested document surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She requested the records. {Pronoun,Past,Det,Plural}

# required
I noticed the required reading. {Pronoun,Past,Det,Adj|!Verb,Noun}
She required an explanation. {Pronoun,Past,Det,Noun}

# reserved
They described the reserved seat. {Pronoun,Past,Det,Adj|!Verb,Noun}
She reserved a table. {Pronoun,Past,Det,Noun}

# respected
We discussed her respected teacher. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She respected the decision. {Pronoun,Past,Det,Noun}

# restored
The restored painting surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She restored the house. {Pronoun,Past,Det,Noun}

# restricted
I noticed the restricted area. {Pronoun,Past,Det,Adj|!Verb,Noun}
She restricted the access. {Pronoun,Past,Det,Noun}

# rotted
They described the rotted beam. {Pronoun,Past,Det,Adj|!Verb,Noun}
She rotted the wood with moisture. {Pronoun,Past,Det,Noun,Prep,Noun}

# satisfied
We discussed her satisfied customer. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She satisfied the requirements. {Pronoun,Past,Det,Plural}

# saturated
The saturated solution surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She saturated the cloth. {Pronoun,Past,Det,Noun}

# sauted
# Dictionary spelling retained; intended senses of sauteed.
I noticed the sauted onion. {Pronoun,Past,Det,Adj|!Verb,Noun}
She sauted the mushrooms. {Pronoun,Past,Det,Plural}

# scared
They described the scared child. {Pronoun,Past,Det,Adj|!Verb,Noun}
She scared the birds. {Pronoun,Past,Det,Plural}

# scattered
We discussed her scattered shower. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She scattered the seeds. {Pronoun,Past,Det,Plural}

# scorched
The scorched earth surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She scorched the shirt. {Pronoun,Past,Det,Noun}

# scratched
I noticed the scratched lens. {Pronoun,Past,Det,Adj|!Verb,Noun}
She scratched the table. {Pronoun,Past,Det,Noun}

# screened
They described the screened porch. {Pronoun,Past,Det,Adj|!Verb,Noun}
She screened the applicants. {Pronoun,Past,Det,Plural}

# sealed
We discussed her sealed envelope. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She sealed the package. {Pronoun,Past,Det,Noun}

# seasoned
The seasoned traveler surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She seasoned the soup. {Pronoun,Past,Det,Noun}

# seated
I noticed the seated audience. {Pronoun,Past,Det,Adj|!Verb,Noun}
She seated the guests. {Pronoun,Past,Det,Plural}

# secured
They described the secured loan. {Pronoun,Past,Det,Adj|!Verb,Noun}
She secured the door. {Pronoun,Past,Det,Noun}

# selected
We discussed her selected passage. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She selected the winner. {Pronoun,Past,Det,Noun}

# settled
The settled opinion surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She settled the dispute. {Pronoun,Past,Det,Noun}

# shaded
I noticed the shaded path. {Pronoun,Past,Det,Adj|!Verb,Noun}
She shaded the drawing. {Pronoun,Past,Det,Noun}

# shared
They described the shared bedroom. {Pronoun,Past,Det,Adj|!Verb,Noun}
She shared the cake. {Pronoun,Past,Det,Noun}

# shocked
We discussed her shocked witness. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She shocked the audience. {Pronoun,Past,Det,Noun}

# shut
The shut door surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She shut the gate. {Pronoun,Past,Det,Noun}

# simplified
I noticed the simplified diagram. {Pronoun,Past,Det,Adj|!Verb,Noun}
She simplified the procedure. {Pronoun,Past,Det,Noun}

# simulated
They described the simulated environment. {Pronoun,Past,Det,Adj|!Verb,Noun}
She simulated the flight. {Pronoun,Past,Det,Noun}

# smoked
We discussed her smoked salmon. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She smoked the fish. {Pronoun,Past,Det,Noun}

# soaked
The soaked coat surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She soaked the beans. {Pronoun,Past,Det,Plural}

# specialized
I noticed the specialized equipment. {Pronoun,Past,Det,Adj|!Verb,Noun}
She specialized in botany. {Pronoun,Past,Prep,Noun}

# specified
They described the specified amount. {Pronoun,Past,Det,Adj|!Verb,Noun}
She specified the dimensions. {Pronoun,Past,Det,Plural}

# spiked
We discussed her spiked drink. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She spiked the punch. {Pronoun,Past,Det,Noun}

# spotted
The spotted dog surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She spotted the error. {Pronoun,Past,Det,Noun}

# stained
I noticed the stained glass. {Pronoun,Past,Det,Adj|!Verb,Noun}
She stained the carpet. {Pronoun,Past,Det,Noun}

# stated
They described the stated aim. {Pronoun,Past,Det,Adj|!Verb,Noun}
She stated the facts. {Pronoun,Past,Det,Plural}

# steamed
We discussed her steamed rice. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She steamed the vegetables. {Pronoun,Past,Det,Plural}

# stereotyped
The stereotyped character surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She stereotyped the villagers. {Pronoun,Past,Det,Plural}

# stirred
I noticed the stirred mixture. {Pronoun,Past,Det,Adj|!Verb,Noun}
She stirred the soup. {Pronoun,Past,Det,Noun}

# stoked
They described the stoked fan. {Pronoun,Past,Det,Adj|!Verb,Noun}
She stoked the fire. {Pronoun,Past,Det,Noun}

# strengthened
We discussed her strengthened beam. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She strengthened the argument. {Pronoun,Past,Det,Noun}

# striped
The striped shirt surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She striped the fabric. {Pronoun,Past,Det,Noun}

# stripped
I noticed the stripped screw. {Pronoun,Past,Det,Adj|!Verb,Noun}
She stripped the paint. {Pronoun,Past,Det,Noun}

# stuffed
They described the stuffed toy. {Pronoun,Past,Det,Adj|!Verb,Noun}
She stuffed the cushion. {Pronoun,Past,Det,Noun}

# stumped
We discussed her stumped student. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She stumped the experts. {Pronoun,Past,Det,Plural}

# stunned
The stunned audience surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She stunned the crowd. {Pronoun,Past,Det,Noun}

# subsidized
I noticed the subsidized housing. {Pronoun,Past,Det,Adj|!Verb,Noun}
She subsidized the service. {Pronoun,Past,Det,Noun}

# suggested
They described the suggested route. {Pronoun,Past,Det,Adj|!Verb,Noun}
She suggested an alternative. {Pronoun,Past,Det,Noun}

# suspected
We discussed her suspected thief. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She suspected the neighbor. {Pronoun,Past,Det,Noun}

# suspended
The suspended ceiling surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She suspended the meeting. {Pronoun,Past,Det,Noun}

# sustained
I noticed the sustained effort. {Pronoun,Past,Det,Adj|!Verb,Noun}
She sustained the injury. {Pronoun,Past,Det,Noun}

# tamed
They described the tamed animal. {Pronoun,Past,Det,Adj|!Verb,Noun}
She tamed the horse. {Pronoun,Past,Det,Noun}

# tanned
We discussed her tanned skin. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She tanned the leather. {Pronoun,Past,Det,Noun}

# targeted
The targeted advertisement surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She targeted the campaign. {Pronoun,Past,Det,Noun}

# tarnished
I noticed the tarnished reputation. {Pronoun,Past,Det,Adj|!Verb,Noun}
She tarnished the silver. {Pronoun,Past,Det,Noun}

# teased
They described the teased hair. {Pronoun,Past,Det,Adj|!Verb,Noun}
She teased her sister. {Pronoun,Past,Poss,Noun}

# threatened
We discussed her threatened species. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She threatened the witness. {Pronoun,Past,Det,Noun}

# thrilled
The thrilled child surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She thrilled the audience. {Pronoun,Past,Det,Noun}

# tied
I noticed the tied score. {Pronoun,Past,Det,Adj|!Verb,Noun}
She tied the ribbon. {Pronoun,Past,Det,Noun}

# tired
They described the tired worker. {Pronoun,Past,Det,Adj|!Verb,Noun}
She tired the puppy with games. {Pronoun,Past,Det,Noun,Prep,Plural}

# touched
We discussed her touched parent. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She touched the fabric. {Pronoun,Past,Det,Noun}

# tracked
The tracked vehicle surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She tracked the package. {Pronoun,Past,Det,Noun}

# trained
I noticed the trained nurse. {Pronoun,Past,Det,Adj|!Verb,Noun}
She trained the dog. {Pronoun,Past,Det,Noun}

# trapped
They described the trapped miner. {Pronoun,Past,Det,Adj|!Verb,Noun}
She trapped the mice. {Pronoun,Past,Det,Plural}

# trimmed
We discussed her trimmed hedge. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She trimmed the branches. {Pronoun,Past,Det,Plural}

# troubled
The troubled teenager surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She troubled the manager with questions. {Pronoun,Past,Det,Noun,Prep,Plural}

# turned
I noticed the turned ankle. {Pronoun,Past,Det,Adj|!Verb,Noun}
She turned the handle. {Pronoun,Past,Det,Noun}

# twisted
They described the twisted wire. {Pronoun,Past,Det,Adj|!Verb,Noun}
She twisted the rope. {Pronoun,Past,Det,Noun}

# uncovered
We discussed her uncovered dish. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She uncovered the truth. {Pronoun,Past,Det,Noun}

# understood
The understood rule surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She understood the instructions. {Pronoun,Past,Det,Plural}

# unified
I noticed the unified theory. {Pronoun,Past,Det,Adj|!Verb,Noun}
She unified the country. {Pronoun,Past,Det,Noun}

# united
They described the united front. {Pronoun,Past,Det,Adj|!Verb,Noun}
She united the factions. {Pronoun,Past,Det,Plural}

# updated
We discussed her updated edition. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She updated the software. {Pronoun,Past,Det,Noun}

# uplifted
The uplifted spirit surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She uplifted the audience. {Pronoun,Past,Det,Noun}

# upset
I noticed the upset stomach. {Pronoun,Past,Det,Adj|!Verb,Noun}
She upset the vase. {Pronoun,Past,Det,Noun}

# used
They described the used car. {Pronoun,Past,Det,Adj|!Verb,Noun}
She used the computer. {Pronoun,Past,Det,Noun}

# varied
We discussed her varied diet. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She varied the routine. {Pronoun,Past,Det,Noun}

# verified
The verified account surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She verified the figures. {Pronoun,Past,Det,Plural}

# warped
I noticed the warped board. {Pronoun,Past,Det,Adj|!Verb,Noun}
She warped the wood with heat. {Pronoun,Past,Det,Noun,Prep,Noun}

# washed
They described the washed lettuce. {Pronoun,Past,Det,Adj|!Verb,Noun}
She washed the dishes. {Pronoun,Past,Det,Plural}

# watched
We discussed her watched pot. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She watched the birds. {Pronoun,Past,Det,Plural}

# weakened
The weakened structure surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She weakened the argument. {Pronoun,Past,Det,Noun}

# weathered
I noticed the weathered face. {Pronoun,Past,Det,Adj|!Verb,Noun}
She weathered the storm. {Pronoun,Past,Det,Noun}

# worn
The worn carpet surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She has worn the dress. {Pronoun,Aux,Verb|!Adjective,Det,Noun}

# worried
They described the worried parent. {Pronoun,Past,Det,Adj|!Verb,Noun}
She worried about the delay. {Pronoun,Past,Prep,Det,Noun}

# wounded
We discussed her wounded soldier. {Pronoun,Past,Poss,Adj|!Verb,Noun}
She wounded the attacker. {Pronoun,Past,Det,Noun}

# wrinkled
The wrinkled shirt surprised us. {Det,Adj|!Verb,Noun,Past,Pronoun}
She wrinkled the fabric. {Pronoun,Past,Det,Noun}

# yellowed
I noticed the yellowed page. {Pronoun,Past,Det,Adj|!Verb,Noun}
She yellowed the paper artificially. {Pronoun,Past,Det,Noun,Adv}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
