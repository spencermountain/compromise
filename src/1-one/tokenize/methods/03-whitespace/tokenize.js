//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
import { allowBefore, allowAfter } from './punctuation.js'
let beforeReg = new RegExp(`[${allowBefore.join('')}]+$`, '')
let afterReg = new RegExp(`^[${allowAfter.join('')}]+`, '')

//we have slightly different rules for start/end - like #hashtags.
const endings = /[\p{Punctuation}\s]+$/u
const startings = /^[\p{Punctuation}\s]+/u
const hasApostrophe = /['’]/
const hasAcronym = /^[a-z]\.([a-z]\.)+/i
const shortYear = /^'[0-9]{2}/

const normalizePunctuation = function (str) {
  let original = str
  let pre = ''
  let post = ''
  // adhoc cleanup for pre
  str = str.replace(startings, found => {
    // punctuation symboles like '@' to allow at start of term
    let m = found.match(beforeReg)
    if (m) {
      pre = found.replace(beforeReg, '')
      return m
    }
    // support years like '97
    if (pre === `'` && shortYear.test(str)) {
      pre = ''
      return found
    }
    pre = found //keep it
    return ''
  })
  // ad-hoc cleanup for post 
  str = str.replace(endings, found => {
    // punctuation symboles like '@' to allow at start of term
    let m = found.match(afterReg)
    if (m) {
      post = found.replace(afterReg, '')
      return m
    }

    // keep s-apostrophe - "flanders'" or "chillin'"
    if (hasApostrophe.test(found) && /[sn]['’]$/.test(original) && hasApostrophe.test(pre) === false) {
      post = post.replace(hasApostrophe, '')
      return `'`
    }
    //keep end-period in acronym
    if (hasAcronym.test(str) === true) {
      post = found.replace(/^\./, '')
      return '.'
    }
    post = found//keep it
    return ''
  })
  //we went too far..
  if (str === '') {
    // do a very mild parse, and hope for the best.
    original = original.replace(/ *$/, after => {
      post = after || ''
      return ''
    })
    str = original
    pre = ''
  }
  return { str, pre, post }
}
export default normalizePunctuation
