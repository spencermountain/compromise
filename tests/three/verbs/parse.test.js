import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-parse] '

test('verb-parts:', function (t) {
  let arr = [
    {
      str: `john had barely ever helped out very quickly`,
      preAdverb: 'barely ever',
      aux: 'had',
      root: 'helped out',
      postAdverb: 'very quickly',
      particle: 'out',
    },
    {
      str: `noone has ever given up anything`,
      preAdverb: 'ever',
      aux: 'has',
      root: 'given up',
      particle: 'up',
    },
    {
      str: `we stood back so carefully`,
      postAdverb: 'so carefully',
      root: 'stood back',
      particle: 'back',
    },
    {
      str: `quietly hit the road`,
      preAdverb: 'quietly',
      root: 'hit',
    },
    {
      str: `allow yourself a treat`,
      root: 'allow',
    },
    {
      str: `do allow yourself a treat`,
      aux: 'do',
      root: 'allow',
    },
    {
      str: `do not beg for a treat`,
      aux: 'do',
      negative: 'not',
      root: 'beg',
    },
    {
      str: `don't hurt anybody`,
      aux: 'do',
      negative: 'not',
      root: 'hurt',
    },
    {
      str: `he will not work out`,
      aux: 'will',
      negative: 'not',
      root: 'work out',
      particle: 'out',
    },
    {
      str: `it had clearly been acknowledged safely`,
      aux: 'had been',
      preAdverb: 'clearly',
      postAdverb: 'safely',
      root: 'acknowledged',
    },
    {
      str: `she is really fancy`,
      root: 'is',
      postAdverb: 'really',
    },
    {
      str: `it was not educational really`,
      root: 'was',
      negative: 'not',
    },
    {
      str: `don't hit the gym!`,
      aux: 'do',
      root: 'hit',
      negative: 'not',
    },
    {
      str: `he would fall on the couch`,
      aux: 'would',
      root: 'fall',
    },
    {
      str: `i'll tell you what`,
      aux: 'will',
      root: 'tell',
    },

    {
      str: `someone must eventually not win the last game`,
      aux: 'must',
      preAdverb: 'eventually',
      negative: 'not',
      root: 'win',
    },
    {
      str: `we are putting the pressure`,
      aux: 'are',
      root: 'putting',
    },
  ]
  arr.forEach(obj => {
    let { str, preAdverb, aux, root, postAdverb, particle } = obj
    let vb = nlp(str).verbs()
    str = "'" + str.split(/ /).slice(0, 5).join(' ') + "'"
    t.equal(vb.length, 1, here + `1 verb - '${str}'`)
    let parse = vb.parse()[0]
    if (!parse) {
      t.ok(false, here + ' [no-verb] ' + str)
      return
    }
    // test pre-adverb
    if (preAdverb && parse.adverbs.pre.text) {
      t.equal(preAdverb, parse.adverbs.pre.text(), here + `${str} [preAdverb]`)
    } else {
      t.equal(parse.adverbs.pre.found, false, here + `${str} [preAdverb]`)
    }
    // test auxiliary
    if (aux) {
      t.equal(aux, parse.auxiliary.text(), here + `${str} [aux]`)
    } else {
      t.equal(parse.auxiliary.found, false, here + `${str} [aux]`)
    }
    // test root verb
    if (root) {
      t.equal(root, parse.root.text(), here + `${str} [root]`)
    } else {
      t.equal(parse.root.found, false, here + `${str} [root]`)
    }
    // test post-adverb
    if (postAdverb) {
      t.equal(postAdverb, parse.adverbs.post.text(), here + `${str} [postAdverb]`)
    } else {
      t.equal(parse.adverbs.post.found, false, here + `${str} [postAdverb]`)
    }
    // test phrasal particle
    if (particle) {
      t.equal(particle, parse.phrasal.particle.text(), here + `${str} [particle]`)
    } else {
      t.equal(parse.phrasal.particle.found, false, here + `${str} [particle]`)
    }
  })
  t.end()
})
