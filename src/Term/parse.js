const clean = require('./clean')
// basically, tokenize for terms.

//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
//we have slightly different rules for start/end - like #hashtags.
let startings = /^[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*\•^†‡°”¡¿※№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+/
let endings = /[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~|‖¦©℗®℠™¤₳฿]+$/
//money = ₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥

/** turn given text into a parsed-up object
 * seperate the 'meat' of the word from the whitespace+punctuation
 */
const parseTerm = str => {
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
    str = pre.replace(/[.?!]/, '') //.trim(); //huh?
    pre = ''
  }
  return {
    text: str,
    clean: clean(str),
    pre: pre,
    post: post,
  }
}
module.exports = parseTerm
