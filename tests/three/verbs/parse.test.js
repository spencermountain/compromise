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
  ]
  arr.forEach(obj => {
    const { str, preAdverb, aux, root, postAdverb, particle } = obj
    let vb = nlp(str).verbs()
    t.equal(vb.length, 1, here + `1 verb - '${str}'`)
    let parse = vb.parse()[0]
    if (preAdverb) {
      t.equal(preAdverb, parse.adverbs.pre.text(), here + `[preAdverb] ${str}`)
    }
    if (aux) {
      t.equal(aux, parse.auxiliary.text(), here + `[aux] ${str}`)
    }
    if (root) {
      t.equal(root, parse.root.text(), here + `[root] ${str}`)
    }
    if (postAdverb) {
      t.equal(postAdverb, parse.adverbs.post.text(), here + `[postAdverb] ${str}`)
    }
    if (particle) {
      t.equal(particle, parse.phrasal.particle.text(), here + `[particle] ${str}`)
    }
  })
  t.end()
})
