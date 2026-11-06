import test from 'tape'
import nlp from '../lib.js'
const here = '[two/match/group-consistency] '

// in these texts, each of these tokens match exactly the same terms
const plain = '#NumericValue'
const groups = {
  or: '(#NumericValue|#Cardinal)',
  and: '(#NumericValue && #Cardinal)',
  words: '(5|6|7|8|9)',
}
const texts = ['5 8 9 8 dogs', '8 8 8', '8 dogs', 'dogs 8', '5 6 7 8', 'the 5 6 8 dogs 9', '8']
const repeats = ['', '?', '+', '*', '+?', '{2}', '{1,2}', '{2,3}', '{2,}']
const before = ['', '^', 'the ']
const after = [
  '',
  ' 8',
  ' 5',
  ' dogs',
  ' 8 9',
  ' 8 dogs',
  ' 8$',
  ' dogs$',
  ' (8|9)',
  ' (8|dogs)',
  ' (#Noun|8)',
  ' (#Noun|#Cardinal)',
  ' (#Cardinal && 8)',
  ' (8 9|dogs)',
  ' !(#Noun|8)',
  ' 8?',
  ' 8? dogs',
  ' !8',
  ' !dogs',
  ' .',
  ' *',
  ' #Noun',
  ' #Cardinal',
  ' #Cardinal+',
]

const run = (text, reg) => nlp(text).match(reg).out('array')

// list every pattern where this group acts differently than the plain token
const findDifferent = function (group, repeat) {
  const different = []
  for (const text of texts) {
    for (const pre of before) {
      for (const post of after) {
        const reg = pre + group + repeat + post
        const res = JSON.stringify(run(text, reg))
        const want = JSON.stringify(run(text, pre + plain + repeat + post))
        if (res !== want) {
          different.push(`'${text}' ${reg} - got ${res} want ${want}`)
        }
      }
    }
  }
  return different
}

// a group should repeat in the same way as a single token
Object.keys(groups).forEach(name => {
  repeats.forEach(repeat => {
    test(`${name} group${repeat} acts like a plain token`, function (t) {
      t.deepEqual(findDifferent(groups[name], repeat), [], here + `${name}${repeat}`)
      t.end()
    })
  })
})

// these don't lean on the plain token being correct
test('an optional group leaves a term for the next token', function (t) {
  const txt = '5 8 9 8 dogs'
  const arr = [
    [txt, '#NumericValue? 5', ['5']],
    [txt, '(#NumericValue|#Cardinal)? 5', ['5']],
    [txt, '(#NumericValue && #Cardinal)? 5', ['5']],
    [txt, '#NumericValue+? 5', ['5']],
    [txt, '(#NumericValue|#Cardinal)+? 5', ['5']],
    [txt, '(#NumericValue && #Cardinal)+? 5', ['5']],
    ['8 dogs', '(#NumericValue|#Cardinal)? 8', ['8']],
    ['8 dogs', '(#NumericValue && #Cardinal)? 8', ['8']],
    ['8', '(#NumericValue|#Cardinal)? 8$', ['8']],
    ['8', '^(#NumericValue|#Cardinal)? 8', ['8']],
    // it can also be the first of many tokens
    ['the big dog', '(#Adverb|#Adjective)? #Adjective #Noun', ['big dog']],
    ['the big dog', '(#Adverb|#Adjective)+? #Adjective #Noun', ['big dog']],
    ['the big dog', '(#Adjective && !#Adverb)? #Adjective #Noun', ['big dog']],
    ['the big dog', 'the (#Adverb|#Adjective)? #Adjective #Noun', ['the big dog']],
    // from a multi-word group
    ['5 8 9', '(5 8|9)? 5', ['5']],
  ]
  arr.forEach(([text, reg, want]) => {
    t.deepEqual(run(text, reg), want, here + `'${text}' ${reg}`)
  })
  t.end()
})

