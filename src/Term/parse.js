const normalize = require('./normalize/clean')
const reduce = require('./normalize/reduce')
// basically, tokenize for terms.

//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
//we have slightly different rules for start/end - like #hashtags.
const startings = /^[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’;\/⁄·&*•^†‡°¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F]+/
const endings = /[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’;\/⁄·&*@•^†‡°¡¿※#№÷×ºª‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4|\u301E]+$/

//money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥
const hasSlash = /\//
const hasApostrophe = /['’]/
const hasAcronym = /^[a-z]\.([a-z]\.)+/i
const minusNumber = /^[-+\.][0-9]/
const shortYear = /^'[0-9]{2}/

/** turn given text into a parsed-up object
 * seperate the 'meat' of the word from the whitespace+punctuation
 */
const parseTerm = str => {
  let original = str
  let pre = ''
  let post = ''
  str = str.replace(startings, found => {
    pre = found
    // support '-40'
    if ((pre === '-' || pre === '+' || pre === '.') && minusNumber.test(str)) {
      pre = ''
      return found
    }
    // support years like '97
    if (pre === `'` && shortYear.test(str)) {
      pre = ''
      return found
    }
    return ''
  })
  str = str.replace(endings, found => {
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
    post = post
  }
  // create the various forms of our text,
  let clean = normalize(str)
  const parsed = {
    text: str,
    clean: clean,
    reduced: reduce(clean),
    pre: pre,
    post: post,
  }
  // support aliases for slashes
  if (hasSlash.test(str)) {
    str.split(hasSlash).forEach(word => {
      parsed.alias = parsed.alias || {}
      parsed.alias[word.trim()] = true
    })
  }
  return parsed
}
module.exports = parseTerm
