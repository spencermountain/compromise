import test from 'tape'
import nlp from '../lib.js'
const here = '[three/misc/edit-agree] '

// The capitals and punctuation around an edit: prepend, append, remove and replace.
// These began as examples in tests/_hmm/edit-agree.hmm.js, and moved here once they passed.

const group = (name, rows) => {
  test(here + name, t => {
    rows.forEach(([input, fn, want]) => {
      const doc = nlp(input)
      fn(doc)
      t.equal(doc.text(), want, `${here}[${name}] ${input}`)
    })
    t.end()
  })
}

// the sentence's capital moves to the new first word
group('prepend capital', [
  ['Dogs bark.', d => d.match('dogs').prepend('a'), 'A dogs bark.'],
  ['Dogs bark.', d => d.prepend('the big'), 'The big dogs bark.'],
  ['Dogs bark.', d => d.match('dogs').prepend('Toronto'), 'Toronto dogs bark.'],
  ['Yes. Dogs bark.', d => d.match('dogs').prepend('the'), 'Yes. The dogs bark.'],
  ['he likes dogs.', d => d.match('dogs').prepend('the'), 'he likes the dogs.'],
  ['dogs bark.', d => d.match('dogs').prepend('the'), 'the dogs bark.'],
  // these words own their capital
  ['Spencer walks.', d => d.match('spencer').prepend('the'), 'The Spencer walks.'],
  ['I walk.', d => d.match('i').prepend('today'), 'Today I walk.'],
  ['NASA flies.', d => d.match('nasa').prepend('the'), 'The NASA flies.'],
  ['DOGS BARK.', d => d.match('dogs').prepend('a'), 'A DOGS BARK.'],
  ['Toronto is big.', d => d.match('toronto').prepend('yes'), 'Yes Toronto is big.'],
  // a one-letter word may be a label, or an article
  ['Plan B failed.', d => d.match('b').prepend('our'), 'Plan our B failed.'],
  // the new words have their own punctuation
  ['Dogs bark.', d => d.match('dogs').prepend('yes,'), 'Yes, dogs bark.'],
])

// quotes, brackets and whitespace stay in front
group('prepend opening', [
  ['"Dogs bark" he said.', d => d.match('dogs').prepend('the'), '"The dogs bark" he said.'],
  ['he (dogs bark) left.', d => d.match('dogs').prepend('the'), 'he (the dogs bark) left.'],
  ['he said "dogs bark".', d => d.match('dogs').prepend('the'), 'he said "the dogs bark".'],
  ['[Dogs] bark.', d => d.match('dogs').prepend('the'), '[The dogs] bark.'],
  ['  Dogs bark.', d => d.match('dogs').prepend('the'), '  The dogs bark.'],
  ['Hello.\nDogs bark.', d => d.match('dogs').prepend('the'), 'Hello.\nThe dogs bark.'],
  ['- dogs bark', d => d.match('dogs').prepend('the'), '- the dogs bark'],
  ['#dogs bark', d => d.match('dogs').prepend('the'), 'the #dogs bark'],
  // a contraction should stay one
  [`Don't go.`, d => d.match('go').prepend('ever'), `Don't ever go.`],
])

// periods, commas and closing quotes stay behind
group('append closing', [
  ['Dogs bark.', d => d.match('bark').append('loudly'), 'Dogs bark loudly.'],
  ['Dogs bark?!', d => d.match('bark').append('loudly'), 'Dogs bark loudly?!'],
  ['Dogs bark...', d => d.match('bark').append('loudly'), 'Dogs bark loudly...'],
  ['he said "dogs bark."', d => d.match('bark').append('loudly'), 'he said "dogs bark loudly."'],
  ['he left (dogs bark).', d => d.match('bark').append('loudly'), 'he left (dogs bark loudly).'],
  ['Dogs bark, cats run.', d => d.match('bark').append('loudly'), 'Dogs bark loudly, cats run.'],
  ['Dogs bark at cats.', d => d.match('bark').append('loudly'), 'Dogs bark loudly at cats.'],
  ['Dogs bark. Cats run.', d => d.match('bark').append('loudly'), 'Dogs bark loudly. Cats run.'],
  ['Dogs bark.\nCats run.', d => d.match('bark').append('loudly'), 'Dogs bark loudly.\nCats run.'],
  ['Dogs bark; cats run.', d => d.match('bark').append('loudly'), 'Dogs bark loudly; cats run.'],
  [`he said 'dogs bark' twice`, d => d.match('bark').append('loudly'), `he said 'dogs bark loudly' twice`],
  ['Dogs bark — loudly.', d => d.match('bark').append('often'), 'Dogs bark often — loudly.'],
  ['Dogs bark - loudly.', d => d.match('bark').append('often'), 'Dogs bark often - loudly.'],
  // the new words have their own punctuation
  ['Dogs bark.', d => d.match('bark').append('loudly!'), 'Dogs bark loudly!'],
  ['Dogs bark', d => d.match('bark').append('loudly?'), 'Dogs bark loudly?'],
  ['Dogs bark.', d => d.match('bark').append('(loudly)'), 'Dogs bark (loudly).'],
])