test('an optional group still takes its own terms', function (t) {
  const arr = [
    // the next token doesn't want it
    ['8 dogs', '(#NumericValue|#Cardinal)? dogs', ['8 dogs']],
    ['8 dogs', '(#NumericValue && #Cardinal)? dogs', ['8 dogs']],
    ['really big dog', '(#Adverb|#Adjective)? #Adjective #Noun', ['really big dog']],
    ['5 8 9', '(5 8|9)? 9', ['5 8 9']],
    // the next token has its own term to take
    ['8 8', '(#NumericValue|#Cardinal)? 8', ['8 8']],
    ['8 8', '(#NumericValue && #Cardinal)? 8', ['8 8']],
    ['big big dog', '(#Adverb|#Adjective)? #Adjective #Noun', ['big big dog']],
    ['5 6 8', '(#NumericValue|#Cardinal)+? 8', ['5 6 8']],
    // it isn't there at all
    ['dogs', '(#NumericValue|#Cardinal)? dogs', ['dogs']],
    ['dogs', '(#NumericValue && #Cardinal)? dogs', ['dogs']],
    // it has no next token
    ['8 dogs', 'dogs (#NumericValue|#Cardinal)?', ['dogs']],
    ['dogs 8', 'dogs (#NumericValue|#Cardinal)?', ['dogs 8']],
    ['dogs 8', 'dogs (#NumericValue && #Cardinal)?', ['dogs 8']],
    // the next token is not there
    ['8 dogs', '(#NumericValue|#Cardinal)? cats', []],
  ]
  arr.forEach(([text, reg, want]) => {
    t.deepEqual(run(text, reg), want, here + `'${text}' ${reg}`)
  })
  t.end()
})

// the next token can be a group, and should be treated like any other token
test('looking ahead to a group', function (t) {
  const arr = [
    // a repeat stops for it
    ['5 8 9', '#NumericValue+ 8', ['5 8']],
    ['5 8 9', '#NumericValue+ (#Noun|8)', ['5 8']],
    ['5 8 9', '(#NumericValue|#Cardinal)+ (#Noun|8)', ['5 8']],
    ['5 8 9', '(#NumericValue && #Cardinal)+ (#Noun|8)', ['5 8']],
    ['5 8 9', '#NumericValue+ (#Cardinal && 8)', ['5 8']],
    ['5 8 9', '(#NumericValue|#Cardinal)+ (#Cardinal && 8)', ['5 8']],
    ['5 8 9', '(#NumericValue && #Cardinal)+ (#Cardinal && 8)', ['5 8']],
    ['5 6 8 9', '#NumericValue{2,} (#Noun|8)', ['5 6 8']],
    // an optional token leaves its term for it
    ['8 dogs', '#NumericValue? 8 dogs', ['8 dogs']],
    ['8 dogs', '#NumericValue? (#Cardinal|#Verb) dogs', ['8 dogs']],
    ['8 dogs', '(#NumericValue|#Cardinal)? (#Cardinal|#Verb) dogs', ['8 dogs']],
    ['8 dogs', '(#NumericValue && #Cardinal)? (#Cardinal|#Verb) dogs', ['8 dogs']],
    ['8 dogs', '#NumericValue? (8 && #Value) dogs', ['8 dogs']],
    ['8 dogs', '(#NumericValue|#Cardinal)? (8 && #Value) dogs', ['8 dogs']],
    ['8 dogs', '(#NumericValue && #Cardinal)? (8 && #Value) dogs', ['8 dogs']],
    ['8 dogs', '#NumericValue? (#Cardinal|#Verb)? 8', ['8']],
    ['8 dogs', '(#NumericValue|#Cardinal)? (#Cardinal|#Verb)? 8', ['8']],
    // unless the next token could use the following term, too
    ['8 dogs', '#NumericValue? . dogs', []],
    ['8 dogs', '#NumericValue? (#Cardinal|#Noun) dogs', []],
    ['8 dogs', '(#NumericValue|#Cardinal)? (#Cardinal|#Noun) dogs', []],
    ['8 dogs', '(#NumericValue && #Cardinal)? (#Cardinal|#Noun) dogs', []],
    // wildcards go up to it
    ['the big dog ran', 'the * #Noun', ['the big dog']],
    ['the big dog ran', 'the * (#Noun|#Verb)', ['the big dog']],
    ['the big dog ran', 'the * (#Noun && dog)', ['the big dog']],
    ['the big dog ran', 'the .+ #Noun', ['the big dog']],
    ['the big dog ran', 'the .+ (#Noun|#Verb)', ['the big dog']],
    ['the big dog ran', 'the .+ (#Noun && dog)', ['the big dog']],
    // and so do negative repeats
    ['the big dog ran', 'the !#Verb+ #Noun', ['the big dog']],
    ['the big dog ran', 'the !#Verb+ (#Noun|#Verb)', ['the big dog']],
    // a group of many words starts at its first word
    ['5 8 9 dogs', '#NumericValue+ 8 9', ['5 8 9']],
    ['5 8 9 dogs', '#NumericValue+ (8 9|#Noun)', ['5 8 9']],
    ['8 9', '#NumericValue? 8 9', ['8 9']],
    ['8 9', '#NumericValue? (8 9|dogs)', ['8 9']],
    // the next token is not there
    ['5 8 9', '#NumericValue+ (#Noun|#Verb)', []],
    ['the big dog', 'the * (#Verb|#Adverb)', []],
    ['8 dogs', '#NumericValue? (#Verb|#Adverb)', []],
  ]
  arr.forEach(([text, reg, want]) => {
    t.deepEqual(run(text, reg), want, here + `'${text}' ${reg}`)
  })
  t.end()
})

