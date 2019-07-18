const normalize = require('./normalize')

//all punctuation marks, from https://en.wikipedia.org/wiki/Punctuation
let endings = /[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~_|‖¦©℗®℠™¤₳฿]+$/
let startings = /^[ \.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”'";\/⁄·\&*@\•^†‡°”¡¿※№÷×ºª%‰+−=‱¶′″‴§~_|‖¦©℗®℠™¤₳฿]+/
// let punctuation = '[ \.’\'\[\(\)\{\}⟨⟩:,،、‒–—―…!.‹›«»‐-\?]';
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