// these marks belong to their word
group('append beside a word mark', [
  [`the dog's bowl.`, d => d.match(`dog's`).append('old'), `the dog's old bowl.`],
  [`the dogs' bowls`, d => d.match('dogs').append('big'), `the dogs' big bowls`],
  [`James' car is red`, d => d.match('james').append('old'), `James' old car is red`],
  ['a well-fed dog.', d => d.match('fed').append('old'), 'a well-fed old dog.'],
  ['he is twenty-two today', d => d.match('two').append('years'), 'he is twenty-two years today'],
  ['Dogs bark.', d => d.match('dogs').append('Often'), 'Dogs Often bark.'],
  ['e.g. dogs bark', d => d.match('dogs').append('often'), 'e.g. dogs often bark'],
])

// the next word becomes the first
group('remove start', [
  ['The dogs bark.', d => d.remove('the'), 'Dogs bark.'],
  ['The dogs bark.', d => d.match('the').remove(), 'Dogs bark.'],
  ['The Spencer left.', d => d.remove('the'), 'Spencer left.'],
  ['I saw NASA today.', d => d.remove('i saw'), 'NASA today.'],
  ['Yes, dogs bark.', d => d.remove('yes'), 'Dogs bark.'],
  ['"The dogs" bark.', d => d.remove('the'), '"Dogs" bark.'],
  ['he (the dog) left.', d => d.remove('the'), 'he (dog) left.'],
  ['Hello.\nThe dogs bark.', d => d.remove('the'), 'Hello.\nDogs bark.'],
  ['Yes. Dogs bark.', d => d.remove('yes'), 'Dogs bark.'],
  ['the dogs bark.', d => d.remove('the'), 'dogs bark.'],
  ['Quickly, he ran. Slowly, she walked.', d => d.remove('#Adverb'), 'He ran. She walked.'],
  // the quotes leave with their word
  ['"Yes" he said.', d => d.remove('yes'), 'He said.'],
  ['he said "no" twice.', d => d.remove('no'), 'he said twice.'],
])

// the word before becomes the last
group('remove end', [
  ['Dogs bark loudly.', d => d.remove('loudly'), 'Dogs bark.'],
  ['Dogs bark loudly?', d => d.remove('loudly'), 'Dogs bark?'],
  ['Dogs bark.', d => d.remove('bark'), 'Dogs.'],
  ['Dogs bark loudly, and run.', d => d.remove('loudly'), 'Dogs bark, and run.'],
  ['he said "dogs bark loudly".', d => d.remove('loudly'), 'he said "dogs bark".'],
  ['he (the dog) left.', d => d.remove('dog'), 'he (the) left.'],
  ['Dogs bark loudly. Cats run.', d => d.remove('loudly'), 'Dogs bark. Cats run.'],
  ['Dogs bark loudly; cats run.', d => d.remove('loudly'), 'Dogs bark; cats run.'],
  ['Dogs bark (loudly).', d => d.remove('loudly'), 'Dogs bark.'],
  ['Dogs, cats, and birds.', d => d.remove('cats'), 'Dogs, and birds.'],
  ['Dogs bark loudly...', d => d.remove('loudly'), 'Dogs bark...'],
])

// both ends at once
group('replace', [
  ['Dogs bark.', d => d.replace('dogs', 'a cat'), 'A cat bark.'],
  ['Dogs bark.', d => d.replace('dogs', 'a cat', { case: true }), 'A cat bark.'],
  ['Dogs bark.', d => d.replace('dogs', 'spencer', { case: true }), 'Spencer bark.'],
  ['Spencer barks.', d => d.replace('spencer', 'the dog'), 'The dog barks.'],
  ['i saw Spencer today.', d => d.replace('spencer', 'the dog'), 'i saw the dog today.'],
  ['Dogs bark.', d => d.replace('bark', 'run away'), 'Dogs run away.'],
  ['Dogs bark.', d => d.replace('bark', 'run away!'), 'Dogs run away!'],
  ['"Dogs" bark.', d => d.replace('dogs', 'a cat'), '"A cat" bark.'],
  ['Dogs bark loudly today.', d => d.replace('loudly today', 'now'), 'Dogs bark now.'],
  ['he (the dog) left.', d => d.replace('the dog', 'spencer'), 'he (spencer) left.'],
  ['Dogs bark, cats run.', d => d.replace('bark', 'howl at night'), 'Dogs howl at night, cats run.'],
  ['DOGS BARK.', d => d.replace('dogs', 'cats', { case: true }), 'CATS BARK.'],
  ['Yes. Dogs bark.', d => d.replace('dogs', 'the cats'), 'Yes. The cats bark.'],
  [`the dog's bowl`, d => d.replace('bowl', 'water dish'), `the dog's water dish`],
])
