import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/misc/this-subject] '

test(here + 'this is a pronoun before a finite predicate', t => {
  for (const str of ['This is useful.', 'Hope this helps.', 'This rocks dude.', 'This really helps.', 'This will be one sentence.', 'For the poor, this is the largest tax.']) {
    const word = nlp(str).match('this')
    t.equal(word.has('#Pronoun'), true, str)
    t.equal(word.has('#Determiner'), false, str + ' not determiner')
  }
  for (const str of ['This book is useful.', 'This interesting book helps.', 'This swimming pool is deep.', 'This failed experiment was expensive.', 'This can is empty.', 'This will is valid.']) {
    const word = nlp(str).match('this')
    t.equal(word.has('#Determiner'), true, str)
    t.equal(word.has('#Pronoun'), false, str + ' not pronoun')
  }
  t.end()
})

test(here + 'quantities after a modal do not make commands', t => {
  for (const str of ['This will be one sentence.', 'She will buy two books.', 'We can add two eggs.']) {
    t.equal(nlp(str).has('#Imperative'), false, str)
  }
  for (const str of ['Add two eggs.', 'Please add two eggs.', 'Buy three books.']) {
    t.equal(nlp(str).has('#Imperative'), true, str)
  }
  t.end()
})
