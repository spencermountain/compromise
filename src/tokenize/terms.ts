//split a string into 'words' - as intended to be most helpful for this library.

import sentence_parser = require("./sentences");
import multiples = require("../data/en/lexicon/multiples");

//these expressions ought to be one token, not two, because they are a distinct POS together
let multi_words = Object.keys(multiples).map(function (m) {
  return m.split(' ')
})

let normalise = function (str) {
  if (!str) {
    return ""
  }
  str = str.toLowerCase();
  str = str.replace(/[,\.!:;\?\(\)]/, "");
  str = str.replace(/’/g, "'");
  str = str.replace(/"/g, "");
  // single curly quotes
  str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, "'");
  // double curly quotes
  str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
  if (!str.match(/[a-z0-9]/i)) {
    return "";
  }
  return str;
}

// https://en.wikipedia.org/wiki/Sentence_(linguistics)#By_purpose
let sentence_type = function (sentence) {
  if (sentence.match(/\?$/)) {
    return "interrogative";
  } else if (sentence.match(/\!$/)) {
    return "exclamative";
  } else {
    return "declarative";
  }
}

//some multi-word tokens should be combined here
let combine_multiples = function (arr) {
  let better = []
  let normalised = arr.map(function (a) {
      return normalise(a);
    }) //cached results
  for (let i = 0; i < arr.length; i++) {
    for (let o = 0; o < multi_words.length; o++) {
      if (arr[i + 1] && normalised[i] === multi_words[o][0] && normalised[i + 1] === multi_words[o][1]) { //
        //we have a match
        arr[i] = arr[i] + " " + arr[i + 1]
        arr[i + 1] = null
        break
      }
    }
    better.push(arr[i])
  }
  return better.filter(function (w) {
    return w;
  })
}

let tokenize = function (str) {
  let sentences = sentence_parser(str)
  return sentences.map(function (sentence) {
    let arr = sentence.split(" ");
    arr = combine_multiples(arr);
    let tokens = arr.map(function (w, i) {
      return {
        text: w,
        normalised: normalise(w),
        title_case: (w.match(/^[A-Z][a-z]/) !== null), //use for merge-tokens
        noun_capital: i > 0 && (w.match(/^[A-Z][a-z]/) !== null), //use for noun signal
        punctuated: (w.match(/[,;:\(\)"]/) !== null) || undefined,
        end: (i === (arr.length - 1)) || undefined,
        start: (i === 0) || undefined
      }
    })
    return {
      sentence: sentence,
      tokens: combine_multiples(arr),
      type: sentence_type(sentence)
    }
  })
}

export = tokenize;
