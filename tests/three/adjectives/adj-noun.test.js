import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/adj-noun] '

let arr = [
  ['dramatic', 'drama'],
  ['deep', 'depth'],
  ['ironic', 'irony'],

  ['desperate', 'desperation'],
  ['imperfect', 'imperfection'],
  ['affectionate', 'affection'],
  // ['perceptible', 'perception'],
  // ['perceptive', 'perception'],
  ['automatic', 'automation'],

  ['tenuous', 'tenuousness'],
  ['full', 'fullness'],
  ['beautiful', 'beauty'],
  ['earnest', 'earnestness'],
  ['cheap', 'cheapness'],
  ['sharp', 'sharpness'],
  ['gentle', 'gentleness'],

  ['vertical', 'verticality'],
  ['simple', 'simplicity'],
  ['creative', 'creativity'],
  ['legal', 'legality'],
  ['physical', 'physicality'],

  // ['inspiring', 'inspiration'],
  ['boring', 'boredom'],

  ['passionate', 'passion'],
  ['compassionate', 'compassion'],
  ['proportionate', 'proportion'],
  ['desperate', 'desperation'],
  ['fortunate', 'fortune'],

  ['friendly', 'friendliness'],
  ['full', 'fullness'],
  ['funny', 'funniness'],
  ['furry', 'furriness'],
  ['gaudy', 'gaudiness'],
  ['gay', 'gayness'],
  ['ghastly', 'ghastliness'],

  ['superficial', 'superficiality'],
  ['swift', 'swiftness'],
  ['tall', 'tallness'],
  ['tame', 'tameness'],
  ['tart', 'tartness'],
  ['tawdry', 'tawdriness'],
  ['tense', 'tenseness'],
  ['thirsty', 'thirstiness'],
  ['tidy', 'tidiness'],
  ['timely', 'timeliness'],
  ['tiny', 'tininess'],
  ['tired', 'tiredness'],
  ['random', 'randomness'],
  ['credible', 'credibility'],
  ['impossible', 'impossibility'],
  ['annoying', null],

  ['moist', 'moistness'],
  ['quick', 'quickness'],
  ['quiet', 'quiet'],
  ['red', 'redness'],
  ['ripe', 'ripeness'],
  ['rough', 'roughness'],
  ['sad', 'sadness'],
  ['sharp', 'sharpness'],
]

test('toNoun:', function (t) {
  let adjToNoun = nlp().methods.two.transform.adjective.adjToNoun
  arr.forEach(a => {
    let res = adjToNoun(a[0])
    t.equal(res, a[1], here + ` [toNoun] ${a[1]}`)
  })
  t.end()
})
