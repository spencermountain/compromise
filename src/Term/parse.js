const normalize = require('./normalize/clean')
const reduce = require('./normalize/reduce')
// basically, tokenize for terms.

//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
//we have slightly different rules for start/end - like #hashtags.
const startings = /^[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*\•^†‡°”¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+/
const endings = /[ \n\t\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+$/
//money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥
const hasSlash = /\//
const hasApostrophe = /['’]/

/** turn given text into a parsed-up object
 * seperate the 'meat' of the word from the whitespace+punctuation
 */
const parseTerm = str => {
  let original = str
  let pre = ''
  let post = ''
  str = str.replace(startings, found => {
    pre = found
    return ''
  })
  str = str.replace(endings, found => {
    post = found
    // keep s-apostrophe - "flanders'" or "chillin'"
    if (hasApostrophe.test(found) && /[sn]['’]$/.test(original) && hasApostrophe.test(pre) === false) {
      post = post.replace(hasApostrophe, '')
      return `'`
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
