require("dirtyjs")
data = require("./pen_treebank").data
pos = require("../pos").pos
parts_of_speech = require("../pos").parts_of_speech

var percentages = []
var bad_reasons = []
var hard_words = []
var bad_tokenization = 0
var bad_tokens = []

//2909 in total
//1500 tokenization differences

var compare = function(mine, theirs) {
  if (mine.length == 0 || mine.length != theirs.length) {
    // console.log("tokenization difference")
    console.log(JSON.stringify(mine.map('word')))
    console.log(JSON.stringify(theirs.map('word')))
    console.log("   ")
    bad_tokenization++
    return
  }
  for (var i = 0; i < mine.length; i++) {
    if (theirs[i].word != mine[i].word) {
      bad_tokens.push(theirs[i].word)
      bad_tokenization++
      return
    }
  }
  var errors = 0
  for (var i = 0; i < mine.length; i++) {
    if (mine[i].parent != theirs[i].parent) {
      errors += 1
      bad_reasons.push(mine[i].reason + '_' + theirs[i].parent)
      hard_words.push(mine[i].word)
      // console.log(mine[i].word + "    --  mine:" + mine[i].pos + ",  theirs:" + theirs[i].pos)
    } else {
      // console.log(theirs[i])
    }
  }
  var percent = parseInt(((mine.length - errors) / mine.length) * 100)
  percentages.push(percent)
  // console.log("==== " + (mine.length - errors) + " correct, " + errors + " wrong   " + percent + "% correct ===")
}


//
//run it
//
for (var i in data) {
  var mine = pos(data[i].text)
  var theirs = data[i].pos

  //turn it into the parent pos
  theirs = theirs.map(function(o) {
    o.parent = (parts_of_speech[o.pos] || {}).parent || "glue"
    o.word = o.word.toLowerCase()
    o.word = o.word.replace(/[\.,:;]/, '')
    return o
  })

  //make ours into the same format as theirs
  mine = mine.reduce(function(a, s) {
    var tokens = s.tokens.map(function(t) {
      return {
        word: t.normalised,
        pos: t.pos.tag,
        parent: (parts_of_speech[t.pos.tag] || {}).parent || "",
        reason: t.pos_reason
      }
    })
    a = a.concat(tokens)
    return a
  }, [])


  compare(mine, theirs)

}


// console.log(bad_reasons.topk())
// console.log(hard_words.topk().slice(0, 100))
console.log("     ")
console.log("     ")
console.log("     ")
console.log(percentages.average())

// console.log((bad_tokenization / data.length) * 100 + " bad tokenization")
// console.log(bad_tokens.topk())

//nothing = 0%
//choosing all nouns= 33%
//using only a lexicon=45%
//using only wordnet suffixes=7%
//using only regexes=6%
//using only caplitalisation=8%

//using a lexicon, and falling back to nouns=70%
//using a lexicon, wordnet, noun fallback=71%
//using a lexicon, regexes, noun fallback=72%
//using a lexicon, wordnet, regexes, noun fallback=74%



//april 9th, wordnet suffixes -  74%
//april 9th, filling lexicon holes (cheekily) -  78%
//april 9th, fixing pen's punctuation thing -  80%



// [ { value: 'noun fallback_glue', count: 2285 },
//   { value: 'noun fallback_verb', count: 2046 },
//   // { value: 'wordnet suffix_verb', count: 1463 },
//   { value: 'noun fallback_adjective', count: 802 },
//   // { value: 'lexicon_adjective', count: 518 },
//   { value: 'lexicon_noun', count: 516 },
//   { value: 'regex suffix_noun', count: 459 },
//   { value: 'wordnet suffix_noun', count: 383 },
//   { value: 'regex suffix_verb', count: 374 },
//   { value: 'lexicon_glue', count: 297 },
//   { value: 'wordnet suffix_adjective', count: 132 },
//   { value: 'lexicon_verb', count: 123 },
//   { value: 'capitalised_adjective', count: 95 },
//   { value: 'regex suffix_glue', count: 82 },
//   { value: 'wordnet suffix_glue', count: 25 },
//   { value: 'capitalised_glue', count: 23 },
//   { value: 'capitalised_verb', count: 6 },
//   { value: 'regex suffix_adjective', count: 2 } ]



