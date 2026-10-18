//a js version of the metaphone (#1) algorithm
//adapted from the work of Chris Umbel
// https://github.com/NaturalNode/natural/blob/master/lib/natural/phonetics/metaphone.js

import m from './transformations.js'

const metaphone = function (s) {
  s = m.dedup(s)
  s = m.dropInitialLetters(s)
  s = m.dropBafterMAtEnd(s)
  s = m.changeCK(s)
  s = m.cchange(s)
  s = m.dchange(s)
  s = m.dropG(s)
  s = m.changeG(s)
  s = m.dropH(s)
  s = m.changePH(s)
  s = m.changeQ(s)
  s = m.changeS(s)
  s = m.changeX(s)
  s = m.changeT(s)
  s = m.dropT(s)
  s = m.changeV(s)
  s = m.changeWH(s)
  s = m.dropW(s)
  s = m.dropY(s)
  s = m.changeZ(s)
  s = m.dropVowels(s)
  return s.trim()
}

export default metaphone
