'use strict'
let Text = require("./text/text.js")

//by abstracting Text, we allow multiple Text objects by the same user
let nlp = function(str) {
  return new Text(str)
}

module.exports = nlp

console.log(nlp("Hiii Dr. Nick! hi there man"))
