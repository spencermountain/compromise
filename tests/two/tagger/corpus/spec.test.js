import test from 'tape'
import nlp from '../../_lib.js'
const here = '[two/match-spec] '

// New, hand-written expectations in docs/spec-format.md syntax.
// Keep these independent of tagger output: one slot per term, including contractions.
// Regular past forms use Past, including perfect and passive constructions.
// Use Vb for helpers while Auxiliary recognition is inconsistent.
const spec = `
A curious otter inspected the basket. {Det,Adj,Singular,Past,Det,Singular}
Several owls watched the silent meadow. {Det,Plural,Past,Det,Adj,Singular}
Those wooden shelves hold heavy jars. {Det,Adj,Plural,Pres,Adj,Plural}
Our youngest cousin collects antique maps. {Poss,Superlative,Singular,Pres,Adj,Plural}
Her silver bracelet vanished mysteriously. {Poss,Adj,Singular,Past,Adv}
An enormous shadow covered the courtyard. {Det,Adj,Singular,Past,Det,Singular}
These narrow tunnels connect distant chambers. {Det,Adj,Plural,Pres,Adj,Plural}
A sleepy passenger missed the announcement. {Det,Adj,Singular,Past,Det,Singular}

The gardener watered the roses carefully. {Det,Singular,Past,Det,Plural,Adv}
The gardener is watering the roses. {Det,Singular,Vb,Ger,Det,Plural}
The gardener has watered the roses. {Det,Singular,Vb,Past,Det,Plural}
The gardener had watered the roses. {Det,Singular,Vb,Past,Det,Plural}
The gardener will water the roses. {Det,Singular,Modal,Inf,Det,Plural}
The gardener might water the roses. {Det,Singular,Modal,Inf,Det,Plural}
The gardener should have watered the roses. {Det,Singular,Modal,Vb,Past,Det,Plural}
The roses were watered yesterday. {Det,Plural,Vb,Past,Date}
The gardener has been watering the roses. {Det,Singular,Vb,Vb,Ger,Det,Plural}

We aren't ready for the rehearsal. {Pronoun,Copula,Negative,Adj,Prep,Det,Singular}
She didn't recognize the melody. {Pronoun,Vb,Negative,Inf,Det,Singular}
They haven't repaired the elevator. {Pronoun,Vb,Negative,Past,Det,Singular}
I couldn't reach the upper shelf. {Pronoun,Modal,Negative,Inf,Det,Adj,Singular}
He won't reveal the password. {Pronoun,Modal,Negative,Inf,Det,Singular}
We've misplaced the spare keys. {Pronoun,Vb,Past,Det,Adj,Plural}
She's carrying a purple umbrella. {Pronoun,Vb,Ger,Det,Adj,Singular}
She's already finished the puzzle. {Pronoun,Vb,Adv,Past,Det,Singular}
I'd prefer a quieter room. {Pronoun,Modal,Inf,Det,Comparative,Singular}
They'll deliver the parcel tomorrow. {Pronoun,Modal,Inf,Det,Singular,Date}

The sculptor's tools were rusty. {Det,Poss,Plural,Copula,Adj}
My brother's bicycle needs new tires. {Poss,Poss,Singular,Pres,Adj,Plural}
Their neighbors painted our fence. {Poss,Plural,Past,Poss,Singular}
She blamed herself for the delay. {Pronoun,Past,Reflexive,Prep,Det,Singular}
We introduced ourselves politely. {Pronoun,Past,Reflexive,Adv}
He lent her his binoculars. {Pronoun,Past,Pronoun,Poss,Plural}
Her binoculars revealed a distant ship. {Poss,Plural,Past,Det,Adj,Singular}
They offered him another blanket. {Pronoun,Past,Pronoun,Det,Singular}
The decision was entirely hers. {Det,Singular,Copula,Adv,Poss}

The river is unusually shallow. {Det,Singular,Copula,Adv,Adj}
This staircase is steeper than that ramp. {Det,Singular,Copula,Comparative,Prep,Det,Singular}
The smallest kitten slept peacefully. {Det,Superlative,Singular,Past,Adv}
A remarkably patient teacher answered calmly. {Det,Adv,Adj,Singular,Past,Adv}
The soup tastes slightly bitter. {Det,Singular,Pres,Adv,Adj}
The audience became completely silent. {Det,Singular,Past,Adv,Adj}
His explanation seemed plausible. {Poss,Singular,Past,Adj}
The fabric feels wonderfully soft. {Det,Singular,Pres,Adv,Adj}
A brighter lamp would help. {Det,Comparative,Singular,Modal,Inf}

Who borrowed the ladder? {QuestionWord,Past,Det,Singular}
Which drawer contains the receipts? {QuestionWord,Singular,Pres,Det,Plural}
Why did the engine stop? {QuestionWord,Vb,Det,Singular,Inf}
Where are the missing gloves? {QuestionWord,Copula,Det,Adj,Plural}
When will the guests arrive? {QuestionWord,Modal,Det,Plural,Inf}
How could anyone forget that concert? {QuestionWord,Modal,Noun,Inf,Det,Singular}
Can you carry this suitcase? {Modal,Pronoun,Inf,Det,Singular}
Did the manager approve our request? {Vb,Det,Singular,Inf,Poss,Singular}
Is the basement damp? {Copula,Det,Singular,Adj}
Have they completed the survey? {Vb,Pronoun,Past,Det,Singular}

Fold the towel neatly. {Imp,Det,Singular,Adv}
Protect your eyes from the sunlight. {Imp,Poss,Plural,Prep,Det,Uncountable}
Measure the distance carefully. {Imp,Det,Singular,Adv}
Choose the ripest peach. {Imp,Det,Superlative,Singular}
Don't disturb the sleeping puppy. {Vb,Negative,Imp,Det,Adj,Singular}
Put away those muddy boots. {Vb|Phrasal,Particle,Det,Adj,Plural}
She turned down the invitation. {Pronoun,Past|Phrasal,Particle,Det,Singular}
We ran out of flour. {Pronoun,Past|Phrasal,Particle,Prep,Noun}
The mechanic took apart the motor. {Det,Singular,Past|Phrasal,Particle,Det,Singular}
They called off the expedition. {Pronoun,Past|Phrasal,Particle,Det,Singular}

We enjoyed a refreshing swim. {Pronoun,Past,Det,Adj,Singular}
The guards watch the entrance. {Det,Plural,Pres,Det,Singular}
His watch stopped suddenly. {Poss,Singular,Past,Adv}
They record every meeting. {Pronoun,Pres,Det,Singular}
The record contains several errors. {Det,Singular,Pres,Det,Plural}
The children water the seedlings. {Det,Plural,Pres,Det,Plural}
Cold water filled the bucket. {Adj,Noun,Past,Det,Singular}
The pilots land safely. {Det,Plural,Pres,Adv}
The land belongs to our family. {Det,Noun,Pres,Prep,Poss,Singular}

Three mice escaped through a tiny hole. {Val,Plural,Past,Prep,Det,Adj,Singular}
The geese crossed the frozen pond. {Det,Plural,Past,Det,Adj,Singular}
Two women carried six boxes. {Val,Plural,Past,Val,Plural}
The children brushed their teeth. {Det,Plural,Past,Poss,Plural}
Several deer wandered across the road. {Det,Noun,Past,Prep,Det,Singular}
The first runner received a medal. {Det,Ordinal,Singular,Past,Det,Singular}
We counted seventeen empty chairs. {Pronoun,Past,Val,Adj,Plural}
The recipe requires 250 grams of butter. {Det,Singular,Pres,Val,Unit,Prep,Noun}
Their profits increased by 12%. {Poss,Plural,Past,Prep,Percent}
The second bottle contains 1.5 liters. {Det,Ordinal,Singular,Pres,Val,Unit}

Alice visited Lisbon in November. {Person,Past,City,Prep,Month}
Daniel moved from Norway to Spain. {Person,Past,Prep,Country,Prep,Country}
The meeting starts on Thursday. {Det,Singular,Pres,Prep,WeekDay}
We rented a cabin in February. {Pronoun,Past,Det,Singular,Prep,Month}
The museum opened in 1997. {Det,Singular,Past,Prep,Year}
Italian tourists admired the fountain. {Demonym,Plural,Past,Det,Singular}
The train departs at 6pm. {Det,Singular,Pres,Prep,Time}
NASA announced another mission. {Acronym,Past,Det,Singular}
Visit https://example.org for details. {Imp,Url,Prep,Plural}
Send the invoice to billing@example.org. {Imp,Det,Singular,Prep,Email}

The violinist smiled, bowed, and left. {Det,Singular,Past,Past,Conj,Past}
Although the wind howled, the tent survived. {Conj,Det,Singular,Past,Det,Singular,Past}
The vase cracked because it fell. {Det,Singular,Past,Conj,Pronoun,Past}
If the weather improves, we can sail. {Condition,Det,Singular,Pres,Pronoun,Modal,Inf}
The sign says "Private property." {Det,Singular,Pres,Adj,Singular}
The {blue} folder contains confidential notes. {Det,Adj,Singular,Pres,Adj,Plural}
Wow, those fireworks were spectacular! {Expr,Det,Plural,Copula,Adj}

The alarm rang loudly. {Det,Singular,Past,Adv}
I opened the curtains. {Pronoun,Past,Det,Plural}
She washed her face. {Pronoun,Past,Poss,Singular}
He made a sandwich. {Pronoun,Past,Det,Singular}
My sister packed her lunch. {Poss,Singular,Past,Poss,Noun}
The coffee smells delicious. {Det,Noun,Pres,Adj}
His shirt is clean. {Poss,Singular,Copula,Adj}
Our bus arrived promptly. {Poss,Singular,Past,Adv}

The cashier scanned the groceries. {Det,Singular,Past,Det,Plural}
I bought ripe bananas. {Pronoun,Past,Adj,Plural}
She needs a larger bag. {Pronoun,Pres,Det,Comparative,Singular}
These apples look fresh. {Det,Plural,Pres,Adj}
We paid for the tickets. {Pronoun,Past,Prep,Det,Plural}
The customer returned a damaged plate. {Det,Singular,Past,Det,Adj,Singular}
He chose the blue jacket. {Pronoun,Past,Det,Adj,Singular}
The shoes cost forty dollars. {Det,Plural,Pres,Val,Currency}

The nurse checked my temperature. {Det,Singular,Past,Poss,Singular}
Her ankle hurts. {Poss,Singular,Pres}
The doctor explained the treatment. {Det,Singular,Past,Det,Singular}
I feel much better. {Pronoun,Pres,Adv,Comparative}
He rested after the operation. {Pronoun,Past,Prep,Det,Singular}
The pharmacy sells cough medicine. {Det,Singular,Pres,Noun,Noun}
Our appointment is tomorrow. {Poss,Singular,Copula,Date}
The patient slept comfortably. {Det,Singular,Past,Adv}
We waited in a quiet room. {Pronoun,Past,Prep,Det,Adj,Singular}

The students opened their books. {Det,Plural,Past,Poss,Plural}
Our teacher explained the problem. {Poss,Singular,Past,Det,Singular}
I forgot my pencil. {Pronoun,Past,Poss,Singular}
She solved the equation correctly. {Pronoun,Past,Det,Singular,Adv}
The lesson begins at nine. {Det,Singular,Pres,Prep,Val}
He borrowed a dictionary. {Pronoun,Past,Det,Singular}
The library has comfortable chairs. {Det,Singular,Pres,Adj,Plural}
We studied for the exam. {Pronoun,Past,Prep,Det,Singular}
Their essays were interesting. {Poss,Plural,Copula,Adj}
The principal greeted the parents. {Det,Singular,Past,Det,Plural}

My computer needs a new battery. {Poss,Singular,Pres,Det,Adj,Singular}
The printer is working properly. {Det,Singular,Vb,Ger,Adv}
She sent the report yesterday. {Pronoun,Past,Det,Singular,Date}
We discussed the schedule. {Pronoun,Past,Det,Singular}
His office overlooks the park. {Poss,Singular,Pres,Det,Singular}
The team finished the project. {Det,Singular,Past,Det,Singular}
I saved the document. {Pronoun,Past,Det,Singular}
The screen is too bright. {Det,Singular,Copula,Adv,Adj}
They are planning a conference. {Pronoun,Vb,Ger,Det,Singular}
Our manager thanked everyone. {Poss,Singular,Past,Noun}

The plane landed smoothly. {Det,Singular,Past,Adv}
We booked a small hotel. {Pronoun,Past,Det,Adj,Singular}
Her suitcase is very heavy. {Poss,Singular,Copula,Adv,Adj}
The driver checked the mirrors. {Det,Singular,Past,Det,Plural}
I lost my passport. {Pronoun,Past,Poss,Singular}
The ferry crosses the bay. {Det,Singular,Pres,Det,Singular}
They walked along the beach. {Pronoun,Past,Prep,Det,Singular}
Our room has a balcony. {Poss,Singular,Pres,Det,Singular}
She photographed the mountains. {Pronoun,Past,Det,Plural}
The journey took four hours. {Det,Singular,Past,Val,Noun}

Rain soaked the pavement. {Noun,Past,Det,Singular}
The clouds are dark. {Det,Plural,Copula,Adj}
A gentle breeze moved the leaves. {Det,Adj,Singular,Past,Det,Plural}
Snow covered our driveway. {Noun,Past,Poss,Singular}
We heard thunder. {Pronoun,Past,Noun}
The grass is wet. {Det,Noun,Copula,Adj}

She plays the guitar beautifully. {Pronoun,Pres,Det,Singular,Adv}
We watched a funny movie. {Pronoun,Past,Det,Adj,Singular}
The dancers wore colorful costumes. {Det,Plural,Past,Adj,Plural}
He enjoys classical music. {Pronoun,Pres,Adj,Noun}
Our friends joined the choir. {Poss,Plural,Past,Det,Singular}
The artist painted a portrait. {Det,Singular,Past,Det,Singular}
I read an exciting novel. {Pronoun,Vb,Det,Adj,Singular}
The band performed three songs. {Det,Singular,Past,Val,Plural}
They practice every evening. {Pronoun,Pres,Det,Noun}
The concert was wonderful. {Det,Singular,Copula,Adj}

The coach praised the players. {Det,Singular,Past,Det,Plural}
He kicked the ball gently. {Pronoun,Past,Det,Singular,Adv}
Our team won the match. {Poss,Singular,Past,Det,Singular}
The pool is closed. {Det,Singular,Copula,Adj}
We brought extra water. {Pronoun,Past,Adj,Noun}
They climbed a steep hill. {Pronoun,Past,Det,Adj,Singular}
My helmet fits perfectly. {Poss,Singular,Pres,Adv}
The referee blew the whistle. {Det,Singular,Past,Det,Singular}

Please pass the salt. {Expr,Imp,Det,Noun}
Stir the sauce slowly. {Imp,Det,Noun,Adv}
Slice the bread carefully. {Imp,Det,Noun,Adv}
Wash your hands thoroughly. {Imp,Poss,Plural,Adv}
Bring a clean spoon. {Imp,Det,Adj,Singular}
Try the vegetable soup. {Imp,Det,Noun,Noun}
Enjoy your dinner. {Imp,Poss,Noun}

Where did you park? {QuestionWord,Vb,Pronoun,Inf}
Who owns this bicycle? {QuestionWord,Pres,Det,Singular}
Why is the door open? {QuestionWord,Copula,Det,Singular,Adj}
Are your parents home? {Copula,Poss,Plural,Noun}
Does she like chocolate? {Vb,Pronoun,Inf,Noun}
When does the store open? {QuestionWord,Vb,Det,Singular,Inf}
Have you seen my glasses? {Vb,Pronoun,Participle,Poss,Plural}
Will they need a ride? {Modal,Pronoun,Inf,Det,Singular}
Which color do you prefer? {QuestionWord,Singular,Vb,Pronoun,Inf}

I'm making some tea. {Pronoun,Vb,Ger,Det,Noun}
We're waiting for the taxi. {Pronoun,Vb,Ger,Prep,Det,Singular}
He doesn't eat meat. {Pronoun,Vb,Negative,Inf,Noun}
They weren't at the party. {Pronoun,Copula,Negative,Prep,Det,Singular}
You shouldn't skip breakfast. {Pronoun,Modal,Negative,Inf,Noun}
I've washed the dishes. {Pronoun,Vb,Past,Det,Plural}
She's bought a new coat. {Pronoun,Vb,Past,Det,Adj,Singular}
We'll visit our grandparents. {Pronoun,Modal,Inf,Poss,Plural}
It isn't very cold. {Pronoun,Copula,Negative,Adv,Adj}
He couldn't find his wallet. {Pronoun,Modal,Negative,Inf,Poss,Singular}

The puppy chewed my slipper. {Det,Singular,Past,Poss,Singular}
She filled the dog's bowl. {Pronoun,Past,Det,Poss,Singular}
The vet examined the kitten. {Det,Singular,Past,Det,Singular}
We adopted a friendly dog. {Pronoun,Past,Det,Adj,Singular}
His parrot whistles loudly. {Poss,Singular,Pres,Adv}
They bought a comfortable pet bed. {Pronoun,Past,Det,Adj,Noun,Singular}
My hamster escaped last night. {Poss,Singular,Past,Adj,Noun}

The plumber fixed the leaking pipe. {Det,Singular,Past,Det,Adj,Singular}
He tightened the loose screw. {Pronoun,Past,Det,Adj,Singular}
We replaced the broken handle. {Pronoun,Past,Det,Adj,Singular}
The ceiling needs fresh paint. {Det,Singular,Pres,Adj,Noun}
She measured the bedroom wall. {Pronoun,Past,Det,Noun,Singular}
Our fence survived the storm. {Poss,Singular,Past,Det,Singular}
The electrician installed a socket. {Det,Singular,Past,Det,Singular}
I found a hammer in the garage. {Pronoun,Past,Det,Singular,Prep,Det,Singular}
The new lock works smoothly. {Det,Adj,Singular,Pres,Adv}
They repaired the garden gate. {Pronoun,Past,Det,Noun,Singular}

The baby dropped her spoon. {Det,Singular,Past,Poss,Singular}
My nephew loves dinosaurs. {Poss,Singular,Pres,Plural}
Their daughter drew a rainbow. {Poss,Singular,Past,Det,Singular}
We celebrated our grandmother's birthday. {Pronoun,Past,Poss,Poss,Singular}
His uncle brought a cake. {Poss,Singular,Past,Det,Singular}
The twins shared a bedroom. {Det,Plural,Past,Det,Singular}
She hugged her little brother. {Pronoun,Past,Poss,Adj,Singular}
Our cousins stayed for dinner. {Poss,Plural,Past,Prep,Noun}
The toddler stacked five blocks. {Det,Singular,Past,Val,Plural}

The envelope contains a letter. {Det,Singular,Pres,Det,Singular}
I wrote the address clearly. {Pronoun,Past,Det,Singular,Adv}
She attached a stamp. {Pronoun,Past,Det,Singular}
The courier delivered two packages. {Det,Singular,Past,Val,Plural}
We mailed the invitations yesterday. {Pronoun,Past,Det,Plural,Date}
His parcel arrived safely. {Poss,Singular,Past,Adv}
The box was surprisingly light. {Det,Singular,Copula,Adv,Adj}
They signed the delivery form. {Pronoun,Past,Det,Noun,Singular}
My mailbox is empty. {Poss,Singular,Copula,Adj}
The receptionist accepted the flowers. {Det,Singular,Past,Det,Plural}

The tomatoes need more sunlight. {Det,Plural,Pres,Adj,Noun}
He pulled weeds from the soil. {Pronoun,Past,Plural,Prep,Det,Noun}
We bought some flower seeds. {Pronoun,Past,Det,Noun,Plural}
The hose reaches the vegetable patch. {Det,Singular,Pres,Det,Noun,Singular}
Our lemon tree is healthy. {Poss,Noun,Singular,Copula,Adj}
Bees visited the lavender. {Plural,Past,Det,Noun}
The gardener trimmed the hedge. {Det,Singular,Past,Det,Singular}
I picked a red pepper. {Pronoun,Past,Det,Adj,Singular}
Their pumpkins grew quickly. {Poss,Plural,Past,Adv}

The waiter brought our menus. {Det,Singular,Past,Poss,Plural}
I ordered a cheese sandwich. {Pronoun,Past,Det,Noun,Singular}
She asked for extra napkins. {Pronoun,Past,Prep,Adj,Plural}
The chef prepared a delicious meal. {Det,Singular,Past,Det,Adj,Singular}
He poured some juice. {Pronoun,Past,Det,Noun}
We shared a large pizza. {Pronoun,Past,Det,Adj,Singular}
The dessert tasted lovely. {Det,Singular,Past,Adj}
They reserved a table for six. {Pronoun,Past,Det,Singular,Prep,Val}
The bill includes a small tip. {Det,Singular,Pres,Det,Adj,Singular}

My phone vibrated during the meeting. {Poss,Singular,Past,Prep,Det,Singular}
The password contains eight letters. {Det,Singular,Pres,Val,Plural}
He deleted the old photos. {Pronoun,Past,Det,Adj,Plural}
We installed the latest update. {Pronoun,Past,Det,Adj,Singular}
The camera takes sharp pictures. {Det,Singular,Pres,Adj,Plural}
I forgot my headphones. {Pronoun,Past,Poss,Plural}
Their internet connection is slow. {Poss,Noun,Singular,Copula,Adj}
The keyboard has sticky keys. {Det,Singular,Pres,Adj,Plural}
You can change the settings. {Pronoun,Modal,Inf,Det,Plural}

The wedding starts on Saturday. {Det,Singular,Pres,Prep,WeekDay}
She wrapped the present neatly. {Pronoun,Past,Det,Singular,Adv}
His birthday falls in June. {Poss,Singular,Pres,Prep,Month}
The guests enjoyed the music. {Det,Plural,Past,Det,Noun}
I baked a chocolate cake. {Pronoun,Past,Det,Noun,Singular}
Our neighbors brought homemade cookies. {Poss,Plural,Past,Adj,Plural}
The bride carried white roses. {Det,Singular,Past,Adj,Plural}

The museum displays ancient coins. {Det,Singular,Pres,Adj,Plural}
We followed the tour guide. {Pronoun,Past,Det,Noun,Singular}
She admired the marble statue. {Pronoun,Past,Det,Noun,Singular}
The gallery opens on Sunday. {Det,Singular,Pres,Prep,WeekDay}
He bought a colorful postcard. {Pronoun,Past,Det,Adj,Singular}
Our tickets include the exhibition. {Poss,Plural,Pres,Det,Singular}
The castle overlooks a village. {Det,Singular,Pres,Det,Singular}
They explored the historic neighborhood. {Pronoun,Past,Det,Adj,Singular}
A fountain stands in the square. {Det,Singular,Pres,Prep,Det,Singular}
I recognized the famous painting. {Pronoun,Past,Det,Adj,Singular}

Why are your shoes muddy? {QuestionWord,Copula,Poss,Plural,Adj}
Where can I buy stamps? {QuestionWord,Modal,Pronoun,Inf,Plural}
Who sent these flowers? {QuestionWord,Past,Det,Plural}
Did you lock the car? {Vb,Pronoun,Inf,Det,Singular}
Is this seat available? {Copula,Det,Singular,Adj}
Would you like some coffee? {Modal,Pronoun,Inf,Det,Noun}
When will the rain stop? {QuestionWord,Modal,Det,Noun,Inf}
Has your brother arrived? {Vb,Poss,Singular,Past}
Can she join our group? {Modal,Pronoun,Inf,Poss,Singular}

Close the drawer gently. {Imp,Det,Singular,Adv}
Check the tire pressure. {Imp,Det,Noun,Noun}
Write your name clearly. {Imp,Poss,Singular,Adv}
Follow the signs. {Imp,Det,Plural}
Take a short break. {Imp,Det,Adj,Singular}
Save some cake for me. {Imp,Det,Noun,Prep,Pronoun}
Remember your umbrella. {Imp,Poss,Singular}
Place the tray on the counter. {Imp,Det,Singular,Prep,Det,Singular}

We're painting the kitchen. {Pronoun,Vb,Ger,Det,Singular}
He's learning Spanish. {Pronoun,Vb,Ger,Noun}
They've cleaned the windows. {Pronoun,Vb,Past,Det,Plural}
I haven't chosen a dress. {Pronoun,Vb,Negative,Participle,Det,Singular}
We don't need more chairs. {Pronoun,Vb,Negative,Inf,Adj,Plural}
You can't leave the oven unattended. {Pronoun,Modal,Negative,Inf,Det,Singular,Adj}
It'll rain tomorrow. {Pronoun,Modal,Inf,Date}
I'd like a glass of water. {Pronoun,Modal,Inf,Det,Singular,Prep,Noun}
They won't forget your kindness. {Pronoun,Modal,Negative,Inf,Poss,Noun}

#Adverb!=#Prep
Birds gathered around the feeder. {Plural,Past,Prep,Det,Singular}

#Conjunction!=#Prep
I stretch before each race. {Pronoun,Pres,Prep,Det,Singular}

#Determiner!=#Adv
The least expensive ticket sold quickly. {Det,Adv,Adj,Singular,Past,Adv}

#Expression!=#Negative
She has no idea. {Noun,Vb,Negative,Noun}
There are no seats left. {There,Vb,Negative,Noun,Vb}
He has no money. {Noun,Vb,Negative,Noun}

#Infinitive!=#Imp
Add two eggs. {Imp,Val,Plural}

#Infinitive!=#Past
He read his daughter a story. {Pronoun,Past,Poss,Singular,Det,Singular}

#Particle!=#Prep
She runs around the lake. {Pronoun,Pres,Prep,Det,Singular}

#PastTense!=#Adj
Keep the lid closed. {Imp,Det,Singular,Adj}

#Pronoun!=#Det
This is my favorite song. {Det,Vb,Noun,Adj,Noun}

#Singular!=#Season
The flowers bloomed in spring. {Det,Plural,Past,Prep,Noun}

#Uncountable!=#Pronoun
Your explanation surprised everyone. {Poss,Singular,Past,Noun}
Everyone applauded enthusiastically. {Noun,Past,Adv}
`

