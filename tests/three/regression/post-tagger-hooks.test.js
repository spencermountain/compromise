import test from 'tape'
import nlp from '../_lib.js'
import model from '../../../src/2-two/postTagger/model/index.js'
import secondPass from '../../../src/2-two/postTagger/model/second-pass.js'

test('post-tagger rules declare valid required hooks', t => {
  const rules = model.two.matches.concat(secondPass)
  t.equal(
    rules.every(rule => typeof rule.hook === 'string'),
    true,
    'every active rule has an explicit hook'
  )
  // Existing model objects may already contain parsed notIf metadata.
  t.doesNotThrow(
    () => nlp.buildNet(rules.map(({ match, hook }) => ({ match, hook }))),
    'all hooks pass required-token validation'
  )
  t.end()
})

test('specific alternatives retain their post-tagger behavior', t => {
  const cases = [
    ['they got hired', 'hired', 'Passive'],
    ['they were hired', 'hired', 'Passive'],
    ['she was hired', 'hired', 'Passive'],
    ['she is hired', 'hired', 'Passive'],
    ['they are hired', 'hired', 'Passive'],
    ['I am hired', 'hired', 'Passive'],
    ['we will be late', 'late', 'Adjective'],
    ['we will be early', 'early', 'Adjective'],
    ['this march', 'march', 'Month'],
    ['next may', 'may', 'Month'],
    ['half a cup', 'half', 'Fraction'],
    ['quarter of a cup', 'quarter', 'Fraction'],
    // Splitting the numeric alternatives must still respect frozen articles.
    ['a year', 'a', 'Determiner'],
    ['a hundred', 'a', 'Determiner'],
    ['a thousand', 'a', 'Determiner'],
    ['a million', 'a', 'Determiner'],
    ['a billion', 'a', 'Determiner'],
    ['a trillion', 'a', 'Determiner'],
    ['go please', 'go', 'Imperative'],
    ['stop please', 'stop', 'Imperative'],
    ['wait please', 'wait', 'Imperative'],
    ['hurry please', 'hurry', 'Imperative'],
    ['well above the clouds', 'above', 'Preposition'],
    ['well below the clouds', 'below', 'Preposition'],
    ['well under the clouds', 'under', 'Preposition'],
    ['well over the clouds', 'over', 'Preposition'],
    ['well, I agree', 'well', 'Expression'],
    ['so, I agree', 'so', 'Expression'],
    ['okay, I agree', 'okay', 'Expression'],
    ['now, I agree', 'now', 'Expression'],
    ['ok, I agree', 'ok', 'Expression'],
    ['alright, I agree', 'alright', 'Expression'],
    ['shoot, I agree', 'shoot', 'Expression'],
    ['hell, I agree', 'hell', 'Expression'],
    ['anyways, I agree', 'anyways', 'Expression'],
  ]
  for (let i = 0; i < cases.length; i += 1) {
    const [text, word, tag] = cases[i]
    t.equal(
      nlp(text)
        .match(word)
        .has('#' + tag),
      true,
      text + ': ' + tag
    )
  }
  t.end()
})