// 'foo*' is zero or more, like the wildcard '*'
test('a star can match nothing', function (t) {
  const arr = [
    ['the dogs bark', 'the * dogs', ['the dogs']],
    ['the dogs bark', 'the #Adjective* dogs', ['the dogs']],
    ['the big dogs bark', 'the #Adjective* dogs', ['the big dogs']],
    ['the big red dogs bark', 'the #Adjective* dogs', ['the big red dogs']],
    ['the dogs bark', 'the (#Adjective|#Adverb)* dogs', ['the dogs']],
    ['the very big dogs bark', 'the (#Adjective|#Adverb)* dogs', ['the very big dogs']],
    ['the dogs bark', 'the (#Adjective && !#Adverb)* dogs', ['the dogs']],
    ['the big red dogs bark', 'the (#Adjective && !#Adverb)* dogs', ['the big red dogs']],
    ['the dogs bark', 'the #Adjective* #Adverb* dogs', ['the dogs']],
    ['the very big dogs bark', 'the #Adverb* #Adjective* dogs', ['the very big dogs']],
    ['dogs bark', '#Adjective* dogs', ['dogs']],
    ['big dogs bark', '^#Adjective* dogs', ['big dogs']],
    ['the dogs bark', 'the #Adjective*', ['the']],
    ['the big dogs bark', 'the #Adjective*', ['the big']],
    ['the dogs bark', 'the #Adjective*$', []],
    ['the big big dogs', 'the #Adjective* big dogs', ['the big big dogs']],
    // it still needs its neighbours
    ['the dogs bark', 'the #Adjective* cats', []],
    ['the dogs bark', 'the #Adjective* dogs$', []],
    // it has nothing to match, on its own
    ['the dogs bark', '#Adjective*', []],
    // the same as '+?'
    ['the dogs bark', 'the #Adjective+? dogs', ['the dogs']],
    ['the big dogs bark', 'the #Adjective+? dogs', ['the big dogs']],
  ]
  arr.forEach(([text, reg, want]) => {
    t.deepEqual(run(text, reg), want, here + `'${text}' ${reg}`)
  })
  // captures
  t.deepEqual(nlp('the dogs').match('the [#Adjective*] dogs', 0).out('array'), [], here + 'empty capture')
  t.deepEqual(nlp('the big dogs').match('the [#Adjective*] dogs', 0).out('array'), ['big'], here + 'capture')
  t.deepEqual(nlp('the dogs').match('the #Adjective* [dogs]', 0).out('array'), ['dogs'], here + 'capture after')
  t.end()
})

// the term goes to the next token, and so should any capture
test('an optional group in a capture', function (t) {
  const arr = [
    ['[#NumericValue?] 8', []],
    ['[(#NumericValue|#Cardinal)?] 8', []],
    ['[(#NumericValue && #Cardinal)?] 8', []],
    ['#NumericValue? [8]', ['8']],
    ['(#NumericValue|#Cardinal)? [8]', ['8']],
    ['(#NumericValue && #Cardinal)? [8]', ['8']],
  ]
  arr.forEach(([reg, want]) => {
    t.deepEqual(nlp('8 dogs').match(reg, 0).out('array'), want, here + reg)
  })
  t.end()
})

// a term can only go to the next token, if that token really takes it
test('leaving a term keeps the rules of the next token', function (t) {
  const arr = [
    // the next token still needs its minimum
    ['8 dogs', '#NumericValue? #Cardinal{2}', []],
    ['8 dogs', '(#NumericValue|#Cardinal)? #Cardinal{2}', []],
    ['8 dogs', '(#NumericValue && #Cardinal)? #Cardinal{2}', []],
    // many optional tokens in a row
    ['8 dogs', '#NumericValue? #Cardinal? 8', ['8']],
    ['8 dogs', '(#NumericValue|#Cardinal)? #Cardinal? 8', ['8']],
    ['8 dogs', '(#NumericValue && #Cardinal)? #Cardinal? 8', ['8']],
  ]
  arr.forEach(([text, reg, want]) => {
    t.deepEqual(run(text, reg), want, here + `'${text}' ${reg}`)
  })
  t.end()
})
