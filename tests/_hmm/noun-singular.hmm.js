import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/noun-singular] '

// A blind survey of doc.nouns().toSingular(), over whole sentences.
// Expected text comes from the language, not the code, and was written before running it.
// Each group is one form of noun-phrase, and prints its own score, so we can see
// which forms matter most. Many of these lines fail today.
//
// one example per line: 'input → expected'. A line without an arrow should not change.

const parse = str => str.trim().split('\n').map(line => {
  const [input, want] = line.split(' → ')
  return [input, want || input]
})

const group = (name, str) => {
  test(here + name, t => {
    const rows = parse(str)
    let passed = 0
    rows.forEach(([input, want]) => {
      const doc = nlp(input)
      doc.nouns().toSingular()
      const have = doc.text()
      passed += have === want ? 1 : 0
      t.equal(have, want, `${here}[${name}] ${input}`)
    })
    t.comment(`${here}${name}: ${passed}/${rows.length}`)
    t.end()
  })
}

// a bare plural needs an article, once it is singular
group('bare plural', `
she sells seashells by the seashore. → she sells a seashell by the seashore.
he collects stamps → he collects a stamp
we planted trees in the yard → we planted a tree in the yard
she writes books → she writes a book
they build houses → they build a house
he fixed cars for a living → he fixed a car for a living
i bought tickets → i bought a ticket
she was chased by dogs → she was chased by a dog
he talks about movies → he talks about a movie
we waited for buses → we waited for a bus
he ate with chopsticks → he ate with a chopstick
she dreams of castles → she dreams of a castle
`)

// a or an
group('a or an', `
she ate oranges → she ate an orange
we waited for hours → we waited for an hour
they wore uniforms → they wore a uniform
he joined unions → he joined a union
she met honest men → she met an honest man
he bought umbrellas → he bought an umbrella
we saw eagles → we saw an eagle
he rides unicycles → he rides a unicycle
she plays ukuleles → she plays a ukulele
they are heirs → they are heirs
he paid in euros → he paid in a euro
we visited islands → we visited an island
she hired MBA graduates → she hired an MBA graduate
he made one-time payments → he made a one-time payment
she gave honorable mentions → she gave an honorable mention
they elected European leaders → they elected a European leader
he sent x-rays → he sent an x-ray
`)

// the article goes before the describing words
group('adjectives', `
he likes big red apples → he likes a big red apple
she has really old cars → she has a really old car
we found very small keys → we found a very small key
he drives expensive cars → he drives an expensive car
they sell hand-made rugs → they sell a hand-made rug
she wore bright yellow dresses → she wore a bright yellow dress
he tells incredibly long stories → he tells an incredibly long story
we need three-legged stools → we need a three-legged stool
he met well-known authors → he met a well-known author
she paints unusually tall buildings → she paints an unusually tall building
`)

// these already have something in front
group('existing determiner', `
the dogs ran away → the dog ran away
my fingers looked green afterwards → my finger looked green afterwards
she stubbed her toes → she stubbed her toe
his excuses got old → his excuse got old
our neighbors moved → our neighbor moved
i read your letters → i read your letter
their houses burned down → their house burned down
john's potatoes went bad → john's potato went bad
no dogs allowed → no dog allowed
which books did he read → which book did he read
whose shoes did she take → whose shoe did she take
`)

// some determiners have a number of their own
group('this and that', `
these dogs bark → this dog barks
those cars are fast → that car is fast
i like these shoes → i like this shoe
he took those pills → he took that pill
these old houses creak → this old house creaks
other dogs bark → another dog barks
such things happen → such a thing happens
i saw the other kids → i saw the other kid
`)

// counted things can't be singular
group('numbers and quantifiers', `
i saw two dogs
he cut two cheeses
she has several cats
many people left
a few dogs barked
both hands hurt
a lot of dogs bark
hundreds of birds flew by
he ran five miles
it costs ten dollars
she is six feet tall
two years ago
he tried three times
dozens of fans waited
a couple of kids laughed
all dogs bark
most cats sleep
one of the dogs barked
neither of the boys came
`)

