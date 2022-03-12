import test from 'tape'
import nlp from './_lib.js'
const here = '[three/verb-toPresent] '

let arr = [
  ['environmentally', 'environmental'],
  ['vertically', 'vertical'],
  ['mechanically', 'mechanical'],
  ['accidentally', 'accidental'],
  ['fully', 'full'],
  ['conversely', null],
  ['simply', 'simple'],
  ['locally', 'local'],
  ['desperately', 'desperate'],
  ['creatively', 'creative'],
  ['principally', 'principal'],
  ['inextricably', 'inextricable'],
  ['seemingly', 'seeming'],
  ['legally', 'legal'],
  ['tenuously', 'tenuous'],
  ['partly', 'part'],
  ['typically', 'typical'],
  ['globally', 'global'],
  ['unfortunately', 'unfortunate'],
  ['dearly', 'dear'],
  ['fully', 'full'],
  ['dramatically', 'dramatic'],
  ['electronically', 'electronic'],
  ['genetically', 'genetic'],
  ['beautifully', 'beautiful'],
  ['earnestly', 'earnest'],
  ['cheaply', 'cheap'],
  ['perceptibly', 'perceptible'],
  ['sharply', 'sharp'],
  ['deeply', 'deep'],
  ['methodically', 'methodical'],
  ['imperfectly', 'imperfect'],
  ['namely', null],
  ['unduly', null],
  ['accordingly', null],
  ['only', null],
  ['early', null],
  ['especially', null],
  ['mostly', null],
  ['daily', null],
  ['only', null],
  ['early', null],

  ['affectionately', 'affectionate'],
  ['gently', 'gentle'],
  ['ecologically', 'ecological'],
  ['unfortunately', 'unfortunate'],
  ['unquestionably', 'unquestionable'],
  ['systemically', 'systemic'],
  ['mistakenly', 'mistaken'],
  ['practically', 'practical'],
  ['invariably', 'invariable'],
  ['appreciably', 'appreciable'],
  ['ironically', 'ironic'],
  ['emphatically', 'emphatic'],
  ['perceptibly', 'perceptible'],
  ['technically', 'technical'],
  ['partly', 'part'],
  ['mathematically', 'mathematical'],

  ['automatically', 'automatic'],
  ['critically', 'critical'],
  ['dramatically', 'dramatic'],
  ['politically', 'political'],
  ['practically', 'practical'],
  ['systematically', 'systematic'],
  ['theoretically', 'theoretical'],
  ['physically', 'physical'],
  ['classically', 'classical'],
  ['exponentially', 'exponential'],
  ['technologically', 'technological'],
  ['admittedly', 'admitted'],
  ['succinctly', 'succinct'],
  ['responsibly', 'responsible'],
  ['emphatically', 'emphatic'],
  ['inextricably', 'inextricable'],
  ['statistically', 'statistical'],
  ['conscientiously', 'conscientious'],
  ['arbitrarily', 'arbitrary'],
  ['remotely', 'remote'],
  ['richly', 'rich'],
  ['ritzily', 'ritzy'],
  ['romantically', 'romantic'],
  ['roomily', 'roomy'],
  ['rosily', 'rosy'],
  ['roundly', 'round'],
  ['rudely', 'rude'],
  ['safely', 'safe'],
  ['saintly', null],
  ['saltily', 'salty'],
  ['savvily', 'savvy'],
  ['scarcely', 'scarce'],
  ['scarily', 'scary'],
  ['severely', 'severe'],
  // ['', ''],
]

test('toAdjective:', function (t) {
  arr.forEach(a => {
    let doc = nlp(a[0]).compute('root')
    let json = doc.adverbs().json()[0] || { terms: [{}] }
    t.equal(json.terms[0].root || null, a[1], here + '[ToAdjective] ' + a[0])
  })
  t.end()
})

test('toAdverb:', function (t) {
  let adjToAdverb = nlp().methods.two.transform.adjToAdverb
  arr.forEach(a => {
    if (a[1]) {
      t.equal(adjToAdverb(a[1]), a[0], here + ` [ToAdverb] ${a[1]}`)
    }
    // let doc = nlp(a[1]).compute('root')
    // let json = doc.adjectives().json()[0] || { terms: [{}] }
    // t.equal(json.terms[0].root || null, a[1], here + ' ' + a[0])
  })
  t.end()
})
