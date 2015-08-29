"use strict";
//this method is used to predict which current conjugation a verb is

//this method is the slowest in the whole library, basically TODO:whaaa
const suffix_rules = require("./suffix_rules");
const fns = require("../../../fns.js");

//todo: support will/have/haven't etc
const predict = function(w) {
  const arr = Object.keys(suffix_rules);
  for (let i = 0; i < arr.length; i++) {
    if (fns.endsWith(w, arr[i])) {
      return suffix_rules[arr[i]];
    }
  }
  return "infinitive";
};

module.exports = predict;
