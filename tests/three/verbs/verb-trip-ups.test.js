import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-trip-ups] '

// Verbs that the tagger should recognise, in sentence-fragments designed to trip it up.
// Many of these words double as nouns ('run', 'walk', 'plays'), so the tagger has to lean on
// context. The classic failure is the imperative-after-"says" case ("simon says run"), where the
// verb gets mistagged as a Noun.
//
// Each entry is [fragment, word-that-should-be-a-Verb]. We assert the target word carries a #Verb
// tag in that context.
const isVerb = (fragment, word) => nlp(fragment).match(word).has('#Verb')

// ----------------------------------------------------------------------------
// these currently tag correctly — assert them so we notice if they ever regress
// ----------------------------------------------------------------------------
const working = [
  // bare imperatives
  ['run!', 'run'],
  ['please run', 'run'],
  ['please walk home', 'walk'],
  ['just play', 'play'],
  ['stop and rest', 'rest'],
  ['help me cook', 'cook'],
  ['simon says swim', 'swim'],

  // verbs that are also common nouns, with a subject pronoun for context
  ['I run daily', 'run'],
  ['we walk often', 'walk'],
  ['they play well', 'play'],
  ['you fight hard', 'fight'],
  ['I hope so', 'hope'],
  ['we love it', 'love'],
  ['they dream big', 'dream'],
  ['I work late', 'work'],
  ['we talk often', 'talk'],
  ['I call you', 'call'],
  ['they fish here', 'fish'],
  ['we camp often', 'camp'],
  ['she books the room', 'books'],
  ['we ship it', 'ship'],
  ['they plant trees', 'plant'],
  ['I cook dinner', 'cook'],
  ['we paint walls', 'paint'],
  ['I dance well', 'dance'],
  ['they hunt deer', 'hunt'],
  ['we drink coffee', 'drink'],

  // modal + verb-noun
  ['I should run', 'run'],
  ['we can walk', 'walk'],
  ['they might play', 'play'],
  ['you must rest', 'rest'],
  ['I will fight', 'fight'],
  ['we could dance', 'dance'],

  // to + verb-noun
  ['I want to run', 'run'],
  ['time to walk', 'walk'],
  ['nice to dream', 'dream'],

  // 3rd-person -s (collides with noun-plural)
  ['he runs fast', 'runs'],
  ['she walks home', 'walks'],
  ['he hopes so', 'hopes'],
  ['she works hard', 'works'],
  ['he fights well', 'fights'],
  ['she paints daily', 'paints'],
  ['he plants trees', 'plants'],
  ['it ships today', 'ships'],

  // past tense / participle
  ['I ran home', 'ran'],
  ['we swam far', 'swam'],
  ['they sang loud', 'sang'],
  ['he drank it', 'drank'],
  ['she drew it', 'drew'],
  ['I built it', 'built'],

  // gerund
  ['I like swimming', 'swimming'],
  ['no parking here', 'parking'],

  // relative clause
  ['the thing that runs', 'runs'],
]

test('verb-tagger context (regression):', function (t) {
  working.forEach(([fragment, word]) => {
    t.ok(isVerb(fragment, word), `${here}'${word}' should be a Verb in "${fragment}"`)
  })
  t.end()
})

const knownGaps = [
  // imperative after a reporting verb — the "simon says run" bug
  ['simon says run', 'run'],
  ['simon says jump', 'jump'],
  ['simon says walk', 'walk'],
  ['simon says dance', 'dance'],
  ['simon says paint', 'paint'],
  ['he says run', 'run'],
  ['she said jump', 'jump'],
  ['they say fight', 'fight'],

  // imperative after a particle / let's
  ['jump now', 'jump'],
  ['go run', 'run'],
  [`let's run`, 'run'],
  [`let's dance`, 'dance'],
  ['come dance with me', 'dance'],

  // verb-noun with weak context
  ['I water the plants', 'water'],
  ['it plays music', 'plays'],

  // gerund as subject
  // ['running is fun', 'running'],

  // relative clause, 3rd-person collides with noun-plural
  ['a man who fights', 'fights'],
]

test('verb-tagger known gaps (mistagged as Noun):', function (t) {
  knownGaps.forEach(([fragment, word]) => {
    const got = isVerb(fragment, word)
    const msg = `${here}'${word}' should be a Verb in "${fragment}"`
    t.ok(got, msg)
  })
  t.end()
})
