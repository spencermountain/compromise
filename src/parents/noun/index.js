//wrapper for noun's methods
var Noun = function(str, next, last, token) {
  var the = this
  the.word = str || '';
  the.next = next
  the.last = last

  if (typeof module !== "undefined" && module.exports) {
    parts_of_speech = require("../../data/parts_of_speech")
    firstnames = require("../../data/lexicon/firstnames")
    honourifics = require("../../data/lexicon/honourifics")
    inflect = require("./conjugate/inflect")
    indefinite_article = require("./indefinite_article")
  }
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
  the.is_acronym = function() {
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

  the.is_entity = function() {
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
      if(token.pos.tag=="NNP"){//yes! eg. 'Edinburough'
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

  the.conjugate = function() {
    return inflect.inflect(the.word)
  },

  the.is_plural = function() {
    return inflect.is_plural(the.word)
  }

  the.article = function() {
    return indefinite_article(the.word)
  }

  the.pluralize = function() {
    return inflect.pluralize(the.word)
  }

  the.singularize = function() {
    return inflect.singularize(the.word)
  }

  //uses common first-name list + honourifics to guess if this noun is the name of a person
  the.is_person = function() {
    var i, l;
    //remove things that are often named after people
    var blacklist=[
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
      "ss",
      "of",
      "the",
      "for"
    ]
    l= blacklist.length
    for (i = 0; i < l; i++) {
      if(the.word.match(new RegExp("\\b" + blacklist[i] + "\\b","i"))){
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
    var names=the.word.split(' ').map(function(a){
      return a.toLowerCase()
    })
    if(firstnames[names[0]]){
      return true
    }
    //(test middle name too, if there's one)
    if(names.length> 2 && firstnames[names[1]]){
      return true
    }

    //if it has an initial between two words
    if(the.word.match(/[a-z]{3,20} [a-z]\.? [a-z]{3,20}/i)){
      return true
    }
    return false
  }

  //decides if it deserves a he, she, they, or it
  the.pronoun=function(){

    //if it's a person try to classify male/female
    if(the.is_person()){
      var names=the.word.split(' ').map(function(a){
        return a.toLowerCase()
      })
      if(firstnames[names[0]]==="m" || firstnames[names[1]]=="m"){
        return "he"
      }
      if(firstnames[names[0]]==="f" || firstnames[names[1]]=="f" ){
        return "she"
      }
      //test some honourifics
      if(the.word.match(/^(mrs|miss|ms|misses|mme|mlle)\.? /,'i')){
        return "she"
      }
      if(the.word.match(/\b(mr|mister|sr|jr)\b/,'i')){
        return "he"
      }
      //if we think it's a person, but still don't know the gender, do a little guessing
      if(names[0].match(/[aeiy]$/)){//if it ends in a 'ee or ah', female
        return "she"
      }
      if(names[0].match(/[ou]$/)){//if it ends in a 'oh or uh', male
        return "he"
      }
      if(names[0].match(/(nn|ll|tt)/)){//if it has double-consonants, female
        return "she"
      }
      //fallback to 'singular-they'
      return "they"
    }

    //not a person
    if(the.is_plural()){
      return "they"
    }

    return "it"
  }

  //specifically which pos it is
  the.which = (function() {
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
if (typeof module !== "undefined" && module.exports) {
  module.exports = Noun;
}

// console.log(new Noun('farmhouse').is_entity())
// console.log(new Noun("FBI").is_acronym())
// console.log(new Noun("Tony Danza").is_person())
// console.log(new Noun("Tony Danza").pronoun()=="he")
// console.log(new Noun("Tanya Danza").pronoun()=="she")
// console.log(new Noun("mrs. Taya Danza").pronoun()=="she")
// console.log(new Noun("Gool Tanya Danza").pronoun()=="she")
// console.log(new Noun("illi G. Danza").pronoun()=="she")