test('match spec:', function (t) {
  const tagSet = nlp.world().model.one.tagSet
  const aliases = {}
  Object.entries(tagSet).forEach(([tag, info]) => {
    if (info.alias) aliases[info.alias] = tag
  })
  spec
    .split('\n')
    .filter(line => line.trim() && !line.trimStart().startsWith('#'))
    .forEach(line => {
      const failing = nlp.testSpec(line, false)
      const brace = line.lastIndexOf('{')
      const sentence = line.slice(0, brace).trim()
      const differences = []
      if (failing.found) {
        failing.compute('tagRank')
        const slots = line
          .slice(brace + 1)
          .replace(/\}[ \t]*#.*$/, '}')
          .replace(/\}$/, '')
          .split(',')
        const terms = failing.docs.flat()
        slots.forEach((slot, i) => {
          const expected = slot.split('|').map(tag => tag.trim())
          const term = terms[i]
          if (!term) {
            differences.push(`term ${i + 1}: missing, expected ${slot}`)
          } else if (!expected.every(tag => term.tags.has(aliases[tag] || tag))) {
            const word = term.implicit || term.text
            const actual = term.tagRank[0] || 'Untagged'
            const missing = expected.find(tag => !term.tags.has(aliases[tag] || tag))
            differences.push(`'${word}' #${actual}!=#${missing}`)
          }
        })
        if (terms.length !== slots.length) {
          differences.push(`expected ${slots.length} terms, got ${terms.length}`)
        }
        if (differences.length === 0) differences.push('tags align, but the sentence pattern did not match')
      }
      const detail = differences.length > 0 ? ' — ' + differences.join('; ') : ''
      t.equal(failing.found, false, here + sentence + detail)
    })
  t.end()
})
