'use strict'
let sentence_parser = require("./sentence_parser.js")
let Sentence = require("../sentence/sentence.js")
let fns = require("../fns.js")

//a text object is a series of sentences, along with the generic methods for transforming them
class Text {
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

// var n = new Text("Hii Dr. Nick! Hiii!")
// console.log(n.text())

module.exports = Text
