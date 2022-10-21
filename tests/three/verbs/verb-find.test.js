import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-find] '

test('verb-splitter:', function (t) {
  let arr = [
    {
      str: `poodles like being pampered`,
      verbs: ['like', 'being pampered'],
    },
    {
      str: `i can help fix the tire`,
      verbs: ['can help', 'fix'],
    },
    {
      str: `i will help out the team`,
      verbs: ['will help out'],
    },
    {
      str: `we breifly studied up on the theory`,
      verbs: ['breifly studied up'],
    },
    {
      str: `we studied breifly up in the lobby`,
      verbs: ['studied breifly'],
    },
    {
      str: `it waxed and waned`,
      verbs: ['waxed', 'waned'],
    },
    {
      str: `he ran, swam, and biked`,
      verbs: ['ran,', 'swam,', 'biked'],
    },
    {
      str: `he ran to get it`,
      verbs: ['ran to get'],
    },
    {
      str: `he should have earned or valued it by now`,
      verbs: ['should have earned', 'valued'],
    },
    {
      str: `he should not have shown such skill`,
      verbs: ['should not have shown'],
    },
    {
      str: `walk faster`,
      verbs: ['walk'],
    },
    {
      str: `he professes love`,
      verbs: ['professes'],
    },
    {
      str: `we go eat`,
      verbs: ['go eat'],
    },
    {
      str: `we will go eat`,
      verbs: ['will go eat'],
    },
    {
      str: `we will walk and eat`,
      verbs: ['will walk', 'eat'],
    },
    {
      str: `when the rain pours, come have a drink`,
      verbs: ['pours,', 'come have'],
    },
    // {
    //   str: `poodles like to be pampered`,
    //   verbs: ['like', 'be pampered'],
    // },
  ]
  arr.forEach(o => {
    let verbs = nlp(o.str).verbs().out('array')
    t.deepEqual(verbs, o.verbs, here + o.str)
  })
  t.end()
})

//dont take it too-far
test('verb-greedy:', function (t) {
  let arr = nlp('he would be, had he survived').verbs().json()
  t.equal(arr.length, 2, here + 'split-on-clause')

  arr = nlp('we walked, talked, and sang').verbs().json()
  t.equal(arr.length, 3, here + 'split-on-list')

  arr = nlp('we walked, talked, and quickly sang').verbs().json()
  t.equal(arr.length, 3, here + 'split-on-list2')

  arr = nlp('we suddenly walked, talked, and abruptly sang').verbs().json()
  t.equal(arr.length, 3, here + 'split-on-list3')

  arr = nlp('we really').verbs().json()
  t.equal(arr.length, 0, here + 'adverb-isnt-a-verb')

  arr = nlp('we really really').verbs().json()
  t.equal(arr.length, 0, here + 'two-adverbs-isnt-a-verb')

  arr = nlp('not good').verbs().json()
  t.equal(arr.length, 0, here + 'not-isnt-a-verb')

  let str = nlp('we must not').verbs().out('normal')
  t.equal(str, 'must not', here + 'verb-not')

  str = nlp('we must really').verbs().out('normal')
  t.equal(str, 'must really', here + 'verb-adverb')

  str = nlp('we must really not').verbs().out('normal')
  t.equal(str, 'must really not', here + 'verb-adverb-not')

  str = nlp('the skill you can sell is your knowledge').verbs().eq(0).out('normal')
  t.equal(str, 'can sell', here + 'can sell is')

  str = nlp('what you can sell will be').verbs().eq(0).out('normal')
  t.equal(str, 'can sell', here + 'can sell will be')

  t.end()
})
