import test from 'tape'
import nlp from '../lib.js'
const here = '[three/nouns/agreement] '

// flip every noun-phrase back and forth, a few times
const roundTrip = function (t, a, opts, label) {
  const [single, plural] = a
  // begin from both forms, unless one is given
  const starts = a[2] ? [a[2]] : a
  starts.forEach(start => {
    const doc = nlp(start)
    for (let i = 0; i < 3; i += 1) {
      doc.nouns().toSingular(opts)
      t.equal(doc.text(), single, here + `[${label} singular #${i}] ${start}`)
      doc.nouns().toPlural(opts)
      t.equal(doc.text(), plural, here + `[${label} plural #${i}] ${start}`)
    }
  })
}

test('round-trip, with agreement:', function (t) {
  const arr = [
    // [singular, plural, start?]
    // articles
    ['she sells a seashell', 'she sells seashells'],
    ['she ate an orange', 'she ate oranges'],
    ['he ate an hour ago', 'he ate hours ago'],
    ['she wore a uniform', 'she wore uniforms'],
    // adjectives
    ['he has an old car', 'he has old cars'],
    ['she met an honest man', 'she met honest men'],
    ['he has a really old car', 'he has really old cars'],
    // copulas
    ['a captain is here', 'captains are here'],
    ['an apple was not ripe', 'apples were not ripe'],
    ['the dog was here', 'the dogs were here'],
    ['the woman is not dead.', 'the women are not dead.'],
    // helper verbs
    ['a dog has eaten', 'dogs have eaten'],
    ['the dog has been fed', 'the dogs have been fed'],
    ['a dog does not bark', 'dogs do not bark'],
    ['the dog is running', 'the dogs are running'],
    // regular verbs
    ['the dog barks loudly', 'the dogs bark loudly'],
    ['my dog really likes food', 'my dogs really like food'],
    ['a dog never tries', 'dogs never try'],
    ['the dog goes home', 'the dogs go home'],
    // ('baby cries' can also read as two nouns, so begin from the plural)
    ['the baby cries', 'the babies cry', 'the babies cry'],
    ['the student studies', 'the students study', 'the students study'],
    ['the kid wants to play', 'the kids want to play'],
    ['he thinks a dog barks', 'he thinks dogs bark'],
    ['when a dog barks, a cat runs', 'when dogs bark, cats run'],
    // these verbs don't change
    ['a dog can bark', 'dogs can bark'],
    ['a dog will bark', 'dogs will bark'],
    ['the dog barked', 'the dogs barked'],
    ['i let the dog run', 'i let the dogs run', 'i let the dogs run'],
    // the verb comes first
    ['there is a dog outside', 'there are dogs outside'],
    ['there was a problem', 'there were problems'],
    ['here is the key', 'here are the keys'],
    ['is the dog here?', 'are the dogs here?'],
    ['does a dog bark?', 'do dogs bark?', 'do dogs bark?'],
    ['where is my shoe?', 'where are my shoes?'],
    ['has the boy left?', 'have the boys left?'],
    // the verb is a few words away
    ['the dog in the yard is barking', 'the dogs in the yard are barking'],
    ['the dog that barks is loud', 'the dogs that bark are loud'],
    ['the kid, who was tired, went home', 'the kids, who were tired, went home'],
    ['the car he bought was old', 'the cars he bought were old'],
    ['the dog barks and runs', 'the dogs bark and run', 'the dogs bark and run'],
    ['the cat eats and then sleeps', 'the cats eat and then sleep'],
    // this and that
    ['this dog barks', 'these dogs bark'],
    ['that car is fast', 'those cars are fast'],
    ['i like this shoe', 'i like these shoes'],
    ['another dog barks', 'other dogs bark'],
    ['which book did he read', 'which books did he read'],
    // lists keep a plural verb
    ['she saw a cat and a dog', 'she saw cats and dogs'],
    ['a cat and a dog bark', 'cats and dogs bark', 'cats and dogs bark'],
    ['he sells an apple or an orange', 'he sells apples or oranges'],
    ['the boy and the girl left', 'the boys and the girls left'],
    ['the dog and cat were asleep', 'the dogs and cats were asleep', 'the dogs and cats were asleep'],
    ['a black and white cat ran', 'black and white cats ran'],
    // sentence-start
    ['A seashell washes up here', 'Seashells wash up here'],
    ['A dog is nice', 'Dogs are nice'],
    ['A big dog is here', 'Big dogs are here'],
    // these keep their own determiner
    ['the dog ran', 'the dogs ran'],
    ['my old dog is tired', 'my old dogs are tired'],
    ['i saw two dog', 'i saw two dogs'],
    ['no dog allowed', 'no dogs allowed'],
    // possessives are left alone
    [`the dog's bowl is empty`, `the dog's bowls are empty`],
    [`the men's room`, `the men's rooms`],
    [`it is in dogs' bowl`, `it is in dogs' bowls`],
    // acronyms
    ['he hired an FBI agent', 'he hired FBI agents'],
    ['she met a NASA official', 'she met NASA officials'],
    ['she likes a USB cable', 'she likes USB cables'],
    // case
    ['I saw a MOUSE', 'I saw MICE'],
  ]
  arr.forEach(a => roundTrip(t, a, undefined, 'on'))
  t.end()
})

