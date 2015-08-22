import Verb = require("../verb/verb");
import Term = require("../term/term");
import sentence_parser = require("../tokenize/sentences");
// import term_parser = require("../tokenize/terms");

class Sentence {
  text: string;
  terms: Term[];
  constructor(text: string) {
    this.text = text;
    this.terms = sentence_parser(text).map(function(t) {
      return new Term(t)
    })
  }
  tag() {
    this.terms = this.terms.map(function(t) {
      return new Verb(t.text)
    })
  }
  syllables(): string[] {
    return this.terms.reduce(function(arr, t) {
      arr = arr.concat(t.syllables())
      return arr
    }, [])
  }
}

export = Sentence
