import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/edit-agree] '

// A survey of the capitals and punctuation around an edit: prepend, append, remove and replace.
// Expected text comes from the language, not the code. Each group prints its own score.
// These lines fail today - the ones that pass have moved to tests/03-three/misc/edit-agree.test.js

const group = (name, rows) => {
  test(here + name, t => {
    let passed = 0
    rows.forEach(([input, fn, want]) => {
      const doc = nlp(input)
      fn(doc)
      const have = doc.text()
      passed += have === want ? 1 : 0
      t.equal(have, want, `${here}[${name}] ${input}`)
    })
    t.comment(`${here}${name}: ${passed}/${rows.length}`)
    t.end()
  })
}

// the sentence's capital moves to the new first word
group('prepend capital', [
  // a one-letter word may be a label, or an article
  ['A dog barks.', d => d.match('a').prepend('today'), 'Today a dog barks.'],
  // the new words have their own punctuation
  ['Dogs bark.', d => d.match('dogs').prepend('so.'), 'So. Dogs bark.'],
])

// quotes, brackets and whitespace stay in front
group('prepend opening', [
  ['$5 is cheap', d => d.match('5').prepend('only'), 'only $5 is cheap'],
  // a contraction should stay one
  [`Don't go.`, d => d.prepend('please'), `Please don't go.`],
])

// periods, commas and closing quotes stay behind
group('append closing', [
  // the new words have their own punctuation
  ['Dogs bark, cats run.', d => d.match('bark').append('loudly,'), 'Dogs bark loudly, cats run.'],
])

// these marks belong to their word
group('append beside a word mark', [
  ['it costs $5.50 now', d => d.match('5.50').append('USD'), 'it costs $5.50 USD now'],
])

// both ends at once
group('replace', [
  ['i saw Spencer today.', d => d.replace('spencer', 'the dog', { case: true }), 'i saw the dog today.'],
])
