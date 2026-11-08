import unTag from '../../../../../1-one/tag/methods/unTag.js'
import fastTag from '../_fastTag.js'
import fillTags from '../3rd-pass/_fillTags.js'
import { titleCase } from '../_lib.js'
import { hasAny, toSet } from '../../../../_lib.js'
import { Date, WeekDay, Unit, Expr, Comp, Ger, Det, NN, Prop, RomanNumeral, Month } from '../../../tagSet/_lib.js'

const hasNumber = /[0-9]/
const notProper = [Date, Month, WeekDay, Unit, Expr]

// roman numeral by regex
const hasIVX = /[IVX]/ // does it ~look like~ a roman numeral?
// quick-version
const romanNumeral = /^[IVXLCDM]{2,}$/
// https://stackoverflow.com/a/267405/168877
const romanNumValid = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
const nope = toSet('li dc md dm ml')

// if it's a unknown titlecase word, it's a propernoun
const checkCase = function (terms, i, model) {
  const term = terms[i]
  // assume terms are already indexed
  term.index ||= [0, 0]
  const index = term.index[1]
  const str = term.text || '' //need case info
  // titlecase and not first word of sentence
  if (index !== 0 && titleCase.test(str) && !hasNumber.test(str)) {
    // skip Dates and stuff
    if (hasAny(term, ...notProper)) {
      return null
    }
    // known comparative - 'is Higher than 16'
    if (term.tags.has(Comp) && terms[i + 1]?.normal === 'than') {
      return null
    }
    // A heading can start a new clause: 'Tutorial: Creating a cake'.
    if (i === 0 && term.tags.has(Ger) && terms[i + 1]?.tags.has(Det)) {
      return null
    }
    // first word in a quotation?
    if (/["']$/.test(term.pre)) {
      return null
    }
    if (term.normal === 'the') {
      return null
    }
    fillTags(terms, i, model)
    if (!term.tags.has(NN) && !term.frozen) {
      unTag([term], '*', model.one.tagSet, '2-titlecase')
    }
    fastTag(term, Prop, '2-titlecase')
    return true
  }
  //roman numberals - XVII
  if (str.length >= 2 && romanNumeral.test(str) && hasIVX.test(str) && romanNumValid.test(str) && !nope.has(term.normal)) {
    fastTag(term, RomanNumeral, '2-xvii')
    return true
  }

  return null
}
export default checkCase
