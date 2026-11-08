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

// a literal match skips one hidden word, so a three-word form like gotta (have got to) is never consumed
test(here + 'a literal match across a three-word form', t => {
  let doc = nlp(`i gotta go`)
  t.equal(doc.match('gotta go').text(), 'gotta go', here + 'gotta go')
  t.equal(doc.match('i gotta go').text(), 'i gotta go', here + 'i gotta go')
  t.equal(doc.match('got to go').text('implicit'), 'got to go', here + 'got to go')

  doc = nlp(`i dunno it`)
  t.equal(doc.match('dunno it').text(), 'dunno it', here + 'dunno it')
  t.equal(doc.match('@hasContraction it').text(), 'dunno it', here + '@hasContraction it')

  doc = nlp(`gonna rain`)
  t.equal(doc.match('gonna rain').text(), 'gonna rain', here + 'two-word form still works')
  t.end()
})

// "ain't never" is always 'have', whatever the subject
test(here + `ain't never`, t => {
  t.equal(nlp(`he ain't never seen it`).text('implicit'), 'he has never seen it', here + 'he')
  t.equal(nlp(`the dog ain't never bitten anyone`).text('implicit'), 'the dog has never bitten anyone', here + 'the dog')
  t.equal(nlp(`i ain't never seen it`).text('implicit'), 'i have never seen it', here + 'i')
  t.equal(nlp(`they ain't never seen it`).text('implicit'), 'they have never seen it', here + 'they')
  t.end()
})

// only the first apostrophe is split, and the 've is left behind
test(here + 'double contractions', t => {
  t.equal(nlp(`i wouldn't've gone`).text('implicit'), 'i would not have gone', here + `wouldn't've`)
  t.equal(nlp(`she couldn't've known`).text('implicit'), 'she could not have known', here + `couldn't've`)
  t.equal(nlp(`I'd've gone`).text('implicit'), 'i would have gone', here + `I'd've`)
  t.equal(nlp(`he'd've liked it`).text('implicit'), 'he would have liked it', here + `he'd've`)
  t.equal(nlp(`you can't've seen it`).text('implicit'), 'you can not have seen it', here + `can't've`)
  t.end()
})

// a hidden word at the end of the text is given a trailing space
test(here + 'implicit text ends cleanly', t => {
  t.equal(nlp(`l'amour`).text('implicit'), 'le amour', here + `l'amour`)
  t.equal(nlp(`i'm`).text('implicit'), 'i am', here + `i'm`)
  t.equal(nlp(`we're not gonna`).text('implicit'), 'we are not going to', here + 'gonna')
  t.end()
})

// the tokenizer moves the elided apostrophe into .pre, so it survives the expansion
test(here + `'tis and 'twas`, t => {
  t.equal(nlp(`'tis the season`).text('implicit'), 'it is the season', here + `'tis implicit`)
  t.equal(nlp(`'tis the season`).text(), `'tis the season`, here + `'tis text`)
  t.equal(nlp(`'twas the night`).text('implicit'), 'it was the night', here + `'twas implicit`)
  t.end()
})

// strip() only removes an 's ending
test(here + 'strip a plural, or curly, possessive', t => {
  const arr = [
    [`the flanders' house`, 'the flanders house'],
    [`James' car`, 'James car'],
    [`spencer’s house`, 'spencer house'],
  ]
  arr.forEach(([str, want]) => {
    const doc = nlp(str)
    doc.possessives().strip()
    t.equal(doc.text(), want, here + str)
  })
  t.end()
})

// a decade written with an apostrophe is read as an owner
test(here + 'a decade is not possessive', t => {
  const arr = [`the 1990's were great`, `in the 1990's`, `1980's music`, `the 2020's election`, `the 90's`]
  arr.forEach(str => {
    const doc = nlp(str)
    t.equal(doc.has('#Possessive'), false, here + `no #Possessive: '${str}'`)
    t.equal(doc.text('implicit'), str, here + `not expanded: '${str}'`)
  })
  // but a single year still owns things
  t.equal(nlp(`2020's election`).has('(#Year && #Possessive)'), true, here + `2020's election`)
  t.end()
})

// 'own' is an adjective, so it's own reads as 'it is own'
test(here + `it's own`, t => {
  t.equal(nlp(`on it's own`).text('implicit'), `on it's own`, here + `on it's own`)
  t.equal(nlp(`it's own fault`).match(`it's`).has('#Possessive'), true, here + `it's own fault`)
  t.end()
})

// the l' article is guessed from the word's ending, and homme ends in e
test(here + `french l' gender`, t => {
  t.equal(nlp(`l'homme`).text('implicit'), 'le homme', here + `l'homme`)
  t.equal(nlp(`l'eau`).text('implicit'), 'la eau', here + `l'eau`)
  t.equal(nlp(`l'amour`).text('implicit'), 'le amour', here + `l'amour`)
  t.equal(nlp(`l'école`).text('implicit'), 'la ecole', here + `l'école`)
  t.end()
})

// a plugin's model replaces the contraction list, instead of adding to it
test(here + 'a plugin adds a contraction', t => {
  nlp.plugin({ model: { one: { contractions: [{ word: 'yolo', out: ['you', 'only', 'live', 'once'] }] } } })
  t.equal(nlp(`yolo`).has('you only live once'), true, here + 'new word is expanded')
  t.equal(nlp(`gonna`).has('going to'), true, here + 'built-in words still expand')
  t.end()
})
