import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/noun-singular] '

// A blind survey of doc.nouns().toSingular(), over whole sentences.
// Expected text comes from the language, not the code, and was written before running it.
// Each group is one form of noun-phrase, and prints its own score, so we can see
// which forms matter most. These lines fail today - the ones that pass have moved to
// tests/03-three/nouns/singular-survey.test.js
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
she dreams of castles → she dreams of a castle
`)

// a or an
group('a or an', `
he made one-time payments → he made a one-time payment
`)

// some determiners have a number of their own
group('this and that', `
these old houses creak → this old house creaks
such things happen → such a thing happens
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
all dogs bark
most cats sleep
one of the dogs barked
neither of the boys came
`)

// a contraction should stay one
group('contractions', `
the dogs aren't old → the dog isn't old
the dogs don't bark → the dog doesn't bark
the kids weren't home → the kid wasn't home
the cats haven't eaten → the cat hasn't eaten
my friends don't care → my friend doesn't care
`)

// the verb is not beside the noun
group('distant verb', `
the men who own dogs like them → the man who owns a dog likes it
the students who study hard pass → the student who studies hard passes
dogs that he likes bark → a dog that he likes barks
the owners of the dogs walk home → the owner of the dog walks home
the players on both teams were tired → the player on both teams was tired
`)

// there are, and questions
group('inverted verb', `
were the kids home? → was the kid home?
why do cats purr? → why does a cat purr?
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
i like dogs, cats, and birds. → i like a dog, a cat, and a bird.
we need plates, forks and knives → we need a plate, a fork and a knife
neither cats nor dogs came → neither a cat nor a dog came
`)

// the plural is not made with an s
group('irregular plurals', `
the lice spread → the louse spreads
the dice are loaded → the die is loaded
`)

// these have no other form
group('no singular form', `
the goods arrived
she has good manners
he sent his regards
we live on the outskirts
he wears glasses
he took binoculars
her surroundings are nice
the odds are low
`)

// the owner, and the thing owned
group('possessives', `
it is in the dogs' bowls → it is in the dog's bowl
she called the boys' parents → she called the boy's parent
my parents' house is old → my parent's house is old
the teachers' lounge is closed → the teacher's lounge is closed
the kids' toys were everywhere → the kid's toy was everywhere
other people's kids → another person's kid
the workers' rights matter → the worker's right matters
`)

// names, and nationalities
group('proper nouns', `
she works at General Motors
The Beatles were great
he flew to the Philippines
he read the New York Times
the Smiths arrived
she met Canadians → she met a Canadian
Canadians love hockey → A Canadian loves hockey
Americans drive a lot → An American drives a lot
Those are Great Danes → That is a Great Dane
she hired Germans → she hired a German
he supports the Blue Jays
she watched Friends
we visited the Alps
`)

// letters, said one at a time
group('acronyms', `
he bought CDs → he bought a CD
he owns SUVs → he owns an SUV
the CEOs met → the CEO met
she sent PDFs → she sent a PDF
they built ATMs → they built an ATM
the MPs voted → the MP voted
she filed FAQs → she filed an FAQ
he flies UFOs → he flies a UFO
the NGOs agree → the NGO agrees
we use APIs → we use an API
`)

// only the last word changes, mostly
group('compound nouns', `
he repairs washing machines → he repairs a washing machine
she met her mothers-in-law → she met her mother-in-law
the attorneys general agreed → the attorney general agreed
she likes science fiction movies → she likes a science fiction movie
`)

// the second noun is a measure of the first
group('of phrases', `
the sides of the boxes were wet → the side of the box was wet
the colors of the flags clash → the color of the flag clashes
she is one of my friends
the names of the students are listed → the name of the student is listed
`)

// a plural that is part of the expression
group('fixed phrases', `
in other words, no
he is in good hands
she has high hopes
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
Old houses creak. → An old house creaks.
`)

// time, and how often
group('dates and durations', `
she is in her thirties
she visits on weekends → she visits on a weekend
these days, it is hard
`)

// the noun is a description of a plural subject
group('predicate nouns', `
these are my friends → this is my friend
her sons are both lawyers
`)

// capitals, and marks beside the word
group('case and punctuation', `
I saw Mice → I saw a Mouse
he said "dogs" loudly → he said "dog" loudly
dogs! → dog!
dogs? → dog?
apples, oranges, pears → apple, orange, pear
it's the kids' fault → it's the kid's fault
`)

// a noun inside a clause
group('clauses', `
he knows that cats purr → he knows that a cat purrs
i wonder why the lights are on → i wonder why the light is on
`)