// the next verb follows its subject
group('verb agreement', `
the dogs bark loudly → the dog barks loudly
my dogs really like food → my dog really likes food
dogs never try → a dog never tries
the babies cry → the baby cries
the students study → the student studies
the kids want to play → the kid wants to play
the boxes carry weight → the box carries weight
the birds fly south → the bird flies south
the buses pass by → the bus passes by
the teachers teach → the teacher teaches
the dishes need washing → the dish needs washing
the foxes catch mice → the fox catches a mouse
my friends always say that → my friend always says that
the trains usually leave late → the train usually leaves late
the workers do good work → the worker does good work
the machines go fast → the machine goes fast
`)

// is, has, and does
group('helper verbs', `
the dogs are here → the dog is here
the dogs were here → the dog was here
dogs have eaten → a dog has eaten
the dogs have been fed → the dog has been fed
dogs do not bark → a dog does not bark
the dogs are running → the dog is running
the cats were sleeping → the cat was sleeping
the doors are not locked → the door is not locked
the windows have never been cleaned → the window has never been cleaned
the kids are always late → the kid is always late
the lights were probably on → the light was probably on
`)

// a contraction should stay one
group('contractions', `
the dogs aren't old → the dog isn't old
the dogs don't bark → the dog doesn't bark
the kids weren't home → the kid wasn't home
the cats haven't eaten → the cat hasn't eaten
my friends don't care → my friend doesn't care
the doors won't open → the door won't open
the dogs can't swim → the dog can't swim
the kids didn't know → the kid didn't know
`)

// these verbs have one form
group('verbs that stay', `
dogs can bark → a dog can bark
dogs will bark → a dog will bark
the dogs barked → the dog barked
the kids should leave → the kid should leave
the cats would purr → the cat would purr
the birds flew away → the bird flew away
the cars might start → the car might start
the boys had left → the boy had left
the girls sang → the girl sang
i let the dogs run → i let the dog run
she made the kids laugh → she made the kid laugh
we watched the birds fly → we watched the bird fly
he helped the boys move → he helped the boy move
i heard the dogs bark → i heard the dog bark
`)

// the verb is not beside the noun
group('distant verb', `
the dogs that bark are loud → the dog that barks is loud
the men who own dogs like them → the man who owns a dog likes it
the dogs in the yard are barking → the dog in the yard is barking
the keys on the table are mine → the key on the table is mine
the kids, who were tired, went home → the kid, who was tired, went home
the cars he bought were old → the car he bought was old
the books on the shelves are dusty → the book on the shelf is dusty
the dogs bark and run → the dog barks and runs
the cats eat and then sleep → the cat eats and then sleeps
the students who study hard pass → the student who studies hard passes
dogs that he likes bark → a dog that he likes barks
the owners of the dogs walk home → the owner of the dog walks home
the players on both teams were tired → the player on both teams was tired
`)

// there are, and questions
group('inverted verb', `
there are dogs outside → there is a dog outside
there were problems → there was a problem
there are no chairs → there is no chair
here are the keys → here is the key
are the dogs here? → is the dog here?
do dogs bark? → does a dog bark?
where are my shoes? → where is my shoe?
were the kids home? → was the kid home?
have the boys left? → has the boy left?
why do cats purr? → why does a cat purr?
what do the kids want? → what does the kid want?
`)

// a pronoun that points back at the noun
group('pronouns', `
the dogs wagged their tails → the dog wagged its tail
the cars lost their wheels → the car lost its wheel
cats are great because they purr → a cat is great because it purrs
the trees dropped their leaves → the tree dropped its leaf
the dogs hurt themselves → the dog hurt itself
i saw the birds and fed them → i saw the bird and fed it
the companies raised their prices → the company raised its price
`)

// the subject is still plural, with 'and'
group('lists', `
she saw cats and dogs → she saw a cat and a dog
cats and dogs bark → a cat and a dog bark
i like dogs, cats, and birds. → i like a dog, a cat, and a bird.
he sells apples or oranges → he sells an apple or an orange
the boys and the girls left → the boy and the girl left
she bought shoes and hats → she bought a shoe and a hat
we need plates, forks and knives → we need a plate, a fork and a knife
the dogs and cats were asleep → the dog and cat were asleep
he ate eggs and oranges → he ate an egg and an orange
neither cats nor dogs came → neither a cat nor a dog came
`)

