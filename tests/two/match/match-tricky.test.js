import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/match-tricky] '

test('fancy match', function (t) {
  let arr = [
    //misc
    ['doug is good', '', 0],
    ['doug is good', '.', 3],
    ['doug is good', '.?', 3],
    ['doug is good', '.+', 3],

    //contractions
    ["he's nice", 'he is', 2],
    ["he's nice", 'is nice', 2],
    ["he's nice", "he's", 2],
    ["he's nice", "he's nice", 3],
    ["he's nice", 'nice', 1],

    //over/under
    ['he is nice', 'is nice and good', 0],
    ['is nice', 'he is nice', 0],

    //dot
    ['doug is good', 'doug is good', 3],
    ['doug is good', 'doug . good', 3],
    ['doug is good', 'doug is .', 3],
    ['doug is good', '. is .', 3],
    ['doug is good', '. . .', 3],
    ['doug is good', '. . . .', 0],

    //optional miss
    ['doug is good', 'doug is really? good', 3],
    ['doug is good', 'doug is good? good', 3],
    ['doug is good', 'doug is .? good', 3], //tricky 'anything optional' bug
    ['doug is good', 'doug is #Adverb? good', 3],
    //optional has
    ['doug is really good', 'doug is really? good', 4],
    ['doug is really good', 'doug is .? good', 4],
    ['doug is really good', 'doug is #Adverb? good', 4],
    //asterix empty
    ['doug is good', 'doug *', 3],
    ['doug is good', 'doug is *', 3],
    ['doug is good', '*', 3],
    //asterix positive
    ['doug is good', 'doug * good', 3],
    ['doug is really good', 'doug * good', 4],
    ['doug is really so very good', 'doug * good', 6],
    ['doug is really so very good at stuff', 'doug * good', 6],
    ['we think doug is really so very good at stuff', 'doug * good', 6],
    //asterix negative
    ['doug is good', 'doug * bad', 0],
    ['doug is good', 'spencer * bad', 0],
    ['doug is good', 'spencer *', 0],
    ['doug is good', 'doug * is', 2], //another tricky 'greedy optional' bug
    ['cool, fun, great, nice', '#Adjective+ great', 3],

    //
    ['Dr. Spencer Smith says hi', 'dr', 1],
    ['Dr. Spencer Smith says hi', 'dr spencer', 2],
    ['Dr. Spencer Smith says hi', 'dr spencer smith', 3],
    ['Dr. Spencer Smith says hi', 'dr spencer smith says', 4],
    ['Lately, Dr. Spencer Smith says hi', 'lately dr spencer smith', 4],
    //start ^
    ['in toronto', '^toronto', 0],
    ['toronto', '^toronto', 1],
    ['in toronto', '^in toronto', 2],
    ['in toronto', 'in ^toronto', 0],
    //end $
    ['it snows', 'it snows', 2],
    ['it snows', 'snows$', 1],
    ['it snows', 'it snows$', 2],
    ['it snows', 'it$ snows', 0],
    ['it snows', 'foo$', 0],
    //negative !
    ['it really snows', 'it #Adverb snows', 3],
    ['it really snows', 'it !#Adverb snows', 0],
    ['it really snows. it quickly goes.', 'it !#Adverb', 0],
    ['it is nice.', '!#Adverb', 3],
    //max/min {}
    ['if it goes really well', 'if .{1,2} well', 0],
    ['if it goes really well', 'if .{1,6} well', 5],
    ['so i said that spencer is nice', '^.{1,3} spencer', 0],
    ['so i said that spencer is nice', '^.{1,6} spencer', 5],
    ['one two three four five', 'one two{1,2}', 2],
    ['one two three four five', 'one two{1,3}', 2],
    ['one two three four five', 'one two{0,3}', 2],
    ['one two three four five', 'one .{0,3} two', 2],
    ['one two three four five', 'one .{0,3} three', 3],
    ['one two three four five', 'one .{1,3} two', 0],
    ['one two three four five six seven', 'one .{0,4} six seven', 7],
    // unmet min
    [`bar walked`, `foo{2} walked`, 0],
    [`foo walked`, `foo{2} walked`, 0],
    [`we've walked`, `foo{2} walked`, 0],
    // no min (optional)
    [`foo walked`, `bar{0,2} walked`, 1],
    [`foo walked`, `bar{,2} walked`, 1],
    //optional/consecutive
    ['is really walking', 'is #Adverb+? walking', 3],
    ['is walking', 'is #Adverb+? walking', 2],
    ['is really really walking', 'is #Adverb+? walking', 4],
    ['is really not walking', 'is (#Adverb|not)+? walking', 4],
    ['is really not quickly walking', 'is (#Adverb|not)+? walking', 5],
    ['is walking', 'is (#Adverb|not)+? walking', 2],
    ['Phoenix AZ', '#City #Region', 2],
    //this isn't working
    ['the canadian senate', 'the (united states|canadian) senate', 3],
    ['the canadian senate', '(canadian|united states|british)', 1],
  ]
  arr.forEach(function (a) {
    const r = nlp(a[0]).match(a[1]).terms() || []
    const msg = "'" + a[0] + "' - - - '" + a[1] + "' - - got:" + r.length + '  want:' + a[2]
    t.equal(r.length, a[2], here + msg)
  })
  t.end()
})

