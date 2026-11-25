import test from 'tape'
import nlp from '../lib.js'
const here = '[two/change/agree] '

// run each edit, with the healing on (default) and then off
const check = (t, rows) => {
  rows.forEach(([input, fn, on, off]) => {
    let doc = nlp(input)
    fn(doc)
    t.equal(doc.text(), on, here + `[on] ${input}`)
    doc = nlp(input)
    fn(doc, { agree: false })
    t.equal(doc.text(), off, here + `[off] ${input}`)
  })
  t.end()
}

test('prepend agree', t => {
  check(t, [
    // the capital moves
    ['Dogs bark.', (d, o) => d.match('dogs').prepend('the', o), 'The dogs bark.', 'the Dogs bark.'],
    ['Yes. Dogs bark.', (d, o) => d.match('dogs').prepend('the', o), 'Yes. The dogs bark.', 'Yes. the Dogs bark.'],
    ['he likes dogs.', (d, o) => d.match('dogs').prepend('the', o), 'he likes the dogs.', 'he likes the dogs.'],
    // unless it belongs to the word
    ['Spencer walks.', (d, o) => d.match('spencer').prepend('the', o), 'The Spencer walks.', 'the Spencer walks.'],
    ['NASA flies.', (d, o) => d.match('nasa').prepend('the', o), 'The NASA flies.', 'the NASA flies.'],
    ['I walk.', (d, o) => d.match('i').prepend('today', o), 'Today I walk.', 'today I walk.'],
    ['DOGS BARK.', (d, o) => d.match('dogs').prepend('a', o), 'A DOGS BARK.', 'a DOGS BARK.'],
    // opening marks stay in front
    ['"Dogs bark" he said.', (d, o) => d.match('dogs').prepend('the', o), '"The dogs bark" he said.', 'the "Dogs bark" he said.'],
    ['he (dogs bark) left.', (d, o) => d.match('dogs').prepend('the', o), 'he (the dogs bark) left.', 'he the (dogs bark) left.'],
    ['  Dogs bark.', (d, o) => d.match('dogs').prepend('the', o), '  The dogs bark.', 'the   Dogs bark.'],
  ])
})

test('append agree', t => {
  check(t, [
    // closing marks stay behind
    ['Dogs bark.', (d, o) => d.match('bark').append('loudly', o), 'Dogs bark loudly.', 'Dogs bark. loudly'],
    ['Dogs bark?!', (d, o) => d.match('bark').append('loudly', o), 'Dogs bark loudly?!', 'Dogs bark?! loudly'],
    ['Dogs bark, cats run.', (d, o) => d.match('bark').append('loudly', o), 'Dogs bark loudly, cats run.', 'Dogs bark, loudly cats run.'],
    ['he left (dogs bark).', (d, o) => d.match('bark').append('loudly', o), 'he left (dogs bark loudly).', 'he left (dogs bark). loudly'],
    ['Dogs bark.\nCats run.', (d, o) => d.match('bark').append('loudly', o), 'Dogs bark loudly.\nCats run.', 'Dogs bark.\n loudly Cats run.'],
    ['Dogs bark — loudly.', (d, o) => d.match('bark').append('often', o), 'Dogs bark often — loudly.', 'Dogs bark — often loudly.'],
    // one ending is enough
    ['Dogs bark.', (d, o) => d.match('bark').append('loudly!', o), 'Dogs bark loudly!', 'Dogs bark. loudly!'],
    // a word keeps its own marks
    [`the dogs' bowls`, (d, o) => d.match('dogs').append('big', o), `the dogs' big bowls`, `the dogs' big bowls`],
    ['a well-fed dog.', (d, o) => d.match('well').append('very', o), 'a well-very fed dog.', 'a well-very fed dog.'],
  ])
})

test('remove agree', t => {
  check(t, [
    ['The dogs bark.', (d, o) => d.remove('the', o), 'Dogs bark.', 'dogs bark.'],
    ['The dogs bark.', (d, o) => d.match('the').remove(o), 'Dogs bark.', 'dogs bark.'],
    ['the dogs bark.', (d, o) => d.remove('the', o), 'dogs bark.', 'dogs bark.'],
    ['"The dogs" bark.', (d, o) => d.remove('the', o), '"Dogs" bark.', 'dogs" bark.'],
    ['he (the dog) left.', (d, o) => d.remove('the', o), 'he (dog) left.', 'he dog) left.'],
    ['Dogs bark loudly.', (d, o) => d.remove('loudly', o), 'Dogs bark.', 'Dogs bark '],
    ['Dogs bark loudly?', (d, o) => d.remove('loudly', o), 'Dogs bark?', 'Dogs bark '],
  ])
})
