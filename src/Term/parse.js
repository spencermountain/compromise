const clean = require('./clean')
// basically, tokenize for terms.

//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
//we have slightly different rules for start/end - like #hashtags.
const startings = /^[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*\•^†‡°”¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+/
const endings = /[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+$/
//money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥
const hasSlash = /\//

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
  const parsed = {
    text: str,
    clean: clean(str),
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
