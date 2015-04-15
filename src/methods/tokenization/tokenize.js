//split a string into 'words', as intended to be helpful for this library.
var tokenize = (function() {

  if (typeof module !== "undefined" && module.exports) {
    sentence_parser = require("./sentence").sentences
  }

  //these expressions ought to be one token, not two, because they are a distinct POS together
  var multiples = [
    "of course",
    "at least",
    "no longer",
    "sort of",
    "at first",
    "once again",
    "up to",
    "once more",
    "by now",
    "all but",
    "just about",
    "as yet",
    "on board",
    "a lot",
    "by far",
    "at best",
    "at large",
    "for good",
    "vice versa",
    "en route",
    "for sure",
    "upside down",
    "at most",
    "per se",
    "up front",
    "in situ",
    "in vitro",
    "at worst",
    "prima facie",
    "upwards of",
    "en masse",
    "a priori",
    "ad hoc",
    "et cetera",
    "de facto",
    "off guard",
    "spot on",
    "ipso facto",
    "ad infinitum",
    "point blank",
    "ad nauseam",
    "inside out",
    "not withstanding",
    "for keeps",
    "de jure",
    "a la",
    "sub judice",
    "post hoc",
    "ad hominem",
    "a posteriori",
    "fed up",
    "brand new",
    "old fashioned",
    "bona fide",
    "well off",
    "far off",
    "par excellence",
    "straight forward",
    "hard up",
    "sui generis",
    "en suite",
    "avant garde",
    "sans serif",
    "gung ho",
    "super duper",
    "de trop",
    "new york",
    "new england",
    "new hampshire",
    "new delhi",
    "new jersey",
    "new mexico",
    "united states",
    "united kingdom",
    "great britain",
    "zero sum"
  ].map(function(m) {
    return m.split(' ')
  })

  var normalise = function(str) {
    if (!str) {
      return ""
    }
    str = str.toLowerCase()
    str = str.replace(/[,\.!:;\?\(\)]/, '')
    str = str.replace(/’/g, "'")
    str = str.replace(/"/g, "")
    if (!str.match(/[a-z0-9]/i)) {
      return ''
    }
    return str
  }

  var sentence_type = function(sentence) {
    if (sentence.match(/\?$/)) {
      return "question"
    } else {
      return "statement"
    }
  }

  var combine_multiples = function(arr) {
    var better = []
    for (var i = 0; i < arr.length; i++) {
      for (var o = 0; o < multiples.length; o++) {
        if (arr[i + 1] && normalise(arr[i]) === multiples[o][0] && normalise(arr[i + 1]) === multiples[o][1]) { //
          //we have a match
          arr[i] = arr[i] + ' ' + arr[i + 1]
          arr[i + 1] = null
          break
        }
      }
      better.push(arr[i])
    }
    return better.filter(function(w) {
      return w
    })
  }

  var main = function(str) {
    var sentences = sentence_parser(str)
    return sentences.map(function(sentence) {
      var arr = sentence.split(' ');
      arr = combine_multiples(arr)
      var tokens = arr.map(function(w, i) {
        return {
          text: w,
          normalised: normalise(w),
          capitalised: (w.match(/^[A-Z][a-z|A-Z]/) !== null),
          special_capitalised: (w.match(/^[A-Z][a-z|A-Z]/) !== null) && i > 0,
          punctuated: (w.match(/[,;:\(\)"]/) !== null) || undefined,
          end: (i === (arr.length - 1)) || undefined,
          start: (i === 0) || undefined
        }
      })
      return {
        sentence: sentence,
        tokens: tokens,
        type: sentence_type(sentence)
      }
    })
  }

  if (typeof module !== "undefined" && module.exports) {
    exports.tokenize = main;
  }
  return main
})()

// console.log(tokenize("i live in new york"))
// console.log(tokenize("I speak optimistically of course."))
// console.log(tokenize("Joe is 9"))
