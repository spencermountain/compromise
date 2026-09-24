import test from 'tape'
import nlp from './_lib.js'
const here = '[two/spatial-preposition] '

// Deferred expectations for spatial words currently tagged Adjective instead of Preposition.
// Intentionally excluded from the normal *.test.js suite.
// Run manually: node tests/two/spatial-preposition.ignore.js
// New examples describe preferred behaviour, independently of current tagging.
// The final examples retain adjective uses for contrast.
const spec = `
The lantern flickered beside the window. {Det,Singular,Past,Prep,Det,Singular}
The ducks swim near the reeds. {Det,Plural,Pres,Prep,Det,Plural}
There was a spider beneath the chair. {There,Copula,Det,Singular,Prep,Det,Singular}
My receipt is inside the bag. {Poss,Singular,Copula,Prep,Det,Singular}
The sun disappeared behind a cloud. {Det,Singular,Past,Prep,Det,Singular}
A rabbit hid under the shed. {Det,Singular,Past,Prep,Det,Singular}
Our cat sleeps beside the radiator. {Poss,Singular,Pres,Prep,Det,Singular}
The goldfish swam behind the rock. {Det,Singular,Past,Prep,Det,Singular}
The leash hangs near the door. {Det,Singular,Pres,Prep,Det,Singular}
She planted carrots behind the shed. {Pronoun,Past,Plural,Prep,Det,Singular}
Our table is near the window. {Poss,Singular,Copula,Prep,Det,Singular}
We hung balloons above the table. {Pronoun,Past,Plural,Prep,Det,Singular}

The dog slept beneath the bench. {Det,Singular,Past,Prep,Det,Singular}
She stood beside her bicycle. {Pronoun,Past,Prep,Poss,Singular}
We waited near the entrance. {Pronoun,Past,Prep,Det,Singular}
The keys fell behind the sofa. {Det,Plural,Past,Prep,Det,Singular}
He stored the blankets under the bed. {Pronoun,Past,Det,Plural,Prep,Det,Singular}
A lamp hangs above the desk. {Det,Singular,Pres,Prep,Det,Singular}
The temperature dropped below zero. {Det,Singular,Past,Prep,Val}
They sat outside the cafe. {Pronoun,Past,Prep,Det,Singular}
She placed the letter inside the drawer. {Pronoun,Past,Det,Singular,Prep,Det,Singular}
The ladder rested against the wall. {Det,Singular,Past,Prep,Det,Singular}
A bird flew over the roof. {Det,Singular,Past,Prep,Det,Singular}
The path runs alongside the river. {Det,Singular,Pres,Prep,Det,Singular}

The box is directly under the shelf. {Det,Singular,Copula,Adv,Prep,Det,Singular}
She stood right beside me. {Pronoun,Past,Adv,Prep,Pronoun}
The sign hangs just above the door. {Det,Singular,Pres,Adv,Prep,Det,Singular}
We parked near her house. {Pronoun,Past,Prep,Poss,Singular}
The dog hid behind us. {Det,Singular,Past,Prep,Pronoun}

The inside pocket is empty. {Det,Adj,Singular,Copula,Adj}
The outside wall is blue. {Det,Adj,Singular,Copula,Adj}
The above examples are simple. {Det,Adj,Plural,Copula,Adj}
`

test('spatial preposition spec:', function (t) {
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
