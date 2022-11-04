//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
let beforeReg = null
let afterReg = null

//we have slightly different rules for start/end - like #hashtags.
const endings = /[\p{Punctuation}\s~]+$/u
const startings = /^[\p{Punctuation}\s~]+/u
const hasApostrophe = /['’]/
const hasAcronym = /^[a-z]\.([a-z]\.)+/i
const shortYear = /^'[0-9]{2}/
const isNumber = /^-[0-9]/

const normalizePunctuation = function (str, model) {
  let original = str
  let pre = ''
  let post = ''

  // create these regexes in a lazy way
  if (beforeReg === null) {
    let { prePunctuation, postPunctuation } = model.one
    beforeReg = new RegExp(`[${prePunctuation.join('')}]+$`, '')
    afterReg = new RegExp(`^[${postPunctuation.join('')}]+`, '')
  }
  // adhoc cleanup for pre
  str = str.replace(startings, punct => {
    // punctuation symboles like '@' to allow at start of term
    let m = punct.match(beforeReg)
    if (m) {
      pre = punct.replace(beforeReg, '')
      return punct
    }
    // support years like '97
    if (pre === `'` && shortYear.test(str)) {
      pre = ''
      return punct
    }
    // support prefix negative signs like '-45'
    if (punct === '-' && isNumber.test(str)) {
      return punct
    }
    pre = punct //keep it
    return ''
  })
  // ad-hoc cleanup for post 
  str = str.replace(endings, found => {
    // punctuation symbols like '@' to allow at start of term
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
