'use strict';
//a js version of the metaphone (#1) algorithm
//adapted from the work of Chris Umbel
// https://github.com/NaturalNode/natural/blob/master/lib/natural/phonetics/metaphone.js

const fns = require("./transformations.js");

const metaphone = function(s) {
  s = fns.dedup(s);
  s = fns.dropInitialLetters(s);
  s = fns.dropBafterMAtEnd(s);
  s = fns.changeCK(s);
  s = fns.cchange(s);
  s = fns.dchange(s);
  s = fns.dropG(s);
  s = fns.changeG(s);
  s = fns.dropH(s);
  s = fns.changePH(s);
  s = fns.changeQ(s);
  s = fns.changeS(s);
  s = fns.changeX(s);
  s = fns.changeT(s);
  s = fns.dropT(s);
  s = fns.changeV(s);
  s = fns.changeWH(s);
  s = fns.dropW(s);
  s = fns.dropY(s);
  s = fns.changeZ(s);
  s = fns.dropVowels(s);
  return s.trim();
};

module.exports = metaphone;
