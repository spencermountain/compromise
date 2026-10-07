import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[hmm/switches/noun-verb] '

const spec = `
# Independently authored whole-sentence expectations; not checked against the tagger.

# abuse
The abuse of power angered voters. {Det,Noun|!Verb,Prep,Noun,Past,Plural}
We abuse their authority. {Pronoun,Inf,Poss,Noun}

# accent
Her accent sounded familiar. {Poss,Noun|!Verb,Past,Adj}
They accent the final syllable. {Pronoun,Inf,Det,Adj,Noun}

# access
The building has wheelchair access. {Det,Noun,Pres,Noun,Noun|!Verb}
You can access the database. {Pronoun,Modal,Inf,Det,Noun}

# accord
The accord ended the dispute. {Det,Noun|!Verb,Past,Det,Noun}
She will accord her full respect. {Pronoun,Modal,Inf,Pronoun,Adj,Noun}

# account
My account contains enough money. {Poss,Noun|!Verb,Pres,Det,Noun}
I account for every penny. {Pronoun,Inf,Prep,Det,Noun}

# ace
She drew an ace from the deck. {Pronoun,Past,Det,Noun|!Verb,Prep,Det,Noun}
He might ace the exam. {Pronoun,Modal,Inf,Det,Noun}

# ache
A dull ache spread through her shoulder. {Det,Adj,Noun|!Verb,Past,Prep,Poss,Noun}
We ache after exercise. {Pronoun,Inf,Prep,Noun}

# act
The final act lasted an hour. {Det,Adj,Noun|!Verb,Past,Det,Noun}
They act with caution. {Pronoun,Inf,Prep,Noun}

# address
His address was illegible. {Poss,Noun|!Verb,Copula,Adj}
You can address the audience. {Pronoun,Modal,Inf,Det,Noun}

# advance
They paid an advance before publication. {Pronoun,Past,Det,Noun|!Verb,Prep,Noun}
She will advance toward the gate. {Pronoun,Modal,Inf,Prep,Det,Noun}

# advocate
The advocate defended her client. {Det,Actor,Past,Poss,Noun}
I advocate for change. {Pronoun,Inf,Prep,Noun}

# age
Her age surprised the doctor. {Poss,Noun|!Verb,Past,Det,Noun}
He might age gracefully. {Pronoun,Modal,Inf,Adv}

# aid
The aid surprised us. {Det,Noun|!Verb,Past,Pronoun}
We aid the refugees. {Pronoun,Inf,Det,Plural}

# aim
We discussed the aim. {Pronoun,Past,Det,Noun|!Verb}
They aim at the target. {Pronoun,Inf,Prep,Det,Noun}

# air
The air smelled fresh. {Det,Noun|!Verb,Past,Adj}
You can air our concerns. {Pronoun,Modal,Inf,Poss,Plural}

# alarm
The alarm woke the neighbors. {Det,Noun|!Verb,Past,Det,Plural}
She will alarm the neighbors. {Pronoun,Modal,Inf,Det,Plural}

# alter
One alter used a different name. {Value,Noun|!Verb,Past,Det,Adj,Noun}
We alter the schedule. {Pronoun,Inf,Det,Noun}

# anchor
Her anchor was memorable. {Poss,Noun|!Verb,Copula,Adj}
I anchor the boat. {Pronoun,Inf,Det,Noun}

# anger
I noticed the anger. {Pronoun,Past,Det,Noun|!Verb}
He might anger the crowd. {Pronoun,Modal,Inf,Det,Noun}

# answer
The answer surprised us. {Det,Noun|!Verb,Past,Pronoun}
We answer the question. {Pronoun,Inf,Det,Noun}

# appeal
We discussed the appeal. {Pronoun,Past,Det,Noun|!Verb}
They appeal against the decision. {Pronoun,Inf,Prep,Det,Noun}

# approach
They described the approach. {Pronoun,Past,Det,Noun|!Verb}
You can approach the house. {Pronoun,Modal,Inf,Det,Noun}

# arch
That arch seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will arch my back. {Pronoun,Modal,Inf,Poss,Noun}

# archive
Her archive was memorable. {Poss,Noun|!Verb,Copula,Adj}
I archive the documents. {Pronoun,Inf,Det,Plural}

# arm
I noticed the arm. {Pronoun,Past,Det,Noun|!Verb}
He might arm the guards. {Pronoun,Modal,Inf,Det,Plural}

# armour
The armour protected his chest. {Det,Noun|!Verb,Past,Poss,Noun}
We armour the vehicle. {Pronoun,Inf,Det,Noun}

# ask
That is a considerable ask. {Pronoun,Copula,Det,Adj,Noun|!Verb}
They ask for help. {Pronoun,Inf,Prep,Noun}

# assist
They described the assist. {Pronoun,Past,Det,Noun|!Verb}
You can assist the surgeon. {Pronoun,Modal,Inf,Det,Noun}

# associate
That associate seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will associate with artists. {Pronoun,Modal,Inf,Prep,Plural}

# attack
Her attack was memorable. {Poss,Noun|!Verb,Copula,Adj}
I attack the argument. {Pronoun,Inf,Det,Noun}

# attempt
I noticed the attempt. {Pronoun,Past,Det,Noun|!Verb}
He might attempt the climb. {Pronoun,Modal,Inf,Det,Noun}

# auction
The auction surprised us. {Det,Noun|!Verb,Past,Pronoun}
We auction the painting. {Pronoun,Inf,Det,Noun}

# award
We discussed the award. {Pronoun,Past,Det,Noun|!Verb}
They award a prize. {Pronoun,Inf,Det,Noun}

# back
Her back hurt after the hike. {Poss,Noun|!Verb,Past,Prep,Det,Noun}
You can back the proposal. {Pronoun,Modal,Inf,Det,Noun}

# bail
The judge denied bail. {Det,Noun,Past,Noun|!Verb}
She will bail water from the boat. {Pronoun,Modal,Inf,Noun,Prep,Det,Noun}

# balance
Her balance was memorable. {Poss,Noun|!Verb,Copula,Adj}
I balance the tray. {Pronoun,Inf,Det,Noun}

# ban
I noticed the ban. {Pronoun,Past,Det,Noun|!Verb}
He might ban plastic bags. {Pronoun,Modal,Inf,Adj,Plural}

# band
The band surprised us. {Det,Noun|!Verb,Past,Pronoun}
We band together for safety. {Pronoun,Inf,Adv,Prep,Noun}

# bang
We discussed the bang. {Pronoun,Past,Det,Noun|!Verb}
They bang on the door. {Pronoun,Inf,Prep,Det,Noun}

# bank
The bank approved the loan. {Det,Noun|!Verb,Past,Det,Noun}
You can bank the money. {Pronoun,Modal,Inf,Det,Noun}
The bank beside the river collapsed. {Det,Noun|!Verb,Prep,Det,Noun,Past}
The pilots bank the aircraft sharply. {Det,Noun,Inf,Det,Noun,Adv}

# bar
They leaned against the bar. {Pronoun,Past,Prep,Det,Noun|!Verb}
She will bar the entrance. {Pronoun,Modal,Inf,Det,Noun}
The steel bar bent. {Det,Noun,Noun|!Verb,Past}

# bargain
Her bargain was memorable. {Poss,Noun|!Verb,Copula,Adj}
I bargain over the price. {Pronoun,Inf,Prep,Det,Noun}

# barge
I noticed the barge. {Pronoun,Past,Det,Noun|!Verb}
He might barge into the room. {Pronoun,Modal,Inf,Prep,Det,Noun}

# bark
The bark peeled from the tree. {Det,Noun|!Verb,Past,Prep,Det,Noun}
We bark orders at everyone. {Pronoun,Inf,Noun,Prep,Pronoun}
The bark woke the baby. {Det,Noun|!Verb,Past,Det,Noun}

# base
We discussed the base. {Pronoun,Past,Det,Noun|!Verb}
They base the estimate on evidence. {Pronoun,Inf,Det,Noun,Prep,Noun}
The base of the statue cracked. {Det,Noun|!Verb,Prep,Det,Noun,Past}

# bash
They described the bash. {Pronoun,Past,Det,Noun|!Verb}
You can bash the door. {Pronoun,Modal,Inf,Det,Noun}

# battle
That battle seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will battle the flames. {Pronoun,Modal,Inf,Det,Plural}

# bear
A bear crossed the road. {Det,Noun|!Verb,Past,Det,Noun}
I bear the burden. {Pronoun,Inf,Det,Noun}

# beat
I noticed the beat. {Pronoun,Past,Det,Noun|!Verb}
He might beat the eggs. {Pronoun,Modal,Inf,Det,Plural}
The beat of the drum quickened. {Det,Noun|!Verb,Prep,Det,Noun,Past}

# beef
The beef simmered in the pot. {Det,Noun|!Verb,Past,Prep,Det,Noun}
We beef up security. {Pronoun,Inf,Particle,Noun}

# belt
We discussed the belt. {Pronoun,Past,Det,Noun|!Verb}
They belt the robe. {Pronoun,Inf,Det,Noun}

# bend
They described the bend. {Pronoun,Past,Det,Noun|!Verb}
You can bend the wire. {Pronoun,Modal,Inf,Det,Noun}

# benefit
That benefit seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will benefit from exercise. {Pronoun,Modal,Inf,Prep,Noun}

# bet
Her bet was memorable. {Poss,Noun|!Verb,Copula,Adj}
I bet on horses. {Pronoun,Inf,Prep,Plural}

# bias
The bias distorted the results. {Det,Noun|!Verb,Past,Det,Plural}
He might bias the results. {Pronoun,Modal,Inf,Det,Plural}

# bid
The bid surprised us. {Det,Noun|!Verb,Past,Pronoun}
We bid for the contract. {Pronoun,Inf,Prep,Det,Noun}

# bike
We discussed the bike. {Pronoun,Past,Det,Noun|!Verb}
They bike to school. {Pronoun,Inf,Prep,Noun}

# bind
They described the bind. {Pronoun,Past,Det,Noun|!Verb}
You can bind the pages. {Pronoun,Modal,Inf,Det,Plural}

# biopsy
That biopsy seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will biopsy the tissue. {Pronoun,Modal,Inf,Det,Noun}

# bit
A bit broke from the edge. {Det,Noun|!Verb,Past,Prep,Det,Noun}
I bit the horse. {Pronoun,Inf,Det,Noun}
The puppy bit my hand. {Det,Noun,Past,Poss,Noun}

# bitch
The bitch nursed her puppies. {Det,Noun|!Verb,Past,Poss,Plural}
He might bitch about the weather. {Pronoun,Modal,Inf,Prep,Det,Noun}

# bite
The bite surprised us. {Det,Noun|!Verb,Past,Pronoun}
We bite the apple. {Pronoun,Inf,Det,Noun}

# blame
The blame fell on the manager. {Det,Noun|!Verb,Past,Prep,Det,Noun}
They blame the storm. {Pronoun,Inf,Det,Noun}

# blend
They described the blend. {Pronoun,Past,Det,Noun|!Verb}
You can blend the colors. {Pronoun,Modal,Inf,Det,Plural}

# blink
That blink seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will blink in surprise. {Pronoun,Modal,Inf,Prep,Noun}

# blitz
Her blitz was memorable. {Poss,Noun|!Verb,Copula,Adj}
I blitz the opposition. {Pronoun,Inf,Det,Noun}

# block
I noticed the block. {Pronoun,Past,Det,Noun|!Verb}
He might block the road. {Pronoun,Modal,Inf,Det,Noun}

# blur
The blur surprised us. {Det,Noun|!Verb,Past,Pronoun}
We blur the edges. {Pronoun,Inf,Det,Plural}

# board
We discussed the board. {Pronoun,Past,Det,Noun|!Verb}
They board the train. {Pronoun,Inf,Det,Noun}

# boast
They described the boast. {Pronoun,Past,Det,Noun|!Verb}
You can boast about our success. {Pronoun,Modal,Inf,Prep,Poss,Noun}

# bog
That bog seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will bog down the discussion. {Pronoun,Modal,Inf,Particle,Det,Noun}

# bomb
Her bomb was memorable. {Poss,Noun|!Verb,Copula,Adj}
I bomb the empty bunker. {Pronoun,Inf,Det,Adj,Noun}

# bond
The bond pays interest. {Det,Noun|!Verb,Pres,Noun}
He might bond with the puppy. {Pronoun,Modal,Inf,Prep,Det,Noun}

# bone
The bone surprised us. {Det,Noun|!Verb,Past,Pronoun}
We bone the fish. {Pronoun,Inf,Det,Noun}

# book
We discussed the book. {Pronoun,Past,Det,Noun|!Verb}
They book a room. {Pronoun,Inf,Det,Noun}
The book contains maps. {Det,Noun|!Verb,Pres,Plural}

# boost
They described the boost. {Pronoun,Past,Det,Noun|!Verb}
You can boost their confidence. {Pronoun,Modal,Inf,Poss,Noun}

# boot
His boot sank into the mud. {Poss,Noun|!Verb,Past,Prep,Det,Noun}
She will boot the computer. {Pronoun,Modal,Inf,Det,Noun}

# border
Her border was memorable. {Poss,Noun|!Verb,Copula,Adj}
I border the garden with stones. {Pronoun,Inf,Det,Noun,Prep,Plural}

# bottle
I noticed the bottle. {Pronoun,Past,Det,Noun|!Verb}
He might bottle the juice. {Pronoun,Modal,Inf,Det,Noun}

# box
The box surprised us. {Det,Noun|!Verb,Past,Pronoun}
We box the gifts. {Pronoun,Inf,Det,Plural}

# boycott
We discussed the boycott. {Pronoun,Past,Det,Noun|!Verb}
They boycott the store. {Pronoun,Inf,Det,Noun}

# branch
The branch snapped in the wind. {Det,Noun|!Verb,Past,Prep,Det,Noun}
You can branch out into publishing. {Pronoun,Modal,Inf,Particle,Prep,Noun}

# brand
That brand seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will brand the cattle. {Pronoun,Modal,Inf,Det,Noun}

# breach
Her breach was memorable. {Poss,Noun|!Verb,Copula,Adj}
I breach the agreement. {Pronoun,Inf,Det,Noun}

# break
I noticed the break. {Pronoun,Past,Det,Noun|!Verb}
He might break the silence. {Pronoun,Modal,Inf,Det,Noun}

# breed
This breed needs regular exercise. {Det,Noun|!Verb,Pres,Adj,Noun}
We breed horses. {Pronoun,Inf,Plural}

# bribe
We discussed the bribe. {Pronoun,Past,Det,Noun|!Verb}
They bribe the official. {Pronoun,Inf,Det,Noun}

# bridge
They described the bridge. {Pronoun,Past,Det,Noun|!Verb}
You can bridge the gap. {Pronoun,Modal,Inf,Det,Noun}

# broadcast
That broadcast seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will broadcast the interview. {Pronoun,Modal,Inf,Det,Noun}

# bruise
Her bruise was memorable. {Poss,Noun|!Verb,Copula,Adj}
I bruise easily. {Pronoun,Inf,Adv}

# brush
The brush lay beside the paint. {Det,Noun|!Verb,Past,Prep,Det,Noun}
He might brush my teeth. {Pronoun,Modal,Inf,Poss,Plural}

# bubble
The bubble surprised us. {Det,Noun|!Verb,Past,Pronoun}
We bubble with excitement. {Pronoun,Inf,Prep,Noun}

# buckle
We discussed the buckle. {Pronoun,Past,Det,Noun|!Verb}
They buckle the belt. {Pronoun,Inf,Det,Noun}

# budget
They described the budget. {Pronoun,Past,Det,Noun|!Verb}
You can budget for repairs. {Pronoun,Modal,Inf,Prep,Plural}

# bus
The bus stopped outside. {Det,Noun|!Verb,Past,Adv}
She will bus the children home. {Pronoun,Modal,Inf,Det,Noun,Adv}

# buffer
Her buffer was memorable. {Poss,Noun|!Verb,Copula,Adj}
I buffer the video. {Pronoun,Inf,Det,Noun}

# bump
I noticed the bump. {Pronoun,Past,Det,Noun|!Verb}
He might bump into the table. {Pronoun,Modal,Inf,Prep,Det,Noun}

# burden
The burden surprised us. {Det,Noun|!Verb,Past,Pronoun}
We burden her with paperwork. {Pronoun,Inf,Pronoun,Prep,Noun}

# burn
We discussed the burn. {Pronoun,Past,Det,Noun|!Verb}
They burn the rubbish. {Pronoun,Inf,Det,Noun}

# bust
They described the bust. {Pronoun,Past,Det,Noun|!Verb}
You can bust the lock. {Pronoun,Modal,Inf,Det,Noun}

# buzz
That buzz seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will buzz the receptionist. {Pronoun,Modal,Inf,Det,Noun}

# bypass
Her bypass was memorable. {Poss,Noun|!Verb,Copula,Adj}
I bypass the village. {Pronoun,Inf,Det,Noun}

# cake
The cake smelled delicious. {Det,Noun|!Verb,Past,Adj}
He might cake the surface with mud. {Pronoun,Modal,Inf,Det,Noun,Prep,Noun}

# call
The call surprised us. {Det,Noun|!Verb,Past,Pronoun}
We call the office. {Pronoun,Inf,Det,Noun}

# camp
We discussed the camp. {Pronoun,Past,Det,Noun|!Verb}
They camp beside the river. {Pronoun,Inf,Prep,Det,Noun}

# canoe
They described the canoe. {Pronoun,Past,Det,Noun|!Verb}
You can canoe across the lake. {Pronoun,Modal,Inf,Prep,Det,Noun}

# cap
His cap blew away. {Poss,Noun|!Verb,Past,Adv}
She will cap the bottle. {Pronoun,Modal,Inf,Det,Noun}

# capture
Her capture was memorable. {Poss,Noun|!Verb,Copula,Adj}
I capture the moment. {Pronoun,Inf,Det,Noun}

# card
She sent a card to her aunt. {Pronoun,Past,Det,Noun|!Verb,Prep,Poss,Noun}
He might card customers at the entrance. {Pronoun,Modal,Inf,Noun,Prep,Det,Noun}

# care
The patient needs constant care. {Det,Noun,Pres,Adj,Noun|!Verb}
We care about the outcome. {Pronoun,Inf,Prep,Det,Noun}

# cash
The cash disappeared from the drawer. {Det,Noun|!Verb,Past,Prep,Det,Noun}
They cash the cheque. {Pronoun,Inf,Det,Noun}

# cast
The cast took a bow. {Det,Noun|!Verb,Past,Det,Noun}
You can cast a shadow. {Pronoun,Modal,Inf,Det,Noun}
The cast protected her wrist. {Det,Noun|!Verb,Past,Poss,Noun}

# catalog
That catalog seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will catalog the collection. {Pronoun,Modal,Inf,Det,Noun}

# catch
Her catch was memorable. {Poss,Noun|!Verb,Copula,Adj}
I catch the ball. {Pronoun,Inf,Det,Noun}

# cause
I noticed the cause. {Pronoun,Past,Det,Noun|!Verb}
He might cause a disturbance. {Pronoun,Modal,Inf,Det,Noun}

# caution
The caution surprised us. {Det,Noun|!Verb,Past,Pronoun}
We caution the driver. {Pronoun,Inf,Det,Noun}

# cave
We discussed the cave. {Pronoun,Past,Det,Noun|!Verb}
They cave in under pressure. {Pronoun,Inf,Particle,Prep,Noun}

# center
They described the center. {Pronoun,Past,Det,Noun|!Verb}
You can center the image. {Pronoun,Modal,Inf,Det,Noun}

# centre
That centre seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will centre the image. {Pronoun,Modal,Inf,Det,Noun}

# chain
Her chain was memorable. {Poss,Noun|!Verb,Copula,Adj}
I chain the bicycle to the fence. {Pronoun,Inf,Det,Noun,Prep,Det,Noun}

# chair
The chair has a broken leg. {Det,Noun|!Verb,Pres,Det,Adj,Noun}
He might chair the meeting. {Pronoun,Modal,Inf,Det,Noun}

# challenge
The challenge surprised us. {Det,Noun|!Verb,Past,Pronoun}
We challenge the verdict. {Pronoun,Inf,Det,Noun}

# change
She counted the change. {Pronoun,Past,Det,Noun|!Verb}
They change the subject. {Pronoun,Inf,Det,Noun}

# channel
They described the channel. {Pronoun,Past,Det,Noun|!Verb}
You can channel our energy. {Pronoun,Modal,Inf,Poss,Noun}

# charge
The charge covers delivery. {Det,Noun|!Verb,Pres,Noun}
She will charge the battery. {Pronoun,Modal,Inf,Det,Noun}
They charge toward the gate. {Pronoun,Inf,Prep,Det,Noun}
A charge of fraud shocked the committee. {Det,Noun|!Verb,Prep,Noun,Past,Det,Noun}

# charm
Her charm won us over. {Poss,Noun|!Verb,Past,Pronoun,Particle}
I charm the audience. {Pronoun,Inf,Det,Noun}

# chart
I noticed the chart. {Pronoun,Past,Det,Noun|!Verb}
He might chart our progress. {Pronoun,Modal,Inf,Poss,Noun}

# cheat
The cheat surprised us. {Det,Noun|!Verb,Past,Pronoun}
We cheat at cards. {Pronoun,Inf,Prep,Plural}

# check
The check arrived in the mail. {Det,Noun|!Verb,Past,Prep,Det,Noun}
They check the figures. {Pronoun,Inf,Det,Plural}
We play chess and fear a sudden check. {Pronoun,Inf,Noun,Conj,Inf,Det,Adj,Noun|!Verb}

# cheer
They described the cheer. {Pronoun,Past,Det,Noun|!Verb}
You can cheer for the team. {Pronoun,Modal,Inf,Prep,Det,Noun}

# chip
A chip was missing from the plate. {Det,Noun|!Verb,Copula,Adj,Prep,Det,Noun}
She will chip the paint. {Pronoun,Modal,Inf,Det,Noun}

# circle
Her circle was memorable. {Poss,Noun|!Verb,Copula,Adj}
I circle the answer. {Pronoun,Inf,Det,Noun}

# claim
I noticed the claim. {Pronoun,Past,Det,Noun|!Verb}
He might claim the prize. {Pronoun,Modal,Inf,Det,Noun}

# claw
The claw scratched the wood. {Det,Noun|!Verb,Past,Det,Noun}
We claw at the fabric. {Pronoun,Inf,Prep,Det,Noun}

# click
We discussed the click. {Pronoun,Past,Det,Noun|!Verb}
They click the button. {Pronoun,Inf,Det,Noun}

# clip
They described the clip. {Pronoun,Past,Det,Noun|!Verb}
You can clip the hedge. {Pronoun,Modal,Inf,Det,Noun}

# cloud
That cloud seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will cloud the issue. {Pronoun,Modal,Inf,Det,Noun}

# club
Our club meets weekly. {Poss,Noun|!Verb,Pres,Adv}
I club together for a gift. {Pronoun,Inf,Adv,Prep,Det,Noun}
He carried a heavy club. {Pronoun,Past,Det,Adj,Noun|!Verb}

# coat
Her coat was wet. {Poss,Noun|!Verb,Copula,Adj}
He might coat the pan with oil. {Pronoun,Modal,Inf,Det,Noun,Prep,Noun}

# code
The code surprised us. {Det,Noun|!Verb,Past,Pronoun}
We code the application. {Pronoun,Inf,Det,Noun}

# coin
The coin rolled under the table. {Det,Noun|!Verb,Past,Prep,Det,Noun}
They coin a phrase. {Pronoun,Inf,Det,Noun}

# collapse
They described the collapse. {Pronoun,Past,Det,Noun|!Verb}
You can collapse from exhaustion. {Pronoun,Modal,Inf,Prep,Noun}

# color
That color seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will color the picture. {Pronoun,Modal,Inf,Det,Noun}

# colour
Her colour was memorable. {Poss,Noun|!Verb,Copula,Adj}
I colour the picture. {Pronoun,Inf,Det,Noun}

# combat
I noticed the combat. {Pronoun,Past,Det,Noun|!Verb}
He might combat the disease. {Pronoun,Modal,Inf,Det,Noun}

# combine
The combine crossed the wheat field. {Det,Noun|!Verb,Past,Det,Noun,Noun}
We combine the ingredients. {Pronoun,Inf,Det,Plural}

# comfort
We discussed the comfort. {Pronoun,Past,Det,Noun|!Verb}
They comfort the child. {Pronoun,Inf,Det,Noun}

# command
They described the command. {Pronoun,Past,Det,Noun|!Verb}
You can command the fleet. {Pronoun,Modal,Inf,Det,Noun}

# comment
That comment seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will comment on the proposal. {Pronoun,Modal,Inf,Prep,Det,Noun}

# commit
The commit contains three changes. {Det,Noun|!Verb,Pres,Value,Plural}
I commit the changes. {Pronoun,Inf,Det,Plural}

# commute
I noticed the commute. {Pronoun,Past,Det,Noun|!Verb}
He might commute by train. {Pronoun,Modal,Inf,Prep,Noun}

# complement
The complement surprised us. {Det,Noun|!Verb,Past,Pronoun}
We complement the decor. {Pronoun,Inf,Det,Noun}

# compound
The compound dissolved in water. {Det,Noun|!Verb,Past,Prep,Noun}
They compound the problem. {Pronoun,Inf,Det,Noun}

# compromise
They described the compromise. {Pronoun,Past,Det,Noun|!Verb}
You can compromise on the price. {Pronoun,Modal,Inf,Prep,Det,Noun}

# concentrate
She diluted the concentrate with water. {Pronoun,Past,Det,Noun|!Verb,Prep,Noun}
She will concentrate on the task. {Pronoun,Modal,Inf,Prep,Det,Noun}

# concern
Her concern was memorable. {Poss,Noun|!Verb,Copula,Adj}
I concern ourselves with safety. {Pronoun,Inf,Pronoun,Prep,Noun}

# conduct
His conduct disappointed the committee. {Poss,Noun|!Verb,Past,Det,Noun}
He might conduct the orchestra. {Pronoun,Modal,Inf,Det,Noun}

# conflict
The conflict surprised us. {Det,Noun|!Verb,Past,Pronoun}
We conflict with the regulations. {Pronoun,Inf,Prep,Det,Plural}

# conglomerate
We discussed the conglomerate. {Pronoun,Past,Det,Noun|!Verb}
They conglomerate into larger groups. {Pronoun,Inf,Prep,Adj,Plural}

# consent
They described the consent. {Pronoun,Past,Det,Noun|!Verb}
You can consent to the search. {Pronoun,Modal,Inf,Prep,Det,Noun}

# construct
That construct seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will construct a bridge. {Pronoun,Modal,Inf,Det,Noun}

# contact
Her contact was memorable. {Poss,Noun|!Verb,Copula,Adj}
I contact the office. {Pronoun,Inf,Det,Noun}

# contrast
I noticed the contrast. {Pronoun,Past,Det,Noun|!Verb}
He might contrast the colors. {Pronoun,Modal,Inf,Det,Plural}

# control
The control surprised us. {Det,Noun|!Verb,Past,Pronoun}
We control the temperature. {Pronoun,Inf,Det,Noun}

# convert
The convert joined the congregation. {Det,Noun|!Verb,Past,Det,Noun}
They convert the garage. {Pronoun,Inf,Det,Noun}

# coordinate
One coordinate was missing. {Value,Noun|!Verb,Copula,Adj}
You can coordinate the effort. {Pronoun,Modal,Inf,Det,Noun}

# copy
That copy seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will copy the address. {Pronoun,Modal,Inf,Det,Noun}

# core
Her core was memorable. {Poss,Noun|!Verb,Copula,Adj}
I core the apples. {Pronoun,Inf,Det,Plural}

# cost
The cost exceeded our budget. {Det,Noun|!Verb,Past,Poss,Noun}
We cost the project carefully. {Pronoun,Inf,Det,Noun,Adv}

# cough
The cough surprised us. {Det,Noun|!Verb,Past,Pronoun}
We cough into a tissue. {Pronoun,Inf,Prep,Det,Noun}

# counsel
She sought legal counsel. {Pronoun,Past,Adj,Noun|!Verb}
They counsel the family. {Pronoun,Inf,Det,Noun}

# count
They described the count. {Pronoun,Past,Det,Noun|!Verb}
You can count the coins. {Pronoun,Modal,Inf,Det,Plural}

# couple
That couple seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will couple the carriages. {Pronoun,Modal,Inf,Det,Plural}

# court
The court rejected the appeal. {Det,Noun|!Verb,Past,Det,Noun}
I court public opinion. {Pronoun,Inf,Adj,Noun}

# cover
I noticed the cover. {Pronoun,Past,Det,Noun|!Verb}
He might cover the food. {Pronoun,Modal,Inf,Det,Noun}

# crack
The crack surprised us. {Det,Noun|!Verb,Past,Pronoun}
We crack the code. {Pronoun,Inf,Det,Noun}

# craft
The craft landed safely. {Det,Noun|!Verb,Past,Adv}
They craft a reply. {Pronoun,Inf,Det,Noun}

# crash
They described the crash. {Pronoun,Past,Det,Noun|!Verb}
You can crash the party. {Pronoun,Modal,Inf,Det,Noun}

# credit
Her credit improved. {Poss,Noun|!Verb,Past}
She will credit her with the discovery. {Pronoun,Modal,Inf,Pronoun,Prep,Det,Noun}

# creep
That creep followed us. {Det,Noun|!Verb,Past,Pronoun}
I creep along the corridor. {Pronoun,Inf,Prep,Det,Noun}

# crop
I noticed the crop. {Pronoun,Past,Det,Noun|!Verb}
He might crop the photograph. {Pronoun,Modal,Inf,Det,Noun}

# cross
She wore a silver cross. {Pronoun,Past,Det,Adj,Noun|!Verb}
We cross the street. {Pronoun,Inf,Det,Noun}

# crowd
We discussed the crowd. {Pronoun,Past,Det,Noun|!Verb}
They crowd around the window. {Pronoun,Inf,Prep,Det,Noun}

# crush
His crush smiled at him. {Poss,Noun|!Verb,Past,Prep,Pronoun}
You can crush the garlic. {Pronoun,Modal,Inf,Det,Noun}

# cry
That cry seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will cry with relief. {Pronoun,Modal,Inf,Prep,Noun}

# cube
Her cube was memorable. {Poss,Noun|!Verb,Copula,Adj}
I cube the potatoes. {Pronoun,Inf,Det,Plural}

# cue
I noticed the cue. {Pronoun,Past,Det,Noun|!Verb}
He might cue the music. {Pronoun,Modal,Inf,Det,Noun}

# curb
The curb surprised us. {Det,Noun|!Verb,Past,Pronoun}
We curb our enthusiasm. {Pronoun,Inf,Poss,Noun}

# cure
We discussed the cure. {Pronoun,Past,Det,Noun|!Verb}
They cure the meat. {Pronoun,Inf,Det,Noun}

# curl
They described the curl. {Pronoun,Past,Det,Noun|!Verb}
You can curl the ribbon. {Pronoun,Modal,Inf,Det,Noun}

# curve
That curve seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will curve around the lake. {Pronoun,Modal,Inf,Prep,Det,Noun}

# cut
Her cut was memorable. {Poss,Noun|!Verb,Copula,Adj}
I cut the rope. {Pronoun,Inf,Det,Noun}

# dab
I noticed the dab. {Pronoun,Past,Det,Noun|!Verb}
He might dab the wound. {Pronoun,Modal,Inf,Det,Noun}

# damage
The damage surprised us. {Det,Noun|!Verb,Past,Pronoun}
We damage the carpet. {Pronoun,Inf,Det,Noun}

# dance
We discussed the dance. {Pronoun,Past,Det,Noun|!Verb}
They dance until midnight. {Pronoun,Inf,Prep,Noun}

# dare
They described the dare. {Pronoun,Past,Det,Noun|!Verb}
You can dare him to jump. {Pronoun,Modal,Inf,Pronoun,Connector,Inf}

# dart
That dart seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will dart across the road. {Pronoun,Modal,Inf,Prep,Det,Noun}

# date
She ate a date after lunch. {Pronoun,Past,Det,Noun|!Verb,Prep,Noun}
I date the manuscript. {Pronoun,Inf,Det,Noun}
The date on the letter was wrong. {Det,Noun|!Verb,Prep,Det,Noun,Copula,Adj}
They date each other quietly. {Pronoun,Inf,Det,Pronoun,Adv}

# deal
I noticed the deal. {Pronoun,Past,Det,Noun|!Verb}
He might deal the cards. {Pronoun,Modal,Inf,Det,Plural}

# debate
The debate surprised us. {Det,Noun|!Verb,Past,Pronoun}
We debate the issue. {Pronoun,Inf,Det,Noun}

# debut
We discussed the debut. {Pronoun,Past,Det,Noun|!Verb}
They debut the collection. {Pronoun,Inf,Det,Noun}

# decline
They described the decline. {Pronoun,Past,Det,Noun|!Verb}
You can decline the invitation. {Pronoun,Modal,Inf,Det,Noun}

# decrease
That decrease seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will decrease the pressure. {Pronoun,Modal,Inf,Det,Noun}

# defeat
Her defeat was memorable. {Poss,Noun|!Verb,Copula,Adj}
I defeat the champion. {Pronoun,Inf,Det,Noun}

# defect
I noticed the defect. {Pronoun,Past,Det,Noun|!Verb}
He might defect to the opposition. {Pronoun,Modal,Inf,Prep,Det,Noun}

# delay
The delay surprised us. {Det,Noun|!Verb,Past,Pronoun}
We delay the announcement. {Pronoun,Inf,Det,Noun}

# delegate
The delegate addressed the assembly. {Det,Actor,Past,Det,Noun}
They delegate the task. {Pronoun,Inf,Det,Noun}

# delight
They described the delight. {Pronoun,Past,Det,Noun|!Verb}
You can delight the guests. {Pronoun,Modal,Inf,Det,Plural}

# demand
That demand seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will demand an explanation. {Pronoun,Modal,Inf,Det,Noun}

# deposit
Her deposit was memorable. {Poss,Noun|!Verb,Copula,Adj}
I deposit the money. {Pronoun,Inf,Det,Noun}

# desert
The desert stretched beyond the mountains. {Det,Noun|!Verb,Past,Prep,Det,Plural}
He might desert the camp. {Pronoun,Modal,Inf,Det,Noun}

# design
The design surprised us. {Det,Noun|!Verb,Past,Pronoun}
We design a poster. {Pronoun,Inf,Det,Noun}

# desire
We discussed the desire. {Pronoun,Past,Det,Noun|!Verb}
They desire a peaceful life. {Pronoun,Inf,Det,Adj,Noun}

# detail
They described the detail. {Pronoun,Past,Det,Noun|!Verb}
You can detail the procedure. {Pronoun,Modal,Inf,Det,Noun}

# digest
She read a digest of the news. {Pronoun,Past,Det,Noun|!Verb,Prep,Det,Noun}
She will digest the news. {Pronoun,Modal,Inf,Det,Noun}

# dip
Her dip was memorable. {Poss,Noun|!Verb,Copula,Adj}
I dip the brush in water. {Pronoun,Inf,Det,Noun,Prep,Noun}

# discharge
I noticed the discharge. {Pronoun,Past,Det,Noun|!Verb}
He might discharge the patient. {Pronoun,Modal,Inf,Det,Noun}

# disadvantage
The disadvantage surprised us. {Det,Noun|!Verb,Past,Pronoun}
We disadvantage smaller companies. {Pronoun,Inf,Adj,Plural}

# disguise
We discussed the disguise. {Pronoun,Past,Det,Noun|!Verb}
They disguise the taste. {Pronoun,Inf,Det,Noun}

# dish
They described the dish. {Pronoun,Past,Det,Noun|!Verb}
You can dish out the soup. {Pronoun,Modal,Inf,Particle,Det,Noun}

# dislike
That dislike seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will dislike the noise. {Pronoun,Modal,Inf,Det,Noun}

# dispatch
Her dispatch was memorable. {Poss,Noun|!Verb,Copula,Adj}
I dispatch the parcel. {Pronoun,Inf,Det,Noun}

# display
I noticed the display. {Pronoun,Past,Det,Noun|!Verb}
He might display the results. {Pronoun,Modal,Inf,Det,Plural}

# dispute
The dispute surprised us. {Det,Noun|!Verb,Past,Pronoun}
We dispute the claim. {Pronoun,Inf,Det,Noun}

# ditch
We discussed the ditch. {Pronoun,Past,Det,Noun|!Verb}
They ditch the plan. {Pronoun,Inf,Det,Noun}

# dive
They described the dive. {Pronoun,Past,Det,Noun|!Verb}
You can dive into the pool. {Pronoun,Modal,Inf,Prep,Det,Noun}

# divide
A deep divide separated the communities. {Det,Adj,Noun|!Verb,Past,Det,Plural}
She will divide the cake. {Pronoun,Modal,Inf,Det,Noun}

# divorce
Her divorce was memorable. {Poss,Noun|!Verb,Copula,Adj}
I divorce my spouse. {Pronoun,Inf,Poss,Noun}

# dock
I noticed the dock. {Pronoun,Past,Det,Noun|!Verb}
He might dock the boat. {Pronoun,Modal,Inf,Det,Noun}

# document
The document surprised us. {Det,Noun|!Verb,Past,Pronoun}
We document the damage. {Pronoun,Inf,Det,Noun}

# dodge
We discussed the dodge. {Pronoun,Past,Det,Noun|!Verb}
They dodge the question. {Pronoun,Inf,Det,Noun}

# doubt
They described the doubt. {Pronoun,Past,Det,Noun|!Verb}
You can doubt the story. {Pronoun,Modal,Inf,Det,Noun}

# download
That download seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will download the file. {Pronoun,Modal,Inf,Det,Noun}

# draft
A cold draft entered through the window. {Det,Adj,Noun|!Verb,Past,Prep,Det,Noun}
I draft the letter. {Pronoun,Inf,Det,Noun}
She revised the draft. {Pronoun,Past,Det,Noun|!Verb}

# drag
I noticed the drag. {Pronoun,Past,Det,Noun|!Verb}
He might drag the chair. {Pronoun,Modal,Inf,Det,Noun}

# drain
The drain surprised us. {Det,Noun|!Verb,Past,Pronoun}
We drain the tank. {Pronoun,Inf,Det,Noun}

# dream
We discussed the dream. {Pronoun,Past,Det,Noun|!Verb}
They dream about the sea. {Pronoun,Inf,Prep,Det,Noun}

# dress
They described the dress. {Pronoun,Past,Det,Noun|!Verb}
You can dress the baby. {Pronoun,Modal,Inf,Det,Noun}

# drift
That drift seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will drift toward the shore. {Pronoun,Modal,Inf,Prep,Det,Noun}

# drill
Her drill was memorable. {Poss,Noun|!Verb,Copula,Adj}
I drill a hole. {Pronoun,Inf,Det,Noun}

# drink
I noticed the drink. {Pronoun,Past,Det,Noun|!Verb}
He might drink fresh water. {Pronoun,Modal,Inf,Adj,Noun}

# drip
The drip surprised us. {Det,Noun|!Verb,Past,Pronoun}
We drip paint on the floor. {Pronoun,Inf,Noun,Prep,Det,Noun}

# drive
We discussed the drive. {Pronoun,Past,Det,Noun|!Verb}
They drive the truck. {Pronoun,Inf,Det,Noun}

# drone
The drone flew above the field. {Det,Noun|!Verb,Past,Prep,Det,Noun}
You can drone on about politics. {Pronoun,Modal,Inf,Particle,Prep,Noun}
The drone of the engine filled the cabin. {Det,Noun|!Verb,Prep,Det,Noun,Past,Det,Noun}

# drop
That drop seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will drop the package. {Pronoun,Modal,Inf,Det,Noun}

# dub
The dub sounded unnatural. {Det,Noun|!Verb,Past,Adj}
I dub the film. {Pronoun,Inf,Det,Noun}

# duel
I noticed the duel. {Pronoun,Past,Det,Noun|!Verb}
He might duel at dawn. {Pronoun,Modal,Inf,Prep,Noun}

# dump
The dump surprised us. {Det,Noun|!Verb,Past,Pronoun}
We dump the rubbish. {Pronoun,Inf,Det,Noun}

# duplicate
We discussed the duplicate. {Pronoun,Past,Det,Noun|!Verb}
They duplicate the key. {Pronoun,Inf,Det,Noun}

# dye
They described the dye. {Pronoun,Past,Det,Noun|!Verb}
You can dye the fabric. {Pronoun,Modal,Inf,Det,Noun}

# echo
That echo seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will echo her concerns. {Pronoun,Modal,Inf,Poss,Plural}

# edge
Her edge was memorable. {Poss,Noun|!Verb,Copula,Adj}
I edge toward the door. {Pronoun,Inf,Prep,Det,Noun}

# effect
The effect lasted for hours. {Det,Noun|!Verb,Past,Prep,Plural}
He might effect a change. {Pronoun,Modal,Inf,Det,Noun}

# encounter
The encounter surprised us. {Det,Noun|!Verb,Past,Pronoun}
We encounter many obstacles. {Pronoun,Inf,Det,Plural}

# end
We discussed the end. {Pronoun,Past,Det,Noun|!Verb}
They end the discussion. {Pronoun,Inf,Det,Noun}

# envy
They described the envy. {Pronoun,Past,Det,Noun|!Verb}
You can envy your freedom. {Pronoun,Modal,Inf,Poss,Noun}

# escape
That escape seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will escape from prison. {Pronoun,Modal,Inf,Prep,Noun}

# estimate
Her estimate was memorable. {Poss,Noun|!Verb,Copula,Adj}
I estimate the cost. {Pronoun,Inf,Det,Noun}

# excel
# Noun example is the software name; ordinary lowercase excel is verbal.
She opened Excel on her laptop. {Pronoun,Past,Noun|!Verb,Prep,Poss,Noun}
They excel at mathematics. {Pronoun,Inf,Prep,Noun}

# exchange
I noticed the exchange. {Pronoun,Past,Det,Noun|!Verb}
He might exchange gifts. {Pronoun,Modal,Inf,Plural}

# excuse
The excuse surprised us. {Det,Noun|!Verb,Past,Pronoun}
We excuse the interruption. {Pronoun,Inf,Det,Noun}

# exercise
We discussed the exercise. {Pronoun,Past,Det,Noun|!Verb}
They exercise every morning. {Pronoun,Inf,Det,Noun}

# exhaust
The exhaust smelled acrid. {Det,Noun|!Verb,Past,Adj}
You can exhaust the supply. {Pronoun,Modal,Inf,Det,Noun}

# exhibit
That exhibit seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will exhibit the paintings. {Pronoun,Modal,Inf,Det,Plural}

# experience
Her experience was memorable. {Poss,Noun|!Verb,Copula,Adj}
I experience severe pain. {Pronoun,Inf,Adj,Noun}

# experiment
I noticed the experiment. {Pronoun,Past,Det,Noun|!Verb}
He might experiment with color. {Pronoun,Modal,Inf,Prep,Noun}

# export
The export surprised us. {Det,Noun|!Verb,Past,Pronoun}
We export the data. {Pronoun,Inf,Det,Noun}

# extract
She added vanilla extract. {Pronoun,Past,Noun,Noun|!Verb}
They extract the juice. {Pronoun,Inf,Det,Noun}

# eye
They described the eye. {Pronoun,Past,Det,Noun|!Verb}
You can eye the cake. {Pronoun,Modal,Inf,Det,Noun}

# eyeball
That eyeball seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will eyeball the distance. {Pronoun,Modal,Inf,Det,Noun}

# face
Her face was memorable. {Poss,Noun|!Verb,Copula,Adj}
I face the consequences. {Pronoun,Inf,Det,Plural}

# fail
That attempt was a spectacular fail. {Det,Noun,Copula,Det,Adj,Noun|!Verb}
He might fail the inspection. {Pronoun,Modal,Inf,Det,Noun}

# fall
The fall broke her wrist. {Det,Noun|!Verb,Past,Poss,Noun}
We fall behind during the race. {Pronoun,Inf,Particle,Prep,Det,Noun}

# farm
We discussed the farm. {Pronoun,Past,Det,Noun|!Verb}
They farm the land. {Pronoun,Inf,Det,Noun}

# favour
They described the favour. {Pronoun,Past,Det,Noun|!Verb}
You can favour the proposal. {Pronoun,Modal,Inf,Det,Noun}

# fear
That fear seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will fear the worst. {Pronoun,Modal,Inf,Det,Noun}

# feature
Her feature was memorable. {Poss,Noun|!Verb,Copula,Adj}
I feature local artists. {Pronoun,Inf,Adj,Plural}

# feed
The feed attracted birds. {Det,Noun|!Verb,Past,Plural}
He might feed the chickens. {Pronoun,Modal,Inf,Det,Plural}

# feel
The fabric has a silky feel. {Det,Noun,Pres,Det,Adj,Noun|!Verb}
We feel the fabric. {Pronoun,Inf,Det,Noun}

# fence
We discussed the fence. {Pronoun,Past,Det,Noun|!Verb}
They fence the garden. {Pronoun,Inf,Det,Noun}

# field
The field was muddy. {Det,Noun|!Verb,Copula,Adj}
You can field the questions. {Pronoun,Modal,Inf,Det,Plural}

# fight
That fight seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will fight the fire. {Pronoun,Modal,Inf,Det,Noun}

# figure
Her figure was memorable. {Poss,Noun|!Verb,Copula,Adj}
I figure out the answer. {Pronoun,Inf,Particle,Det,Noun}

# file
The file contains the evidence. {Det,Noun|!Verb,Pres,Det,Noun}
He might file the report. {Pronoun,Modal,Inf,Det,Noun}
She sharpened the blade with a file. {Pronoun,Past,Det,Noun,Prep,Det,Noun|!Verb}

# film
The film surprised us. {Det,Noun|!Verb,Past,Pronoun}
We film the ceremony. {Pronoun,Inf,Det,Noun}

# filter
We discussed the filter. {Pronoun,Past,Det,Noun|!Verb}
They filter the water. {Pronoun,Inf,Det,Noun}

# finance
They described the finance. {Pronoun,Past,Det,Noun|!Verb}
You can finance the project. {Pronoun,Modal,Inf,Det,Noun}

# finish
That finish seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will finish the job. {Pronoun,Modal,Inf,Det,Noun}

# fire
Her fire was memorable. {Poss,Noun|!Verb,Copula,Adj}
I fire the cannon. {Pronoun,Inf,Det,Noun}

# fish
I noticed the fish. {Pronoun,Past,Det,Noun|!Verb}
He might fish in the river. {Pronoun,Modal,Inf,Prep,Det,Noun}

# fit
The jacket was a perfect fit. {Det,Noun,Copula,Det,Adj,Noun|!Verb}
We fit the description. {Pronoun,Inf,Det,Noun}

# fix
We discussed the fix. {Pronoun,Past,Det,Noun|!Verb}
They fix the bicycle. {Pronoun,Inf,Det,Noun}

# flag
They described the flag. {Pronoun,Past,Det,Noun|!Verb}
You can flag the error. {Pronoun,Modal,Inf,Det,Noun}

# flake
That flake seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will flake the fish. {Pronoun,Modal,Inf,Det,Noun}

# flame
Her flame was memorable. {Poss,Noun|!Verb,Copula,Adj}
I flame other users. {Pronoun,Inf,Adj,Plural}

# flare
I noticed the flare. {Pronoun,Past,Det,Noun|!Verb}
He might flare up without warning. {Pronoun,Modal,Inf,Particle,Prep,Noun}

# flash
The flash surprised us. {Det,Noun|!Verb,Past,Pronoun}
We flash the lights. {Pronoun,Inf,Det,Plural}

# flavor
We discussed the flavor. {Pronoun,Past,Det,Noun|!Verb}
They flavor the soup. {Pronoun,Inf,Det,Noun}

# flavour
They described the flavour. {Pronoun,Past,Det,Noun|!Verb}
You can flavour the soup. {Pronoun,Modal,Inf,Det,Noun}

# flesh
The flesh of the fruit was sweet. {Det,Noun|!Verb,Prep,Det,Noun,Copula,Adj}
She will flesh out the proposal. {Pronoun,Modal,Inf,Particle,Det,Noun}

# flip
Her flip was memorable. {Poss,Noun|!Verb,Copula,Adj}
I flip the pancake. {Pronoun,Inf,Det,Noun}

# float
I noticed the float. {Pronoun,Past,Det,Noun|!Verb}
He might float on the water. {Pronoun,Modal,Inf,Prep,Det,Noun}

# flock
A flock crossed the sky. {Det,Noun|!Verb,Past,Det,Noun}
We flock to the beach. {Pronoun,Inf,Prep,Det,Noun}

# flood
We discussed the flood. {Pronoun,Past,Det,Noun|!Verb}
They flood the fields. {Pronoun,Inf,Det,Plural}

# flow
They described the flow. {Pronoun,Past,Det,Noun|!Verb}
The streams flow into the lake. {Det,Noun,Inf,Prep,Det,Noun}

# flower
That flower seemed unusual. {Det,Noun|!Verb,Past,Adj}
The shrubs flower in spring. {Det,Noun,Inf,Prep,Noun}

# fly
A fly landed on the plate. {Det,Noun|!Verb,Past,Prep,Det,Noun}
I fly the kite. {Pronoun,Inf,Det,Noun}

# focus
I noticed the focus. {Pronoun,Past,Det,Noun|!Verb}
He might focus on the task. {Pronoun,Modal,Inf,Prep,Det,Noun}

# fog
The fog surprised us. {Det,Noun|!Verb,Past,Pronoun}
We fog the mirror. {Pronoun,Inf,Det,Noun}

# foil
She wrapped the sandwich in foil. {Pronoun,Past,Det,Noun,Prep,Noun|!Verb}
They foil the plot. {Pronoun,Inf,Det,Noun}

# fold
They described the fold. {Pronoun,Past,Det,Noun|!Verb}
You can fold the paper. {Pronoun,Modal,Inf,Det,Noun}

# force
That force seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will force the door. {Pronoun,Modal,Inf,Det,Noun}

# forecast
Her forecast was memorable. {Poss,Noun|!Verb,Copula,Adj}
I forecast the weather. {Pronoun,Inf,Det,Noun}

# form
I noticed the form. {Pronoun,Past,Det,Noun|!Verb}
He might form a circle. {Pronoun,Modal,Inf,Det,Noun}

# format
The format surprised us. {Det,Noun|!Verb,Past,Pronoun}
We format the document. {Pronoun,Inf,Det,Noun}

# forward
The forward scored twice. {Det,Actor,Past,Adv}
They forward the message. {Pronoun,Inf,Det,Noun}

# fracture
They described the fracture. {Pronoun,Past,Det,Noun|!Verb}
You can fracture the rock. {Pronoun,Modal,Inf,Det,Noun}

# fragment
That fragment seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will fragment the market. {Pronoun,Modal,Inf,Det,Noun}

# frame
Her frame was memorable. {Poss,Noun|!Verb,Copula,Adj}
I frame the picture. {Pronoun,Inf,Det,Noun}

# franchise
I noticed the franchise. {Pronoun,Past,Det,Noun|!Verb}
He might franchise the business. {Pronoun,Modal,Inf,Det,Noun}

# frost
The frost surprised us. {Det,Noun|!Verb,Past,Pronoun}
We frost the cake. {Pronoun,Inf,Det,Noun}

# frown
We discussed the frown. {Pronoun,Past,Det,Noun|!Verb}
They frown at the suggestion. {Pronoun,Inf,Prep,Det,Noun}

# fry
A fry fell from the carton. {Det,Noun|!Verb,Past,Prep,Det,Noun}
You can fry the onions. {Pronoun,Modal,Inf,Det,Plural}
The fry swam near the surface. {Det,Noun|!Verb,Past,Prep,Det,Noun}

# fuck
She did not give a fuck. {Pronoun,Past,Negative,Inf,Det,Noun|!Verb}
She will fuck up the schedule. {Pronoun,Modal,Inf,Particle,Det,Noun}

# fuel
Her fuel was memorable. {Poss,Noun|!Verb,Copula,Adj}
I fuel the debate. {Pronoun,Inf,Det,Noun}

# function
I noticed the function. {Pronoun,Past,Det,Noun|!Verb}
He might function without supervision. {Pronoun,Modal,Inf,Prep,Noun}

# fund
The fund surprised us. {Det,Noun|!Verb,Past,Pronoun}
We fund the research. {Pronoun,Inf,Det,Noun}

# fuss
We discussed the fuss. {Pronoun,Past,Det,Noun|!Verb}
They fuss over the baby. {Pronoun,Inf,Prep,Det,Noun}

# fuzz
The peach was covered in fuzz. {Det,Noun,Copula,Adj,Prep,Noun|!Verb}
You can fuzz the input. {Pronoun,Modal,Inf,Det,Noun}

# gag
That gag seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will gag on the smoke. {Pronoun,Modal,Inf,Prep,Det,Noun}

# gain
Her gain was memorable. {Poss,Noun|!Verb,Copula,Adj}
I gain their trust. {Pronoun,Inf,Poss,Noun}

# game
The game ended in a draw. {Det,Noun|!Verb,Past,Prep,Det,Noun}
He might game the system. {Pronoun,Modal,Inf,Det,Noun}

# gang
The gang surprised us. {Det,Noun|!Verb,Past,Pronoun}
We gang up on him. {Pronoun,Inf,Particle,Prep,Pronoun}

# gas
The gas escaped through the valve. {Det,Noun|!Verb,Past,Prep,Det,Noun}
They gas up the car. {Pronoun,Inf,Particle,Det,Noun}

# gate
They described the gate. {Pronoun,Past,Det,Noun|!Verb}
You can gate the entrance. {Pronoun,Modal,Inf,Det,Noun}

# gaze
That gaze seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will gaze at the stars. {Pronoun,Modal,Inf,Prep,Det,Plural}

# gear
Her gear was memorable. {Poss,Noun|!Verb,Copula,Adj}
I gear the lessons toward beginners. {Pronoun,Inf,Det,Noun,Prep,Plural}

# gift
I noticed the gift. {Pronoun,Past,Det,Noun|!Verb}
He might gift her a painting. {Pronoun,Modal,Inf,Pronoun,Det,Noun}

# glare
The glare surprised us. {Det,Noun|!Verb,Past,Pronoun}
We glare at the intruder. {Pronoun,Inf,Prep,Det,Noun}

# gloss
The gloss faded from the paint. {Det,Noun|!Verb,Past,Prep,Det,Noun}
They gloss over the details. {Pronoun,Inf,Particle,Det,Plural}

# glow
They described the glow. {Pronoun,Past,Det,Noun|!Verb}
You can glow with pride. {Pronoun,Modal,Inf,Prep,Noun}

# glue
That glue seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will glue the pieces together. {Pronoun,Modal,Inf,Det,Noun,Adv}

# gossip
Her gossip was memorable. {Poss,Noun|!Verb,Copula,Adj}
I gossip about the neighbors. {Pronoun,Inf,Prep,Det,Plural}

# grade
I noticed the grade. {Pronoun,Past,Det,Noun|!Verb}
He might grade the papers. {Pronoun,Modal,Inf,Det,Plural}

# grasp
The grasp surprised us. {Det,Noun|!Verb,Past,Pronoun}
We grasp the handle. {Pronoun,Inf,Det,Noun}

# grill
We discussed the grill. {Pronoun,Past,Det,Noun|!Verb}
They grill the vegetables. {Pronoun,Inf,Det,Plural}

# grind
The daily grind exhausted her. {Det,Adj,Noun|!Verb,Past,Pronoun}
You can grind the beans. {Pronoun,Modal,Inf,Det,Plural}

# grip
That grip seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will grip the railing. {Pronoun,Modal,Inf,Det,Noun}

# ground
The ground shook. {Det,Noun|!Verb,Past}
I ground the aircraft. {Pronoun,Inf,Det,Noun}
She ground the coffee. {Pronoun,Past,Det,Noun}

# growth
# No ordinary verb sense supplied; noun use only.
The growth of the plant slowed. {Det,Noun|!Verb,Prep,Det,Noun,Past}

# grumble
I noticed the grumble. {Pronoun,Past,Det,Noun|!Verb}
He might grumble about the delay. {Pronoun,Modal,Inf,Prep,Det,Noun}

# guarantee
The guarantee surprised us. {Det,Noun|!Verb,Past,Pronoun}
We guarantee the results. {Pronoun,Inf,Det,Plural}

# guard
We discussed the guard. {Pronoun,Past,Det,Noun|!Verb}
They guard the entrance. {Pronoun,Inf,Det,Noun}

# guess
They described the guess. {Pronoun,Past,Det,Noun|!Verb}
You can guess the answer. {Pronoun,Modal,Inf,Det,Noun}

# gulp
That gulp seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will gulp the water. {Pronoun,Modal,Inf,Det,Noun}

# gun
Her gun was memorable. {Poss,Noun|!Verb,Copula,Adj}
I gun the engine. {Pronoun,Inf,Det,Noun}

# hack
I noticed the hack. {Pronoun,Past,Det,Noun|!Verb}
He might hack the software. {Pronoun,Modal,Inf,Det,Noun}

# ham
The ham tasted salty. {Det,Noun|!Verb,Past,Adj}
We ham it up. {Pronoun,Inf,Pronoun,Particle}

# hammer
We discussed the hammer. {Pronoun,Past,Det,Noun|!Verb}
They hammer the nail. {Pronoun,Inf,Det,Noun}

# hand
They described the hand. {Pronoun,Past,Det,Noun|!Verb}
You can hand her the envelope. {Pronoun,Modal,Inf,Pronoun,Det,Noun}

# handle
That handle seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will handle the complaints. {Pronoun,Modal,Inf,Det,Plural}

# harbour
Her harbour was memorable. {Poss,Noun|!Verb,Copula,Adj}
I harbour a grudge. {Pronoun,Inf,Det,Noun}

# harm
I noticed the harm. {Pronoun,Past,Det,Noun|!Verb}
He might harm the plants. {Pronoun,Modal,Inf,Det,Plural}

# harness
The harness surprised us. {Det,Noun|!Verb,Past,Pronoun}
We harness the wind. {Pronoun,Inf,Det,Noun}

# harvest
We discussed the harvest. {Pronoun,Past,Det,Noun|!Verb}
They harvest the wheat. {Pronoun,Inf,Det,Noun}

# hash
The hash identifies the file. {Det,Noun|!Verb,Pres,Det,Noun}
You can hash out the details. {Pronoun,Modal,Inf,Particle,Det,Plural}

# hatch
That hatch seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will hatch a plan. {Pronoun,Modal,Inf,Det,Noun}

# hate
Her hate was memorable. {Poss,Noun|!Verb,Copula,Adj}
I hate the cold. {Pronoun,Inf,Det,Noun}

# haunt
The cafe was her favorite haunt. {Det,Noun,Copula,Poss,Adj,Noun|!Verb}
He might haunt the castle. {Pronoun,Modal,Inf,Det,Noun}

# head
His head hurt. {Poss,Noun|!Verb,Past}
We head toward the exit. {Pronoun,Inf,Prep,Det,Noun}

# heat
We discussed the heat. {Pronoun,Past,Det,Noun|!Verb}
They heat the oven. {Pronoun,Inf,Det,Noun}

# hedge
They described the hedge. {Pronoun,Past,Det,Noun|!Verb}
You can hedge our bets. {Pronoun,Modal,Inf,Poss,Plural}

# help
That help seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will help the neighbors. {Pronoun,Modal,Inf,Det,Plural}

# highlight
Her highlight was memorable. {Poss,Noun|!Verb,Copula,Adj}
I highlight the changes. {Pronoun,Inf,Det,Plural}

# hike
I noticed the hike. {Pronoun,Past,Det,Noun|!Verb}
He might hike through the forest. {Pronoun,Modal,Inf,Prep,Det,Noun}

# hint
The hint surprised us. {Det,Noun|!Verb,Past,Pronoun}
We hint at the answer. {Pronoun,Inf,Prep,Det,Noun}

# hire
We discussed the hire. {Pronoun,Past,Det,Noun|!Verb}
They hire a carpenter. {Pronoun,Inf,Det,Noun}

# hit
They described the hit. {Pronoun,Past,Det,Noun|!Verb}
You can hit the target. {Pronoun,Modal,Inf,Det,Noun}

# hold
The hold contained grain. {Det,Noun|!Verb,Past,Noun}
She will hold the rope. {Pronoun,Modal,Inf,Det,Noun}

# hole
Her hole was memorable. {Poss,Noun|!Verb,Copula,Adj}
I hole the putt. {Pronoun,Inf,Det,Noun}

# honor
I noticed the honor. {Pronoun,Past,Det,Noun|!Verb}
He might honor the agreement. {Pronoun,Modal,Inf,Det,Noun}

# honour
The honour surprised us. {Det,Noun|!Verb,Past,Pronoun}
We honour the agreement. {Pronoun,Inf,Det,Noun}

# hook
We discussed the hook. {Pronoun,Past,Det,Noun|!Verb}
They hook the trailer to the truck. {Pronoun,Inf,Det,Noun,Prep,Det,Noun}

# hop
They described the hop. {Pronoun,Past,Det,Noun|!Verb}
You can hop over the puddle. {Pronoun,Modal,Inf,Prep,Det,Noun}

# hope
That hope seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will hope for sunshine. {Pronoun,Modal,Inf,Prep,Noun}

# horse
Her horse was memorable. {Poss,Noun|!Verb,Copula,Adj}
I horse around in the yard. {Pronoun,Inf,Particle,Prep,Det,Noun}

# house
The house needs paint. {Det,Noun|!Verb,Pres,Noun}
He might house the collection. {Pronoun,Modal,Inf,Det,Noun}

# hug
The hug surprised us. {Det,Noun|!Verb,Past,Pronoun}
We hug the child. {Pronoun,Inf,Det,Noun}

# hunt
We discussed the hunt. {Pronoun,Past,Det,Noun|!Verb}
They hunt for clues. {Pronoun,Inf,Prep,Plural}

# impact
They described the impact. {Pronoun,Past,Det,Noun|!Verb}
You can impact the environment. {Pronoun,Modal,Inf,Det,Noun}

# implement
The implement lay beside the bench. {Det,Noun|!Verb,Past,Prep,Det,Noun}
She will implement the plan. {Pronoun,Modal,Inf,Det,Noun}

# incline
Her incline was memorable. {Poss,Noun|!Verb,Copula,Adj}
I incline my head. {Pronoun,Inf,Poss,Noun}

# inconvenience
I noticed the inconvenience. {Pronoun,Past,Det,Noun|!Verb}
He might inconvenience the guests. {Pronoun,Modal,Inf,Det,Plural}

# increase
The increase surprised us. {Det,Noun|!Verb,Past,Pronoun}
We increase the temperature. {Pronoun,Inf,Det,Noun}

# index
We discussed the index. {Pronoun,Past,Det,Noun|!Verb}
They index the files. {Pronoun,Inf,Det,Plural}

# influence
They described the influence. {Pronoun,Past,Det,Noun|!Verb}
You can influence the outcome. {Pronoun,Modal,Inf,Det,Noun}

# inhale
A deep inhale steadied her. {Det,Adj,Noun|!Verb,Past,Pronoun}
She will inhale the steam. {Pronoun,Modal,Inf,Det,Noun}

# ink
Her ink was memorable. {Poss,Noun|!Verb,Copula,Adj}
I ink the drawing. {Pronoun,Inf,Det,Noun}

# insert
I noticed the insert. {Pronoun,Past,Det,Noun|!Verb}
He might insert the card. {Pronoun,Modal,Inf,Det,Noun}

# intent
# Noun and adjective senses; no ordinary verb sense supplied.
His intent was clear. {Poss,Noun|!Verb,Copula,Adj}
She was intent on her work. {Pronoun,Copula,Adj,Prep,Poss,Noun}

# interest
The interest surprised us. {Det,Noun|!Verb,Past,Pronoun}
We interest her in science. {Pronoun,Inf,Pronoun,Prep,Noun}

# interface
We discussed the interface. {Pronoun,Past,Det,Noun|!Verb}
They interface with the database. {Pronoun,Inf,Prep,Det,Noun}

# interview
They described the interview. {Pronoun,Past,Det,Noun|!Verb}
You can interview the candidate. {Pronoun,Modal,Inf,Det,Noun}

# inventory
That inventory seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will inventory the supplies. {Pronoun,Modal,Inf,Det,Plural}

# invoice
Her invoice was memorable. {Poss,Noun|!Verb,Copula,Adj}
I invoice the client. {Pronoun,Inf,Det,Noun}

# iron
The iron was hot. {Det,Noun|!Verb,Copula,Adj}
He might iron the shirt. {Pronoun,Modal,Inf,Det,Noun}

# issue
The latest issue contains an interview. {Det,Adj,Noun|!Verb,Pres,Det,Noun}
We issue a warning. {Pronoun,Inf,Det,Noun}

# jam
The jam tasted sweet. {Det,Noun|!Verb,Past,Adj}
They jam the signal. {Pronoun,Inf,Det,Noun}
A traffic jam delayed us. {Det,Noun,Noun|!Verb,Past,Pronoun}

# jazz
They described the jazz. {Pronoun,Past,Det,Noun|!Verb}
You can jazz up the room. {Pronoun,Modal,Inf,Particle,Det,Noun}

# joke
That joke seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will joke about the incident. {Pronoun,Modal,Inf,Prep,Det,Noun}

# juice
Her juice was memorable. {Poss,Noun|!Verb,Copula,Adj}
I juice the oranges. {Pronoun,Inf,Det,Plural}

# jump
I noticed the jump. {Pronoun,Past,Det,Noun|!Verb}
He might jump over the fence. {Pronoun,Modal,Inf,Prep,Det,Noun}

# keel
The keel surprised us. {Det,Noun|!Verb,Past,Pronoun}
We keel over from exhaustion. {Pronoun,Inf,Particle,Prep,Noun}

# key
The key opened the cabinet. {Det,Noun|!Verb,Past,Det,Noun}
They key the data into the system. {Pronoun,Inf,Det,Noun,Prep,Det,Noun}
The key to success is patience. {Det,Noun|!Verb,Prep,Noun,Copula,Noun}

# kick
They described the kick. {Pronoun,Past,Det,Noun|!Verb}
You can kick the ball. {Pronoun,Modal,Inf,Det,Noun}

# kid
The kid climbed the tree. {Det,Noun|!Verb,Past,Det,Noun}
She will kid about the mistake. {Pronoun,Modal,Inf,Prep,Det,Noun}

# kill
Her kill was memorable. {Poss,Noun|!Verb,Copula,Adj}
I kill the weeds. {Pronoun,Inf,Det,Plural}

# kiss
I noticed the kiss. {Pronoun,Past,Det,Noun|!Verb}
He might kiss the baby. {Pronoun,Modal,Inf,Det,Noun}

# knock
The knock surprised us. {Det,Noun|!Verb,Past,Pronoun}
We knock on the door. {Pronoun,Inf,Prep,Det,Noun}

# label
We discussed the label. {Pronoun,Past,Det,Noun|!Verb}
They label the jars. {Pronoun,Inf,Det,Plural}

# labor
They described the labor. {Pronoun,Past,Det,Noun|!Verb}
You can labor under difficult conditions. {Pronoun,Modal,Inf,Prep,Adj,Plural}

# labour
That labour seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will labour under difficult conditions. {Pronoun,Modal,Inf,Prep,Adj,Plural}

# lace
The lace tore easily. {Det,Noun|!Verb,Past,Adv}
I lace the boots. {Pronoun,Inf,Det,Plural}

# lack
I noticed the lack. {Pronoun,Past,Det,Noun|!Verb}
He might lack the experience. {Pronoun,Modal,Inf,Det,Noun}

# land
The land surprised us. {Det,Noun|!Verb,Past,Pronoun}
We land the aircraft. {Pronoun,Inf,Det,Noun}

# lap
The kitten slept on her lap. {Det,Noun,Past,Prep,Poss,Noun|!Verb}
They lap the circuit. {Pronoun,Inf,Det,Noun}

# latch
They described the latch. {Pronoun,Past,Det,Noun|!Verb}
You can latch the gate. {Pronoun,Modal,Inf,Det,Noun}

# laugh
That laugh seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will laugh at the joke. {Pronoun,Modal,Inf,Prep,Det,Noun}

# launch
Her launch was memorable. {Poss,Noun|!Verb,Copula,Adj}
I launch the boat. {Pronoun,Inf,Det,Noun}

# leach
The leach removed copper from the ore. {Det,Noun|!Verb,Past,Noun,Prep,Det,Noun}
He might leach the minerals from the soil. {Pronoun,Modal,Inf,Det,Noun,Prep,Det,Noun}

# lead
The lead pipe was heavy. {Det,Noun|!Verb,Noun,Copula,Adj}
We lead the expedition. {Pronoun,Inf,Det,Noun}
She took the lead in the race. {Pronoun,Past,Det,Noun|!Verb,Prep,Det,Noun}

# leak
We discussed the leak. {Pronoun,Past,Det,Noun|!Verb}
They leak the report. {Pronoun,Inf,Det,Noun}

# leap
They described the leap. {Pronoun,Past,Det,Noun|!Verb}
You can leap over the wall. {Pronoun,Modal,Inf,Prep,Det,Noun}

# lease
That lease seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will lease the building. {Pronoun,Modal,Inf,Det,Noun}

# lecture
Her lecture was memorable. {Poss,Noun|!Verb,Copula,Adj}
I lecture on history. {Pronoun,Inf,Prep,Noun}

# leech
A leech clung to his ankle. {Det,Noun|!Verb,Past,Prep,Poss,Noun}
He might leech off the community. {Pronoun,Modal,Inf,Prep,Det,Noun}

# level
The level lay beside the hammer. {Det,Noun|!Verb,Past,Prep,Det,Noun}
We level the ground. {Pronoun,Inf,Det,Noun}

# levy
We discussed the levy. {Pronoun,Past,Det,Noun|!Verb}
They levy a tax. {Pronoun,Inf,Det,Noun}

# license
They described the license. {Pronoun,Past,Det,Noun|!Verb}
You can license the software. {Pronoun,Modal,Inf,Det,Noun}

# lick
That lick seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will lick the spoon. {Pronoun,Modal,Inf,Det,Noun}

# lift
Her lift was memorable. {Poss,Noun|!Verb,Copula,Adj}
I lift the box. {Pronoun,Inf,Det,Noun}

# limit
I noticed the limit. {Pronoun,Past,Det,Noun|!Verb}
He might limit the damage. {Pronoun,Modal,Inf,Det,Noun}

# line
The line surprised us. {Det,Noun|!Verb,Past,Pronoun}
We line the drawer. {Pronoun,Inf,Det,Noun}

# link
We discussed the link. {Pronoun,Past,Det,Noun|!Verb}
They link the accounts. {Pronoun,Inf,Det,Plural}

# list
They described the list. {Pronoun,Past,Det,Noun|!Verb}
You can list the ingredients. {Pronoun,Modal,Inf,Det,Plural}

# load
That load seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will load the truck. {Pronoun,Modal,Inf,Det,Noun}

# loan
Her loan was memorable. {Poss,Noun|!Verb,Copula,Adj}
I loan her the money. {Pronoun,Inf,Pronoun,Det,Noun}

# lobby
The lobby was crowded. {Det,Noun|!Verb,Copula,Adj}
He might lobby for reform. {Pronoun,Modal,Inf,Prep,Noun}

# lock
The lock surprised us. {Det,Noun|!Verb,Past,Pronoun}
We lock the door. {Pronoun,Inf,Det,Noun}

# log
The log burned slowly. {Det,Noun|!Verb,Past,Adv}
They log the hours. {Pronoun,Inf,Det,Plural}

# look
They described the look. {Pronoun,Past,Det,Noun|!Verb}
You can look through the window. {Pronoun,Modal,Inf,Prep,Det,Noun}

# loot
That loot seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will loot the warehouse. {Pronoun,Modal,Inf,Det,Noun}

# love
Her love was memorable. {Poss,Noun|!Verb,Copula,Adj}
I love the music. {Pronoun,Inf,Det,Noun}

# lump
I noticed the lump. {Pronoun,Past,Det,Noun|!Verb}
He might lump the expenses together. {Pronoun,Modal,Inf,Det,Noun,Adv}

# lust
The lust surprised us. {Det,Noun|!Verb,Past,Pronoun}
We lust after wealth. {Pronoun,Inf,Prep,Noun}

# mail
We discussed the mail. {Pronoun,Past,Det,Noun|!Verb}
They mail the letter. {Pronoun,Inf,Det,Noun}

# mandate
They described the mandate. {Pronoun,Past,Det,Noun|!Verb}
You can mandate regular inspections. {Pronoun,Modal,Inf,Adj,Plural}

# manner
# No ordinary verb sense supplied; noun use only.
Her manner was calm. {Poss,Noun|!Verb,Copula,Adj}

# manoeuvre
That manoeuvre seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will manoeuvre the boat. {Pronoun,Modal,Inf,Det,Noun}

# map
Her map was memorable. {Poss,Noun|!Verb,Copula,Adj}
I map the coast. {Pronoun,Inf,Det,Noun}

# market
I noticed the market. {Pronoun,Past,Det,Noun|!Verb}
He might market the product. {Pronoun,Modal,Inf,Det,Noun}

# mash
The mash surprised us. {Det,Noun|!Verb,Past,Pronoun}
We mash the potatoes. {Pronoun,Inf,Det,Plural}

# mask
We discussed the mask. {Pronoun,Past,Det,Noun|!Verb}
They mask the smell. {Pronoun,Inf,Det,Noun}

# master
The master taught the apprentice. {Det,Noun|!Verb,Past,Det,Noun}
You can master the technique. {Pronoun,Modal,Inf,Det,Noun}

# match
The match lit the candle. {Det,Noun|!Verb,Past,Det,Noun}
She will match the colors. {Pronoun,Modal,Inf,Det,Plural}
The match ended in a draw. {Det,Noun|!Verb,Past,Prep,Det,Noun}

# matter
The matter remains unresolved. {Det,Noun|!Verb,Pres,Adj}
I matter to the community. {Pronoun,Inf,Prep,Det,Noun}

# measure
I noticed the measure. {Pronoun,Past,Det,Noun|!Verb}
He might measure the room. {Pronoun,Modal,Inf,Det,Noun}

# mention
The mention surprised us. {Det,Noun|!Verb,Past,Pronoun}
We mention the problem. {Pronoun,Inf,Det,Noun}

# merge
The merge introduced a conflict. {Det,Noun|!Verb,Past,Det,Noun}
They merge the files. {Pronoun,Inf,Det,Plural}

# merit
They described the merit. {Pronoun,Past,Det,Noun|!Verb}
You can merit a reward. {Pronoun,Modal,Inf,Det,Noun}

# mess
That mess seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will mess with the settings. {Pronoun,Modal,Inf,Prep,Det,Plural}

# milk
Her milk was memorable. {Poss,Noun|!Verb,Copula,Adj}
I milk the cow. {Pronoun,Inf,Det,Noun}

# mind
I noticed the mind. {Pronoun,Past,Det,Noun|!Verb}
He might mind the children. {Pronoun,Modal,Inf,Det,Plural}

# mine
The mine closed after the accident. {Det,Noun|!Verb,Past,Prep,Det,Noun}
We mine the coal. {Pronoun,Inf,Det,Noun}
The mine exploded. {Det,Noun|!Verb,Past}
The red bicycle is mine. {Det,Adj,Noun,Copula,Pronoun}

# mirror
We discussed the mirror. {Pronoun,Past,Det,Noun|!Verb}
They mirror the movement. {Pronoun,Inf,Det,Noun}

# miss
They described the miss. {Pronoun,Past,Det,Noun|!Verb}
You can miss the bus. {Pronoun,Modal,Inf,Det,Noun}

# mistake
That mistake seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will mistake him for a waiter. {Pronoun,Modal,Inf,Pronoun,Prep,Det,Noun}

# mix
Her mix was memorable. {Poss,Noun|!Verb,Copula,Adj}
I mix the ingredients. {Pronoun,Inf,Det,Plural}

# mock
She passed the mock before the final exam. {Pronoun,Past,Det,Noun|!Verb,Prep,Det,Adj,Noun}
He might mock the proposal. {Pronoun,Modal,Inf,Det,Noun}

# model
The model surprised us. {Det,Noun|!Verb,Past,Pronoun}
We model the dress. {Pronoun,Inf,Det,Noun}

# mold
The mold covered the bread. {Det,Noun|!Verb,Past,Det,Noun}
They mold the clay. {Pronoun,Inf,Det,Noun}

# monitor
The monitor displayed the results. {Det,Noun|!Verb,Past,Det,Plural}
You can monitor the temperature. {Pronoun,Modal,Inf,Det,Noun}

# motion
That motion seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will motion toward the exit. {Pronoun,Modal,Inf,Prep,Det,Noun}

# monkey
Her monkey was memorable. {Poss,Noun|!Verb,Copula,Adj}
I monkey with the controls. {Pronoun,Inf,Prep,Det,Plural}

# mop
I noticed the mop. {Pronoun,Past,Det,Noun|!Verb}
He might mop the floor. {Pronoun,Modal,Inf,Det,Noun}

# mount
The mount held the camera. {Det,Noun|!Verb,Past,Det,Noun}
We mount the horse. {Pronoun,Inf,Det,Noun}

# mouth
We discussed the mouth. {Pronoun,Past,Det,Noun|!Verb}
They mouth the words. {Pronoun,Inf,Det,Plural}

# move
They described the move. {Pronoun,Past,Det,Noun|!Verb}
You can move the furniture. {Pronoun,Modal,Inf,Det,Noun}

# murder
That murder seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will murder the melody. {Pronoun,Modal,Inf,Det,Noun}

# name
Her name was memorable. {Poss,Noun|!Verb,Copula,Adj}
I name the winner. {Pronoun,Inf,Det,Noun}

# need
I noticed the need. {Pronoun,Past,Det,Noun|!Verb}
He might need a holiday. {Pronoun,Modal,Inf,Det,Noun}

# neglect
The neglect surprised us. {Det,Noun|!Verb,Past,Pronoun}
We neglect the garden. {Pronoun,Inf,Det,Noun}

# net
The net caught several fish. {Det,Noun|!Verb,Past,Det,Noun}
They net the fish. {Pronoun,Inf,Det,Noun}

# network
They described the network. {Pronoun,Past,Det,Noun|!Verb}
You can network with colleagues. {Pronoun,Modal,Inf,Prep,Plural}

# nod
That nod seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will nod in agreement. {Pronoun,Modal,Inf,Prep,Noun}

# note
Her note was memorable. {Poss,Noun|!Verb,Copula,Adj}
I note the difference. {Pronoun,Inf,Det,Noun}

# notice
I noticed the notice. {Pronoun,Past,Det,Noun|!Verb}
He might notice the smell. {Pronoun,Modal,Inf,Det,Noun}

# number
Her number appeared on the screen. {Poss,Noun|!Verb,Past,Prep,Det,Noun}
We number the pages. {Pronoun,Inf,Det,Plural}

# nurse
We discussed the nurse. {Pronoun,Past,Det,Noun|!Verb}
They nurse the patient. {Pronoun,Inf,Det,Noun}

# object
The object fell from the shelf. {Det,Noun|!Verb,Past,Prep,Det,Noun}
You can object to the proposal. {Pronoun,Modal,Inf,Prep,Det,Noun}

# offer
That offer seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will offer a solution. {Pronoun,Modal,Inf,Det,Noun}

# oil
Her oil was memorable. {Poss,Noun|!Verb,Copula,Adj}
I oil the hinges. {Pronoun,Inf,Det,Plural}

# ooze
I noticed the ooze. {Pronoun,Past,Det,Noun|!Verb}
He might ooze confidence. {Pronoun,Modal,Inf,Noun}

# orbit
The orbit surprised us. {Det,Noun|!Verb,Past,Pronoun}
We orbit the planet. {Pronoun,Inf,Det,Noun}

# order
We discussed the order. {Pronoun,Past,Det,Noun|!Verb}
They order the soup. {Pronoun,Inf,Det,Noun}

# orient
The orient of the pearl shimmered. {Det,Noun|!Verb,Prep,Det,Noun,Past}
You can orient the map. {Pronoun,Modal,Inf,Det,Noun}

# outline
That outline seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will outline the plan. {Pronoun,Modal,Inf,Det,Noun}

# overpass
The overpass spans the highway. {Det,Noun|!Verb,Pres,Det,Noun}
I overpass the boundary. {Pronoun,Inf,Det,Noun}

# pack
I noticed the pack. {Pronoun,Past,Det,Noun|!Verb}
He might pack the suitcase. {Pronoun,Modal,Inf,Det,Noun}

# package
The package surprised us. {Det,Noun|!Verb,Past,Pronoun}
We package the goods. {Pronoun,Inf,Det,Plural}

# paint
We discussed the paint. {Pronoun,Past,Det,Noun|!Verb}
They paint the fence. {Pronoun,Inf,Det,Noun}

# pair
They described the pair. {Pronoun,Past,Det,Noun|!Verb}
You can pair the socks. {Pronoun,Modal,Inf,Det,Plural}

# paise
# No ordinary verb sense supplied; noun use only.
She counted the paise carefully. {Pronoun,Past,Det,Plural,Adv}

# pan
The pan was hot. {Det,Noun|!Verb,Copula,Adj}
She will pan the camera. {Pronoun,Modal,Inf,Det,Noun}

# panic
Her panic was memorable. {Poss,Noun|!Verb,Copula,Adj}
I panic under pressure. {Pronoun,Inf,Prep,Noun}

# park
The park closes at dusk. {Det,Noun|!Verb,Pres,Prep,Noun}
He might park the car. {Pronoun,Modal,Inf,Det,Noun}

# part
The part surprised us. {Det,Noun|!Verb,Past,Pronoun}
We part the curtains. {Pronoun,Inf,Det,Plural}

# party
The party nominated a candidate. {Det,Noun|!Verb,Past,Det,Noun}
They party until dawn. {Pronoun,Inf,Prep,Noun}

# pass
Snow blocked the pass. {Noun,Past,Det,Noun|!Verb}
You can pass the salt. {Pronoun,Modal,Inf,Det,Noun}

# paste
That paste seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will paste the label. {Pronoun,Modal,Inf,Det,Noun}

# patch
Her patch was memorable. {Poss,Noun|!Verb,Copula,Adj}
I patch the hole. {Pronoun,Inf,Det,Noun}

# patent
I noticed the patent. {Pronoun,Past,Det,Noun|!Verb}
He might patent the invention. {Pronoun,Modal,Inf,Det,Noun}

# pause
The pause surprised us. {Det,Noun|!Verb,Past,Pronoun}
We pause for breath. {Pronoun,Inf,Prep,Noun}

# pay
Her pay increased. {Poss,Noun|!Verb,Past}
They pay the bill. {Pronoun,Inf,Det,Noun}

# peak
They described the peak. {Pronoun,Past,Det,Noun|!Verb}
Temperatures peak at noon. {Noun,Inf,Prep,Noun}

# pee
That pee seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will pee behind the tree. {Pronoun,Modal,Inf,Prep,Det,Noun}

# peel
Her peel was memorable. {Poss,Noun|!Verb,Copula,Adj}
I peel the apple. {Pronoun,Inf,Det,Noun}

# peer
She consulted a peer. {Pronoun,Past,Det,Noun|!Verb}
He might peer through the glass. {Pronoun,Modal,Inf,Prep,Det,Noun}

# pen
The pen leaked ink. {Det,Noun|!Verb,Past,Noun}
We pen a letter. {Pronoun,Inf,Det,Noun}

# pencil
We discussed the pencil. {Pronoun,Past,Det,Noun|!Verb}
They pencil in the date. {Pronoun,Inf,Particle,Det,Noun}

# perfume
They described the perfume. {Pronoun,Past,Det,Noun|!Verb}
You can perfume the room. {Pronoun,Modal,Inf,Det,Noun}

# permit
That permit seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will permit the visit. {Pronoun,Modal,Inf,Det,Noun}

# pet
Her pet was memorable. {Poss,Noun|!Verb,Copula,Adj}
I pet the dog. {Pronoun,Inf,Det,Noun}

# petition
I noticed the petition. {Pronoun,Past,Det,Noun|!Verb}
He might petition the council. {Pronoun,Modal,Inf,Det,Noun}

# phase
The phase surprised us. {Det,Noun|!Verb,Past,Pronoun}
We phase out the program. {Pronoun,Inf,Particle,Det,Noun}

# phone
We discussed the phone. {Pronoun,Past,Det,Noun|!Verb}
They phone the office. {Pronoun,Inf,Det,Noun}

# photograph
They described the photograph. {Pronoun,Past,Det,Noun|!Verb}
You can photograph the garden. {Pronoun,Modal,Inf,Det,Noun}

# pick
That pick seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will pick the apples. {Pronoun,Modal,Inf,Det,Plural}

# pile
Her pile was memorable. {Poss,Noun|!Verb,Copula,Adj}
I pile the books on the table. {Pronoun,Inf,Det,Noun,Prep,Det,Noun}

# pin
I noticed the pin. {Pronoun,Past,Det,Noun|!Verb}
He might pin the notice to the wall. {Pronoun,Modal,Inf,Det,Noun,Prep,Det,Noun}

# pine
A pine towered above the cabin. {Det,Noun|!Verb,Past,Prep,Det,Noun}
We pine for home. {Pronoun,Inf,Prep,Noun}

# pipe
We discussed the pipe. {Pronoun,Past,Det,Noun|!Verb}
They pipe water into the garden. {Pronoun,Inf,Noun,Prep,Det,Noun}

# pit
She removed the pit from the peach. {Pronoun,Past,Det,Noun|!Verb,Prep,Det,Noun}
You can pit the cherries. {Pronoun,Modal,Inf,Det,Plural}

# pity
That pity seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will pity the loser. {Pronoun,Modal,Inf,Det,Noun}

# pivot
Her pivot was memorable. {Poss,Noun|!Verb,Copula,Adj}
I pivot toward the door. {Pronoun,Inf,Prep,Det,Noun}

# place
I noticed the place. {Pronoun,Past,Det,Noun|!Verb}
He might place the vase here. {Pronoun,Modal,Inf,Det,Noun,Adv}

# plan
The plan surprised us. {Det,Noun|!Verb,Past,Pronoun}
We plan the journey. {Pronoun,Inf,Det,Noun}

# plant
We discussed the plant. {Pronoun,Past,Det,Noun|!Verb}
They plant the seeds. {Pronoun,Inf,Det,Plural}

# play
They described the play. {Pronoun,Past,Det,Noun|!Verb}
You can play the violin. {Pronoun,Modal,Inf,Det,Noun}

# plce
# Dictionary spelling retained; intended senses of place.
The plce surprised us. {Det,Noun|!Verb,Past,Pronoun}
We plce the vase here. {Pronoun,Inf,Det,Noun,Adv}

# plead
# No ordinary noun sense; plea is a different word.
They plead for mercy. {Pronoun,Inf,Prep,Noun}

# plug
That plug seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will plug the hole. {Pronoun,Modal,Inf,Det,Noun}

# plump
A plump of geese landed. {Det,Noun|!Verb,Prep,Noun,Past}
I plump the cushions. {Pronoun,Inf,Det,Plural}

# plunge
I noticed the plunge. {Pronoun,Past,Det,Noun|!Verb}
He might plunge into the water. {Pronoun,Modal,Inf,Prep,Det,Noun}

# point
The point surprised us. {Det,Noun|!Verb,Past,Pronoun}
We point at the map. {Pronoun,Inf,Prep,Det,Noun}

# poison
We discussed the poison. {Pronoun,Past,Det,Noun|!Verb}
They poison the rats. {Pronoun,Inf,Det,Plural}

# police
The police arrived quickly. {Det,Noun|!Verb,Past,Adv}
You can police the streets. {Pronoun,Modal,Inf,Det,Plural}

# polish
That polish seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will polish the silver. {Pronoun,Modal,Inf,Det,Noun}

# poll
Her poll was memorable. {Poss,Noun|!Verb,Copula,Adj}
I poll the voters. {Pronoun,Inf,Det,Plural}

# pool
I noticed the pool. {Pronoun,Past,Det,Noun|!Verb}
He might pool our resources. {Pronoun,Modal,Inf,Poss,Plural}

# poop
The poop surprised us. {Det,Noun|!Verb,Past,Pronoun}
We poop in the woods. {Pronoun,Inf,Prep,Det,Plural}

# pop
We discussed the pop. {Pronoun,Past,Det,Noun|!Verb}
They pop the balloon. {Pronoun,Inf,Det,Noun}

# pore
A pore in the leaf releases vapor. {Det,Noun|!Verb,Prep,Det,Noun,Pres,Noun}
You can pore over the manuscript. {Pronoun,Modal,Inf,Prep,Det,Noun}

# pose
That pose seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will pose for the camera. {Pronoun,Modal,Inf,Prep,Det,Noun}

# position
Her position was memorable. {Poss,Noun|!Verb,Copula,Adj}
I position the camera. {Pronoun,Inf,Det,Noun}

# post
The post supported the fence. {Det,Noun|!Verb,Past,Det,Noun}
He might post the letter. {Pronoun,Modal,Inf,Det,Noun}

# pound
The pound weakened against the dollar. {Det,Noun|!Verb,Past,Prep,Det,Noun}
We pound the dough. {Pronoun,Inf,Det,Noun}
The dog escaped from the pound. {Det,Noun,Past,Prep,Det,Noun|!Verb}

# power
We discussed the power. {Pronoun,Past,Det,Noun|!Verb}
They power the engine. {Pronoun,Inf,Det,Noun}

# practice
They described the practice. {Pronoun,Past,Det,Noun|!Verb}
You can practice the violin. {Pronoun,Modal,Inf,Det,Noun}

# praise
That praise seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will praise the effort. {Pronoun,Modal,Inf,Det,Noun}

# preserve
Her preserve was memorable. {Poss,Noun|!Verb,Copula,Adj}
I preserve the fruit. {Pronoun,Inf,Det,Noun}

# press
The press reported the scandal. {Det,Noun|!Verb,Past,Det,Noun}
He might press the button. {Pronoun,Modal,Inf,Det,Noun}
The press squeezed juice from the apples. {Det,Noun|!Verb,Past,Noun,Prep,Det,Plural}

# pressure
The pressure surprised us. {Det,Noun|!Verb,Past,Pronoun}
We pressure the witness. {Pronoun,Inf,Det,Noun}

# prey
The prey escaped. {Det,Noun|!Verb,Past}
They prey on vulnerable people. {Pronoun,Inf,Prep,Adj,Plural}

# price
They described the price. {Pronoun,Past,Det,Noun|!Verb}
You can price the goods. {Pronoun,Modal,Inf,Det,Plural}

# pride
That pride seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will pride ourselves on accuracy. {Pronoun,Modal,Inf,Pronoun,Prep,Noun}

# print
Her print was memorable. {Poss,Noun|!Verb,Copula,Adj}
I print the document. {Pronoun,Inf,Det,Noun}

# probe
I noticed the probe. {Pronoun,Past,Det,Noun|!Verb}
He might probe the soil. {Pronoun,Modal,Inf,Det,Noun}

# proceed
# No ordinary singular noun sense; proceeds is a different form.
We proceed with caution. {Pronoun,Inf,Prep,Noun}

# process
The process surprised us. {Det,Noun|!Verb,Past,Pronoun}
We process the application. {Pronoun,Inf,Det,Noun}

# produce
The produce looked fresh. {Det,Noun|!Verb,Past,Adj}
They produce the evidence. {Pronoun,Inf,Det,Noun}

# profile
They described the profile. {Pronoun,Past,Det,Noun|!Verb}
You can profile the artist. {Pronoun,Modal,Inf,Det,Noun}

# program
That program seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will program the robot. {Pronoun,Modal,Inf,Det,Noun}

# programme
Her programme was memorable. {Poss,Noun|!Verb,Copula,Adj}
I programme the robot. {Pronoun,Inf,Det,Noun}

# progress
I noticed the progress. {Pronoun,Past,Det,Noun|!Verb}
He might progress through the course. {Pronoun,Modal,Inf,Prep,Det,Noun}

# project
The project needs funding. {Det,Noun|!Verb,Pres,Noun}
We project the image. {Pronoun,Inf,Det,Noun}

# promise
We discussed the promise. {Pronoun,Past,Det,Noun|!Verb}
They promise a reward. {Pronoun,Inf,Det,Noun}

# prop
They described the prop. {Pronoun,Past,Det,Noun|!Verb}
You can prop the door open. {Pronoun,Modal,Inf,Det,Noun,Adj}

# protest
That protest seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will protest against the decision. {Pronoun,Modal,Inf,Prep,Det,Noun}

# prune
She ate a prune. {Pronoun,Past,Det,Noun|!Verb}
I prune the roses. {Pronoun,Inf,Det,Plural}
They prune unnecessary sections from the report. {Pronoun,Inf,Adj,Noun,Prep,Det,Noun}

# psych
She studies psych at college. {Pronoun,Pres,Noun|!Verb,Prep,Noun}
He might psych myself up. {Pronoun,Modal,Inf,Pronoun,Particle}

# pump
The pump surprised us. {Det,Noun|!Verb,Past,Pronoun}
We pump the water. {Pronoun,Inf,Det,Noun}

# punch
The punch tasted fruity. {Det,Noun|!Verb,Past,Adj}
They punch the dough. {Pronoun,Inf,Det,Noun}

# purchase
They described the purchase. {Pronoun,Past,Det,Noun|!Verb}
You can purchase the tickets. {Pronoun,Modal,Inf,Det,Plural}

# push
That push seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will push the cart. {Pronoun,Modal,Inf,Det,Noun}

# question
Her question was memorable. {Poss,Noun|!Verb,Copula,Adj}
I question the witness. {Pronoun,Inf,Det,Noun}

# quiver
His quiver held several arrows. {Poss,Noun|!Verb,Past,Det,Plural}
He might quiver with excitement. {Pronoun,Modal,Inf,Prep,Noun}

# quiz
The quiz surprised us. {Det,Noun|!Verb,Past,Pronoun}
We quiz the students. {Pronoun,Inf,Det,Plural}

# race
The race began at noon. {Det,Noun|!Verb,Past,Prep,Noun}
They race to the finish. {Pronoun,Inf,Prep,Det,Noun}

# rack
They described the rack. {Pronoun,Past,Det,Noun|!Verb}
You can rack the bottles. {Pronoun,Modal,Inf,Det,Plural}

# rage
That rage seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will rage against injustice. {Pronoun,Modal,Inf,Prep,Noun}

# rain
Her rain was memorable. {Poss,Noun|!Verb,Copula,Adj}
I rain blows on the door. {Pronoun,Inf,Noun,Prep,Det,Noun}

# raise
I noticed the raise. {Pronoun,Past,Det,Noun|!Verb}
He might raise the flag. {Pronoun,Modal,Inf,Det,Noun}

# rake
The rake stood beside the shed. {Det,Noun|!Verb,Past,Prep,Det,Noun}
We rake the leaves. {Pronoun,Inf,Det,Plural}

# rally
We discussed the rally. {Pronoun,Past,Det,Noun|!Verb}
They rally the supporters. {Pronoun,Inf,Det,Plural}

# range
They described the range. {Pronoun,Past,Det,Noun|!Verb}
You can range over the hills. {Pronoun,Modal,Inf,Prep,Det,Plural}

# rank
That rank seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will rank the candidates. {Pronoun,Modal,Inf,Det,Plural}

# rant
Her rant was memorable. {Poss,Noun|!Verb,Copula,Adj}
I rant about the service. {Pronoun,Inf,Prep,Det,Noun}

# rap
The rap on the door startled us. {Det,Noun|!Verb,Prep,Det,Noun,Past,Pronoun}
He might rap on the door. {Pronoun,Modal,Inf,Prep,Det,Noun}

# rape
The trial concerned an allegation of rape. {Det,Noun,Past,Det,Noun,Prep,Noun|!Verb}
Invading armies rape and pillage. {Adj,Noun,Inf,Conj,Inf}

# rat
We discussed the rat. {Pronoun,Past,Det,Noun|!Verb}
They rat on the gang. {Pronoun,Inf,Prep,Det,Noun}

# rate
They described the rate. {Pronoun,Past,Det,Noun|!Verb}
You can rate the service. {Pronoun,Modal,Inf,Det,Noun}

# reach
That reach seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will reach the summit. {Pronoun,Modal,Inf,Det,Noun}

# reason
Her reason was memorable. {Poss,Noun|!Verb,Copula,Adj}
I reason with the child. {Pronoun,Inf,Prep,Det,Noun}

# recall
I noticed the recall. {Pronoun,Past,Det,Noun|!Verb}
He might recall the incident. {Pronoun,Modal,Inf,Det,Noun}

# record
The record surprised us. {Det,Noun|!Verb,Past,Pronoun}
We record the interview. {Pronoun,Inf,Det,Noun}

# redo
We discussed the redo. {Pronoun,Past,Det,Noun|!Verb}
They redo the kitchen. {Pronoun,Inf,Det,Noun}

# reel
The reel held the film. {Det,Noun|!Verb,Past,Det,Noun}
You can reel in the fish. {Pronoun,Modal,Inf,Particle,Det,Noun}

# refactor
That refactor seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will refactor the code. {Pronoun,Modal,Inf,Det,Noun}

# reference
Her reference was memorable. {Poss,Noun|!Verb,Copula,Adj}
I reference the original study. {Pronoun,Inf,Det,Adj,Noun}

# reform
I noticed the reform. {Pronoun,Past,Det,Noun|!Verb}
He might reform the system. {Pronoun,Modal,Inf,Det,Noun}

# refund
The refund surprised us. {Det,Noun|!Verb,Past,Pronoun}
We refund the fee. {Pronoun,Inf,Det,Noun}

# refuse
The refuse attracted flies. {Det,Noun|!Verb,Past,Plural}
They refuse the offer. {Pronoun,Inf,Det,Noun}

# regard
They described the regard. {Pronoun,Past,Det,Noun|!Verb}
You can regard her as an expert. {Pronoun,Modal,Inf,Pronoun,Prep,Det,Noun}

# register
That register seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will register the vehicle. {Pronoun,Modal,Inf,Det,Noun}

# regret
Her regret was memorable. {Poss,Noun|!Verb,Copula,Adj}
I regret the decision. {Pronoun,Inf,Det,Noun}

# reject
The reject had a cracked rim. {Det,Noun|!Verb,Past,Det,Adj,Noun}
He might reject the proposal. {Pronoun,Modal,Inf,Det,Noun}

# release
The release surprised us. {Det,Noun|!Verb,Past,Pronoun}
We release the bird. {Pronoun,Inf,Det,Noun}

# relish
We discussed the relish. {Pronoun,Past,Det,Noun|!Verb}
They relish the challenge. {Pronoun,Inf,Det,Noun}

# remake
They described the remake. {Pronoun,Past,Det,Noun|!Verb}
You can remake the film. {Pronoun,Modal,Inf,Det,Noun}

# remark
That remark seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will remark on the resemblance. {Pronoun,Modal,Inf,Prep,Det,Noun}

# remedy
Her remedy was memorable. {Poss,Noun|!Verb,Copula,Adj}
I remedy the problem. {Pronoun,Inf,Det,Noun}

# rendezvous
I noticed the rendezvous. {Pronoun,Past,Det,Noun|!Verb}
He might rendezvous at the station. {Pronoun,Modal,Inf,Prep,Det,Noun}

# rent
The rent surprised us. {Det,Noun|!Verb,Past,Pronoun}
We rent a cottage. {Pronoun,Inf,Det,Noun}

# reorder
We discussed the reorder. {Pronoun,Past,Det,Noun|!Verb}
They reorder the supplies. {Pronoun,Inf,Det,Plural}

# repair
They described the repair. {Pronoun,Past,Det,Noun|!Verb}
You can repair the roof. {Pronoun,Modal,Inf,Det,Noun}

# repeal
That repeal seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will repeal the law. {Pronoun,Modal,Inf,Det,Noun}

# repeat
Her repeat was memorable. {Poss,Noun|!Verb,Copula,Adj}
I repeat the question. {Pronoun,Inf,Det,Noun}

# reply
I noticed the reply. {Pronoun,Past,Det,Noun|!Verb}
He might reply to the letter. {Pronoun,Modal,Inf,Prep,Det,Noun}

# report
The report surprised us. {Det,Noun|!Verb,Past,Pronoun}
We report the accident. {Pronoun,Inf,Det,Noun}

# request
We discussed the request. {Pronoun,Past,Det,Noun|!Verb}
They request an explanation. {Pronoun,Inf,Det,Noun}

# reserve
The reserve protects rare birds. {Det,Noun|!Verb,Pres,Adj,Plural}
You can reserve a table. {Pronoun,Modal,Inf,Det,Noun}

# resolve
Her resolve never weakened. {Poss,Noun|!Verb,Adv,Past}
She will resolve the dispute. {Pronoun,Modal,Inf,Det,Noun}

# resort
Her resort was memorable. {Poss,Noun|!Verb,Copula,Adj}
I resort to persuasion. {Pronoun,Inf,Prep,Noun}

# respect
I noticed the respect. {Pronoun,Past,Det,Noun|!Verb}
He might respect the rules. {Pronoun,Modal,Inf,Det,Plural}

# rest
The rest surprised us. {Det,Noun|!Verb,Past,Pronoun}
We rest after lunch. {Pronoun,Inf,Prep,Noun}

# restart
We discussed the restart. {Pronoun,Past,Det,Noun|!Verb}
They restart the computer. {Pronoun,Inf,Det,Noun}

# result
They described the result. {Pronoun,Past,Det,Noun|!Verb}
These mistakes result in delays. {Det,Noun,Inf,Prep,Plural}

# resume
She sent her resume to the company. {Pronoun,Past,Poss,Noun|!Verb,Prep,Det,Noun}
She will resume the discussion. {Pronoun,Modal,Inf,Det,Noun}

# return
Her return was memorable. {Poss,Noun|!Verb,Copula,Adj}
I return the book. {Pronoun,Inf,Det,Noun}

# reveal
I noticed the reveal. {Pronoun,Past,Det,Noun|!Verb}
He might reveal the secret. {Pronoun,Modal,Inf,Det,Noun}

# reverse
The reverse surprised us. {Det,Noun|!Verb,Past,Pronoun}
We reverse the decision. {Pronoun,Inf,Det,Noun}

# review
We discussed the review. {Pronoun,Past,Det,Noun|!Verb}
They review the proposal. {Pronoun,Inf,Det,Noun}

# reward
They described the reward. {Pronoun,Past,Det,Noun|!Verb}
You can reward the effort. {Pronoun,Modal,Inf,Det,Noun}

# rhyme
That rhyme seemed unusual. {Det,Noun|!Verb,Past,Adj}
These words rhyme with the chorus. {Det,Noun,Inf,Prep,Det,Noun}

# ride
Her ride was memorable. {Poss,Noun|!Verb,Copula,Adj}
I ride the bicycle. {Pronoun,Inf,Det,Noun}

# ring
The ring contains a diamond. {Det,Noun|!Verb,Pres,Det,Noun}
He might ring the bell. {Pronoun,Modal,Inf,Det,Noun}
The ring of the bell startled us. {Det,Noun|!Verb,Prep,Det,Noun,Past,Pronoun}

# riot
The riot surprised us. {Det,Noun|!Verb,Past,Pronoun}
We riot in the streets. {Pronoun,Inf,Prep,Det,Plural}

# rip
We discussed the rip. {Pronoun,Past,Det,Noun|!Verb}
They rip the fabric. {Pronoun,Inf,Det,Noun}

# rise
They described the rise. {Pronoun,Past,Det,Noun|!Verb}
You can rise before dawn. {Pronoun,Modal,Inf,Prep,Noun}

# risk
That risk seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will risk my reputation. {Pronoun,Modal,Inf,Poss,Noun}

# rival
Her rival was memorable. {Poss,Noun|!Verb,Copula,Adj}
I rival the champion. {Pronoun,Inf,Det,Noun}

# roast
I noticed the roast. {Pronoun,Past,Det,Noun|!Verb}
He might roast the vegetables. {Pronoun,Modal,Inf,Det,Plural}

# rock
The rock surprised us. {Det,Noun|!Verb,Past,Pronoun}
We rock the cradle. {Pronoun,Inf,Det,Noun}
A rock blocked the path. {Det,Noun|!Verb,Past,Det,Noun}

# roll
We discussed the roll. {Pronoun,Past,Det,Noun|!Verb}
They roll the dough. {Pronoun,Inf,Det,Noun}

# roof
The roof leaked. {Det,Noun|!Verb,Past}
You can roof the shed. {Pronoun,Modal,Inf,Det,Noun}

# root
The root cracked the pavement. {Det,Noun|!Verb,Past,Det,Noun}
She will root the cuttings. {Pronoun,Modal,Inf,Det,Plural}

# rope
Her rope was memorable. {Poss,Noun|!Verb,Copula,Adj}
I rope the crates together. {Pronoun,Inf,Det,Noun,Adv}

# route
I noticed the route. {Pronoun,Past,Det,Noun|!Verb}
He might route the traffic. {Pronoun,Modal,Inf,Det,Noun}

# rub
The rub contains pepper. {Det,Noun|!Verb,Pres,Noun}
We rub the stain. {Pronoun,Inf,Det,Noun}

# ruin
We discussed the ruin. {Pronoun,Past,Det,Noun|!Verb}
They ruin the surprise. {Pronoun,Inf,Det,Noun}

# rule
They described the rule. {Pronoun,Past,Det,Noun|!Verb}
You can rule the country. {Pronoun,Modal,Inf,Det,Noun}

# run
That run seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will run the business. {Pronoun,Modal,Inf,Det,Noun}

# rush
Her rush was memorable. {Poss,Noun|!Verb,Copula,Adj}
I rush to the station. {Pronoun,Inf,Prep,Det,Noun}

# rust
I noticed the rust. {Pronoun,Past,Det,Noun|!Verb}
The hinges rust in the rain. {Det,Noun,Inf,Prep,Det,Noun}

# sack
The sack held grain. {Det,Noun|!Verb,Past,Noun}
We sack the manager. {Pronoun,Inf,Det,Noun}

# sacrifice
We discussed the sacrifice. {Pronoun,Past,Det,Noun|!Verb}
They sacrifice my comfort. {Pronoun,Inf,Poss,Noun}

# safeguard
They described the safeguard. {Pronoun,Past,Det,Noun|!Verb}
You can safeguard the collection. {Pronoun,Modal,Inf,Det,Noun}

# sail
That sail seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will sail across the lake. {Pronoun,Modal,Inf,Prep,Det,Noun}

# sample
Her sample was memorable. {Poss,Noun|!Verb,Copula,Adj}
I sample the cheese. {Pronoun,Inf,Det,Noun}

# sanction
I noticed the sanction. {Pronoun,Past,Det,Noun|!Verb}
He might sanction the transaction. {Pronoun,Modal,Inf,Det,Noun}

# scale
A scale fell from the fish. {Det,Noun|!Verb,Past,Prep,Det,Noun}
We scale the wall. {Pronoun,Inf,Det,Noun}
The scale showed her weight. {Det,Noun|!Verb,Past,Poss,Noun}
She played a scale on the piano. {Pronoun,Past,Det,Noun|!Verb,Prep,Det,Noun}

# scan
We discussed the scan. {Pronoun,Past,Det,Noun|!Verb}
They scan the document. {Pronoun,Inf,Det,Noun}

# scar
They described the scar. {Pronoun,Past,Det,Noun|!Verb}
You can scar the surface. {Pronoun,Modal,Inf,Det,Noun}

# scare
That scare seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will scare the birds. {Pronoun,Modal,Inf,Det,Plural}

# schedule
Her schedule was memorable. {Poss,Noun|!Verb,Copula,Adj}
I schedule the appointment. {Pronoun,Inf,Det,Noun}

# score
I noticed the score. {Pronoun,Past,Det,Noun|!Verb}
He might score the match. {Pronoun,Modal,Inf,Det,Noun}

# scrape
The scrape surprised us. {Det,Noun|!Verb,Past,Pronoun}
We scrape the paint. {Pronoun,Inf,Det,Noun}

# scratch
We discussed the scratch. {Pronoun,Past,Det,Noun|!Verb}
They scratch the surface. {Pronoun,Inf,Det,Noun}

# screen
They described the screen. {Pronoun,Past,Det,Noun|!Verb}
You can screen the applicants. {Pronoun,Modal,Inf,Det,Plural}

# screw
That screw seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will screw the lid on. {Pronoun,Modal,Inf,Det,Noun,Particle}

# scribble
Her scribble was memorable. {Poss,Noun|!Verb,Copula,Adj}
I scribble a note. {Pronoun,Inf,Det,Noun}

# scroll
I noticed the scroll. {Pronoun,Past,Det,Noun|!Verb}
He might scroll through the list. {Pronoun,Modal,Inf,Prep,Det,Noun}

# seal
The seal swam beside the boat. {Det,Noun|!Verb,Past,Prep,Det,Noun}
We seal the envelope. {Pronoun,Inf,Det,Noun}
The seal kept the jar airtight. {Det,Noun|!Verb,Past,Det,Noun,Adj}

# search
We discussed the search. {Pronoun,Past,Det,Noun|!Verb}
They search the room. {Pronoun,Inf,Det,Noun}

# seat
They described the seat. {Pronoun,Past,Det,Noun|!Verb}
You can seat the guests. {Pronoun,Modal,Inf,Det,Plural}

# seed
That seed seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will seed the lawn. {Pronoun,Modal,Inf,Det,Noun}

# sense
Her sense was memorable. {Poss,Noun|!Verb,Copula,Adj}
I sense the danger. {Pronoun,Inf,Det,Noun}

# sentence
I noticed the sentence. {Pronoun,Past,Det,Noun|!Verb}
He might sentence the prisoner. {Pronoun,Modal,Inf,Det,Noun}

# sequence
The sequence surprised us. {Det,Noun|!Verb,Past,Pronoun}
We sequence the genes. {Pronoun,Inf,Det,Plural}

# serve
Her serve won the match. {Poss,Noun|!Verb,Past,Det,Noun}
They serve the soup. {Pronoun,Inf,Det,Noun}

# service
They described the service. {Pronoun,Past,Det,Noun|!Verb}
You can service the engine. {Pronoun,Modal,Inf,Det,Noun}

# set
The set contains six plates. {Det,Noun|!Verb,Pres,Value,Plural}
She will set the table. {Pronoun,Modal,Inf,Det,Noun}

# shack
Her shack was memorable. {Poss,Noun|!Verb,Copula,Adj}
I shack up with friends. {Pronoun,Inf,Particle,Prep,Plural}

# shade
We rested in the shade. {Pronoun,Past,Prep,Det,Noun|!Verb}
He might shade the drawing. {Pronoun,Modal,Inf,Det,Noun}

# shape
The shape surprised us. {Det,Noun|!Verb,Past,Pronoun}
We shape the clay. {Pronoun,Inf,Det,Noun}

# share
We discussed the share. {Pronoun,Past,Det,Noun|!Verb}
They share the cake. {Pronoun,Inf,Det,Noun}

# shave
They described the shave. {Pronoun,Past,Det,Noun|!Verb}
You can shave my beard. {Pronoun,Modal,Inf,Poss,Noun}

# shed
The shed stores garden tools. {Det,Noun|!Verb,Pres,Noun,Plural}
She will shed the disguise. {Pronoun,Modal,Inf,Det,Noun}

# sheild
# Dictionary spelling retained; intended senses of shield.
The sheild surprised us. {Det,Noun|!Verb,Past,Pronoun}
We sheild the children from the rain. {Pronoun,Inf,Det,Noun,Prep,Det,Noun}

# shelter
Her shelter was memorable. {Poss,Noun|!Verb,Copula,Adj}
I shelter from the rain. {Pronoun,Inf,Prep,Det,Noun}

# shift
I noticed the shift. {Pronoun,Past,Det,Noun|!Verb}
He might shift the furniture. {Pronoun,Modal,Inf,Det,Noun}

# ship
The ship surprised us. {Det,Noun|!Verb,Past,Pronoun}
We ship the goods. {Pronoun,Inf,Det,Plural}

# shiver
We discussed the shiver. {Pronoun,Past,Det,Noun|!Verb}
They shiver in the cold. {Pronoun,Inf,Prep,Det,Noun}

# shock
They described the shock. {Pronoun,Past,Det,Noun|!Verb}
You can shock the audience. {Pronoun,Modal,Inf,Det,Noun}

# shop
That shop seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will shop at the market. {Pronoun,Modal,Inf,Prep,Det,Noun}

# shore
The shore was rocky. {Det,Noun|!Verb,Copula,Adj}
I shore up the wall. {Pronoun,Inf,Particle,Det,Noun}

# show
I noticed the show. {Pronoun,Past,Det,Noun|!Verb}
He might show the evidence. {Pronoun,Modal,Inf,Det,Noun}

# shuffle
The shuffle surprised us. {Det,Noun|!Verb,Past,Pronoun}
We shuffle the cards. {Pronoun,Inf,Det,Plural}

# side
We discussed the side. {Pronoun,Past,Det,Noun|!Verb}
They side with the workers. {Pronoun,Inf,Prep,Det,Plural}

# sign
They described the sign. {Pronoun,Past,Det,Noun|!Verb}
You can sign the contract. {Pronoun,Modal,Inf,Det,Noun}

# signal
That signal seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will signal the driver. {Pronoun,Modal,Inf,Det,Noun}

# silence
Her silence was memorable. {Poss,Noun|!Verb,Copula,Adj}
I silence the alarm. {Pronoun,Inf,Det,Noun}

# sink
The sink overflowed. {Det,Noun|!Verb,Past}
He might sink the boat. {Pronoun,Modal,Inf,Det,Noun}

# sip
The sip surprised us. {Det,Noun|!Verb,Past,Pronoun}
We sip the tea. {Pronoun,Inf,Det,Noun}

# size
We discussed the size. {Pronoun,Past,Det,Noun|!Verb}
They size the image. {Pronoun,Inf,Det,Noun}

# skateboard
They described the skateboard. {Pronoun,Past,Det,Noun|!Verb}
You can skateboard to school. {Pronoun,Modal,Inf,Prep,Noun}

# ski
That ski seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will ski down the slope. {Pronoun,Modal,Inf,Prep,Det,Noun}

# sleep
Her sleep was memorable. {Poss,Noun|!Verb,Copula,Adj}
I sleep beside the fire. {Pronoun,Inf,Prep,Det,Noun}

# slice
I noticed the slice. {Pronoun,Past,Det,Noun|!Verb}
He might slice the bread. {Pronoun,Modal,Inf,Det,Noun}

# slip
A slip of paper fell out. {Det,Noun|!Verb,Prep,Noun,Past,Adv}
We slip through the gate. {Pronoun,Inf,Prep,Det,Noun}

# slit
We discussed the slit. {Pronoun,Past,Det,Noun|!Verb}
They slit the envelope. {Pronoun,Inf,Det,Noun}

# slouch
His slouch worried his mother. {Poss,Noun|!Verb,Past,Poss,Noun}
You can slouch in the chair. {Pronoun,Modal,Inf,Prep,Det,Noun}

# smash
That smash seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will smash the window. {Pronoun,Modal,Inf,Det,Noun}

# smell
Her smell was memorable. {Poss,Noun|!Verb,Copula,Adj}
I smell the flowers. {Pronoun,Inf,Det,Plural}

# smile
I noticed the smile. {Pronoun,Past,Det,Noun|!Verb}
He might smile at the baby. {Pronoun,Modal,Inf,Prep,Det,Noun}

# smirk
The smirk surprised us. {Det,Noun|!Verb,Past,Pronoun}
We smirk at the joke. {Pronoun,Inf,Prep,Det,Noun}

# smoke
We discussed the smoke. {Pronoun,Past,Det,Noun|!Verb}
They smoke the fish. {Pronoun,Inf,Det,Noun}

# snake
They described the snake. {Pronoun,Past,Det,Noun|!Verb}
You can snake through the crowd. {Pronoun,Modal,Inf,Prep,Det,Noun}

# snap
That snap seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will snap the twig. {Pronoun,Modal,Inf,Det,Noun}

# sneeze
Her sneeze was memorable. {Poss,Noun|!Verb,Copula,Adj}
I sneeze into a tissue. {Pronoun,Inf,Prep,Det,Noun}

# snow
I noticed the snow. {Pronoun,Past,Det,Noun|!Verb}
He might snow the audience with jargon. {Pronoun,Modal,Inf,Det,Noun,Prep,Noun}

# sob
The sob surprised us. {Det,Noun|!Verb,Past,Pronoun}
We sob with relief. {Pronoun,Inf,Prep,Noun}

# sound
The sound echoed. {Det,Noun|!Verb,Past}
They sound the alarm. {Pronoun,Inf,Det,Noun}

# spam
They described the spam. {Pronoun,Past,Det,Noun|!Verb}
You can spam the forum. {Pronoun,Modal,Inf,Det,Noun}

# span
That span seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will span the gap. {Pronoun,Modal,Inf,Det,Noun}

# spark
Her spark was memorable. {Poss,Noun|!Verb,Copula,Adj}
I spark a debate. {Pronoun,Inf,Det,Noun}

# speed
I noticed the speed. {Pronoun,Past,Det,Noun|!Verb}
He might speed through the tunnel. {Pronoun,Modal,Inf,Prep,Det,Noun}

# spell
The spell transformed the prince. {Det,Noun|!Verb,Past,Det,Noun}
We spell the name. {Pronoun,Inf,Det,Noun}

# spill
We discussed the spill. {Pronoun,Past,Det,Noun|!Verb}
They spill the milk. {Pronoun,Inf,Det,Noun}

# spin
They described the spin. {Pronoun,Past,Det,Noun|!Verb}
You can spin the wheel. {Pronoun,Modal,Inf,Det,Noun}

# spiral
That spiral seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will spiral toward the ground. {Pronoun,Modal,Inf,Prep,Det,Noun}

# spite
Her spite was memorable. {Poss,Noun|!Verb,Copula,Adj}
I spite the neighbors. {Pronoun,Inf,Det,Plural}

# splash
I noticed the splash. {Pronoun,Past,Det,Noun|!Verb}
He might splash water on the floor. {Pronoun,Modal,Inf,Noun,Prep,Det,Noun}

# split
The split surprised us. {Det,Noun|!Verb,Past,Pronoun}
We split the bill. {Pronoun,Inf,Det,Noun}

# sponsor
We discussed the sponsor. {Pronoun,Past,Det,Noun|!Verb}
They sponsor the event. {Pronoun,Inf,Det,Noun}

# spot
They described the spot. {Pronoun,Past,Det,Noun|!Verb}
You can spot the difference. {Pronoun,Modal,Inf,Det,Noun}

# spray
That spray seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will spray the plants. {Pronoun,Modal,Inf,Det,Plural}

# spread
Her spread was memorable. {Poss,Noun|!Verb,Copula,Adj}
I spread the butter. {Pronoun,Inf,Det,Noun}

# spring
The spring inside the clock broke. {Det,Noun|!Verb,Prep,Det,Noun,Past}
He might spring a surprise. {Pronoun,Modal,Inf,Det,Noun}
Water bubbled from the spring. {Noun,Past,Prep,Det,Noun|!Verb}

# sprinkle
The sprinkle surprised us. {Det,Noun|!Verb,Past,Pronoun}
We sprinkle the herbs. {Pronoun,Inf,Det,Plural}

# spruce
The spruce shaded the cabin. {Det,Noun|!Verb,Past,Det,Noun}
They spruce up the room. {Pronoun,Inf,Particle,Det,Noun}

# spur
They described the spur. {Pronoun,Past,Det,Noun|!Verb}
You can spur the horse. {Pronoun,Modal,Inf,Det,Noun}

# spy
That spy seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will spy on the neighbors. {Pronoun,Modal,Inf,Prep,Det,Plural}

# stack
Her stack was memorable. {Poss,Noun|!Verb,Copula,Adj}
I stack the plates. {Pronoun,Inf,Det,Plural}

# staff
The staff requested a meeting. {Det,Noun|!Verb,Past,Det,Noun}
He might staff the office. {Pronoun,Modal,Inf,Det,Noun}

# stage
The stage surprised us. {Det,Noun|!Verb,Past,Pronoun}
We stage the play. {Pronoun,Inf,Det,Noun}

# stain
We discussed the stain. {Pronoun,Past,Det,Noun|!Verb}
They stain the wood. {Pronoun,Inf,Det,Noun}

# stake
The stake supported the sapling. {Det,Noun|!Verb,Past,Det,Noun}
You can stake my claim. {Pronoun,Modal,Inf,Poss,Noun}

# stalk
That stalk seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will stalk the deer. {Pronoun,Modal,Inf,Det,Noun}

# stall
Her stall was memorable. {Poss,Noun|!Verb,Copula,Adj}
I stall the engine. {Pronoun,Inf,Det,Noun}
The stall sold vegetables. {Det,Noun|!Verb,Past,Plural}

# stamp
I noticed the stamp. {Pronoun,Past,Det,Noun|!Verb}
He might stamp the envelope. {Pronoun,Modal,Inf,Det,Noun}

# stand
The stand surprised us. {Det,Noun|!Verb,Past,Pronoun}
We stand beside the window. {Pronoun,Inf,Prep,Det,Noun}

# staple
We discussed the staple. {Pronoun,Past,Det,Noun|!Verb}
They staple the pages. {Pronoun,Inf,Det,Plural}

# star
A star shone overhead. {Det,Noun|!Verb,Past,Adv}
You can star in the film. {Pronoun,Modal,Inf,Prep,Det,Noun}
The star greeted her fans. {Det,Noun|!Verb,Past,Poss,Plural}

# stare
That stare seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will stare at the screen. {Pronoun,Modal,Inf,Prep,Det,Noun}

# start
Her start was memorable. {Poss,Noun|!Verb,Copula,Adj}
I start the engine. {Pronoun,Inf,Det,Noun}

# state
I noticed the state. {Pronoun,Past,Det,Noun|!Verb}
He might state the facts. {Pronoun,Modal,Inf,Det,Plural}

# stay
The stay surprised us. {Det,Noun|!Verb,Past,Pronoun}
We stay with friends. {Pronoun,Inf,Prep,Plural}

# steer
The steer grazed beside the fence. {Det,Noun|!Verb,Past,Prep,Det,Noun}
They steer the boat. {Pronoun,Inf,Det,Noun}

# stem
The stem snapped. {Det,Noun|!Verb,Past}
You can stem the flow. {Pronoun,Modal,Inf,Det,Noun}

# step
That step seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will step over the puddle. {Pronoun,Modal,Inf,Prep,Det,Noun}

# stick
Her stick was memorable. {Poss,Noun|!Verb,Copula,Adj}
I stick the label here. {Pronoun,Inf,Det,Noun,Adv}

# stink
A terrible stink filled the room. {Det,Adj,Noun|!Verb,Past,Det,Noun}
He might stink after the hike. {Pronoun,Modal,Inf,Prep,Det,Noun}

# stitch
The stitch surprised us. {Det,Noun|!Verb,Past,Pronoun}
We stitch the seam. {Pronoun,Inf,Det,Noun}

# stocking
# Verbal use is a gerund, not an infinitive.
The stocking had a hole. {Det,Noun|!Verb,Past,Det,Noun}
She is stocking the shelves. {Pronoun,Aux,Ger,Det,Plural}

# stockpile
We discussed the stockpile. {Pronoun,Past,Det,Noun|!Verb}
They stockpile the supplies. {Pronoun,Inf,Det,Plural}

# stoop
She sat on the stoop. {Pronoun,Past,Prep,Det,Noun|!Verb}
You can stoop under the beam. {Pronoun,Modal,Inf,Prep,Det,Noun}

# stop
That stop seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will stop the car. {Pronoun,Modal,Inf,Det,Noun}

# store
The store closes early. {Det,Noun|!Verb,Pres,Adv}
I store the food. {Pronoun,Inf,Det,Noun}

# storm
I noticed the storm. {Pronoun,Past,Det,Noun|!Verb}
He might storm the castle. {Pronoun,Modal,Inf,Det,Noun}

# strain
The strain caused an outbreak. {Det,Noun|!Verb,Past,Det,Noun}
We strain the soup. {Pronoun,Inf,Det,Noun}

# stream
We discussed the stream. {Pronoun,Past,Det,Noun|!Verb}
They stream the concert. {Pronoun,Inf,Det,Noun}

# stress
They described the stress. {Pronoun,Past,Det,Noun|!Verb}
You can stress the importance. {Pronoun,Modal,Inf,Det,Noun}

# stretch
That stretch seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will stretch the fabric. {Pronoun,Modal,Inf,Det,Noun}

# strike
The strike halted production. {Det,Noun|!Verb,Past,Noun}
I strike the bell. {Pronoun,Inf,Det,Noun}

# string
I noticed the string. {Pronoun,Past,Det,Noun|!Verb}
He might string the beads. {Pronoun,Modal,Inf,Det,Plural}

# stroke
The stroke affected his speech. {Det,Noun|!Verb,Past,Poss,Noun}
We stroke the cat. {Pronoun,Inf,Det,Noun}

# struggle
We discussed the struggle. {Pronoun,Past,Det,Noun|!Verb}
They struggle with the lock. {Pronoun,Inf,Prep,Det,Noun}

# study
Her study overlooks the garden. {Poss,Noun|!Verb,Pres,Det,Noun}
You can study the map. {Pronoun,Modal,Inf,Det,Noun}

# stuff
That stuff seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will stuff the cushion. {Pronoun,Modal,Inf,Det,Noun}

# stumble
Her stumble was memorable. {Poss,Noun|!Verb,Copula,Adj}
I stumble over the threshold. {Pronoun,Inf,Prep,Det,Noun}

# style
I noticed the style. {Pronoun,Past,Det,Noun|!Verb}
He might style her hair. {Pronoun,Modal,Inf,Poss,Noun}

# sub
The sub dived beneath the waves. {Det,Noun|!Verb,Past,Prep,Det,Plural}
We sub for the teacher. {Pronoun,Inf,Prep,Det,Noun}

# subject
The subject fascinated the students. {Det,Noun|!Verb,Past,Det,Plural}
They subject the metal to heat. {Pronoun,Inf,Det,Noun,Prep,Noun}

# suit
His suit needed cleaning. {Poss,Noun|!Verb,Past,Noun}
You can suit the occasion. {Pronoun,Modal,Inf,Det,Noun}

# sum
That sum seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will sum the figures. {Pronoun,Modal,Inf,Det,Plural}

# supplement
Her supplement was memorable. {Poss,Noun|!Verb,Copula,Adj}
I supplement my income. {Pronoun,Inf,Poss,Noun}

# supply
I noticed the supply. {Pronoun,Past,Det,Noun|!Verb}
He might supply the equipment. {Pronoun,Modal,Inf,Det,Noun}

# support
The support surprised us. {Det,Noun|!Verb,Past,Pronoun}
We support the proposal. {Pronoun,Inf,Det,Noun}

# surface
We discussed the surface. {Pronoun,Past,Det,Noun|!Verb}
They surface beside the boat. {Pronoun,Inf,Prep,Det,Noun}

# surge
They described the surge. {Pronoun,Past,Det,Noun|!Verb}
You can surge toward the exit. {Pronoun,Modal,Inf,Prep,Det,Noun}

# surprise
That surprise seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will surprise the guests. {Pronoun,Modal,Inf,Det,Plural}

# survey
Her survey was memorable. {Poss,Noun|!Verb,Copula,Adj}
I survey the land. {Pronoun,Inf,Det,Noun}

# swear
That swear was audible. {Det,Noun|!Verb,Copula,Adj}
He might swear under my breath. {Pronoun,Modal,Inf,Prep,Poss,Noun}

# sweat
The sweat surprised us. {Det,Noun|!Verb,Past,Pronoun}
We sweat during the workout. {Pronoun,Inf,Prep,Det,Noun}

# swing
We discussed the swing. {Pronoun,Past,Det,Noun|!Verb}
They swing the bat. {Pronoun,Inf,Det,Noun}

# swipe
They described the swipe. {Pronoun,Past,Det,Noun|!Verb}
You can swipe the card. {Pronoun,Modal,Inf,Det,Noun}

# switch
That switch seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will switch the lights off. {Pronoun,Modal,Inf,Det,Noun,Particle}

# tag
Her tag was memorable. {Poss,Noun|!Verb,Copula,Adj}
I tag the luggage. {Pronoun,Inf,Det,Noun}

# talk
I noticed the talk. {Pronoun,Past,Det,Noun|!Verb}
He might talk about the trip. {Pronoun,Modal,Inf,Prep,Det,Noun}

# tally
The tally surprised us. {Det,Noun|!Verb,Past,Pronoun}
We tally the votes. {Pronoun,Inf,Det,Plural}

# tangle
We discussed the tangle. {Pronoun,Past,Det,Noun|!Verb}
They tangle the threads. {Pronoun,Inf,Det,Plural}

# target
They described the target. {Pronoun,Past,Det,Noun|!Verb}
You can target the advertisement. {Pronoun,Modal,Inf,Det,Noun}

# taste
That taste seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will taste the soup. {Pronoun,Modal,Inf,Det,Noun}

# tax
Her tax was memorable. {Poss,Noun|!Verb,Copula,Adj}
I tax the profits. {Pronoun,Inf,Det,Plural}

# tear
A tear rolled down her cheek. {Det,Noun|!Verb,Past,Prep,Poss,Noun}
He might tear the paper. {Pronoun,Modal,Inf,Det,Noun}
The tear in the curtain widened. {Det,Noun|!Verb,Prep,Det,Noun,Past}

# tee
The tee surprised us. {Det,Noun|!Verb,Past,Pronoun}
We tee off after lunch. {Pronoun,Inf,Particle,Prep,Noun}

# tell
His nervous cough was a tell. {Poss,Adj,Noun,Copula,Det,Noun|!Verb}
They tell the truth. {Pronoun,Inf,Det,Noun}

# temper
They described the temper. {Pronoun,Past,Det,Noun|!Verb}
You can temper the chocolate. {Pronoun,Modal,Inf,Det,Noun}

# test
That test seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will test the alarm. {Pronoun,Modal,Inf,Det,Noun}

# text
Her text was memorable. {Poss,Noun|!Verb,Copula,Adj}
I text my brother. {Pronoun,Inf,Poss,Noun}

# thread
I noticed the thread. {Pronoun,Past,Det,Noun|!Verb}
He might thread the needle. {Pronoun,Modal,Inf,Det,Noun}

# throw
The throw surprised us. {Det,Noun|!Verb,Past,Pronoun}
We throw the ball. {Pronoun,Inf,Det,Noun}

# thrust
We discussed the thrust. {Pronoun,Past,Det,Noun|!Verb}
They thrust the pole into the mud. {Pronoun,Inf,Det,Noun,Prep,Det,Noun}

# tick
They described the tick. {Pronoun,Past,Det,Noun|!Verb}
You can tick the box. {Pronoun,Modal,Inf,Det,Noun}

# tide
The tide rose steadily. {Det,Noun|!Verb,Past,Adv}
She will tide us over. {Pronoun,Modal,Inf,Pronoun,Particle}

# tie
Her tie was memorable. {Poss,Noun|!Verb,Copula,Adj}
I tie the knot. {Pronoun,Inf,Det,Noun}

# tile
I noticed the tile. {Pronoun,Past,Det,Noun|!Verb}
He might tile the floor. {Pronoun,Modal,Inf,Det,Noun}

# time
The time surprised us. {Det,Noun|!Verb,Past,Pronoun}
We time the race. {Pronoun,Inf,Det,Noun}

# tip
We discussed the tip. {Pronoun,Past,Det,Noun|!Verb}
They tip the waiter. {Pronoun,Inf,Det,Noun}

# tire
The tire burst. {Det,Noun|!Verb,Past}
You can tire easily. {Pronoun,Modal,Inf,Adv}

# toll
That toll seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will toll the bell. {Pronoun,Modal,Inf,Det,Noun}

# tone
Her tone was memorable. {Poss,Noun|!Verb,Copula,Adj}
I tone down the colors. {Pronoun,Inf,Particle,Det,Plural}

# top
I noticed the top. {Pronoun,Past,Det,Noun|!Verb}
He might top the cake with cream. {Pronoun,Modal,Inf,Det,Noun,Prep,Noun}

# torture
The torture surprised us. {Det,Noun|!Verb,Past,Pronoun}
We torture ourselves with doubt. {Pronoun,Inf,Pronoun,Prep,Noun}

# toss
We discussed the toss. {Pronoun,Past,Det,Noun|!Verb}
They toss the salad. {Pronoun,Inf,Det,Noun}

# total
They described the total. {Pronoun,Past,Det,Noun|!Verb}
You can total the expenses. {Pronoun,Modal,Inf,Det,Plural}

# touch
That touch seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will touch the fabric. {Pronoun,Modal,Inf,Det,Noun}

# tour
Her tour was memorable. {Poss,Noun|!Verb,Copula,Adj}
I tour the museum. {Pronoun,Inf,Det,Noun}

# track
I noticed the track. {Pronoun,Past,Det,Noun|!Verb}
He might track the package. {Pronoun,Modal,Inf,Det,Noun}

# trade
The trade surprised us. {Det,Noun|!Verb,Past,Pronoun}
We trade the cards. {Pronoun,Inf,Det,Plural}

# train
We discussed the train. {Pronoun,Past,Det,Noun|!Verb}
They train the dog. {Pronoun,Inf,Det,Noun}
The train arrived late. {Det,Noun|!Verb,Past,Adv}

# transfer
They described the transfer. {Pronoun,Past,Det,Noun|!Verb}
You can transfer the money. {Pronoun,Modal,Inf,Det,Noun}

# transition
That transition seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will transition into retirement. {Pronoun,Modal,Inf,Prep,Noun}

# trap
Her trap was memorable. {Poss,Noun|!Verb,Copula,Adj}
I trap the mice. {Pronoun,Inf,Det,Plural}

# travel
I noticed the travel. {Pronoun,Past,Det,Noun|!Verb}
He might travel by train. {Pronoun,Modal,Inf,Prep,Noun}

# treat
The treat surprised us. {Det,Noun|!Verb,Past,Pronoun}
We treat the injury. {Pronoun,Inf,Det,Noun}

# trek
We discussed the trek. {Pronoun,Past,Det,Noun|!Verb}
They trek through the mountains. {Pronoun,Inf,Prep,Det,Plural}

# trend
They described the trend. {Pronoun,Past,Det,Noun|!Verb}
The figures trend upward. {Det,Noun,Inf,Adv}

# tribute
# No ordinary verb sense supplied; noun use only.
Her tribute moved the audience. {Poss,Noun|!Verb,Past,Det,Noun}

# trick
That trick seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will trick the audience. {Pronoun,Modal,Inf,Det,Noun}

# trickle
Her trickle was memorable. {Poss,Noun|!Verb,Copula,Adj}
I trickle into the hall. {Pronoun,Inf,Prep,Det,Noun}

# trigger
I noticed the trigger. {Pronoun,Past,Det,Noun|!Verb}
He might trigger the alarm. {Pronoun,Modal,Inf,Det,Noun}

# trim
The trim surprised us. {Det,Noun|!Verb,Past,Pronoun}
We trim the hedge. {Pronoun,Inf,Det,Noun}

# trip
We discussed the trip. {Pronoun,Past,Det,Noun|!Verb}
They trip over the cable. {Pronoun,Inf,Prep,Det,Noun}

# trot
They described the trot. {Pronoun,Past,Det,Noun|!Verb}
You can trot along the path. {Pronoun,Modal,Inf,Prep,Det,Noun}

# trouble
That trouble seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will trouble her with questions. {Pronoun,Modal,Inf,Pronoun,Prep,Plural}

# trust
Her trust was memorable. {Poss,Noun|!Verb,Copula,Adj}
I trust the doctor. {Pronoun,Inf,Det,Noun}

# tune
I noticed the tune. {Pronoun,Past,Det,Noun|!Verb}
He might tune the guitar. {Pronoun,Modal,Inf,Det,Noun}

# tunnel
The tunnel surprised us. {Det,Noun|!Verb,Past,Pronoun}
We tunnel under the wall. {Pronoun,Inf,Prep,Det,Noun}

# turn
We discussed the turn. {Pronoun,Past,Det,Noun|!Verb}
They turn the handle. {Pronoun,Inf,Det,Noun}

# twin
Her twin lives nearby. {Poss,Noun|!Verb,Pres,Adv}
They twin the town with another. {Pronoun,Inf,Det,Noun,Prep,Pronoun}

# twist
That twist seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will twist the wire. {Pronoun,Modal,Inf,Det,Noun}

# type
The type on the page was tiny. {Det,Noun|!Verb,Prep,Det,Noun,Copula,Adj}
I type the letter. {Pronoun,Inf,Det,Noun}

# update
I noticed the update. {Pronoun,Past,Det,Noun|!Verb}
He might update the software. {Pronoun,Modal,Inf,Det,Noun}

# upgrade
The upgrade surprised us. {Det,Noun|!Verb,Past,Pronoun}
We upgrade the engine. {Pronoun,Inf,Det,Noun}

# upload
We discussed the upload. {Pronoun,Past,Det,Noun|!Verb}
They upload the photograph. {Pronoun,Inf,Det,Noun}

# urge
They described the urge. {Pronoun,Past,Det,Noun|!Verb}
You can urge her to stay. {Pronoun,Modal,Inf,Pronoun,Connector,Inf}

# vacuum
That vacuum seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will vacuum the carpet. {Pronoun,Modal,Inf,Det,Noun}

# vacation
Her vacation was memorable. {Poss,Noun|!Verb,Copula,Adj}
I vacation beside the sea. {Pronoun,Inf,Prep,Det,Noun}

# value
I noticed the value. {Pronoun,Past,Det,Noun|!Verb}
He might value your opinion. {Pronoun,Modal,Inf,Poss,Noun}

# venture
The venture surprised us. {Det,Noun|!Verb,Past,Pronoun}
We venture into the forest. {Pronoun,Inf,Prep,Det,Noun}

# vibe
We discussed the vibe. {Pronoun,Past,Det,Noun|!Verb}
They vibe with the crowd. {Pronoun,Inf,Prep,Det,Noun}

# view
They described the view. {Pronoun,Past,Det,Noun|!Verb}
You can view the property. {Pronoun,Modal,Inf,Det,Noun}

# visit
That visit seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will visit the museum. {Pronoun,Modal,Inf,Det,Noun}

# voice
Her voice was memorable. {Poss,Noun|!Verb,Copula,Adj}
I voice our concerns. {Pronoun,Inf,Poss,Plural}

# void
A vast void separated the stars. {Det,Adj,Noun|!Verb,Past,Det,Plural}
He might void the contract. {Pronoun,Modal,Inf,Det,Noun}

# vomit
The vomit surprised us. {Det,Noun|!Verb,Past,Pronoun}
We vomit after the journey. {Pronoun,Inf,Prep,Det,Noun}

# vote
We discussed the vote. {Pronoun,Past,Det,Noun|!Verb}
They vote against the proposal. {Pronoun,Inf,Prep,Det,Noun}

# vow
They described the vow. {Pronoun,Past,Det,Noun|!Verb}
You can vow to return. {Pronoun,Modal,Inf,Connector,Inf}

# wait
That wait seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will wait beside the gate. {Pronoun,Modal,Inf,Prep,Det,Noun}

# walk
Her walk was memorable. {Poss,Noun|!Verb,Copula,Adj}
I walk along the beach. {Pronoun,Inf,Prep,Det,Noun}

# war
I noticed the war. {Pronoun,Past,Det,Noun|!Verb}
He might war against the invaders. {Pronoun,Modal,Inf,Prep,Det,Plural}

# water
The water surprised us. {Det,Noun|!Verb,Past,Pronoun}
We water the plants. {Pronoun,Inf,Det,Plural}

# warehouse
The warehouse stores grain. {Det,Noun|!Verb,Pres,Noun}
They warehouse the goods. {Pronoun,Inf,Det,Plural}

# warrant
They described the warrant. {Pronoun,Past,Det,Noun|!Verb}
You can warrant an investigation. {Pronoun,Modal,Inf,Det,Noun}

# wash
That wash seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will wash the dishes. {Pronoun,Modal,Inf,Det,Plural}

# waste
Her waste was memorable. {Poss,Noun|!Verb,Copula,Adj}
I waste the opportunity. {Pronoun,Inf,Det,Noun}

# watch
Her watch stopped. {Poss,Noun|!Verb,Past}
He might watch the birds. {Pronoun,Modal,Inf,Det,Plural}

# wave
The wave surprised us. {Det,Noun|!Verb,Past,Pronoun}
We wave at the driver. {Pronoun,Inf,Prep,Det,Noun}

# wax
The wax melted. {Det,Noun|!Verb,Past}
They wax the floor. {Pronoun,Inf,Det,Noun}

# wear
The carpet showed signs of wear. {Det,Noun,Past,Noun,Prep,Noun|!Verb}
You can wear a coat. {Pronoun,Modal,Inf,Det,Noun}

# weather
That weather seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will weather the storm. {Pronoun,Modal,Inf,Det,Noun}

# weed
Her weed was memorable. {Poss,Noun|!Verb,Copula,Adj}
I weed the garden. {Pronoun,Inf,Det,Noun}

# welcome
I noticed the welcome. {Pronoun,Past,Det,Noun|!Verb}
He might welcome the guests. {Pronoun,Modal,Inf,Det,Plural}

# wheel
The wheel surprised us. {Det,Noun|!Verb,Past,Pronoun}
We wheel the cart outside. {Pronoun,Inf,Det,Noun,Adv}

# whip
We discussed the whip. {Pronoun,Past,Det,Noun|!Verb}
They whip the cream. {Pronoun,Inf,Det,Noun}

# whisk
They described the whisk. {Pronoun,Past,Det,Noun|!Verb}
You can whisk the eggs. {Pronoun,Modal,Inf,Det,Plural}

# whisper
That whisper seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will whisper the answer. {Pronoun,Modal,Inf,Det,Noun}

# whistle
Her whistle was memorable. {Poss,Noun|!Verb,Copula,Adj}
I whistle a tune. {Pronoun,Inf,Det,Noun}

# wick
The wick burned slowly. {Det,Noun|!Verb,Past,Adv}
He might wick moisture away. {Pronoun,Modal,Inf,Noun,Adv}

# win
The win surprised us. {Det,Noun|!Verb,Past,Pronoun}
We win the race. {Pronoun,Inf,Det,Noun}

# wind
The wind shook the trees. {Det,Noun|!Verb,Past,Det,Plural}
They wind the clock. {Pronoun,Inf,Det,Noun}
They wind the ribbon around the box. {Pronoun,Inf,Det,Noun,Prep,Det,Noun}

# wing
They described the wing. {Pronoun,Past,Det,Noun|!Verb}
You can wing the presentation. {Pronoun,Modal,Inf,Det,Noun}

# wipe
That wipe seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will wipe the table. {Pronoun,Modal,Inf,Det,Noun}

# wire
Her wire was memorable. {Poss,Noun|!Verb,Copula,Adj}
I wire the house. {Pronoun,Inf,Det,Noun}

# wish
I noticed the wish. {Pronoun,Past,Det,Noun|!Verb}
He might wish for peace. {Pronoun,Modal,Inf,Prep,Noun}

# wonder
The wonder surprised us. {Det,Noun|!Verb,Past,Pronoun}
We wonder about the future. {Pronoun,Inf,Prep,Det,Noun}

# work
We discussed the work. {Pronoun,Past,Det,Noun|!Verb}
They work at the factory. {Pronoun,Inf,Prep,Det,Noun}

# workshop
They described the workshop. {Pronoun,Past,Det,Noun|!Verb}
You can workshop the script. {Pronoun,Modal,Inf,Det,Noun}

# worry
That worry seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will worry about the cost. {Pronoun,Modal,Inf,Prep,Det,Noun}

# worship
Her worship was memorable. {Poss,Noun|!Verb,Copula,Adj}
I worship at the temple. {Pronoun,Inf,Prep,Det,Noun}

# worth
# No ordinary verb sense supplied; noun use only.
Her worth exceeded money. {Poss,Noun|!Verb,Past,Noun}

# wound
I noticed the wound. {Pronoun,Past,Det,Noun|!Verb}
He might wound his pride. {Pronoun,Modal,Inf,Poss,Noun}

# wrap
The wrap surprised us. {Det,Noun|!Verb,Past,Pronoun}
We wrap the gift. {Pronoun,Inf,Det,Noun}

# wreck
We discussed the wreck. {Pronoun,Past,Det,Noun|!Verb}
They wreck the car. {Pronoun,Inf,Det,Noun}

# wrinkle
They described the wrinkle. {Pronoun,Past,Det,Noun|!Verb}
You can wrinkle the fabric. {Pronoun,Modal,Inf,Det,Noun}

# yawn
That yawn seemed unusual. {Det,Noun|!Verb,Past,Adj}
She will yawn during the lecture. {Pronoun,Modal,Inf,Prep,Det,Noun}

# yell
Her yell was memorable. {Poss,Noun|!Verb,Copula,Adj}
I yell across the field. {Pronoun,Inf,Prep,Det,Noun}

# yield
I noticed the yield. {Pronoun,Past,Det,Noun|!Verb}
He might yield to traffic. {Pronoun,Modal,Inf,Prep,Noun}

# zip
The zip surprised us. {Det,Noun|!Verb,Past,Pronoun}
We zip the bag. {Pronoun,Inf,Det,Noun}

# zone
We discussed the zone. {Pronoun,Past,Det,Noun|!Verb}
They zone the land for housing. {Pronoun,Inf,Det,Noun,Prep,Noun}

# zoom
They described the zoom. {Pronoun,Past,Det,Noun|!Verb}
You can zoom past the house. {Pronoun,Modal,Inf,Prep,Det,Noun}

# lie
His lie fooled nobody. {Poss,Noun|!Verb,Past,Pronoun}
She will lie about the incident. {Pronoun,Modal,Inf,Prep,Det,Noun}
We lie on the grass. {Pronoun,Inf,Prep,Det,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
