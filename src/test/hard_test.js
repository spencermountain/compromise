require("dirtyjs")
data = require("./pen_treebank").data
pos = require("../pos")
parts_of_speech = require("../data/parts_of_speech")

var percentages = []
var bad_reasons = []
var hard_words = []
var bad_tokenization = 0
var bad_tokens = []

//2909 in total
//1500 tokenization differences
hardwords = []

var compare = function(mine, theirs) {
  if (mine.length == 0 || mine.length != theirs.length) {
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
      reason = mine[i].reason + '_' + theirs[i].parent
      bad_reasons.push(reason)
      hard_words.push(mine[i].word)
      mine[i].word += "*"
      mine[i].error = true
      // if (reason == "regex suffix_noun") {
      hardwords.push(mine[i].word)
      // console.log(mine[i].word + "  -  " + mine[i].parent + "  -> " + theirs[i].parent)
      // }
      // console.log(mine[i].word + "    --  mine:" + mine[i].pos + ",  theirs:" + theirs[i].pos)
    } else {
      // console.log(theirs[i])
    }
  }
  if (errors > 0) {
    // console.log(mine.map(function(t) {
    //   return t.word
    // }).join(' '))
    // console.log(theirs)
  }
  var percent = parseInt(((mine.length - errors) / mine.length) * 100)
  percentages.push(percent)
  // console.log("==== " + (mine.length - errors) + " correct, " + errors + " wrong   " + percent + "% correct ===")
}


//
//run it
//
for (var i in data) {
  var mine = pos(data[i].text, {
    dont_combine: true
  })
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
// console.log(hardwords.topk())
console.log("     ")
console.log("     ")
console.log("     ")
console.log(percentages.average())

console.log((bad_tokenization / data.length) * 100 + " bad tokenization")
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
//may 18th, conjugate the lexicon -  81%
//june 4rth, missing regex bug, better adjective lexicon - 84%
//july 23rd, bugfixes, demonyms - 86%