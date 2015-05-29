//chooses an indefinite aricle 'a/an' for a word
module.exports = function (str) {
  if (!str) {
    return null
  }
  var irregulars = {
    "hour": "an",
    "heir": "an",
    "heirloom": "an",
    "honest": "an",
    "honour": "an",
    "honor": "an",
    "uber": "an" //german u
  }

  var is_acronym = function (s) {
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

  //pronounced letters of acronyms that get a 'an'
  var an_acronyms = {
    A: true,
    E: true,
    F: true,
    H: true,
    I: true,
    L: true,
    M: true,
    N: true,
    O: true,
    R: true,
    S: true,
    X: true
  }

  //'a' regexes
  var a_regexs = [
    /^onc?e/i, //'wu' sound of 'o'
    /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
    /^eul/i
  ];

  //begin business time
  ////////////////////
  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }
  //spelled-out acronyms
  if (is_acronym(str) && an_acronyms.hasOwnProperty(str.substr(0, 1))) {
    return "an"
  }
  //'a' regexes
  for (var i = 0; i < a_regexs.length; i++) {
    if (str.match(a_regexs[i])) {
      return "a"
    }
  }
  //basic vowel-startings
  if (str.match(/^[aeiou]/i)) {
    return "an"
  }
  return "a"
}

// console.log(indefinite_article("wolf") === "a")