test('round-trip, without agreement:', function (t) {
  const arr = [
    // [singular, plural, start] - begin from the grammatical one
    ['she sells seashell', 'she sells seashells', 'she sells seashells'],
    ['she ate orange', 'she ate oranges', 'she ate oranges'],
    ['he has old car', 'he has old cars', 'he has old cars'],
    ['he has an old car', 'he has an old cars', 'he has an old car'],
    ['a captain is here', 'a captains is here', 'a captain is here'],
    ['captain are here', 'captains are here', 'captains are here'],
    ['an apple was not ripe', 'an apples was not ripe', 'an apple was not ripe'],
    ['the dog were here', 'the dogs were here', 'the dogs were here'],
    ['my old dog are tired', 'my old dogs are tired', 'my old dogs are tired'],
    [`the dog's bowl are empty`, `the dog's bowls are empty`, `the dog's bowls are empty`],
    ['he hired an FBI agent', 'he hired an FBI agents', 'he hired an FBI agent'],
    ['I saw MOUSE', 'I saw MICE', 'I saw MICE'],
    ['the dog bark loudly', 'the dogs bark loudly', 'the dogs bark loudly'],
    ['the dog barks loudly', 'the dogs barks loudly', 'the dog barks loudly'],
    ['dog have eaten', 'dogs have eaten', 'dogs have eaten'],
  ]
  arr.forEach(a => roundTrip(t, a, { agree: false }, 'off'))
  t.end()
})

test('round-trip, nothing to inflect:', function (t) {
  const arr = [
    // no plural form
    'he saw sheep',
    'we saw aircraft',
    'he likes news',
    'he studies mathematics',
    'the species survive',
    // names and acronyms
    'she works for NASA',
    'he bought CDs',
    'he owns SUVs',
    // possessives
    `this is spencer's`,
    `she called the boys' parents`,
  ]
  arr.forEach(str => {
    roundTrip(t, [str, str, str], undefined, 'on')
    roundTrip(t, [str, str, str], { agree: false }, 'off')
  })
  t.end()
})

test('agreement - small cases:', function (t) {
  const arr = [
    // a predicate stays plural, like its subject
    ['they are doctors', 'they are doctors'],
    ['we are friends', 'we are friends'],
    ['the boys are students', 'the boy is a student'],
    // past a few words
    ['the keys on the table are old', 'the key on the table is old'],
    ['the books on the shelves are dusty', 'the book on the shelf is dusty'],
    // a or an
    ['he sent x-rays', 'he sent an x-ray'],
    ['she paints unusually tall buildings', 'she paints an unusually tall building'],
    ['they wore uniforms', 'they wore a uniform'],
    // shouting
    ['I LOVE DOGS', 'I LOVE A DOG'],
    // slashes are left alone
    ['she likes cats/dogs', 'she likes cats/dogs'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.nouns().toSingular()
    t.equal(doc.text(), a[1], here + '[small] ' + a[0])
  })
  t.end()
})