// the plural is not made with an s
group('irregular plurals', `
the men left → the man left
the women were tired → the woman was tired
the children play outside → the child plays outside
she saw mice → she saw a mouse
the geese fly south → the goose flies south
he lost his teeth → he lost his tooth
my feet hurt → my foot hurts
the people were angry → the person was angry
he sharpened knives → he sharpened a knife
the leaves fell → the leaf fell
the wolves howl → the wolf howls
their wives know → their wife knows
the criteria are strict → the criterion is strict
these phenomena are rare → this phenomenon is rare
the analyses were wrong → the analysis was wrong
he grows cacti → he grows a cactus
the oxen pull the cart → the ox pulls the cart
she studies fungi → she studies a fungus
the theses were long → the thesis was long
he baked loaves → he baked a loaf
the shelves are full → the shelf is full
the heroes return → the hero returns
she peeled potatoes → she peeled a potato
the echoes fade → the echo fades
the lice spread → the louse spreads
the dice are loaded → the die is loaded
`)

// these have no other form
group('no singular form', `
he saw sheep
we saw aircraft
he likes news
he studies mathematics
the species survive
he owns series
she caught fish
the deer ran
he has scissors
she wore pants
his clothes were wet
the goods arrived
he gave thanks
she has good manners
he sent his regards
we live on the outskirts
the police are here
the cattle graze
he wears glasses
she bought jeans
the stairs creak
he took binoculars
her surroundings are nice
the headquarters is downtown
he made amends
the odds are low
`)

// a singular word, that ends in s
group('ends in s', `
the bus was late
his boss left
the class starts now
this is a crisis
she has diabetes
the lens broke
he plays tennis
the atlas is old
physics is hard
the gas leaked
a virus spreads
chaos reigns
the canvas tore
he made progress
it was a success
the princess smiled
she is a genius
the octopus hid
his address changed
there was a surplus
the circus left town
he has a bias
she ate asparagus
the campus is big
it is on the basis of merit
the iris bloomed
he lost consciousness
she felt sadness
the walrus slept
he used a compass
`)

// a verb, that looks like a plural noun
group('not a noun', `
she walks home
he runs fast
it works
she hopes so
he drinks water
it rains a lot
she always wins
he cooks dinner
it costs a lot
she watches the watches → she watches the watch
he plants plants → he plants a plant
she paints paintings → she paints a painting
he sometimes forgets
it is always open
perhaps he knows
besides, it was late
she went upstairs
he looked towards the door
it happened afterwards
he is nowadays retired
`)

// the owner, and the thing owned
group('possessives', `
the dog's bowls are empty → the dog's bowl is empty
it is in the dogs' bowls → it is in the dog's bowl
she called the boys' parents → she called the boy's parent
my parents' house is old → my parent's house is old
the teachers' lounge is closed → the teacher's lounge is closed
this is spencer's
the men's rooms → the men's room
john's friends arrived → john's friend arrived
the company's profits fell → the company's profit fell
the kids' toys were everywhere → the kid's toy was everywhere
the women's teams won → the women's team won
other people's kids → another person's kid
the cat's whiskers twitched → the cat's whisker twitched
the workers' rights matter → the worker's right matters
it is nobody's business
`)

// names, and nationalities
group('proper nouns', `
she works for NASA
he lives in the Netherlands
the United States is big
she works at General Motors
The Beatles were great
he flew to the Philippines
Mr. Jones left
she lives in Paris
he read the New York Times
the Smiths arrived
she met Canadians → she met a Canadian
Canadians love hockey → A Canadian loves hockey
Americans drive a lot → An American drives a lot
he likes Toronto restaurants → he likes a Toronto restaurant
Those are Great Danes → That is a Great Dane
she hired Germans → she hired a German
the Olympics start soon
he supports the Blue Jays
she watched Friends
we visited the Alps
`)

// letters, said one at a time
group('acronyms', `
he hired FBI agents → he hired an FBI agent
she met NASA officials → she met a NASA official
she likes USB cables → she likes a USB cable
he bought CDs → he bought a CD
he owns SUVs → he owns an SUV
the CEOs met → the CEO met
she sent PDFs → she sent a PDF
he read UN reports → he read a UN report
they built ATMs → they built an ATM
the MPs voted → the MP voted
she filed FAQs → she filed an FAQ
he flies UFOs → he flies a UFO
the NGOs agree → the NGO agrees
we use APIs → we use an API
`)

