import test from 'tape'
import nlp from './_lib.js'
const here = '[two/hanging-adverb] '

// Deferred expectations for adverbs outside the local verb phrase.
// Intentionally excluded from the normal *.test.js suite.
// Run manually: node tests/two/hanging-adverb.ignore.js
// New examples describe preferred behaviour, independently of current tagging.
// The final examples retain adjective uses for contrast.
const spec = `
The gardener waters the roses daily. {Det,Singular,Pres,Det,Plural,Adv}
There are fresh towels upstairs. {There,Copula,Adj,Plural,Adv}
We ate breakfast together. {Pronoun,Past,Noun,Adv}
They left the house early. {Pronoun,Past,Det,Singular,Adv}
She takes her tablets daily. {Pronoun,Pres,Poss,Plural,Adv}
Can we sit here? {Modal,Pronoun,Inf,Adv}
She charged her tablet overnight. {Pronoun,Past,Poss,Singular,Adv}
They decorated the hall together. {Pronoun,Past,Det,Singular,Adv}
Which bus goes downtown? {QuestionWord,Singular,Pres,Adv}

Please wait here. {Expr,Vb,Adv}
Leave the bowls here. {Imp,Det,Plural,Adv}
Hang your coat here. {Imp,Poss,Singular,Adv}
She is here. {Pronoun,Copula,Adv}
Come here. {Imp,Adv}
Put it there. {Imp,Pronoun,Adv}
There are bowls here. {There,Copula,Plural,Adv}
The children played outside. {Det,Plural,Past,Adv}
We waited inside. {Pronoun,Past,Adv}
She carried the laundry upstairs. {Pronoun,Past,Det,Noun,Adv}
He left his boots downstairs. {Pronoun,Past,Poss,Plural,Adv}
They parked nearby. {Pronoun,Past,Adv}
We ate lunch outdoors. {Pronoun,Past,Noun,Adv}
They walked home together. {Pronoun,Past,Adv,Adv}
She works downtown. {Pronoun,Pres,Adv}

The clinic opens early. {Det,Singular,Pres,Adv}
They arrived late. {Pronoun,Past,Adv}
We check the mailbox daily. {Pronoun,Pres,Det,Singular,Adv}
She visits her parents weekly. {Pronoun,Pres,Poss,Plural,Adv}
The committee meets monthly. {Det,Singular,Pres,Adv}
The guests stayed overnight. {Det,Plural,Past,Adv}
Let the dough rest overnight. {Imp,Det,Noun,Inf,Adv}
We assembled the shelves together. {Pronoun,Past,Det,Plural,Adv}
They solved the puzzle together. {Pronoun,Past,Det,Singular,Adv}

The early train was crowded. {Det,Adj,Singular,Copula,Adj}
Our daily walk was pleasant. {Poss,Adj,Singular,Copula,Adj}
The weekly meeting was short. {Det,Adj,Singular,Copula,Adj}
She booked an overnight flight. {Pronoun,Past,Det,Adj,Singular}
`

test('hanging adverb spec:', function (t) {
  const tagSet = nlp.world().model.one.tagSet
  const aliases = {}
  Object.entries(tagSet).forEach(([tag, info]) => {
    if (info.alias) aliases[info.alias] = tag
  })
  spec
    .split('\n')
    .filter(line => line.trim())
    .forEach(line => {
      const failing = nlp.testSpec(line, false)
      const brace = line.lastIndexOf('{')
      const sentence = line.slice(0, brace).trim()
      const differences = []
      if (failing.found) {
        failing.compute('tagRank')
        const slots = line
          .slice(brace + 1)
          .replace(/\}[ \t]*#.*$/, '}')
          .replace(/\}$/, '')
          .split(',')
        const terms = failing.docs.flat()
        slots.forEach((slot, i) => {
          const expected = slot.split('|').map(tag => tag.trim())
          const term = terms[i]
          if (!term) {
            differences.push(`term ${i + 1}: missing, expected ${slot}`)
          } else if (!expected.every(tag => term.tags.has(aliases[tag] || tag))) {
            const word = term.implicit || term.text
            const actual = term.tagRank[0] || 'Untagged'
            const missing = expected.find(tag => !term.tags.has(aliases[tag] || tag))
            differences.push(`'${word}' #${actual}!=#${missing}`)
          }
        })
        if (terms.length !== slots.length) {
          differences.push(`expected ${slots.length} terms, got ${terms.length}`)
        }
        if (differences.length === 0) differences.push('tags align, but the sentence pattern did not match')
      }
      const detail = differences.length > 0 ? ' — ' + differences.join('; ') : ''
      t.equal(failing.found, false, here + sentence + detail)
    })
  t.end()
})
