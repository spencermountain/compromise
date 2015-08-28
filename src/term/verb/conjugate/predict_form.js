"use strict";
//this method is used to predict which current conjugation a verb is

//this method is the slowest in the whole library, basically TODO:whaaa
let suffix_rules = require("./suffix_rules");
let fns = require("../../../fns.js");

//todo: support will/have/haven't etc
let predict = function(w) {
  let arr = Object.keys(suffix_rules);
  for (let i = 0; i < arr.length; i++) {
    if (fns.endsWith(w, arr[i])) {
      return suffix_rules[arr[i]];
    }
  }
  return "infinitive";
};

module.exports = predict;
