import test from 'tape'
import assertSpec from '../../lib/spec.js'
import assertNoOverlap from './_lib.js'
const here = '[hmm/switches/adj-gerund] '

const spec = `
# Independently authored whole-sentence expectations.

# absorbing
The absorbing novel surprised us. {Det,Adj,Noun,Past,Pronoun}
The sponge is absorbing water. {Det,Noun,Aux,Ger,Noun}

# accelerating
I noticed the accelerating pace. {Pronoun,Past,Det,Adj,Noun}
The driver is accelerating toward the bridge. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# accompanying
They described the accompanying letter. {Pronoun,Past,Det,Adj,Noun}
She is accompanying the singer on piano. {Pronoun,Aux,Ger,Det,Noun,Prep,Noun}

# aching
We discussed her aching muscle. {Pronoun,Past,Poss,Adj,Noun}
My shoulder is aching after the game. {Poss,Noun,Aux,Ger,Prep,Det,Noun}

# agonizing
The agonizing decision surprised us. {Det,Adj,Noun,Past,Pronoun}
He is agonizing over the choice. {Pronoun,Aux,Ger,Prep,Det,Noun}

# agonzing
# Dictionary spelling retained; intended senses of agonizing.
I noticed the agonzing decision. {Pronoun,Past,Det,Adj,Noun}
He is agonzing over the choice. {Pronoun,Aux,Ger,Prep,Det,Noun}

# alarming
They described the alarming report. {Pronoun,Past,Det,Adj,Noun}
The smoke is alarming the neighbors. {Det,Noun,Aux,Ger,Det,Plural}

# alluring
We discussed her alluring prospect. {Pronoun,Past,Poss,Adj,Noun}
The music is alluring travelers into the courtyard. {Det,Noun,Aux,Ger,Noun,Prep,Det,Noun}

# amazing
The amazing discovery surprised us. {Det,Adj,Noun,Past,Pronoun}
She is amazing the audience with tricks. {Pronoun,Aux,Ger,Det,Noun,Prep,Plural}

# amusing
I noticed the amusing story. {Pronoun,Past,Det,Adj,Noun}
He is amusing the baby. {Pronoun,Aux,Ger,Det,Noun}

# annoying
They described the annoying habit. {Pronoun,Past,Det,Adj,Noun}
She is annoying the neighbors. {Pronoun,Aux,Ger,Det,Plural}

# appealing
We discussed her appealing idea. {Pronoun,Past,Poss,Adj,Noun}
He is appealing against the verdict. {Pronoun,Aux,Ger,Prep,Det,Noun}

# arresting
The arresting image surprised us. {Det,Adj,Noun,Past,Pronoun}
The officer is arresting the suspect. {Det,Noun,Aux,Ger,Det,Noun}

# aspiring
I noticed the aspiring artist. {Pronoun,Past,Det,Adj,Noun}
She is aspiring to greatness. {Pronoun,Aux,Ger,Prep,Noun}

# assuring
They described the assuring tone. {Pronoun,Past,Det,Adj,Noun}
He is assuring us of success. {Pronoun,Aux,Ger,Pronoun,Prep,Noun}

# astonishing
We discussed her astonishing result. {Pronoun,Past,Poss,Adj,Noun}
She is astonishing the judges. {Pronoun,Aux,Ger,Det,Plural}

# astounding
The astounding discovery surprised us. {Det,Adj,Noun,Past,Pronoun}
He is astounding the crowd. {Pronoun,Aux,Ger,Det,Noun}

# baffling
I noticed the baffling puzzle. {Pronoun,Past,Det,Adj,Noun}
The problem is baffling everyone. {Det,Noun,Aux,Ger,Pronoun}

# becoming
They described the becoming dress. {Pronoun,Past,Det,Adj,Noun}
She is becoming a doctor. {Pronoun,Aux,Ger,Det,Noun}

# bewildering
We discussed her bewildering maze. {Pronoun,Past,Poss,Adj,Noun}
The explanation is bewildering the students. {Det,Noun,Aux,Ger,Det,Plural}

# bewitching
The bewitching smile surprised us. {Det,Adj,Noun,Past,Pronoun}
The witch is bewitching the prince. {Det,Noun,Aux,Ger,Det,Noun}

# binding
I noticed the binding agreement. {Pronoun,Past,Det,Adj,Noun}
She is binding the pages. {Pronoun,Aux,Ger,Det,Plural}

# blinding
They described the blinding light. {Pronoun,Past,Det,Adj,Noun}
The glare is blinding the driver. {Det,Noun,Aux,Ger,Det,Noun}

# boiling
We discussed her boiling water. {Pronoun,Past,Poss,Adj,Noun}
She is boiling the eggs. {Pronoun,Aux,Ger,Det,Plural}

# booming
The booming voice surprised us. {Det,Adj,Noun,Past,Pronoun}
The economy is booming again. {Det,Noun,Aux,Ger,Adv}

# boring
I noticed the boring lecture. {Pronoun,Past,Det,Adj,Noun}
He is boring a hole in the wall. {Pronoun,Aux,Ger,Det,Noun,Prep,Det,Noun}

# bouncing
They described the bouncing baby. {Pronoun,Past,Det,Adj,Noun}
She is bouncing the ball. {Pronoun,Aux,Ger,Det,Noun}

# breathtaking
# No ordinary standalone progressive verb sense supplied; adjective use only.
The breathtaking view surprised us. {Det,Adj,Noun,Past,Pronoun}

# bruising
We discussed her bruising encounter. {Pronoun,Past,Poss,Adj,Noun}
The strap is bruising his shoulder. {Det,Noun,Aux,Ger,Poss,Noun}

# budding
The budding artist surprised us. {Det,Adj,Noun,Past,Pronoun}
The tree is budding early. {Det,Noun,Aux,Ger,Adv}

# bustling
I noticed the bustling market. {Pronoun,Past,Det,Adj,Noun}
She is bustling around the kitchen. {Pronoun,Aux,Ger,Prep,Det,Noun}

# calming
They described the calming influence. {Pronoun,Past,Det,Adj,Noun}
He is calming the frightened child. {Pronoun,Aux,Ger,Det,Adj,Noun}

# captivating
We discussed her captivating story. {Pronoun,Past,Poss,Adj,Noun}
She is captivating the audience. {Pronoun,Aux,Ger,Det,Noun}

# caring
The caring neighbor surprised us. {Det,Adj,Noun,Past,Pronoun}
He is caring for his mother. {Pronoun,Aux,Ger,Prep,Poss,Noun}

# challenging
I noticed the challenging puzzle. {Pronoun,Past,Det,Adj,Noun}
She is challenging the decision. {Pronoun,Aux,Ger,Det,Noun}

# changing
They described the changing climate. {Pronoun,Past,Det,Adj,Noun}
He is changing the sheets. {Pronoun,Aux,Ger,Det,Plural}

# charming
We discussed her charming cottage. {Pronoun,Past,Poss,Adj,Noun}
She is charming the visitors. {Pronoun,Aux,Ger,Det,Plural}

# chilling
The chilling story surprised us. {Det,Adj,Noun,Past,Pronoun}
He is chilling the wine. {Pronoun,Aux,Ger,Det,Noun}

# closing
I noticed the closing remark. {Pronoun,Past,Det,Adj,Noun}
She is closing the door. {Pronoun,Aux,Ger,Det,Noun}

# comforting
They described the comforting thought. {Pronoun,Past,Det,Adj,Noun}
He is comforting the child. {Pronoun,Aux,Ger,Det,Noun}

# commanding
We discussed her commanding presence. {Pronoun,Past,Poss,Adj,Noun}
She is commanding the fleet. {Pronoun,Aux,Ger,Det,Noun}

# compelling
The compelling argument surprised us. {Det,Adj,Noun,Past,Pronoun}
The law is compelling him to resign. {Det,Noun,Aux,Ger,Pronoun,Connector,Inf}

# competing
I noticed the competing interest. {Pronoun,Past,Det,Adj,Noun}
She is competing for the prize. {Pronoun,Aux,Ger,Prep,Det,Noun}

# compromising
They described the compromising position. {Pronoun,Past,Det,Adj,Noun}
He is compromising the investigation. {Pronoun,Aux,Ger,Det,Noun}

# concerning
We discussed her concerning symptom. {Pronoun,Past,Poss,Adj,Noun}
She is concerning herself with details. {Pronoun,Aux,Ger,Pronoun,Prep,Plural}
We spoke concerning the budget. {Pronoun,Past,Prep,Det,Noun}

# conflicting
The conflicting advice surprised us. {Det,Adj,Noun,Past,Pronoun}
The account is conflicting with the evidence. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# confusing
I noticed the confusing instruction. {Pronoun,Past,Det,Adj,Noun}
She is confusing the names. {Pronoun,Aux,Ger,Det,Plural}

# conspiring
They described the conspiring faction. {Pronoun,Past,Det,Adj,Noun}
He is conspiring against the king. {Pronoun,Aux,Ger,Prep,Det,Noun}

# continuing
We discussed her continuing education. {Pronoun,Past,Poss,Adj,Noun}
She is continuing the investigation. {Pronoun,Aux,Ger,Det,Noun}

# contrasting
The contrasting color surprised us. {Det,Adj,Noun,Past,Pronoun}
He is contrasting the two paintings. {Pronoun,Aux,Ger,Det,Value,Plural}

# contributing
I noticed the contributing factor. {Pronoun,Past,Det,Adj,Noun}
She is contributing money to charity. {Pronoun,Aux,Ger,Noun,Prep,Noun}

# controlling
They described the controlling partner. {Pronoun,Past,Det,Adj,Noun}
He is controlling the temperature. {Pronoun,Aux,Ger,Det,Noun}

# corresponding
We discussed her corresponding number. {Pronoun,Past,Poss,Adj,Noun}
She is corresponding with the editor. {Pronoun,Aux,Ger,Prep,Det,Noun}

# crippling
The crippling debt surprised us. {Det,Adj,Noun,Past,Pronoun}
The disease is crippling the herd. {Det,Noun,Aux,Ger,Det,Noun}

# cutting
I noticed the cutting remark. {Pronoun,Past,Det,Adj,Noun}
She is cutting the bread. {Pronoun,Aux,Ger,Det,Noun}

# damaging
They described the damaging rumor. {Pronoun,Past,Det,Adj,Noun}
The storm is damaging the roof. {Det,Noun,Aux,Ger,Det,Noun}

# daring
We discussed her daring rescue. {Pronoun,Past,Poss,Adj,Noun}
He is daring me to jump. {Pronoun,Aux,Ger,Pronoun,Connector,Inf}

# dashing
The dashing officer surprised us. {Det,Adj,Noun,Past,Pronoun}
She is dashing toward the station. {Pronoun,Aux,Ger,Prep,Det,Noun}

# daunting
I noticed the daunting task. {Pronoun,Past,Det,Adj,Noun}
The climb is daunting the beginners. {Det,Noun,Aux,Ger,Det,Plural}

# dazzling
They described the dazzling display. {Pronoun,Past,Det,Adj,Noun}
The sun is dazzling the driver. {Det,Noun,Aux,Ger,Det,Noun}

# debilitating
We discussed her debilitating illness. {Pronoun,Past,Poss,Adj,Noun}
The infection is debilitating the patient. {Det,Noun,Aux,Ger,Det,Noun}

# decaying
The decaying tooth surprised us. {Det,Adj,Noun,Past,Pronoun}
The wood is decaying in the rain. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# deceiving
I noticed the deceiving appearance. {Pronoun,Past,Det,Adj,Noun}
She is deceiving the buyer. {Pronoun,Aux,Ger,Det,Noun}

# declining
They described the declining industry. {Pronoun,Past,Det,Adj,Noun}
He is declining the invitation. {Pronoun,Aux,Ger,Det,Noun}

# decreasing
We discussed her decreasing demand. {Pronoun,Past,Poss,Adj,Noun}
She is decreasing the pressure. {Pronoun,Aux,Ger,Det,Noun}

# defining
The defining moment surprised us. {Det,Adj,Noun,Past,Pronoun}
He is defining the term. {Pronoun,Aux,Ger,Det,Noun}

# degrading
I noticed the degrading treatment. {Pronoun,Past,Det,Adj,Noun}
The acid is degrading the material. {Det,Noun,Aux,Ger,Det,Noun}

# delighting
They described the delighting spectacle. {Pronoun,Past,Det,Adj,Noun}
She is delighting the children. {Pronoun,Aux,Ger,Det,Plural}

# demanding
We discussed her demanding job. {Pronoun,Past,Poss,Adj,Noun}
He is demanding an explanation. {Pronoun,Aux,Ger,Det,Noun}

# demeaning
The demeaning remark surprised us. {Det,Adj,Noun,Past,Pronoun}
She is demeaning the staff. {Pronoun,Aux,Ger,Det,Noun}

# demoralizing
I noticed the demoralizing defeat. {Pronoun,Past,Det,Adj,Noun}
The delay is demoralizing the team. {Det,Noun,Aux,Ger,Det,Noun}

# depressing
They described the depressing news. {Pronoun,Past,Det,Adj,Noun}
He is depressing the pedal. {Pronoun,Aux,Ger,Det,Noun}

# deserving
We discussed her deserving cause. {Pronoun,Past,Poss,Adj,Noun}
Anyone deserving such praise must be talented. {Pronoun,Ger,Det,Noun,Modal,Copula,Adj}

# devastating
The devastating flood surprised us. {Det,Adj,Noun,Past,Pronoun}
The storm is devastating the coast. {Det,Noun,Aux,Ger,Det,Noun}

# disappointing
I noticed the disappointing result. {Pronoun,Past,Det,Adj,Noun}
He is disappointing his parents. {Pronoun,Aux,Ger,Poss,Plural}

# disarming
They described the disarming smile. {Pronoun,Past,Det,Adj,Noun}
She is disarming the guard. {Pronoun,Aux,Ger,Det,Noun}

# disgusting
We discussed her disgusting smell. {Pronoun,Past,Poss,Adj,Noun}
He is disgusting the guests. {Pronoun,Aux,Ger,Det,Plural}

# disheartening
The disheartening setback surprised us. {Det,Adj,Noun,Past,Pronoun}
The news is disheartening the volunteers. {Det,Noun,Aux,Ger,Det,Plural}

# dissenting
I noticed the dissenting opinion. {Pronoun,Past,Det,Adj,Noun}
She is dissenting from the judgment. {Pronoun,Aux,Ger,Prep,Det,Noun}

# distracting
They described the distracting noise. {Pronoun,Past,Det,Adj,Noun}
He is distracting the driver. {Pronoun,Aux,Ger,Det,Noun}

# distressing
We discussed her distressing news. {Pronoun,Past,Poss,Adj,Noun}
The argument is distressing the children. {Det,Noun,Aux,Ger,Det,Plural}

# disturbing
The disturbing report surprised us. {Det,Adj,Noun,Past,Pronoun}
She is disturbing the neighbors. {Pronoun,Aux,Ger,Det,Plural}

# dizzying
I noticed the dizzying height. {Pronoun,Past,Det,Adj,Noun}
The motion is dizzying the passenger. {Det,Noun,Aux,Ger,Det,Noun}

# drifting
They described the drifting snow. {Pronoun,Past,Det,Adj,Noun}
The boat is drifting toward the rocks. {Det,Noun,Aux,Ger,Prep,Det,Plural}

# electrifying
We discussed her electrifying performance. {Pronoun,Past,Poss,Adj,Noun}
The engineer is electrifying the fence. {Det,Noun,Aux,Ger,Det,Noun}

# embarrassing
The embarrassing mistake surprised us. {Det,Adj,Noun,Past,Pronoun}
He is embarrassing his sister. {Pronoun,Aux,Ger,Poss,Noun}

# emerging
I noticed the emerging market. {Pronoun,Past,Det,Adj,Noun}
The butterfly is emerging from the cocoon. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# empowering
They described the empowering experience. {Pronoun,Past,Det,Adj,Noun}
The program is empowering local women. {Det,Noun,Aux,Ger,Adj,Plural}

# enabling
We discussed her enabling technology. {Pronoun,Past,Poss,Adj,Noun}
The grant is enabling us to continue. {Det,Noun,Aux,Ger,Pronoun,Connector,Inf}

# encouraging
The encouraging sign surprised us. {Det,Adj,Noun,Past,Pronoun}
She is encouraging the students. {Pronoun,Aux,Ger,Det,Plural}

# enduring
I noticed the enduring friendship. {Pronoun,Past,Det,Adj,Noun}
He is enduring the pain. {Pronoun,Aux,Ger,Det,Noun}

# energizing
They described the energizing drink. {Pronoun,Past,Det,Adj,Noun}
The sunlight is energizing the cells. {Det,Noun,Aux,Ger,Det,Plural}

# engaging
We discussed her engaging story. {Pronoun,Past,Poss,Adj,Noun}
She is engaging the gears. {Pronoun,Aux,Ger,Det,Plural}

# enlivening
The enlivening conversation surprised us. {Det,Adj,Noun,Past,Pronoun}
The music is enlivening the party. {Det,Noun,Aux,Ger,Det,Noun}

# enriching
I noticed the enriching experience. {Pronoun,Past,Det,Adj,Noun}
She is enriching the soil. {Pronoun,Aux,Ger,Det,Noun}

# ensuing
They described the ensuing chaos. {Pronoun,Past,Det,Adj,Noun}
Chaos is ensuing after the announcement. {Noun,Aux,Ger,Prep,Det,Noun}

# enthralling
We discussed her enthralling novel. {Pronoun,Past,Poss,Adj,Noun}
He is enthralling the audience. {Pronoun,Aux,Ger,Det,Noun}

# enticing
The enticing offer surprised us. {Det,Adj,Noun,Past,Pronoun}
She is enticing the kitten with food. {Pronoun,Aux,Ger,Det,Noun,Prep,Noun}

# exacting
I noticed the exacting standard. {Pronoun,Past,Det,Adj,Noun}
He is exacting revenge. {Pronoun,Aux,Ger,Noun}

# exasperating
They described the exasperating delay. {Pronoun,Past,Det,Adj,Noun}
The noise is exasperating the teacher. {Det,Noun,Aux,Ger,Det,Noun}

# exciting
We discussed her exciting news. {Pronoun,Past,Poss,Adj,Noun}
She is exciting the crowd. {Pronoun,Aux,Ger,Det,Noun}

# exhausting
The exhausting journey surprised us. {Det,Adj,Noun,Past,Pronoun}
The engine is exhausting the fuel supply. {Det,Noun,Aux,Ger,Det,Noun,Noun}

# exhilarating
I noticed the exhilarating ride. {Pronoun,Past,Det,Adj,Noun}
The performance is exhilarating the audience. {Det,Noun,Aux,Ger,Det,Noun}

# existing
They described the existing system. {Pronoun,Past,Det,Adj,Noun}
He is existing on bread and water. {Pronoun,Aux,Ger,Prep,Noun,Conj,Noun}

# expanding
We discussed her expanding market. {Pronoun,Past,Poss,Adj,Noun}
She is expanding the business. {Pronoun,Aux,Ger,Det,Noun}

# exploding
The exploding population surprised us. {Det,Adj,Noun,Past,Pronoun}
He is exploding the myth. {Pronoun,Aux,Ger,Det,Noun}

# fading
I noticed the fading memory. {Pronoun,Past,Det,Adj,Noun}
The curtain is fading in sunlight. {Det,Noun,Aux,Ger,Prep,Noun}

# fetching
They described the fetching hat. {Pronoun,Past,Det,Adj,Noun}
She is fetching the newspaper. {Pronoun,Aux,Ger,Det,Noun}

# fitting
We discussed her fitting tribute. {Pronoun,Past,Poss,Adj,Noun}
He is fitting the new window. {Pronoun,Aux,Ger,Det,Adj,Noun}

# flaming
The flaming torch surprised us. {Det,Adj,Noun,Past,Pronoun}
The fire is flaming in the hearth. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# flattering
I noticed the flattering portrait. {Pronoun,Past,Det,Adj,Noun}
She is flattering the director. {Pronoun,Aux,Ger,Det,Noun}

# floating
They described the floating shelf. {Pronoun,Past,Det,Adj,Noun}
He is floating a proposal. {Pronoun,Aux,Ger,Det,Noun}

# flowering
We discussed her flowering plant. {Pronoun,Past,Poss,Adj,Noun}
The shrub is flowering early. {Det,Noun,Aux,Ger,Adv}

# flowing
The flowing robe surprised us. {Det,Adj,Noun,Past,Pronoun}
Water is flowing under the bridge. {Noun,Aux,Ger,Prep,Det,Noun}

# foreboding
I noticed the foreboding silence. {Pronoun,Past,Det,Adj,Noun}
The omen is foreboding disaster. {Det,Noun,Aux,Ger,Noun}

# forthcoming
# No ordinary standalone progressive verb sense supplied; adjective use only.
The forthcoming book surprised us. {Det,Adj,Noun,Past,Pronoun}
She was forthcoming about the incident. {Pronoun,Copula,Adj,Prep,Det,Noun}

# founding
They described the founding member. {Pronoun,Past,Det,Adj,Noun}
She is founding a charity. {Pronoun,Aux,Ger,Det,Noun}

# freezing
We discussed her freezing weather. {Pronoun,Past,Poss,Adj,Noun}
He is freezing the leftovers. {Pronoun,Aux,Ger,Det,Plural}

# frightening
The frightening experience surprised us. {Det,Adj,Noun,Past,Pronoun}
She is frightening the children. {Pronoun,Aux,Ger,Det,Plural}

# frustrating
I noticed the frustrating delay. {Pronoun,Past,Det,Adj,Noun}
The lock is frustrating his attempts at escape. {Det,Noun,Aux,Ger,Poss,Noun,Prep,Noun}

# fulfilling
They described the fulfilling career. {Pronoun,Past,Det,Adj,Noun}
She is fulfilling her promise. {Pronoun,Aux,Ger,Poss,Noun}

# glaring
We discussed her glaring error. {Pronoun,Past,Poss,Adj,Noun}
He is glaring at the intruder. {Pronoun,Aux,Ger,Prep,Det,Noun}

# gleaming
The gleaming surface surprised us. {Det,Adj,Noun,Past,Pronoun}
The silver is gleaming in the sunlight. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# gratifying
I noticed the gratifying result. {Pronoun,Past,Det,Adj,Noun}
She is gratifying the audience. {Pronoun,Aux,Ger,Det,Noun}

# grating
They described the grating voice. {Pronoun,Past,Det,Adj,Noun}
He is grating the cheese. {Pronoun,Aux,Ger,Det,Noun}

# gripping
We discussed her gripping novel. {Pronoun,Past,Poss,Adj,Noun}
She is gripping the railing. {Pronoun,Aux,Ger,Det,Noun}

# groundbreaking
# No ordinary standalone progressive verb sense supplied; adjective use only.
The groundbreaking research surprised us. {Det,Adj,Noun,Past,Pronoun}

# growing
The growing concern surprised us. {Det,Adj,Noun,Past,Pronoun}
He is growing tomatoes. {Pronoun,Aux,Ger,Plural}

# grueling
# No ordinary standalone progressive verb sense supplied; adjective use only.
The grueling journey surprised us. {Det,Adj,Noun,Past,Pronoun}

# gruelling
# No ordinary standalone progressive verb sense supplied; adjective use only.
The gruelling journey surprised us. {Det,Adj,Noun,Past,Pronoun}

# healing
I noticed the healing balm. {Pronoun,Past,Det,Adj,Noun}
The doctor is healing the sick. {Det,Noun,Aux,Ger,Det,Noun}

# heartwarming
# No ordinary standalone progressive verb sense supplied; adjective use only.
The heartwarming story moved us. {Det,Adj,Noun,Past,Pronoun}

# horrifying
We discussed her horrifying discovery. {Pronoun,Past,Poss,Adj,Noun}
She is horrifying the guests. {Pronoun,Aux,Ger,Det,Plural}

# humiliating
The humiliating defeat surprised us. {Det,Adj,Noun,Past,Pronoun}
He is humiliating his opponent. {Pronoun,Aux,Ger,Poss,Noun}

# illuminating
I noticed the illuminating discussion. {Pronoun,Past,Det,Adj,Noun}
The lamp is illuminating the desk. {Det,Noun,Aux,Ger,Det,Noun}

# imposing
They described the imposing building. {Pronoun,Past,Det,Adj,Noun}
She is imposing a fine. {Pronoun,Aux,Ger,Det,Noun}

# incorporating
We discussed her incorporating document. {Pronoun,Past,Poss,Adj,Noun}
He is incorporating the feedback. {Pronoun,Aux,Ger,Det,Noun}

# increasing
The increasing demand surprised us. {Det,Adj,Noun,Past,Pronoun}
She is increasing the temperature. {Pronoun,Aux,Ger,Det,Noun}

# infuriating
I noticed the infuriating habit. {Pronoun,Past,Det,Adj,Noun}
He is infuriating the customers. {Pronoun,Aux,Ger,Det,Plural}

# inspiring
They described the inspiring speech. {Pronoun,Past,Det,Adj,Noun}
She is inspiring the team. {Pronoun,Aux,Ger,Det,Noun}

# insulting
We discussed her insulting remark. {Pronoun,Past,Poss,Adj,Noun}
He is insulting the waiter. {Pronoun,Aux,Ger,Det,Noun}

# interesting
The interesting book surprised us. {Det,Adj,Noun,Past,Pronoun}
She is interesting the students in chemistry. {Pronoun,Aux,Ger,Det,Noun,Prep,Noun}

# intimidating
I noticed the intimidating figure. {Pronoun,Past,Det,Adj,Noun}
He is intimidating the witness. {Pronoun,Aux,Ger,Det,Noun}

# intoxicating
They described the intoxicating scent. {Pronoun,Past,Det,Adj,Noun}
The wine is intoxicating the guests. {Det,Noun,Aux,Ger,Det,Plural}

# intriguing
We discussed her intriguing question. {Pronoun,Past,Poss,Adj,Noun}
She is intriguing against the ruler. {Pronoun,Aux,Ger,Prep,Det,Noun}

# invigorating
The invigorating walk surprised us. {Det,Adj,Noun,Past,Pronoun}
The breeze is invigorating the hikers. {Det,Noun,Aux,Ger,Det,Plural}

# inviting
I noticed the inviting room. {Pronoun,Past,Det,Adj,Noun}
He is inviting the neighbors. {Pronoun,Aux,Ger,Det,Plural}

# irritating
They described the irritating noise. {Pronoun,Past,Det,Adj,Noun}
The fabric is irritating her skin. {Det,Noun,Aux,Ger,Poss,Noun}

# lacking
Her answer was sadly lacking. {Poss,Noun,Copula,Adv,Adj}
The team is lacking a goalkeeper. {Det,Noun,Aux,Ger,Det,Noun}

# lagging
The lagging indicator surprised us. {Det,Adj,Noun,Past,Pronoun}
He is lagging behind the others. {Pronoun,Aux,Ger,Prep,Det,Pronoun}

# lasting
I noticed the lasting impression. {Pronoun,Past,Det,Adj,Noun}
The battery is lasting longer. {Det,Noun,Aux,Ger,Adv}

# leaning
They described the leaning tower. {Pronoun,Past,Det,Adj,Noun}
She is leaning against the wall. {Pronoun,Aux,Ger,Prep,Det,Noun}

# leading
We discussed her leading candidate. {Pronoun,Past,Poss,Adj,Noun}
He is leading the expedition. {Pronoun,Aux,Ger,Det,Noun}

# lifesaving
# No ordinary standalone progressive verb sense supplied; adjective use only.
The lifesaving equipment surprised us. {Det,Adj,Noun,Past,Pronoun}

# living
The living organism surprised us. {Det,Adj,Noun,Past,Pronoun}
She is living near the coast. {Pronoun,Aux,Ger,Prep,Det,Noun}

# loving
I noticed the loving parent. {Pronoun,Past,Det,Adj,Noun}
He is loving the attention. {Pronoun,Aux,Ger,Det,Noun}

# maddening
They described the maddening delay. {Pronoun,Past,Det,Adj,Noun}
The noise is maddening the prisoners. {Det,Noun,Aux,Ger,Det,Plural}

# maturing
We discussed her maturing market. {Pronoun,Past,Poss,Adj,Noun}
The cheese is maturing in the cellar. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# meandering
The meandering stream surprised us. {Det,Adj,Noun,Past,Pronoun}
She is meandering through the village. {Pronoun,Aux,Ger,Prep,Det,Noun}

# melting
I noticed the melting snow. {Pronoun,Past,Det,Adj,Noun}
He is melting the butter. {Pronoun,Aux,Ger,Det,Noun}

# mending
They described the mending tissue. {Pronoun,Past,Det,Adj,Noun}
She is mending the sock. {Pronoun,Aux,Ger,Det,Noun}

# mesmerizing
We discussed her mesmerizing performance. {Pronoun,Past,Poss,Adj,Noun}
He is mesmerizing the audience. {Pronoun,Aux,Ger,Det,Noun}

# boggling
The boggling complexity surprised us. {Det,Adj,Noun,Past,Pronoun}
The puzzle is boggling my mind. {Det,Noun,Aux,Ger,Poss,Noun}

# numbing
I noticed the numbing cold. {Pronoun,Past,Det,Adj,Noun}
The dentist is numbing the gum. {Det,Noun,Aux,Ger,Det,Noun}

# missing
They described the missing child. {Pronoun,Past,Det,Adj,Noun}
She is missing the point. {Pronoun,Aux,Ger,Det,Noun}

# mitigating
We discussed her mitigating circumstance. {Pronoun,Past,Poss,Adj,Noun}
He is mitigating the damage. {Pronoun,Aux,Ger,Det,Noun}

# motivating
The motivating factor surprised us. {Det,Adj,Noun,Past,Pronoun}
She is motivating the team. {Pronoun,Aux,Ger,Det,Noun}

# moving
I noticed the moving story. {Pronoun,Past,Det,Adj,Noun}
He is moving the furniture. {Pronoun,Aux,Ger,Det,Noun}

# mumbling
They described the mumbling voice. {Pronoun,Past,Det,Adj,Noun}
She is mumbling an apology. {Pronoun,Aux,Ger,Det,Noun}

# mystifying
We discussed her mystifying disappearance. {Pronoun,Past,Poss,Adj,Noun}
He is mystifying the experts. {Pronoun,Aux,Ger,Det,Plural}

# nurturing
The nurturing environment surprised us. {Det,Adj,Noun,Past,Pronoun}
She is nurturing the seedlings. {Pronoun,Aux,Ger,Det,Plural}

# offending
I noticed the offending passage. {Pronoun,Past,Det,Adj,Noun}
He is offending the guests. {Pronoun,Aux,Ger,Det,Plural}

# offsetting
They described the offsetting benefit. {Pronoun,Past,Det,Adj,Noun}
She is offsetting the cost. {Pronoun,Aux,Ger,Det,Noun}

# opposing
We discussed her opposing team. {Pronoun,Past,Poss,Adj,Noun}
He is opposing the proposal. {Pronoun,Aux,Ger,Det,Noun}

# outgoing
# No ordinary standalone progressive verb sense supplied; adjective use only.
The outgoing personality surprised us. {Det,Adj,Noun,Past,Pronoun}

# outlying
# No ordinary standalone progressive verb sense supplied; adjective use only.
The outlying village surprised us. {Det,Adj,Noun,Past,Pronoun}

# outstanding
# No ordinary standalone progressive verb sense supplied; adjective use only.
The outstanding performance surprised us. {Det,Adj,Noun,Past,Pronoun}
The outstanding debt worried us. {Det,Adj,Noun,Past,Pronoun}

# overarching
# No ordinary standalone progressive verb sense supplied; adjective use only.
The overarching theme surprised us. {Det,Adj,Noun,Past,Pronoun}

# overlapping
The overlapping circle surprised us. {Det,Adj,Noun,Past,Pronoun}
The flap is overlapping the opening. {Det,Noun,Aux,Ger,Det,Noun}

# overpowering
I noticed the overpowering smell. {Pronoun,Past,Det,Adj,Noun}
She is overpowering the guard. {Pronoun,Aux,Ger,Det,Noun}

# overriding
They described the overriding concern. {Pronoun,Past,Det,Adj,Noun}
He is overriding the decision. {Pronoun,Aux,Ger,Det,Noun}

# overwhelming
We discussed her overwhelming evidence. {Pronoun,Past,Poss,Adj,Noun}
She is overwhelming the opposition. {Pronoun,Aux,Ger,Det,Noun}

# owing
The balance remains owing. {Det,Noun,Pres,Adj}
Anyone owing money should contact us. {Pronoun,Ger,Noun,Modal,Inf,Pronoun}

# paying
I noticed the paying customer. {Pronoun,Past,Det,Adj,Noun}
She is paying the bill. {Pronoun,Aux,Ger,Det,Noun}

# pending
# Verbal example uses a nonfinite participle; progressive pend is uncommon.
They described the pending application. {Pronoun,Past,Det,Adj,Noun}
The case pending before the court concerns fraud. {Det,Noun,Ger,Prep,Det,Noun,Pres,Noun}
We waited pending approval. {Pronoun,Past,Prep,Noun}

# perplexing
We discussed her perplexing problem. {Pronoun,Past,Poss,Adj,Noun}
He is perplexing the students. {Pronoun,Aux,Ger,Det,Plural}

# piercing
The piercing scream surprised us. {Det,Adj,Noun,Past,Pronoun}
She is piercing the balloon. {Pronoun,Aux,Ger,Det,Noun}

# plunging
I noticed the plunging neckline. {Pronoun,Past,Det,Adj,Noun}
He is plunging into the pool. {Pronoun,Aux,Ger,Prep,Det,Noun}

# preceding
They described the preceding chapter. {Pronoun,Past,Det,Adj,Noun}
She is preceding the bride down the aisle. {Pronoun,Aux,Ger,Det,Noun,Prep,Det,Noun}

# pressing
We discussed her pressing need. {Pronoun,Past,Poss,Adj,Noun}
He is pressing the button. {Pronoun,Aux,Ger,Det,Noun}

# prevailing
The prevailing wind surprised us. {Det,Adj,Noun,Past,Pronoun}
Justice is prevailing despite the obstacles. {Noun,Aux,Ger,Prep,Det,Plural}

# promising
I noticed the promising student. {Pronoun,Past,Det,Adj,Noun}
She is promising a reward. {Pronoun,Aux,Ger,Det,Noun}

# provoking
They described the provoking remark. {Pronoun,Past,Det,Adj,Noun}
He is provoking an argument. {Pronoun,Aux,Ger,Det,Noun}

# punishing
We discussed her punishing schedule. {Pronoun,Past,Poss,Adj,Noun}
She is punishing the offender. {Pronoun,Aux,Ger,Det,Noun}

# raging
The raging storm surprised us. {Det,Adj,Noun,Past,Pronoun}
He is raging against the decision. {Pronoun,Aux,Ger,Prep,Det,Noun}

# rallying
I noticed the rallying cry. {Pronoun,Past,Det,Adj,Noun}
She is rallying the supporters. {Pronoun,Aux,Ger,Det,Plural}

# rambling
They described the rambling speech. {Pronoun,Past,Det,Adj,Noun}
He is rambling through the woods. {Pronoun,Aux,Ger,Prep,Det,Plural}

# raving
We discussed her raving lunatic. {Pronoun,Past,Poss,Adj,Noun}
She is raving about the concert. {Pronoun,Aux,Ger,Prep,Det,Noun}

# reassuring
The reassuring smile surprised us. {Det,Adj,Noun,Past,Pronoun}
He is reassuring the child. {Pronoun,Aux,Ger,Det,Noun}

# redefining
I noticed the redefining moment. {Pronoun,Past,Det,Adj,Noun}
She is redefining the term. {Pronoun,Aux,Ger,Det,Noun}

# refreshing
They described the refreshing drink. {Pronoun,Past,Det,Adj,Noun}
He is refreshing the page. {Pronoun,Aux,Ger,Det,Noun}

# reigning
We discussed her reigning champion. {Pronoun,Past,Poss,Adj,Noun}
She is reigning over the kingdom. {Pronoun,Aux,Ger,Prep,Det,Noun}

# rejuvenating
The rejuvenating holiday surprised us. {Det,Adj,Noun,Past,Pronoun}
The rain is rejuvenating the garden. {Det,Noun,Aux,Ger,Det,Noun}

# remaining
I noticed the remaining portion. {Pronoun,Past,Det,Adj,Noun}
He is remaining at the hospital. {Pronoun,Aux,Ger,Prep,Det,Noun}

# resting
They described the resting pulse. {Pronoun,Past,Det,Adj,Noun}
She is resting her ankle. {Pronoun,Aux,Ger,Poss,Noun}

# revealing
We discussed her revealing dress. {Pronoun,Past,Poss,Adj,Noun}
He is revealing the secret. {Pronoun,Aux,Ger,Det,Noun}

# revitalising
The revitalising treatment surprised us. {Det,Adj,Noun,Past,Pronoun}
She is revitalising the neighborhood. {Pronoun,Aux,Ger,Det,Noun}

# revitalizing
I noticed the revitalizing treatment. {Pronoun,Past,Det,Adj,Noun}
He is revitalizing the economy. {Pronoun,Aux,Ger,Det,Noun}

# revolving
They described the revolving door. {Pronoun,Past,Det,Adj,Noun}
The moon is revolving around the planet. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# rewarding
We discussed her rewarding career. {Pronoun,Past,Poss,Adj,Noun}
She is rewarding the volunteers. {Pronoun,Aux,Ger,Det,Plural}

# riveting
The riveting story surprised us. {Det,Adj,Noun,Past,Pronoun}
He is riveting the plates together. {Pronoun,Aux,Ger,Det,Noun,Adv}

# roaring
I noticed the roaring fire. {Pronoun,Past,Det,Adj,Noun}
The lion is roaring at the visitors. {Det,Noun,Aux,Ger,Prep,Det,Plural}

# rolling
They described the rolling hill. {Pronoun,Past,Det,Adj,Noun}
She is rolling the dough. {Pronoun,Aux,Ger,Det,Noun}

# rushing
We discussed her rushing river. {Pronoun,Past,Poss,Adj,Noun}
He is rushing toward the exit. {Pronoun,Aux,Ger,Prep,Det,Noun}

# saddening
The saddening news surprised us. {Det,Adj,Noun,Past,Pronoun}
The report is saddening the family. {Det,Noun,Aux,Ger,Det,Noun}

# satisfying
I noticed the satisfying meal. {Pronoun,Past,Det,Adj,Noun}
She is satisfying the requirements. {Pronoun,Aux,Ger,Det,Plural}

# screeching
They described the screeching noise. {Pronoun,Past,Det,Adj,Noun}
The owl is screeching outside. {Det,Noun,Aux,Ger,Adv}

# sentencing
We discussed her sentencing hearing. {Pronoun,Past,Poss,Adj,Noun}
The judge is sentencing the prisoner. {Det,Noun,Aux,Ger,Det,Noun}

# shining
The shining example surprised us. {Det,Adj,Noun,Past,Pronoun}
She is shining the torch into the cave. {Pronoun,Aux,Ger,Det,Noun,Prep,Det,Noun}

# shocking
I noticed the shocking report. {Pronoun,Past,Det,Adj,Noun}
He is shocking the audience. {Pronoun,Aux,Ger,Det,Noun}

# skyrocketing
They described the skyrocketing price. {Pronoun,Past,Det,Adj,Noun}
The cost is skyrocketing again. {Det,Noun,Aux,Ger,Adv}

# sloping
We discussed her sloping roof. {Pronoun,Past,Poss,Adj,Noun}
The path is sloping toward the river. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# smiling
The smiling face surprised us. {Det,Adj,Noun,Past,Pronoun}
She is smiling at the baby. {Pronoun,Aux,Ger,Prep,Det,Noun}

# soaking
I noticed the soaking rain. {Pronoun,Past,Det,Adj,Noun}
He is soaking the beans. {Pronoun,Aux,Ger,Det,Plural}

# soaring
They described the soaring temperature. {Pronoun,Past,Det,Adj,Noun}
The eagle is soaring above the cliffs. {Det,Noun,Aux,Ger,Prep,Det,Plural}

# soothing
We discussed her soothing voice. {Pronoun,Past,Poss,Adj,Noun}
She is soothing the child. {Pronoun,Aux,Ger,Det,Noun}

# sparkling
The sparkling water surprised us. {Det,Adj,Noun,Past,Pronoun}
The diamond is sparkling in the sunlight. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# speeding
I noticed the speeding car. {Pronoun,Past,Det,Adj,Noun}
He is speeding through the tunnel. {Pronoun,Aux,Ger,Prep,Det,Noun}

# spellbinding
They described the spellbinding tale. {Pronoun,Past,Det,Adj,Noun}
She is spellbinding the audience. {Pronoun,Aux,Ger,Det,Noun}

# sprawling
We discussed her sprawling city. {Pronoun,Past,Poss,Adj,Noun}
The child is sprawling across the sofa. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# staggering
The staggering sum surprised us. {Det,Adj,Noun,Past,Pronoun}
He is staggering toward the door. {Pronoun,Aux,Ger,Prep,Det,Noun}

# startling
I noticed the startling discovery. {Pronoun,Past,Det,Adj,Noun}
She is startling the birds. {Pronoun,Aux,Ger,Det,Plural}

# starving
They described the starving artist. {Pronoun,Past,Det,Adj,Noun}
He is starving the plants of light. {Pronoun,Aux,Ger,Det,Noun,Prep,Noun}

# steaming
We discussed her steaming soup. {Pronoun,Past,Poss,Adj,Noun}
She is steaming the vegetables. {Pronoun,Aux,Ger,Det,Plural}

# stimulating
The stimulating conversation surprised us. {Det,Adj,Noun,Past,Pronoun}
The grant is stimulating the economy. {Det,Noun,Aux,Ger,Det,Noun}

# stirring
I noticed the stirring speech. {Pronoun,Past,Det,Adj,Noun}
He is stirring the soup. {Pronoun,Aux,Ger,Det,Noun}

# striking
They described the striking resemblance. {Pronoun,Past,Det,Adj,Noun}
She is striking the bell. {Pronoun,Aux,Ger,Det,Noun}

# stunning
We discussed her stunning view. {Pronoun,Past,Poss,Adj,Noun}
He is stunning the fish. {Pronoun,Aux,Ger,Det,Noun}

# supporting
The supporting role surprised us. {Det,Adj,Noun,Past,Pronoun}
She is supporting the proposal. {Pronoun,Aux,Ger,Det,Noun}

# surging
I noticed the surging crowd. {Pronoun,Past,Det,Adj,Noun}
Water is surging through the gate. {Noun,Aux,Ger,Prep,Det,Noun}

# surprising
They described the surprising result. {Pronoun,Past,Det,Adj,Noun}
He is surprising the guests. {Pronoun,Aux,Ger,Det,Plural}

# surrounding
We discussed her surrounding area. {Pronoun,Past,Poss,Adj,Noun}
The army is surrounding the castle. {Det,Noun,Aux,Ger,Det,Noun}

# sweeping
The sweeping statement surprised us. {Det,Adj,Noun,Past,Pronoun}
She is sweeping the floor. {Pronoun,Aux,Ger,Det,Noun}

# swelling
I noticed the swelling chorus. {Pronoun,Past,Det,Adj,Noun}
The sail is swelling in the wind. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# tantalizing
They described the tantalizing glimpse. {Pronoun,Past,Det,Adj,Noun}
He is tantalizing the kitten with a toy. {Pronoun,Aux,Ger,Det,Noun,Prep,Det,Noun}

# taxing
We discussed her taxing journey. {Pronoun,Past,Poss,Adj,Noun}
She is taxing the profits. {Pronoun,Aux,Ger,Det,Plural}

# telling
The telling detail surprised us. {Det,Adj,Noun,Past,Pronoun}
He is telling a story. {Pronoun,Aux,Ger,Det,Noun}

# tempting
I noticed the tempting offer. {Pronoun,Past,Det,Adj,Noun}
She is tempting the dog with food. {Pronoun,Aux,Ger,Det,Noun,Prep,Noun}

# terrifying
They described the terrifying experience. {Pronoun,Past,Det,Adj,Noun}
He is terrifying the children. {Pronoun,Aux,Ger,Det,Plural}

# threatening
We discussed her threatening letter. {Pronoun,Past,Poss,Adj,Noun}
She is threatening the witness. {Pronoun,Aux,Ger,Det,Noun}

# thrilling
The thrilling ride surprised us. {Det,Adj,Noun,Past,Pronoun}
He is thrilling the audience. {Pronoun,Aux,Ger,Det,Noun}

# thriving
I noticed the thriving business. {Pronoun,Past,Det,Adj,Noun}
The plant is thriving in the shade. {Det,Noun,Aux,Ger,Prep,Det,Noun}

# tiring
They described the tiring journey. {Pronoun,Past,Det,Adj,Noun}
She is tiring the puppy with games. {Pronoun,Aux,Ger,Det,Noun,Prep,Plural}

# touching
We discussed her touching tribute. {Pronoun,Past,Poss,Adj,Noun}
He is touching the fabric. {Pronoun,Aux,Ger,Det,Noun}

# trembling
The trembling hand surprised us. {Det,Adj,Noun,Past,Pronoun}
She is trembling with fear. {Pronoun,Aux,Ger,Prep,Noun}

# troubling
I noticed the troubling symptom. {Pronoun,Past,Det,Adj,Noun}
He is troubling the manager with questions. {Pronoun,Aux,Ger,Det,Noun,Prep,Plural}

# trusting
They described the trusting child. {Pronoun,Past,Det,Adj,Noun}
She is trusting her instincts. {Pronoun,Aux,Ger,Poss,Plural}

# trying
We discussed her trying experience. {Pronoun,Past,Poss,Adj,Noun}
He is trying the soup. {Pronoun,Aux,Ger,Det,Noun}

# twisting
The twisting path surprised us. {Det,Adj,Noun,Past,Pronoun}
She is twisting the wire. {Pronoun,Aux,Ger,Det,Noun}

# unfolding
I noticed the unfolding drama. {Pronoun,Past,Det,Adj,Noun}
He is unfolding the map. {Pronoun,Aux,Ger,Det,Noun}

# unnerving
They described the unnerving silence. {Pronoun,Past,Det,Adj,Noun}
She is unnerving the competitors. {Pronoun,Aux,Ger,Det,Plural}

# unsettling
We discussed her unsettling news. {Pronoun,Past,Poss,Adj,Noun}
He is unsettling the horses. {Pronoun,Aux,Ger,Det,Plural}

# uplifting
The uplifting song surprised us. {Det,Adj,Noun,Past,Pronoun}
The music is uplifting the congregation. {Det,Noun,Aux,Ger,Det,Noun}

# upsetting
I noticed the upsetting incident. {Pronoun,Past,Det,Adj,Noun}
She is upsetting the balance. {Pronoun,Aux,Ger,Det,Noun}

# varying
They described the varying degree. {Pronoun,Past,Det,Adj,Noun}
He is varying the routine. {Pronoun,Aux,Ger,Det,Noun}

# vexing
We discussed her vexing question. {Pronoun,Past,Poss,Adj,Noun}
The puzzle is vexing the students. {Det,Noun,Aux,Ger,Det,Plural}

# willing
The willing helper surprised us. {Det,Adj,Noun,Past,Pronoun}
She is willing herself to continue. {Pronoun,Aux,Ger,Pronoun,Connector,Inf}

# yielding
I noticed the yielding surface. {Pronoun,Past,Det,Adj,Noun}
He is yielding to pressure. {Pronoun,Aux,Ger,Prep,Noun}

# accommodating
They described the accommodating host. {Pronoun,Past,Det,Adj,Noun}
She is accommodating the guests. {Pronoun,Aux,Ger,Det,Plural}

# trifling
We discussed her trifling sum. {Pronoun,Past,Poss,Adj,Noun}
He is trifling with her feelings. {Pronoun,Aux,Ger,Prep,Poss,Plural}

# endearing
The endearing habit surprised us. {Det,Adj,Noun,Past,Pronoun}
She is endearing herself to the audience. {Pronoun,Aux,Ger,Pronoun,Prep,Det,Noun}
`

test(here, t => {
  assertSpec(t, spec, here)
  assertNoOverlap(t, spec, here, ['(#Adjective && #Verb)'])
  t.end()
})