test('consecutive greedy cases', function (t) {
  let doc = nlp('one two')
  let m = doc.match('#Value #Value')
  t.equal(m.length, 1, here + 'consecutive-found one')
  t.equal(m.eq(0).text(), 'one two', here + 'consecutive-found both')

  m = doc.match('#Value+ #Value')
  t.equal(m.length, 1, here + 'plus-found one')
  t.equal(m.eq(0).text(), 'one two', here + 'plus-found both')

  m = doc.match('#Value* #Value')
  t.equal(m.length, 1, here + 'astrix-found one')
  t.equal(m.eq(0).text(), 'one two', here + 'astrix-found both')

  m = doc.match('#Value? #Value')
  t.equal(m.length, 1, here + 'optional-found one')
  t.equal(m.eq(0).text(), 'one two', here + 'optional-found both')

  m = nlp.tokenize('one one').match('one? one')
  t.equal(m.length, 1, here + 'optional-double')
  m = nlp.tokenize('one one two').match('one? one two')
  t.equal(m.text(), 'one one two', here + 'found all three terms')

  t.end()
})

test('tricky-case', function (t) {
  t.equal(nlp('Number II').has('Number II'), true, here + 'uppercase-match')
  t.equal(nlp('Number I').has('Number I'), true, here + 'uppercase-match')
  t.end()
})

// end-OR match bug
test('multi-word end OR', function (t) {
  let doc = nlp(`foo at the end.`)
  let m = doc.match('foo (bar|at the end)$')
  t.equal(m.text(), 'foo at the end.', here + 'end-or')

  doc = nlp(`not at the end word.`)
  m = doc.match('foo (bar|at the end)$')
  t.equal(m.text(), '', here + 'not-end-or')

  t.end()
})

test('post-process', function (t) {
  let doc = nlp(`jack is guarded end`)
  let m = doc.match('is guarded foo?$')
  t.equal(m.found, false, here + 'no end')

  doc = nlp(`start jack is guarded end`)
  m = doc.match('^start? jack')
  t.equal(m.text(), 'start jack', here + 'optional-start')
  t.end()
})

// test('doc-as-input', function (t) {
//   const doc = nlp('he is from Phoenix AZ')
//   const m = doc.match('#City')
//   const matchWith = doc.match(m).out('normal')
//   const without = doc.not(m).out('text')
//   t.equal(matchWith, 'phoenix', 'text-as-match')
//   t.equal(without, 'he is from AZ', 'text-as-not')
//   t.end()
// })

// test('multi-doc-as-input', function (t) {
//   const doc = nlp('before three farms after. foo bar farms baz')
//   let a = doc.match('.')
//   let b = doc.match(a)
//   t.equal(a.length, b.length, 'match single terms')

//   a = doc.match('. .')
//   b = doc.match(a)
//   t.equal(a.length, b.length, 'match double terms')

//   a = doc.match('. . .')
//   b = doc.match(a)
//   t.equal(a.length, b.length, 'match triple terms')

//   a = doc.match('farms')
//   b = doc.match(a)
//   t.equal(a.length, b.length, 'match terms two-places')

//   a = doc.terms().not('farms')
//   b = doc.match(a)
//   t.equal(a.length, b.length, 'match skip terms')
//   t.end()
// })

test('anchor-with-greedy', function (t) {
  const doc = nlp.tokenize('a a b b')
  let m = doc.match('^a a b b$')
  t.equal(m.found, true, here + 'simple anchors not found')

  m = doc.match('^a+ b b$')
  t.equal(m.found, true, here + 'start-anchor greedy not found')

  m = doc.match('^a a b+$')
  t.equal(m.found, true, here + 'end-anchor greedy not found')

  t.end()
})
