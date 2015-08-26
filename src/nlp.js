'use strict'
let Sentence = require("./sentence.js")
let fns = require("./fns.js")
let sentence_parser = require("./tokenize/sentence.js")

class Nlp {
  constructor(str) {
    this.str = str || "";
    this.sentences = sentence_parser(str).map(function(s) {
      return new Sentence(s)
    })
  }

  //map over sentence methods
  text() {
    let arr = this.sentences.map(function(s) {
      return s.text()
    })
    return fns.flatten(arr).join(" ")
  }
  terms() {
    let arr = this.sentences.map(function(s) {
      return s.terms
    })
    return fns.flatten(arr)
  }
  normalised() {
    let arr = this.sentences.map(function(s) {
      return s.normalized()
    })
    return fns.flatten(arr).join(" ")
  }

}

var n = new Nlp("Hii Dr. Nick! Hiii!")
console.log(n.text())