// [ { value: '\'s', count: 438 },
//   { value: '``', count: 378 },
//   { value: '\'\'', count: 328 },
//   { value: '$', count: 267 },
//   { value: 'trading', count: 78 },
//   { value: 'new', count: 67 },
//   { value: 'such', count: 49 },
//   { value: 'more', count: 46 },
//   { value: 'japanese', count: 42 },
//   { value: 'only', count: 41 },
//   { value: 'over', count: 39 },
//   { value: 'out', count: 38 },
//   { value: 'even', count: 36 },
//   { value: 'may', count: 35 },
//   { value: '\'', count: 34 },
//   { value: 'so', count: 33 },
//   { value: 'first', count: 33 },
//   { value: ')', count: 31 },
//   { value: 'like', count: 28 },
//   { value: 'most', count: 27 },
//   { value: 'made', count: 27 },
//   { value: '(', count: 27 },
//   { value: 'rose', count: 26 },
//   { value: 'own', count: 26 },
//   { value: 'less', count: 25 },
//   { value: 'expected', count: 25 },
//   { value: 'well', count: 25 },
//   { value: 'much', count: 22 },
//   { value: 'financial', count: 22 },
//   { value: 'just', count: 22 },
//   { value: 'early', count: 20 },
//   { value: 'as', count: 20 },
//   { value: 'about', count: 20 },
//   { value: '&', count: 20 },
//   { value: 'far', count: 20 },
//   { value: 'still', count: 20 },
//   { value: 'off', count: 19 },
//   { value: 'few', count: 19 },
//   { value: 'executive', count: 19 },
//   { value: 'spending', count: 19 },
//   { value: 'capital', count: 18 },
//   { value: 'trying', count: 17 },
//   { value: '\'re', count: 16 },
//   { value: 'reported', count: 16 },
//   { value: 'back', count: 16 },
//   { value: 'test', count: 16 },
//   { value: 'however', count: 16 },
//   { value: 'american', count: 16 },
//   { value: 'concern', count: 16 },
//   { value: 'below', count: 16 },
//   { value: 'declined', count: 16 },
//   { value: 'offer', count: 16 },
//   { value: 'used', count: 15 },
//   { value: 'big', count: 15 },
//   { value: 'firm', count: 15 },
//   { value: 'according', count: 15 },
//   { value: 'demand', count: 15 },
//   { value: 'your', count: 15 },
//   { value: 'sold', count: 15 },
//   { value: 'our', count: 14 },
//   { value: 'up', count: 14 },
//   { value: 'yield', count: 14 },
//   { value: 'certain', count: 14 },
//   { value: 'offered', count: 14 },
//   { value: 'level', count: 14 },
//   { value: 'going', count: 14 },
//   { value: 'ago', count: 14 },
//   { value: 'purchasing', count: 14 },
//   { value: 'priced', count: 13 },
//   { value: 'national', count: 13 },
//   { value: 'despite', count: 13 },
//   { value: 'growing', count: 13 },
//   { value: 'received', count: 13 },
//   { value: 'called', count: 13 },
//   { value: 'compared', count: 12 },
//   { value: 'noted', count: 12 },
//   { value: 'return', count: 12 },
//   { value: 'funding', count: 12 },
//   { value: 'got', count: 12 },
//   { value: 'average', count: 12 },
//   { value: 'net', count: 12 },
//   { value: '\'ve', count: 12 },
//   { value: 'banking', count: 12 },
//   { value: 'how', count: 12 },
//   { value: 'based', count: 11 },
//   { value: 'high', count: 11 },
//   { value: 'federal', count: 11 },
//   { value: 'corporate', count: 11 },
//   { value: 'continued', count: 11 },
//   { value: 'became', count: 11 },
//   { value: 'lower', count: 11 },
//   { value: 'manufacturing', count: 11 },
//   { value: 'factory', count: 11 },
//   { value: 'almost', count: 11 },
//   { value: 'plans', count: 11 },
//   { value: 'failed', count: 11 },
//   { value: 'international', count: 10 },
//   { value: 'paid', count: 10 },
//   { value: 'charge', count: 10 },
//   { value: 'rather', count: 10 } ]