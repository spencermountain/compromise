import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/noun-parse] '

test('noun-parts:', function (t) {
  const arr = [
    {
      str: `the team's captain`,
      adjectives: [],
      isPlural: false,
      root: 'captain',
      determiner: 'the',
      number: '',
    },
    {
      str: `the surly captain of the basketball team`,
      adjectives: ['surly'],
      isPlural: false,
      root: 'captain',
      determiner: 'the',
      number: '',
    },
  ]
  arr.forEach(obj => {
    let { str, adjectives, root, determiner, number } = obj
    const n = nlp(str).nouns()
    str = "'" + str.split(/ /).slice(0, 5).join(' ') + "'"
    const o = nlp('')
    const parse = n.parse()[0] || { number: o, adjectives: o, determiner: o, root: o }

    t.equal(parse.number.text(), number, here + `${str} [number]`)
    // adjectives
    t.deepEqual(parse.adjectives.out('array'), adjectives, here + `${str} [adjectives]`)
    // determiner
    t.equal(parse.determiner.text(), determiner, here + `${str} [determiner]`)
    // root
    t.equal(parse.root.text(), root, here + `${str} [root]`)
  })
  t.end()
})
