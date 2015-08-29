"use strict";
const Text = require("./text/text.js");

//by abstracting Text, we allow multiple Text objects by the same user
const nlp = function(str) {
  return new Text(str);
};

module.exports = nlp;
