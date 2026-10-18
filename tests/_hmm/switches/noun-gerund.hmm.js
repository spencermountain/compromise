import test from 'tape'
import assertSpec from '../../lib/spec.js'
import assertNoOverlap from './_lib.js'
const here = '[hmm/switches/noun-gerund] '

const spec = `
# Independently authored whole-sentence expectations.

# abandoning
The abandoning of the plan surprised us. {Det,Noun,Prep,Det,Noun,Past,Pronoun}
She is abandoning the project. {Pronoun,Aux,Ger,Det,Noun}

# accounting
We discussed the accounting. {Pronoun,Past,Det,Noun}
He is accounting for every expense. {Pronoun,Aux,Ger,Prep,Det,Noun}

# acting
They described the acting. {Pronoun,Past,Det,Noun}
She is acting in a play. {Pronoun,Aux,Ger,Prep,Det,Noun}

# advertising
The advertising continued for hours. {Det,Noun,Past,Prep,Plural}
He is advertising the cottage. {Pronoun,Aux,Ger,Det,Noun}

# aging
The aging of the population surprised us. {Det,Noun,Prep,Det,Noun,Past,Pronoun}
She is aging gracefully. {Pronoun,Aux,Ger,Adv}

# approaching
The slow approaching of the ship worried us. {Det,Adj,Noun,Prep,Det,Noun,Past,Pronoun}
The train is approaching the station. {Det,Noun,Aux,Ger,Det,Noun}

# arguing
They described the arguing. {Pronoun,Past,Det,Noun}
He is arguing with the referee. {Pronoun,Aux,Ger,Prep,Det,Noun}

# assuming
The sudden assuming of responsibility changed her. {Det,Adj,Noun,Prep,Noun,Past,Pronoun}
She is assuming the responsibility. {Pronoun,Aux,Ger,Det,Noun}

# attracting
The attracting of new customers surprised us. {Det,Noun,Prep,Adj,Noun,Past,Pronoun}
The shop is attracting more visitors. {Det,Noun,Aux,Ger,Det,Plural}

# babysitting
We discussed the babysitting. {Pronoun,Past,Det,Noun}
He is babysitting the twins. {Pronoun,Aux,Ger,Det,Plural}

# backing
They described the backing. {Pronoun,Past,Det,Noun}
She is backing the proposal. {Pronoun,Aux,Ger,Det,Noun}

# baking
The baking continued for hours. {Det,Noun,Past,Prep,Plural}
He is baking the bread. {Pronoun,Aux,Ger,Det,Noun}

# battling
The battling surprised us. {Det,Noun,Past,Pronoun}
She is battling the flames. {Pronoun,Aux,Ger,Det,Plural}

# beginning
We discussed the beginning. {Pronoun,Past,Det,Noun}
He is beginning a new chapter. {Pronoun,Aux,Ger,Det,Adj,Noun}

# belonging
Her sense of belonging grew. {Poss,Noun,Prep,Noun,Past}
The car belonging to her vanished. {Det,Noun,Ger,Prep,Pronoun,Past}

# betting
The betting continued for hours. {Det,Noun,Past,Prep,Plural}
She is betting on the horse. {Pronoun,Aux,Ger,Prep,Det,Noun}

# bitching
The bitching surprised us. {Det,Noun,Past,Pronoun}
He is bitching about the service. {Pronoun,Aux,Ger,Prep,Det,Noun}

# biting
We discussed the biting. {Pronoun,Past,Det,Noun}
The puppy is biting my sleeve. {Det,Noun,Aux,Ger,Poss,Noun}

# blessing
They described the blessing. {Pronoun,Past,Det,Noun}
She is blessing the congregation. {Pronoun,Aux,Ger,Det,Noun}

# bloating
The bloating continued for hours. {Det,Noun,Past,Prep,Plural}
The meal is bloating my stomach. {Det,Noun,Aux,Ger,Poss,Noun}

# boating
The boating surprised us. {Det,Noun,Past,Pronoun}
He is boating on the lake. {Pronoun,Aux,Ger,Prep,Det,Noun}

# bombing
We discussed the bombing. {Pronoun,Past,Det,Noun}
The aircraft is bombing the bunker. {Det,Noun,Aux,Ger,Det,Noun}

# booking
They described the booking. {Pronoun,Past,Det,Noun}
She is booking a room. {Pronoun,Aux,Ger,Det,Noun}

# bookkeeping
The bookkeeping continued for hours. {Det,Noun,Past,Prep,Plural}
He is bookkeeping for the firm. {Pronoun,Aux,Ger,Prep,Det,Noun}

# branding
The branding surprised us. {Det,Noun,Past,Pronoun}
She is branding the cattle. {Pronoun,Aux,Ger,Det,Noun}

# breathing
We discussed the breathing. {Pronoun,Past,Det,Noun}
He is breathing fresh air. {Pronoun,Aux,Ger,Adj,Noun}

# broadcasting
They described the broadcasting. {Pronoun,Past,Det,Noun}
She is broadcasting the interview. {Pronoun,Aux,Ger,Det,Noun}

# budgeting
The budgeting continued for hours. {Det,Noun,Past,Prep,Plural}
He is budgeting for the trip. {Pronoun,Aux,Ger,Prep,Det,Noun}

# building
The building surprised us. {Det,Noun,Past,Pronoun}
She is building a shed. {Pronoun,Aux,Ger,Det,Noun}
The building needs a roof. {Det,Noun,Pres,Det,Noun}

# bullying
We discussed the bullying. {Pronoun,Past,Det,Noun}
He is bullying the younger children. {Pronoun,Aux,Ger,Det,Adj,Plural}

# burping
They described the burping. {Pronoun,Past,Det,Noun}
She is burping the baby. {Pronoun,Aux,Ger,Det,Noun}

# camping
The camping continued for hours. {Det,Noun,Past,Prep,Plural}
He is camping beside the river. {Pronoun,Aux,Ger,Prep,Det,Noun}

# carving
The carving surprised us. {Det,Noun,Past,Pronoun}
She is carving the turkey. {Pronoun,Aux,Ger,Det,Noun}
She bought a wooden carving. {Pronoun,Past,Det,Adj,Noun}

# casting
We discussed the casting. {Pronoun,Past,Det,Noun}
He is casting a shadow. {Pronoun,Aux,Ger,Det,Noun}

# catering
They described the catering. {Pronoun,Past,Det,Noun}
She is catering for the wedding. {Pronoun,Aux,Ger,Prep,Det,Noun}

# celebrating
The celebrating continued for hours. {Det,Noun,Past,Prep,Plural}
He is celebrating the victory. {Pronoun,Aux,Ger,Det,Noun}

# chanting
The chanting surprised us. {Det,Noun,Past,Pronoun}
She is chanting a slogan. {Pronoun,Aux,Ger,Det,Noun}

# chatting
We discussed the chatting. {Pronoun,Past,Det,Noun}
He is chatting with the neighbors. {Pronoun,Aux,Ger,Prep,Det,Plural}

# cheering
They described the cheering. {Pronoun,Past,Det,Noun}
She is cheering for the team. {Pronoun,Aux,Ger,Prep,Det,Noun}

# clapping
The clapping continued for hours. {Det,Noun,Past,Prep,Plural}
He is clapping his hands. {Pronoun,Aux,Ger,Poss,Plural}

# cleaning
The cleaning surprised us. {Det,Noun,Past,Pronoun}
She is cleaning the kitchen. {Pronoun,Aux,Ger,Det,Noun}

# clearing
We discussed the clearing. {Pronoun,Past,Det,Noun}
He is clearing the table. {Pronoun,Aux,Ger,Det,Noun}

# climbing
They described the climbing. {Pronoun,Past,Det,Noun}
She is climbing the mountain. {Pronoun,Aux,Ger,Det,Noun}

# cloning
The cloning continued for hours. {Det,Noun,Past,Prep,Plural}
He is cloning the cells. {Pronoun,Aux,Ger,Det,Plural}

# clothing
The clothing surprised us. {Det,Noun,Past,Pronoun}
She is clothing the refugees. {Pronoun,Aux,Ger,Det,Plural}
His clothing was wet. {Poss,Noun,Copula,Adj}

# clubbing
We discussed the clubbing. {Pronoun,Past,Det,Noun}
He is clubbing with friends. {Pronoun,Aux,Ger,Prep,Plural}

# coaching
They described the coaching. {Pronoun,Past,Det,Noun}
She is coaching the team. {Pronoun,Aux,Ger,Det,Noun}

# coating
The coating continued for hours. {Det,Noun,Past,Prep,Plural}
He is coating the pan with oil. {Pronoun,Aux,Ger,Det,Noun,Prep,Noun}
The coating peeled away. {Det,Noun,Past,Adv}

# coding
The coding surprised us. {Det,Noun,Past,Pronoun}
She is coding the application. {Pronoun,Aux,Ger,Det,Noun}

# collecting
We discussed the collecting. {Pronoun,Past,Det,Noun}
He is collecting stamps. {Pronoun,Aux,Ger,Plural}

# coloring
They described the coloring. {Pronoun,Past,Det,Noun}
She is coloring the picture. {Pronoun,Aux,Ger,Det,Noun}

# communicating
The communicating continued for hours. {Det,Noun,Past,Prep,Plural}
He is communicating with the office. {Pronoun,Aux,Ger,Prep,Det,Noun}

# complaining
The complaining surprised us. {Det,Noun,Past,Pronoun}
She is complaining about the noise. {Pronoun,Aux,Ger,Prep,Det,Noun}

# composing
We discussed the composing. {Pronoun,Past,Det,Noun}
He is composing a symphony. {Pronoun,Aux,Ger,Det,Noun}

# conducting
They described the conducting. {Pronoun,Past,Det,Noun}
She is conducting the orchestra. {Pronoun,Aux,Ger,Det,Noun}

# constructing
The constructing of the bridge continued for hours. {Det,Noun,Prep,Det,Noun,Past,Prep,Plural}
He is constructing a model. {Pronoun,Aux,Ger,Det,Noun}

# consulting
The consulting surprised us. {Det,Noun,Past,Pronoun}
She is consulting the doctor. {Pronoun,Aux,Ger,Det,Noun}

# convincing
We discussed the convincing of the jury. {Pronoun,Past,Det,Noun,Prep,Det,Noun}
He is convincing the panel. {Pronoun,Aux,Ger,Det,Noun}

# cooking
They described the cooking. {Pronoun,Past,Det,Noun}
She is cooking the dinner. {Pronoun,Aux,Ger,Det,Noun}

# coping
The coping continued for hours. {Det,Noun,Past,Prep,Plural}
He is coping with the pressure. {Pronoun,Aux,Ger,Prep,Det,Noun}

# covering
The covering surprised us. {Det,Noun,Past,Pronoun}
She is covering the food. {Pronoun,Aux,Ger,Det,Noun}
We removed the covering. {Pronoun,Past,Det,Noun}

# crafting
We discussed the crafting. {Pronoun,Past,Det,Noun}
He is crafting a reply. {Pronoun,Aux,Ger,Det,Noun}

# crawling
They described the crawling. {Pronoun,Past,Det,Noun}
The baby is crawling toward the toy. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# crossing
The crossing continued for hours. {Det,Noun,Past,Prep,Plural}
She is crossing the street. {Pronoun,Aux,Ger,Det,Noun}
The crossing was dangerous. {Det,Noun,Copula,Adj}

# crying
The crying surprised us. {Det,Noun,Past,Pronoun}
He is crying with relief. {Pronoun,Aux,Ger,Prep,Noun}

# curling
We discussed the curling. {Pronoun,Past,Det,Noun}
She is curling the ribbon. {Pronoun,Aux,Ger,Det,Noun}
She plays curling competitively. {Pronoun,Pres,Noun,Adv}

# cycling
They described the cycling. {Pronoun,Past,Det,Noun}
He is cycling to work. {Pronoun,Aux,Ger,Prep,Noun}

# dancing
The dancing continued for hours. {Det,Noun,Past,Prep,Plural}
She is dancing with her brother. {Pronoun,Aux,Ger,Prep,Poss,Noun}

# dating
The dating surprised us. {Det,Noun,Past,Pronoun}
He is dating the manuscript. {Pronoun,Aux,Ger,Det,Noun}

# debating
We discussed the debating. {Pronoun,Past,Det,Noun}
She is debating the issue. {Pronoun,Aux,Ger,Det,Noun}

# decorating
They described the decorating. {Pronoun,Past,Det,Noun}
He is decorating the cake. {Pronoun,Aux,Ger,Det,Noun}

# delegating
The delegating of authority continued for hours. {Det,Noun,Prep,Noun,Past,Prep,Plural}
She is delegating the task. {Pronoun,Aux,Ger,Det,Noun}

# delivering
The delivering of the verdict surprised us. {Det,Noun,Prep,Det,Noun,Past,Pronoun}
He is delivering the mail. {Pronoun,Aux,Ger,Det,Noun}

# developing
We discussed the developing of the photographs. {Pronoun,Past,Det,Noun,Prep,Det,Noun}
She is developing a new technique. {Pronoun,Aux,Ger,Det,Adj,Noun}

# directing
They described the directing. {Pronoun,Past,Det,Noun}
He is directing the film. {Pronoun,Aux,Ger,Det,Noun}

# discovering
The discovering of the cave continued for hours. {Det,Noun,Prep,Det,Noun,Past,Prep,Plural}
She is discovering new species. {Pronoun,Aux,Ger,Adj,Plural}

# diving
The diving surprised us. {Det,Noun,Past,Pronoun}
He is diving into the pool. {Pronoun,Aux,Ger,Prep,Det,Noun}

# doubting
We discussed the doubting of her story. {Pronoun,Past,Det,Noun,Prep,Poss,Noun}
She is doubting his account. {Pronoun,Aux,Ger,Poss,Noun}

# drawing
They described the drawing. {Pronoun,Past,Det,Noun}
He is drawing a map. {Pronoun,Aux,Ger,Det,Noun}
The drawing hung above the desk. {Det,Noun,Past,Prep,Det,Noun}

# dreaming
The dreaming continued for hours. {Det,Noun,Past,Prep,Plural}
She is dreaming about the ocean. {Pronoun,Aux,Ger,Prep,Det,Noun}

# dressing
The dressing surprised us. {Det,Noun,Past,Pronoun}
He is dressing the baby. {Pronoun,Aux,Ger,Det,Noun}
The dressing tasted sour. {Det,Noun,Past,Adj}

# dribbling
We discussed the dribbling. {Pronoun,Past,Det,Noun}
She is dribbling the ball. {Pronoun,Aux,Ger,Det,Noun}

# drinking
They described the drinking. {Pronoun,Past,Det,Noun}
He is drinking water. {Pronoun,Aux,Ger,Noun}

# driving
The driving continued for hours. {Det,Noun,Past,Prep,Plural}
She is driving the truck. {Pronoun,Aux,Ger,Det,Noun}

# dumping
The dumping surprised us. {Det,Noun,Past,Pronoun}
He is dumping the rubbish. {Pronoun,Aux,Ger,Det,Noun}

# dwelling
We discussed the dwelling. {Pronoun,Past,Det,Noun}
She is dwelling on the mistake. {Pronoun,Aux,Ger,Prep,Det,Noun}
Their dwelling had a thatched roof. {Poss,Noun,Past,Det,Adj,Noun}

# eating
They described the eating. {Pronoun,Past,Det,Noun}
He is eating the sandwich. {Pronoun,Aux,Ger,Det,Noun}

# educating
The educating of the public continued for hours. {Det,Noun,Prep,Det,Noun,Past,Prep,Plural}
She is educating the children. {Pronoun,Aux,Ger,Det,Plural}

# enchanting
The enchanting of the prince surprised us. {Det,Noun,Prep,Det,Noun,Past,Pronoun}
The witch is enchanting the villagers. {Det,Noun,Aux,Ger,Det,Plural}

# ending
We discussed the ending. {Pronoun,Past,Det,Noun}
He is ending the discussion. {Pronoun,Aux,Ger,Det,Noun}

# engineering
They described the engineering. {Pronoun,Past,Det,Noun}
She is engineering a solution. {Pronoun,Aux,Ger,Det,Noun}

# exercising
The exercising continued for hours. {Det,Noun,Past,Prep,Plural}
He is exercising his rights. {Pronoun,Aux,Ger,Poss,Plural}

# exploring
The exploring surprised us. {Det,Noun,Past,Pronoun}
She is exploring the cave. {Pronoun,Aux,Ger,Det,Noun}

# farming
We discussed the farming. {Pronoun,Past,Det,Noun}
He is farming the land. {Pronoun,Aux,Ger,Det,Noun}

# fascinating
They described the fascinating of the audience. {Pronoun,Past,Det,Noun,Prep,Det,Noun}
She is fascinating the children. {Pronoun,Aux,Ger,Det,Plural}

# feeling
The feeling continued for hours. {Det,Noun,Past,Prep,Plural}
He is feeling the fabric. {Pronoun,Aux,Ger,Det,Noun}
A strange feeling troubled her. {Det,Adj,Noun,Past,Pronoun}

# fencing
The fencing surprised us. {Det,Noun,Past,Pronoun}
She is fencing the garden. {Pronoun,Aux,Ger,Det,Noun}
The fencing kept rabbits outside. {Det,Noun,Past,Noun,Adv}

# fighting
We discussed the fighting. {Pronoun,Past,Det,Noun}
He is fighting the fire. {Pronoun,Aux,Ger,Det,Noun}

# filing
They described the filing. {Pronoun,Past,Det,Noun}
She is filing the report. {Pronoun,Aux,Ger,Det,Noun}

# filling
The filling continued for hours. {Det,Noun,Past,Prep,Plural}
He is filling the tank. {Pronoun,Aux,Ger,Det,Noun}
The filling tasted sweet. {Det,Noun,Past,Adj}

# financing
The financing surprised us. {Det,Noun,Past,Pronoun}
She is financing the project. {Pronoun,Aux,Ger,Det,Noun}

# finding
We discussed the finding. {Pronoun,Past,Det,Noun}
He is finding new evidence. {Pronoun,Aux,Ger,Adj,Noun}
The finding contradicted our theory. {Det,Noun,Past,Poss,Noun}

# fishing
They described the fishing. {Pronoun,Past,Det,Noun}
She is fishing in the river. {Pronoun,Aux,Ger,Prep,Det,Noun}

# flirting
The flirting continued for hours. {Det,Noun,Past,Prep,Plural}
He is flirting with the waiter. {Pronoun,Aux,Ger,Prep,Det,Noun}

# flooding
The flooding surprised us. {Det,Noun,Past,Pronoun}
The river is flooding the fields. {Det,Noun,Aux,Ger,Det,Plural}

# forecasting
We discussed the forecasting. {Pronoun,Past,Det,Noun}
She is forecasting the weather. {Pronoun,Aux,Ger,Det,Noun}

# formatting
They described the formatting. {Pronoun,Past,Det,Noun}
He is formatting the document. {Pronoun,Aux,Ger,Det,Noun}

# frosting
The frosting continued for hours. {Det,Noun,Past,Prep,Plural}
She is frosting the cake. {Pronoun,Aux,Ger,Det,Noun}
The frosting melted. {Det,Noun,Past}

# funding
The funding surprised us. {Det,Noun,Past,Pronoun}
He is funding the research. {Pronoun,Aux,Ger,Det,Noun}

# gardening
We discussed the gardening. {Pronoun,Past,Det,Noun}
She is gardening behind the house. {Pronoun,Aux,Ger,Prep,Det,Noun}

# gathering
They described the gathering. {Pronoun,Past,Det,Noun}
He is gathering the supplies. {Pronoun,Aux,Ger,Det,Plural}

# generating
The generating of electricity continued for hours. {Det,Noun,Prep,Noun,Past,Prep,Plural}
The turbine is generating power. {Det,Noun,Aux,Ger,Noun}

# gliding
The gliding surprised us. {Det,Noun,Past,Pronoun}
She is gliding over the hills. {Pronoun,Aux,Ger,Prep,Det,Plural}

# greeting
We discussed the greeting. {Pronoun,Past,Det,Noun}
He is greeting the guests. {Pronoun,Aux,Ger,Det,Plural}
His greeting sounded friendly. {Poss,Noun,Past,Adj}

# grieving
They described the grieving. {Pronoun,Past,Det,Noun}
She is grieving for her friend. {Pronoun,Aux,Ger,Prep,Poss,Noun}

# guiding
The guiding continued for hours. {Det,Noun,Past,Prep,Plural}
He is guiding the visitors. {Pronoun,Aux,Ger,Det,Plural}

# handling
The handling surprised us. {Det,Noun,Past,Pronoun}
She is handling the complaints. {Pronoun,Aux,Ger,Det,Plural}

# harrowing
We discussed the harrowing. {Pronoun,Past,Det,Noun}
He is harrowing the field. {Pronoun,Aux,Ger,Det,Noun}

# harvesting
They described the harvesting. {Pronoun,Past,Det,Noun}
She is harvesting the wheat. {Pronoun,Aux,Ger,Det,Noun}

# heating
The heating continued for hours. {Det,Noun,Past,Prep,Plural}
He is heating the soup. {Pronoun,Aux,Ger,Det,Noun}

# hiking
The hiking surprised us. {Det,Noun,Past,Pronoun}
She is hiking through the forest. {Pronoun,Aux,Ger,Prep,Det,Noun}

# hiring
We discussed the hiring. {Pronoun,Past,Det,Noun}
He is hiring an assistant. {Pronoun,Aux,Ger,Det,Noun}

# holding
They described the holding. {Pronoun,Past,Det,Noun}
She is holding the rope. {Pronoun,Aux,Ger,Det,Noun}
The holding included valuable land. {Det,Noun,Past,Adj,Noun}

# howling
The howling continued for hours. {Det,Noun,Past,Prep,Plural}
The dog is howling at the moon. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# hunting
The hunting surprised us. {Det,Noun,Past,Pronoun}
He is hunting for clues. {Pronoun,Aux,Ger,Prep,Plural}

# icing
We discussed the icing. {Pronoun,Past,Det,Noun}
She is icing the cake. {Pronoun,Aux,Ger,Det,Noun}
The icing was pink. {Det,Noun,Copula,Adj}

# illustrating
They described the illustrating of the book. {Pronoun,Past,Det,Noun,Prep,Det,Noun}
He is illustrating the story. {Pronoun,Aux,Ger,Det,Noun}

# imagining
The imagining continued for hours. {Det,Noun,Past,Prep,Plural}
She is imagining a different future. {Pronoun,Aux,Ger,Det,Adj,Noun}

# imploding
The imploding of the tower surprised us. {Det,Noun,Prep,Det,Noun,Past,Pronoun}
The building is imploding under its own weight. {Det,Noun,Aux,Ger,Prep,Poss,Adj,Noun}

# innovating
We discussed the innovating. {Pronoun,Past,Det,Noun}
He is innovating in the laboratory. {Pronoun,Aux,Ger,Prep,Det,Noun}

# inspecting
They described the inspecting of the roof. {Pronoun,Past,Det,Noun,Prep,Det,Noun}
She is inspecting the bridge. {Pronoun,Aux,Ger,Det,Noun}

# interacting
The interacting continued for hours. {Det,Noun,Past,Prep,Plural}
He is interacting with the children. {Pronoun,Aux,Ger,Prep,Det,Plural}

# interviewing
The interviewing surprised us. {Det,Noun,Past,Pronoun}
She is interviewing the candidate. {Pronoun,Aux,Ger,Det,Noun}

# inventing
We discussed the inventing. {Pronoun,Past,Det,Noun}
He is inventing a new machine. {Pronoun,Aux,Ger,Det,Adj,Noun}

# ironing
They described the ironing. {Pronoun,Past,Det,Noun}
She is ironing the shirt. {Pronoun,Aux,Ger,Det,Noun}

# jogging
The jogging continued for hours. {Det,Noun,Past,Prep,Plural}
He is jogging around the park. {Pronoun,Aux,Ger,Prep,Det,Noun}

# judging
The judging surprised us. {Det,Noun,Past,Pronoun}
She is judging the contest. {Pronoun,Aux,Ger,Det,Noun}

# juggling
We discussed the juggling. {Pronoun,Past,Det,Noun}
He is juggling three balls. {Pronoun,Aux,Ger,Value,Plural}

# justifying
They described the justifying of the expense. {Pronoun,Past,Det,Noun,Prep,Det,Noun}
She is justifying the decision. {Pronoun,Aux,Ger,Det,Noun}

# kicking
The kicking continued for hours. {Det,Noun,Past,Prep,Plural}
He is kicking the ball. {Pronoun,Aux,Ger,Det,Noun}

# killing
The killing surprised us. {Det,Noun,Past,Pronoun}
The frost is killing the seedlings. {Det,Noun,Aux,Ger,Det,Plural}

# kneading
We discussed the kneading. {Pronoun,Past,Det,Noun}
She is kneading the dough. {Pronoun,Aux,Ger,Det,Noun}

# knitting
They described the knitting. {Pronoun,Past,Det,Noun}
He is knitting a scarf. {Pronoun,Aux,Ger,Det,Noun}

# landing
The landing continued for hours. {Det,Noun,Past,Prep,Plural}
She is landing the aircraft. {Pronoun,Aux,Ger,Det,Noun}
The landing needs a carpet. {Det,Noun,Pres,Det,Noun}

# laughing
The laughing surprised us. {Det,Noun,Past,Pronoun}
He is laughing at the joke. {Pronoun,Aux,Ger,Prep,Det,Noun}

# learning
We discussed the learning. {Pronoun,Past,Det,Noun}
She is learning the melody. {Pronoun,Aux,Ger,Det,Noun}

# leasing
They described the leasing. {Pronoun,Past,Det,Noun}
He is leasing the building. {Pronoun,Aux,Ger,Det,Noun}

# licensing
The licensing continued for hours. {Det,Noun,Past,Prep,Plural}
She is licensing the software. {Pronoun,Aux,Ger,Det,Noun}

# lifting
The lifting surprised us. {Det,Noun,Past,Pronoun}
He is lifting the box. {Pronoun,Aux,Ger,Det,Noun}

# limiting
We discussed the limiting of access. {Pronoun,Past,Det,Noun,Prep,Noun}
She is limiting the damage. {Pronoun,Aux,Ger,Det,Noun}

# listening
They described the listening. {Pronoun,Past,Det,Noun}
He is listening to the radio. {Pronoun,Aux,Ger,Prep,Det,Noun}

# listing
The listing continued for hours. {Det,Noun,Past,Prep,Plural}
She is listing the ingredients. {Pronoun,Aux,Ger,Det,Plural}
The listing includes a photograph. {Det,Noun,Pres,Det,Noun}

# lodging
The lodging surprised us. {Det,Noun,Past,Pronoun}
He is lodging with friends. {Pronoun,Aux,Ger,Prep,Plural}
We found cheap lodging. {Pronoun,Past,Adj,Noun}

# lying
We discussed the lying. {Pronoun,Past,Det,Noun}
She is lying on the sofa. {Pronoun,Aux,Ger,Prep,Det,Noun}

# maintaining
They described the maintaining of the equipment. {Pronoun,Past,Det,Noun,Prep,Det,Noun}
He is maintaining the machinery. {Pronoun,Aux,Ger,Det,Noun}

# manifesting
The manifesting of symptoms continued for hours. {Det,Noun,Prep,Noun,Past,Prep,Plural}
The illness is manifesting itself gradually. {Det,Noun,Aux,Ger,Pronoun,Adv}

# manufacturing
The manufacturing surprised us. {Det,Noun,Past,Pronoun}
She is manufacturing the parts. {Pronoun,Aux,Ger,Det,Plural}

# marketing
We discussed the marketing. {Pronoun,Past,Det,Noun}
He is marketing the product. {Pronoun,Aux,Ger,Det,Noun}

# meaning
The meaning of the message puzzled us. {Det,Noun,Prep,Det,Noun,Past,Pronoun}
She has been meaning to call you. {Pronoun,Aux,Aux,Ger,Connector,Inf,Pronoun}
The meaning remains unclear. {Det,Noun,Pres,Adj}

# meditating
The meditating continued for hours. {Det,Noun,Past,Prep,Plural}
He is meditating beside the river. {Pronoun,Aux,Ger,Prep,Det,Noun}

# meeting
The meeting surprised us. {Det,Noun,Past,Pronoun}
She is meeting the director. {Pronoun,Aux,Ger,Det,Noun}
The meeting lasted hours. {Det,Noun,Past,Plural}

# messaging
We discussed the messaging. {Pronoun,Past,Det,Noun}
He is messaging his sister. {Pronoun,Aux,Ger,Poss,Noun}

# mining
They described the mining. {Pronoun,Past,Det,Noun}
She is mining coal. {Pronoun,Aux,Ger,Noun}

# modeling
The modeling continued for hours. {Det,Noun,Past,Prep,Plural}
He is modeling the jacket. {Pronoun,Aux,Ger,Det,Noun}

# monitoring
The monitoring surprised us. {Det,Noun,Past,Pronoun}
She is monitoring the temperature. {Pronoun,Aux,Ger,Det,Noun}

# navigating
We discussed the navigating. {Pronoun,Past,Det,Noun}
He is navigating the river. {Pronoun,Aux,Ger,Det,Noun}

# negotiating
They described the negotiating. {Pronoun,Past,Det,Noun}
She is negotiating the contract. {Pronoun,Aux,Ger,Det,Noun}

# networking
The networking continued for hours. {Det,Noun,Past,Prep,Plural}
He is networking with colleagues. {Pronoun,Aux,Ger,Prep,Plural}

# nursing
The nursing surprised us. {Det,Noun,Past,Pronoun}
She is nursing the patient. {Pronoun,Aux,Ger,Det,Noun}

# offering
We discussed the offering. {Pronoun,Past,Det,Noun}
He is offering a reward. {Pronoun,Aux,Ger,Det,Noun}
They left an offering beside the shrine. {Pronoun,Past,Det,Noun,Prep,Det,Noun}

# opening
They described the opening. {Pronoun,Past,Det,Noun}
She is opening the window. {Pronoun,Aux,Ger,Det,Noun}
A narrow opening admitted light. {Det,Adj,Noun,Past,Noun}

# operating
The operating continued for hours. {Det,Noun,Past,Prep,Plural}
He is operating the crane. {Pronoun,Aux,Ger,Det,Noun}

# organising
The organising surprised us. {Det,Noun,Past,Pronoun}
She is organising the conference. {Pronoun,Aux,Ger,Det,Noun}

# organizing
We discussed the organizing. {Pronoun,Past,Det,Noun}
He is organizing the files. {Pronoun,Aux,Ger,Det,Plural}

# overcoming
They described the overcoming of obstacles. {Pronoun,Past,Det,Noun,Prep,Noun}
She is overcoming her fear. {Pronoun,Aux,Ger,Poss,Noun}

# ovulating
The ovulating continued for hours. {Det,Noun,Past,Prep,Plural}
The mare is ovulating again. {Det,Noun,Aux,Ger,Adv}

# packaging
The packaging surprised us. {Det,Noun,Past,Pronoun}
He is packaging the goods. {Pronoun,Aux,Ger,Det,Plural}

# painting
We discussed the painting. {Pronoun,Past,Det,Noun}
She is painting the fence. {Pronoun,Aux,Ger,Det,Noun}
The painting needs restoration. {Det,Noun,Pres,Noun}

# parking
They described the parking. {Pronoun,Past,Det,Noun}
He is parking the car. {Pronoun,Aux,Ger,Det,Noun}

# partying
The partying continued for hours. {Det,Noun,Past,Prep,Plural}
She is partying with friends. {Pronoun,Aux,Ger,Prep,Plural}

# peacekeeping
The peacekeeping surprised us. {Det,Noun,Past,Pronoun}
The army is peacekeeping along the border. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# planning
We discussed the planning. {Pronoun,Past,Det,Noun}
He is planning the journey. {Pronoun,Aux,Ger,Det,Noun}

# playing
They described the playing. {Pronoun,Past,Det,Noun}
She is playing the violin. {Pronoun,Aux,Ger,Det,Noun}

# poisoning
The poisoning continued for hours. {Det,Noun,Past,Prep,Plural}
The waste is poisoning the river. {Det,Noun,Aux,Ger,Det,Noun}

# positioning
The positioning surprised us. {Det,Noun,Past,Pronoun}
He is positioning the camera. {Pronoun,Aux,Ger,Det,Noun}

# praying
We discussed the praying. {Pronoun,Past,Det,Noun}
She is praying for rain. {Pronoun,Aux,Ger,Prep,Noun}

# pretending
They described the pretending. {Pronoun,Past,Det,Noun}
He is pretending to sleep. {Pronoun,Aux,Ger,Connector,Inf}

# printing
The printing continued for hours. {Det,Noun,Past,Prep,Plural}
She is printing the poster. {Pronoun,Aux,Ger,Det,Noun}

# processing
The processing surprised us. {Det,Noun,Past,Pronoun}
He is processing the application. {Pronoun,Aux,Ger,Det,Noun}

# publishing
We discussed the publishing. {Pronoun,Past,Det,Noun}
She is publishing the novel. {Pronoun,Aux,Ger,Det,Noun}

# questioning
They described the questioning. {Pronoun,Past,Det,Noun}
He is questioning the witness. {Pronoun,Aux,Ger,Det,Noun}

# rapping
The rapping continued for hours. {Det,Noun,Past,Prep,Plural}
She is rapping on the door. {Pronoun,Aux,Ger,Prep,Det,Noun}

# rating
The rating surprised us. {Det,Noun,Past,Pronoun}
He is rating the service. {Pronoun,Aux,Ger,Det,Noun}
Its rating improved. {Poss,Noun,Past}

# reading
We discussed the reading. {Pronoun,Past,Det,Noun}
She is reading the letter. {Pronoun,Aux,Ger,Det,Noun}
The reading on the thermometer rose. {Det,Noun,Prep,Det,Noun,Past}

# reasoning
They described the reasoning. {Pronoun,Past,Det,Noun}
He is reasoning with the child. {Pronoun,Aux,Ger,Prep,Det,Noun}

# recording
The recording continued for hours. {Det,Noun,Past,Prep,Plural}
She is recording the interview. {Pronoun,Aux,Ger,Det,Noun}
The recording sounds clear. {Det,Noun,Pres,Adj}

# recycling
The recycling surprised us. {Det,Noun,Past,Pronoun}
He is recycling the bottles. {Pronoun,Aux,Ger,Det,Plural}

# rehearsing
We discussed the rehearsing. {Pronoun,Past,Det,Noun}
She is rehearsing the scene. {Pronoun,Aux,Ger,Det,Noun}

# relaxing
They described the relaxing. {Pronoun,Past,Det,Noun}
He is relaxing beside the pool. {Pronoun,Aux,Ger,Prep,Det,Noun}

# rendering
The rendering continued for hours. {Det,Noun,Past,Prep,Plural}
She is rendering the image. {Pronoun,Aux,Ger,Det,Noun}

# reporting
The reporting surprised us. {Det,Noun,Past,Pronoun}
He is reporting the accident. {Pronoun,Aux,Ger,Det,Noun}

# responding
We discussed the responding. {Pronoun,Past,Det,Noun}
She is responding to the letter. {Pronoun,Aux,Ger,Prep,Det,Noun}

# restructuring
They described the restructuring. {Pronoun,Past,Det,Noun}
He is restructuring the company. {Pronoun,Aux,Ger,Det,Noun}
The restructuring continued for hours. {Det,Noun,Past,Prep,Plural}
She is restructuring the department. {Pronoun,Aux,Ger,Det,Noun}

# riding
The riding surprised us. {Det,Noun,Past,Pronoun}
He is riding the horse. {Pronoun,Aux,Ger,Det,Noun}

# roofing
We discussed the roofing. {Pronoun,Past,Det,Noun}
She is roofing the shed. {Pronoun,Aux,Ger,Det,Noun}

# rowing
They described the rowing. {Pronoun,Past,Det,Noun}
He is rowing the boat. {Pronoun,Aux,Ger,Det,Noun}

# ruling
The ruling continued for hours. {Det,Noun,Past,Prep,Plural}
She is ruling the country. {Pronoun,Aux,Ger,Det,Noun}
The ruling surprised the lawyer. {Det,Noun,Past,Det,Noun}

# running
The running surprised us. {Det,Noun,Past,Pronoun}
He is running the business. {Pronoun,Aux,Ger,Det,Noun}

# sailing
We discussed the sailing. {Pronoun,Past,Det,Noun}
She is sailing across the lake. {Pronoun,Aux,Ger,Prep,Det,Noun}

# saying
They described the saying. {Pronoun,Past,Det,Noun}
He is saying a prayer. {Pronoun,Aux,Ger,Det,Noun}
That saying sounds familiar. {Det,Noun,Pres,Adj}

# scheduling
The scheduling continued for hours. {Det,Noun,Past,Prep,Plural}
She is scheduling the appointment. {Pronoun,Aux,Ger,Det,Noun}

# schooling
The schooling surprised us. {Det,Noun,Past,Pronoun}
He is schooling the horse. {Pronoun,Aux,Ger,Det,Noun}

# scoring
We discussed the scoring. {Pronoun,Past,Det,Noun}
She is scoring the match. {Pronoun,Aux,Ger,Det,Noun}

# screaming
They described the screaming. {Pronoun,Past,Det,Noun}
He is screaming for help. {Pronoun,Aux,Ger,Prep,Noun}

# screening
The screening continued for hours. {Det,Noun,Past,Prep,Plural}
She is screening the applicants. {Pronoun,Aux,Ger,Det,Plural}

# sculpting
The sculpting surprised us. {Det,Noun,Past,Pronoun}
He is sculpting the clay. {Pronoun,Aux,Ger,Det,Noun}

# seating
We discussed the seating. {Pronoun,Past,Det,Noun}
She is seating the guests. {Pronoun,Aux,Ger,Det,Plural}

# serving
They described the serving. {Pronoun,Past,Det,Noun}
He is serving the soup. {Pronoun,Aux,Ger,Det,Noun}

# setting
The setting continued for hours. {Det,Noun,Past,Prep,Plural}
She is setting the table. {Pronoun,Aux,Ger,Det,Noun}
The setting suited the story. {Det,Noun,Past,Det,Noun}

# shipping
The shipping surprised us. {Det,Noun,Past,Pronoun}
He is shipping the goods. {Pronoun,Aux,Ger,Det,Plural}

# shopping
We discussed the shopping. {Pronoun,Past,Det,Noun}
She is shopping for groceries. {Pronoun,Aux,Ger,Prep,Plural}

# shortening
They described the shortening. {Pronoun,Past,Det,Noun}
He is shortening the skirt. {Pronoun,Aux,Ger,Det,Noun}
She added shortening to the dough. {Pronoun,Past,Noun,Prep,Det,Noun}

# shouting
The shouting continued for hours. {Det,Noun,Past,Prep,Plural}
She is shouting across the field. {Pronoun,Aux,Ger,Prep,Det,Noun}

# signaling
The signaling surprised us. {Det,Noun,Past,Pronoun}
He is signaling the driver. {Pronoun,Aux,Ger,Det,Noun}

# signing
We discussed the signing. {Pronoun,Past,Det,Noun}
She is signing the contract. {Pronoun,Aux,Ger,Det,Noun}

# singing
They described the singing. {Pronoun,Past,Det,Noun}
He is singing a lullaby. {Pronoun,Aux,Ger,Det,Noun}

# sitting
The sitting continued for hours. {Det,Noun,Past,Prep,Plural}
She is sitting beside the window. {Pronoun,Aux,Ger,Prep,Det,Noun}

# skateboarding
The skateboarding surprised us. {Det,Noun,Past,Pronoun}
He is skateboarding to school. {Pronoun,Aux,Ger,Prep,Noun}

# skating
We discussed the skating. {Pronoun,Past,Det,Noun}
She is skating across the pond. {Pronoun,Aux,Ger,Prep,Det,Noun}

# sleeping
They described the sleeping. {Pronoun,Past,Det,Noun}
He is sleeping in the tent. {Pronoun,Aux,Ger,Prep,Det,Noun}

# smoking
The smoking continued for hours. {Det,Noun,Past,Prep,Plural}
She is smoking the fish. {Pronoun,Aux,Ger,Det,Noun}

# snowboarding
The snowboarding surprised us. {Det,Noun,Past,Pronoun}
He is snowboarding down the slope. {Pronoun,Aux,Ger,Prep,Det,Noun}

# snowing
The constant snowing delayed us. {Det,Adj,Noun,Past,Pronoun}
It is snowing in the mountains. {Pronoun,Aux,Ger,Prep,Det,Plural}

# spelling
They described the spelling. {Pronoun,Past,Det,Noun}
She is spelling the name. {Pronoun,Aux,Ger,Det,Noun}
His spelling was correct. {Poss,Noun,Copula,Adj}

# spending
The spending continued for hours. {Det,Noun,Past,Prep,Plural}
He is spending the money. {Pronoun,Aux,Ger,Det,Noun}

# staging
The staging surprised us. {Det,Noun,Past,Pronoun}
She is staging the play. {Pronoun,Aux,Ger,Det,Noun}

# storytelling
We discussed the storytelling. {Pronoun,Past,Det,Noun}
He is storytelling at the festival. {Pronoun,Aux,Ger,Prep,Det,Noun}

# stretching
They described the stretching. {Pronoun,Past,Det,Noun}
She is stretching the fabric. {Pronoun,Aux,Ger,Det,Noun}

# struggling
The struggling continued for hours. {Det,Noun,Past,Prep,Plural}
He is struggling with the lock. {Pronoun,Aux,Ger,Prep,Det,Noun}

# studying
The studying surprised us. {Det,Noun,Past,Pronoun}
She is studying the map. {Pronoun,Aux,Ger,Det,Noun}

# stuffing
We discussed the stuffing. {Pronoun,Past,Det,Noun}
He is stuffing the cushion. {Pronoun,Aux,Ger,Det,Noun}
The stuffing contains herbs. {Det,Noun,Pres,Plural}

# subtracting
They described the subtracting. {Pronoun,Past,Det,Noun}
She is subtracting the expenses. {Pronoun,Aux,Ger,Det,Plural}

# suffering
The suffering continued for hours. {Det,Noun,Past,Prep,Plural}
He is suffering from a headache. {Pronoun,Aux,Ger,Prep,Det,Noun}

# surfing
The surfing surprised us. {Det,Noun,Past,Pronoun}
She is surfing along the coast. {Pronoun,Aux,Ger,Prep,Det,Noun}

# surveying
We discussed the surveying. {Pronoun,Past,Det,Noun}
He is surveying the land. {Pronoun,Aux,Ger,Det,Noun}

# surviving
They described the surviving. {Pronoun,Past,Det,Noun}
She is surviving on berries. {Pronoun,Aux,Ger,Prep,Plural}

# swearing
The swearing continued for hours. {Det,Noun,Past,Prep,Plural}
He is swearing under his breath. {Pronoun,Aux,Ger,Prep,Poss,Noun}

# swimming
The swimming surprised us. {Det,Noun,Past,Pronoun}
She is swimming across the lake. {Pronoun,Aux,Ger,Prep,Det,Noun}

# talking
We discussed the talking. {Pronoun,Past,Det,Noun}
He is talking about the journey. {Pronoun,Aux,Ger,Prep,Det,Noun}

# tanning
They described the tanning. {Pronoun,Past,Det,Noun}
She is tanning the leather. {Pronoun,Aux,Ger,Det,Noun}

# tasting
The tasting continued for hours. {Det,Noun,Past,Prep,Plural}
He is tasting the soup. {Pronoun,Aux,Ger,Det,Noun}

# teaching
The teaching surprised us. {Det,Noun,Past,Pronoun}
She is teaching mathematics. {Pronoun,Aux,Ger,Noun}

# teasing
We discussed the teasing. {Pronoun,Past,Det,Noun}
He is teasing his brother. {Pronoun,Aux,Ger,Poss,Noun}

# testing
They described the testing. {Pronoun,Past,Det,Noun}
She is testing the alarm. {Pronoun,Aux,Ger,Det,Noun}

# thinking
The thinking continued for hours. {Det,Noun,Past,Prep,Plural}
He is thinking about the problem. {Pronoun,Aux,Ger,Prep,Det,Noun}

# timing
The timing surprised us. {Det,Noun,Past,Pronoun}
She is timing the race. {Pronoun,Aux,Ger,Det,Noun}

# tipping
We discussed the tipping. {Pronoun,Past,Det,Noun}
He is tipping the waiter. {Pronoun,Aux,Ger,Det,Noun}

# tracking
They described the tracking. {Pronoun,Past,Det,Noun}
She is tracking the package. {Pronoun,Aux,Ger,Det,Noun}

# trading
The trading continued for hours. {Det,Noun,Past,Prep,Plural}
He is trading the cards. {Pronoun,Aux,Ger,Det,Plural}

# training
The training surprised us. {Det,Noun,Past,Pronoun}
She is training the dog. {Pronoun,Aux,Ger,Det,Noun}

# traveling
We discussed the traveling. {Pronoun,Past,Det,Noun}
He is traveling by train. {Pronoun,Aux,Ger,Prep,Noun}

# travelling
They described the travelling. {Pronoun,Past,Det,Noun}
She is travelling through the mountains. {Pronoun,Aux,Ger,Prep,Det,Plural}

# typing
The typing continued for hours. {Det,Noun,Past,Prep,Plural}
He is typing the letter. {Pronoun,Aux,Ger,Det,Noun}

# understanding
The understanding surprised us. {Det,Noun,Past,Pronoun}
She is understanding more with every lesson. {Pronoun,Aux,Ger,Pronoun,Prep,Det,Noun}

# undertaking
We discussed the undertaking. {Pronoun,Past,Det,Noun}
He is undertaking the project. {Pronoun,Aux,Ger,Det,Noun}
The undertaking required courage. {Det,Noun,Past,Noun}

# visualizing
They described the visualizing. {Pronoun,Past,Det,Noun}
She is visualizing the result. {Pronoun,Aux,Ger,Det,Noun}

# volunteering
The volunteering continued for hours. {Det,Noun,Past,Prep,Plural}
He is volunteering at the shelter. {Pronoun,Aux,Ger,Prep,Det,Noun}

# voting
The voting surprised us. {Det,Noun,Past,Pronoun}
She is voting against the proposal. {Pronoun,Aux,Ger,Prep,Det,Noun}

# waiting
We discussed the waiting. {Pronoun,Past,Det,Noun}
He is waiting beside the gate. {Pronoun,Aux,Ger,Prep,Det,Noun}

# warning
They described the warning. {Pronoun,Past,Det,Noun}
She is warning the neighbors. {Pronoun,Aux,Ger,Det,Plural}
Her warning saved us. {Poss,Noun,Past,Pronoun}

# washing
The washing continued for hours. {Det,Noun,Past,Prep,Plural}
He is washing the dishes. {Pronoun,Aux,Ger,Det,Plural}

# watching
The watching surprised us. {Det,Noun,Past,Pronoun}
She is watching the birds. {Pronoun,Aux,Ger,Det,Plural}

# wedding
We discussed the wedding. {Pronoun,Past,Det,Noun}
He is wedding tradition to innovation. {Pronoun,Aux,Ger,Noun,Prep,Noun}
The wedding took place outdoors. {Det,Noun,Past,Noun,Adv}

# whispering
They described the whispering. {Pronoun,Past,Det,Noun}
She is whispering the answer. {Pronoun,Aux,Ger,Det,Noun}

# wiring
The wiring continued for hours. {Det,Noun,Past,Prep,Plural}
He is wiring the house. {Pronoun,Aux,Ger,Det,Noun}
The wiring needs replacement. {Det,Noun,Pres,Noun}

# wondering
The wondering surprised us. {Det,Noun,Past,Pronoun}
She is wondering about the future. {Pronoun,Aux,Ger,Prep,Det,Noun}

# working
We discussed the working. {Pronoun,Past,Det,Noun}
He is working at the factory. {Pronoun,Aux,Ger,Prep,Det,Noun}

# worrying
They described the worrying. {Pronoun,Past,Det,Noun}
She is worrying about the cost. {Pronoun,Aux,Ger,Prep,Det,Noun}

# wrapping
The wrapping continued for hours. {Det,Noun,Past,Prep,Plural}
He is wrapping the gift. {Pronoun,Aux,Ger,Det,Noun}
The wrapping tore easily. {Det,Noun,Past,Adv}

# wrestling
The wrestling surprised us. {Det,Noun,Past,Pronoun}
She is wrestling with the problem. {Pronoun,Aux,Ger,Prep,Det,Noun}

# writing
We discussed the writing. {Pronoun,Past,Det,Noun}
He is writing the letter. {Pronoun,Aux,Ger,Det,Noun}

# yawning
They described the yawning. {Pronoun,Past,Det,Noun}
She is yawning during the lecture. {Pronoun,Aux,Ger,Prep,Det,Noun}

# yearning
The yearning continued for hours. {Det,Noun,Past,Prep,Plural}
He is yearning for home. {Pronoun,Aux,Ger,Prep,Noun}

# yelling
The yelling surprised us. {Det,Noun,Past,Pronoun}
She is yelling across the yard. {Pronoun,Aux,Ger,Prep,Det,Noun}

# zeroing
We discussed the zeroing. {Pronoun,Past,Det,Noun}
He is zeroing the scales. {Pronoun,Aux,Ger,Det,Plural}

# zoning
They described the zoning. {Pronoun,Past,Det,Noun}
She is zoning the land for housing. {Pronoun,Aux,Ger,Det,Noun,Prep,Noun}

# zooming
The zooming continued for hours. {Det,Noun,Past,Prep,Plural}
He is zooming past the gate. {Pronoun,Aux,Ger,Prep,Det,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  assertNoOverlap(t, spec, here, ['(#Noun && #Verb)'])
  t.end()
})
