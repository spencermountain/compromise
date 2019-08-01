const normalize = require('./clean')
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
  let preText = ''
  let postText = ''
  str = str.replace(startings, found => {
    preText = found
    return ''
  })
  str = str.replace(endings, found => {
    postText = found
    return ''
  })
  //we went too far..
  if (str === '') {
    str = preText.replace(/[.?!]/, '') //.trim(); //huh?
    preText = ''
  }
  return {
    text: str,
    normal: normalize(str),
    preText: preText,
    postText: postText,
  }
}
module.exports = parseTerm
