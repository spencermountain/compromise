'use strict'
let Text = require("./text/text.js")

let nlp = function(str) {
  return new Text(str)
}

module.exports = nlp

console.log(nlp("Hiii Dr. Nick!"))
