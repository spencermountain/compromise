import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/contractions] '

// Contractions that expand to the wrong words. Expected readings come from the language, not the
// parser, so these lines fail today.

// the model entries read 'coulda:coulda have' and 'woulda:woulda have'
test(here + 'coulda, woulda', t => {
  t.equal(nlp(`i coulda been a contender`).text('implicit'), 'i could have been a contender', here + 'coulda')
  t.equal(nlp(`she woulda known`).text('implicit'), 'she would have known', here + 'woulda')
  t.end()
})

// he's gotta -> he has have got to, as 's picks 'has' because 'got' follows
test(here + `'s before gotta`, t => {
  t.equal(nlp(`he's gotta be kidding`).text('implicit'), 'he has got to be kidding', here + `he's gotta`)
  t.equal(nlp(`she's gotta go`).text('implicit'), 'she has got to go', here + `she's gotta`)
  t.end()
})

// a misspelled 'its' is still an owner - the noun check tests for the tag '#NN', which never matches
test(here + `it's before a noun`, t => {
  let doc = nlp(`the cat licked it's paw`)
  t.equal(doc.has('it is'), false, here + `it's paw is not 'it is'`)
  t.equal(doc.match(`it's`).has('#Possessive'), true, here + `it's paw is possessive`)

  doc = nlp(`it's a cat`)
  t.equal(doc.has('it is'), true, here + `it's a cat is still 'it is'`)
  t.end()
})

// 'd before a determiner is 'had' - the check tests for the tag '#Det', which never matches
test(here + `'d before a determiner`, t => {
  t.equal(nlp(`they'd an issue`).text('implicit'), 'they had an issue', here + `they'd an`)
  t.equal(nlp(`i'd a dog once`).text('implicit'), 'i had a dog once', here + `i'd a`)
  t.end()
})

// 'aint' has its own branch, but only words with an apostrophe reach it
test(here + 'aint, without an apostrophe', t => {
  t.equal(nlp(`i aint going`).text('implicit'), 'i am not going', here + 'i aint')
  t.equal(nlp(`we aint going`).text('implicit'), 'we are not going', here + 'we aint')
  t.equal(nlp(`she aint here`).text('implicit'), 'she is not here', here + 'she aint')
  t.end()
})

// there's before a plural is 'there are' - the rule exists, but the first pass has already split it
test(here + `there's before a plural`, t => {
  t.equal(nlp(`there's cats everywhere`).text('implicit'), 'there are cats everywhere', here + `there's cats`)
  t.equal(nlp(`there's a cat`).text('implicit'), 'there is a cat', here + `there's a cat`)
  t.equal(nlp(`there's been trouble`).text('implicit'), 'there has been trouble', here + `there's been`)
  t.end()
})
