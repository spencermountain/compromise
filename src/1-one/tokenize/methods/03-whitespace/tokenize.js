//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
import { allowBefore, allowAfter } from './punctuation.js'
let beforeReg = new RegExp(`[${allowBefore.join()}]+$`, '')

//we have slightly different rules for start/end - like #hashtags.
// const startings =
// /^[ \n\t.[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*•^†‡¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u0027\u201C\u201F\u201B\u201E\u2E42\u201A\u2035\u2036\u2037\u301D\u0060\u301F]+/
// const endings =
// /[ \n\t.'[\](){}⟨⟩:,،、‒–—―…!‹›«»‐\-?‘’;/⁄·&*@•^†‡¡¿※#№÷×ºª‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022\uFF02\u201D\u00B4\u301E]+$/
const endings = /[\p{Separator}\p{Punctuation}]+$/u
const startings = /^[\p{Separator}\p{Punctuation}]+/u
const hasApostrophe = /['’]/
const hasAcronym = /^[a-z]\.([a-z]\.)+/i
const shortYear = /^'[0-9]{2}/

const normalizePunctuation = function (str) {
  let original = str
  let pre = ''
  let post = ''
  // adhoc cleanup for pre
  str = str.replace(startings, found => {
    let m = found.match(beforeReg)
    if (m) {
      pre = found.replace(beforeReg, '')
      return m
    }
    pre = found
    // support years like '97
    if (pre === `'` && shortYear.test(str)) {
      pre = ''
      return found
    }
    return ''
  })
  // ad-hoc cleanup for post 
  str = str.replace(endings, found => {
    if (allowAfter.has(found)) {
      return found
    }
    post = found
    // keep s-apostrophe - "flanders'" or "chillin'"
    if (hasApostrophe.test(found) && /[sn]['’]$/.test(original) && hasApostrophe.test(pre) === false) {
      post = post.replace(hasApostrophe, '')
      return `'`
    }
    //keep end-period in acronym
    if (hasAcronym.test(str) === true) {
      post = post.replace(/\./, '')
      return '.'
    }
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
