import test from 'tape'
import { splitTerm } from '../_lib.js'

// Human-readable boundaries cover the exception, suffix, and compound interactions.
const examples = [
  ['acre', ['a', 'cre']],
  ['acres', ['a', 'cres']],
  ['cafes', ['ca', 'fes']],
  ['aisles', ['aisles']],
  ['sciences', ['sci', 'en', 'ces']],
  ['acquiesces', ['ac', 'qui', 'es', 'ces']],
  ['acquiescences', ['ac', 'qui', 'es', 'cen', 'ces']],
  ['concierges', ['con', 'ci', 'erges']],
  ["people's", ['peo', "ple's"]],
  ['People’s', ['Peo', 'ple’s']],
  ["science's", ['sci', 'ence', "'s"]],
  ["sciences'", ['sci', 'en', "ces'"]],
  ["cafe's", ['ca', "fe's"]],
  ["would've", ['would', "'ve"]],
  ['Might’ve', ['Might', '’ve']],
  ["could've", ['could', "'ve"]],
  ["should've", ['should', "'ve"]],
  ["must've", ['must', "'ve"]],
  ["we've", ["we've"]],
  ["they've", ["they've"]],
  ["couldn't", ['could', "n't"]],
  ['sidewalk', ['side', 'walk']],
  ['warehouse', ['ware', 'house']],
  ['someone', ['some', 'one']],
  ['aboveground', ['a', 'bove', 'ground']],
  ['gooseberries', ['goose', 'ber', 'ries']],
  ['notebook', ['note', 'book']],
  ['notebooks', ['note', 'books']],
  ['settlement', ['set', 'tle', 'ment']],
  ['settlements', ['set', 'tle', 'ments']],
  ['battleship', ['bat', 'tle', 'ship']],
  ['battleships', ['bat', 'tle', 'ships']],
  ['settlement’s', ['set', 'tle', 'ment’s']],
  ["battleship's", ['bat', 'tle', "ship's"]],
  ['helpless', ['help', 'less']],
  ['helplessly', ['help', 'less', 'ly']],
  ['careless', ['care', 'less']],
  ['bottle', ['bot', 'tle']],
  ['simple', ['sim', 'ple']],
  ['carefully', ['care', 'ful', 'ly']],
  ['movement', ['move', 'ment']],
  ['businesses', ['busi', 'nes', 'ses']],
  ['agribusiness', ['a', 'gri', 'busi', 'ness']],
  ['everywhere', ['eve', 'ry', 'where']],
  ['deathbed', ['death', 'bed']],
  ['infrared', ['in', 'fra', 'red']],
  ['society', ['so', 'ci', 'e', 'ty']],
  ['idea', ['i', 'de', 'a']],
  ['Soviet', ['So', 'vi', 'et']],
  ['“FUCHSIAS!”', ['“FUCH', 'SIAS!”']],
  ['#CAFES!', ['#CA', 'FES!']],
  ['…', ['…']],
]

test('speech: release boundary regressions', t => {
  examples.forEach(([text, expected]) => {
    const parts = splitTerm({ text })
    t.deepEqual(parts, expected, text)
    t.equal(parts.join(''), text, `${text}: original spelling`)
  })
  t.end()
})

// Similar spellings must not inherit a neighboring word's special pronunciation.
const contrasts = [
  ['naked', 2], ['snaked', 1], ['ragged', 2], ['dragged', 1],
  ['rugged', 2], ['shrugged', 1], ['embedded', 3], ['grabbed', 1],
  ['preempt', 2], ['preen', 1], ['reenter', 3], ['reed', 1],
  ['cooperate', 4], ['cooperage', 3], ['recreate', 3], ['creature', 2],
  ['audience', 3], ['soldier', 2], ['influenza', 4], ['subsequent', 3],
  ['silhouette', 3], ['roulette', 2], ['social', 2], ['societal', 4],
  ['opaque', 2], ['queuing', 2], ['gorgeous', 2], ['courteous', 3],
  ['boa', 2], ['boat', 1], ['microscope', 3], ['microeconomic', 6],
]

test('speech: release pronunciation contrasts', t => {
  contrasts.forEach(([text, count]) => {
    t.equal(splitTerm({ text }).length, count, text)
  })
  t.end()
})

test('speech: exception precedence and repeated lookups', t => {
  // Exact entries beat plural inference; derived cuts cannot change their base.
  t.deepEqual(splitTerm({ text: 'concierges' }), ['con', 'ci', 'erges'], 'exact plural override')
  t.deepEqual(splitTerm({ text: 'sciences' }), ['sci', 'en', 'ces'], 'extra plural syllable')
  t.deepEqual(splitTerm({ text: 'science' }), ['sci', 'ence'], 'singular stays unchanged')
  t.deepEqual(splitTerm({ text: 'sciences' }), ['sci', 'en', 'ces'], 'repeatable plural lookup')
  t.deepEqual(splitTerm({ text: 'aisles' }), ['aisles'], 'single syllable exception')
  t.equal(splitTerm({ text: 'unlistedword' }).join(''), 'unlistedword', 'missing exception preserves spelling')
  t.end()
})
