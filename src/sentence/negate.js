"use script";
let fns = require("../fns.js");
//negate makes s sentence mean s opposite thing.
let negate = function(s) {
  //these are cheap ways to negate s meaning
  // ('none' is ambiguous because it could mean (all or some) )
  let logic_negate = {
    //some logical ones work
    "everyone": "no one",
    "everybody": "nobody",
    "someone": "no one",
    "somebody": "nobody",
    // everything:"nothing",
    "always": "never",
    //copulas
    "is": "isn't",
    "are": "aren't",
    "was": "wasn't",
    "will": "won't",
    //modals
    "didn't": "did",
    "wouldn't": "would",
    "couldn't": "could",
    "shouldn't": "should",
    "can't": "can",
    "won't": "will",
    "mustn't": "must",
    "shan't": "shall",
    "shant": "shall",

    "did": "didn't",
    "would": "wouldn't",
    "could": "couldn't",
    "should": "shouldn't",
    "can": "can't",
    "must": "mustn't"
  }
  //loop through each term..
  for (let i = 0; i < s.tokens.length; i++) {
    let tok = s.tokens[i]
    // handle ambiguous contractions
    if (tok.pos_reason === 'ambiguous_contraction') {
      tok.text = tok.normalised;
    }

    //turn 'is' into 'isn't', etc - make sure 'is' isnt followed by a 'not', too
    if (logic_negate[tok.normalised] && (!s.tokens[i + 1] || s.tokens[i + 1].normalised !== "not")) {
      tok.text = logic_negate[tok.normalised]
      tok.normalised = logic_negate[tok.normalised]
      if (tok.capitalised) {
        tok.text = fns.titlecase(tok.text)
      }
      return s
    }

    // find s first verb..
    if (tok.pos.parent === "verb") {
      // if verb is already negative, make it not negative
      if (tok.analysis.negative()) {
        if (s.tokens[i + 1] && s.tokens[i + 1].normalised === "not") {
          s.tokens.splice(i + 1, 1)
        }
        return s
      }
      //turn future-tense 'will go' into "won't go"
      if (tok.normalised.match(/^will /i)) {
        tok.text = tok.text.replace(/^will /i, "won't ")
        tok.normalised = tok.text
        if (tok.capitalised) {
          tok.text = fns.titlecase(tok.text)
        }
        return s
      }
      // - INFINITIVE-
      // 'i walk' -> "i don't walk"
      if (tok.analysis.form === "infinitive" && tok.analysis.form !== "future") {
        tok.text = "don't " + (tok.analysis.conjugate().infinitive || tok.text)
        tok.normalised = tok.text.toLowerCase()
        return s
      }
      // - GERUND-
      // if verb is gerund, 'walking' -> "not walking"
      if (tok.analysis.form === "gerund") {
        tok.text = "not " + tok.text
        tok.normalised = tok.text.toLowerCase()
        return s
      }
      // - PAST-
      // if verb is past-tense, 'he walked' -> "he did't walk"
      if (tok.analysis.tense === "past") {
        tok.text = "didn't " + (tok.analysis.conjugate().infinitive || tok.text)
        tok.normalised = tok.text.toLowerCase()
        return s
      }
      // - PRESENT-
      // if verb is present-tense, 'he walks' -> "he doesn't walk"
      if (tok.analysis.tense === "present") {
        tok.text = "doesn't " + (tok.analysis.conjugate().infinitive || tok.text)
        tok.normalised = tok.text.toLowerCase()
        return s
      }
      // - FUTURE-
      // if verb is future-tense, 'will go' -> won't go. easy-peasy
      if (tok.analysis.tense === "future") {
        if (tok.normalised === "will") {
          tok.normalised = "won't"
          tok.text = "won't"
        } else {
          tok.text = tok.text.replace(/^will /i, "won't ")
          tok.normalised = tok.normalised.replace(/^will /i, "won't ")
        }
        if (tok.capitalised) {
          tok.text = fns.titlecase(tok.text);
        }
        return s
      }

      return s
    }
  }

  return s
}

module.exports = negate
