//wrapper for noun's methods
var Noun = function (str, sentence, word_i) {
  var the = this
  var token, next;
  if (sentence !== undefined && word_i !== undefined) {
    token = sentence.tokens[word_i]
    next = sentence.tokens[word_i + i]
  }
  the.word = str || '';

  var parts_of_speech = require("../../data/parts_of_speech")
  var firstnames = require("../../data/lexicon/firstnames")
  var honourifics = require("../../data/lexicon/honourifics")
  var inflect = require("./conjugate/inflect")
  var indefinite_article = require("./indefinite_article")

  //personal pronouns
  var prps = {
    "it": "PRP",
    "they": "PRP",
    "i": "PRP",
    "them": "PRP",
    "you": "PRP",
    "she": "PRP",
    "me": "PRP",
    "he": "PRP",
    "him": "PRP",
    "her": "PRP",
    "us": "PRP",
    "we": "PRP",
    "thou": "PRP"
  }
  var blacklist = {
      "itself": 1,
      "west": 1,
      "western": 1,
      "east": 1,
      "eastern": 1,
      "north": 1,
      "northern": 1,
      "south": 1,
      "southern": 1,
      "the": 1,
      "one": 1,
      "your": 1,
      "my": 1,
      "today": 1,
      "yesterday": 1,
      "tomorrow": 1,
      "era": 1,
      "century": 1,
      "it": 1
    }
    //for resolution of obama -> he -> his
  var possessives = {
    "his": "he",
    "her": "she",
    "hers": "she",
    "their": "they",
    "theirs": "they",
    "them": "they",
    "its": "it",
    "mine": "i",
    "yours": "you",
    "our": 'we',
    "ours": 'we'
  }


  the.is_acronym = function () {
    var s = the.word
      //no periods
    if (s.length <= 5 && s.match(/^[A-Z]*$/)) {
      return true
    }
    //with periods
    if (s.length >= 4 && s.match(/^([A-Z]\.)*$/)) {
      return true
    }
    return false
  }

  the.is_entity = function () {
    if (!token) {
      return false
    }
    if (token.normalised.length < 3 || !token.normalised.match(/[a-z]/i)) {
      return false
    }
    //prepositions
    if (prps[token.normalised]) {
      return false
    }
    //blacklist
    if (blacklist[token.normalised]) {
      return false
    }
    //discredit specific nouns forms
    if (token.pos) {
      if (token.pos.tag == "NNA") { //eg. 'singer'
        return false
      }
      if (token.pos.tag == "NNO") { //eg. "spencer's"
        return false
      }
      if (token.pos.tag == "NNG") { //eg. 'walking'
        return false
      }
      if (token.pos.tag == "NNP") { //yes! eg. 'Edinburough'
        return true
      }
    }
    //distinct capital is very good signal
    if (token.noun_capital) {
      return true
    }
    //multiple-word nouns are very good signal
    if (token.normalised.match(/ /)) {
      return true
    }
    //if it has an acronym/abbreviation, like 'business ltd.'
    if (token.normalised.match(/\./)) {
      return true
    }
    //appears to be a non-capital acronym, and not just caps-lock
    if (token.normalised.length < 5 && token.text.match(/^[A-Z]*$/)) {
      return true
    }
    //acronyms are a-ok
    if (the.is_acronym()) {
      return true
    }
    //else, be conservative
    return false
  }

  the.conjugate = function () {
    return inflect.inflect(the.word)
  }

  the.is_plural = function () {
    return inflect.is_plural(the.word)
  }

  the.article = function () {
    if (the.is_plural()) {
      return "the"
    } else {
      return indefinite_article(the.word)
    }
  }

  the.pluralize = function () {
    return inflect.pluralize(the.word)
  }

  the.singularize = function () {
    return inflect.singularize(the.word)
  }

  //uses common first-name list + honourifics to guess if this noun is the name of a person
  the.is_person = function () {
    var i, l;
    //remove things that are often named after people
    var blacklist = [
      "center",
      "centre",
      "memorial",
      "school",
      "bridge",
      "university",
      "house",
      "college",
      "square",
      "park",
      "foundation",
      "institute",
      "club",
      "museum",
      "arena",
      "stadium",
      "ss",
      "of",
      "the",
      "for",
      "and",
      "&",
      "co",
      "sons"
    ]
    l = blacklist.length
    for (i = 0; i < l; i++) {
      if (the.word.match(new RegExp("\\b" + blacklist[i] + "\\b", "i"))) {
        return false
      }
    }
    //see if noun has an honourific, like 'jr.'
    l = honourifics.length;
    for (i = 0; i < l; i++) {
      if (the.word.match(new RegExp("\\b" + honourifics[i] + "\\.?\\b", 'i'))) {
        return true
      }
    }
    //see if noun has a known first-name
    var names = the.word.split(' ').map(function (a) {
      return a.toLowerCase()
    })
    if (firstnames[names[0]]) {
      return true
    }
    //(test middle name too, if there's one)
    if (names.length > 2 && firstnames[names[1]]) {
      return true
    }

    //if it has an initial between two words
    if (the.word.match(/[a-z]{3,20} [a-z]\.? [a-z]{3,20}/i)) {
      return true
    }
    return false
  }

  //decides if it deserves a he, she, they, or it
  the.pronoun = function () {

    //if it's a person try to classify male/female
    if (the.is_person()) {
      var names = the.word.split(' ').map(function (a) {
        return a.toLowerCase()
      })
      if (firstnames[names[0]] === "m" || firstnames[names[1]] == "m") {
        return "he"
      }
      if (firstnames[names[0]] === "f" || firstnames[names[1]] == "f") {
        return "she"
      }
      //test some honourifics
      if (the.word.match(/^(mrs|miss|ms|misses|mme|mlle)\.? /, 'i')) {
        return "she"
      }
      if (the.word.match(/\b(mr|mister|sr|jr)\b/, 'i')) {
        return "he"
      }
      //if it's a known unisex name, don't try guess it. be safe.
      if (firstnames[names[0]] === "a" || firstnames[names[1]] == "a") {
        return "they"
      }
      //if we think it's a person, but still don't know the gender, do a little guessing
      if (names[0].match(/[aeiy]$/)) { //if it ends in a 'ee or ah', female
        return "she"
      }
      if (names[0].match(/[ou]$/)) { //if it ends in a 'oh or uh', male
        return "he"
      }
      if (names[0].match(/(nn|ll|tt)/)) { //if it has double-consonants, female
        return "she"
      }
      //fallback to 'singular-they'
      return "they"
    }

    //not a person
    if (the.is_plural()) {
      return "they"
    }

    return "it"
  }

  //list of pronouns that refer to this named noun. "[obama] is cool, [he] is nice."
  the.referenced_by = function () {
    //if it's named-noun, look forward for the pronouns pointing to it -> '... he'
    if (token && token.pos.tag !== "PRP" && token.pos.tag !== "PP") {
      var prp = the.pronoun()
        //look at rest of sentence
      var interested = sentence.tokens.slice(word_i + 1, sentence.tokens.length)
        //add next sentence too, could go further..
      if (sentence.next) {
        interested = interested.concat(sentence.next.tokens)
      }
      //find the matching pronouns, and break if another noun overwrites it
      var matches = []
      for (var i = 0; i < interested.length; i++) {
        if (interested[i].pos.tag === "PRP" && (interested[i].normalised === prp || possessives[interested[i].normalised] === prp)) {
          //this pronoun points at our noun
          matches.push(interested[i])
        } else if (interested[i].pos.tag === "PP" && possessives[interested[i].normalised] === prp) {
          //this posessive pronoun ('his/her') points at our noun
          matches.push(interested[i])
        } else if (interested[i].pos.parent === "noun" && interested[i].analysis.pronoun() === prp) {
          //this noun stops our further pursuit
          break
        }
      }
      return matches
    }
    return []
  }

  // a pronoun that points at a noun mentioned previously '[he] is nice'
  the.reference_to = function () {
    //if it's a pronoun, look backwards for the first mention '[obama]... <-.. [he]'
    if (token && (token.pos.tag === "PRP" || token.pos.tag === "PP")) {
      var prp = token.normalised

      if(possessives[prp]!==undefined){//support possessives
        prp=possessives[prp]
      }
        //look at starting of this sentence
      var interested = sentence.tokens.slice(0, word_i)
        //add previous sentence, if applicable
      if (sentence.last) {
        interested = sentence.last.tokens.concat(interested)
      }
      //reverse the terms to loop through backward..
      interested = interested.reverse()
      for (var i = 0; i < interested.length; i++) {
        //it's a match
        if (interested[i].pos.parent === "noun" && interested[i].pos.tag !== "PRP" && interested[i].analysis.pronoun() === prp ) {
          return interested[i]
        }
      }
    }
  }

  //specifically which pos it is
  the.which = (function () {
    //posessive
    if (the.word.match(/'s$/)) {
      return parts_of_speech['NNO']
    }
    //plural
    // if (the.is_plural) {
    //   return parts_of_speech['NNS']
    // }
    //generic
    return parts_of_speech['NN']
  })()

  return the;
}
module.exports = Noun;

// console.log(new Noun('farmhouse').is_entity())
// console.log(new Noun("FBI").is_acronym())
// console.log(new Noun("Tony Danza").is_person())
// console.log(new Noun("Tony Danza").pronoun()=="he")
// console.log(new Noun("Tanya Danza").pronoun()=="she")
// console.log(new Noun("mrs. Taya Danza").pronoun()=="she")
// console.log(new Noun("Gool Tanya Danza").pronoun()=="she")
// console.log(new Noun("illi G. Danza").pronoun()=="she")
// console.log(new Noun("horses").pronoun()=="they")