// only the last word changes, mostly
group('compound nouns', `
we passed bus stops → we passed a bus stop
the swimming pools were closed → the swimming pool was closed
she collects coffee mugs → she collects a coffee mug
he repairs washing machines → he repairs a washing machine
the football captains met → the football captain met
ice cream cones melt → an ice cream cone melts
the credit cards expired → the credit card expired
she met her mothers-in-law → she met her mother-in-law
the passers-by waved → the passer-by waved
the attorneys general agreed → the attorney general agreed
he owns apple orchards → he owns an apple orchard
the high school students left → the high school student left
we booked hotel rooms → we booked a hotel room
the police officers arrived → the police officer arrived
she likes science fiction movies → she likes a science fiction movie
the runners-up cried → the runner-up cried
he fixed the car doors → he fixed the car door
the sports cars raced → the sports car raced
`)

// the second noun is a measure of the first
group('of phrases', `
he bought a box of apples
she has a pair of shoes
a group of kids arrived
a number of problems came up
he ate a bag of chips
a flock of birds flew by
she read a series of books
boxes of apples arrived → a box of apples arrived
he carried bags of groceries → he carried a bag of groceries
piles of leaves burned → a pile of leaves burned
the sides of the boxes were wet → the side of the box was wet
the colors of the flags clash → the color of the flag clashes
she is one of my friends
he is the king of clubs
the names of the students are listed → the name of the student is listed
`)

// a plural that is part of the expression
group('fixed phrases', `
in other words, no
thanks for coming
congratulations on the win
he is in good hands
she has high hopes
by all means
he made ends meet
no hard feelings
she is on good terms with him
best wishes to you
he took pains to explain
in terms of cost, it is fine
at all costs
he is behind bars
she changed her mind for good reasons → she changed her mind for a good reason
many happy returns
he has second thoughts
it is in the works
she was in tears
he kept tabs on her
`)

// the first word of a sentence
group('sentence start', `
Dogs bark. → A dog barks.
Apples are red. → An apple is red.
Old houses creak. → An old house creaks.
Seashells wash up here → A seashell washes up here
The Children played → The Child played
Children play here. → A child plays here.
Hours passed. → An hour passed.
Honest men are rare. → An honest man is rare.
Yes. Dogs bark. → Yes. A dog barks.
Birds sing. Cats sleep. → A bird sings. A cat sleeps.
`)

// time, and how often
group('dates and durations', `
it took hours → it took an hour
he ate hours ago → he ate an hour ago
she waited for years → she waited for a year
he works on Mondays → he works on a Monday
it was in the 1990s
she is in her thirties
he left minutes later → he left a minute later
the days are long → the day is long
it rains in the summers → it rains in the summer
she visits on weekends → she visits on a weekend
he sleeps during the afternoons → he sleeps during the afternoon
sometimes it rains
he always comes
these days, it is hard
weeks went by → a week went by
`)

// the noun is a description of a plural subject
group('predicate nouns', `
they are doctors
we are friends
you are fools
the boys are students → the boy is a student
my brothers are doctors → my brother is a doctor
the dogs are good pets → the dog is a good pet
they became teachers
these are my friends → this is my friend
the winners were kids → the winner was a kid
her sons are both lawyers
`)

// capitals, and marks beside the word
group('case and punctuation', `
I saw MICE → I saw a MOUSE
I LOVE DOGS → I LOVE A DOG
I saw Mice → I saw a Mouse
he said "dogs" loudly → he said "dog" loudly
she likes dogs (and cats). → she likes a dog (and a cat).
dogs! → dog!
dogs? → dog?
seashells → seashell
apples, oranges, pears → apple, orange, pear
he likes dogs. she likes cats. → he likes a dog. she likes a cat.
the dogs, however, stayed. → the dog, however, stayed.
he bought apples; she bought pears → he bought an apple; she bought a pear
it's the kids' fault → it's the kid's fault
he wants the red ones → he wants the red one
she likes cats/dogs
`)

// a noun inside a clause
group('clauses', `
he thinks dogs bark → he thinks a dog barks
when dogs bark, cats run → when a dog barks, a cat runs
if the doors open, we leave → if the door opens, we leave
she said the kids were tired → she said the kid was tired
he knows that cats purr → he knows that a cat purrs
because the roads are wet, we stayed → because the road is wet, we stayed
the dogs bark when strangers come → the dog barks when a stranger comes
i wonder why the lights are on → i wonder why the light is on
although the tests were hard, she passed → although the test was hard, she passed
she left before the guests arrived → she left before the guest arrived
`)
