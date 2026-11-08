import { toHash } from './_lib.js'
// https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5Cp%7Bpunctuation%7D

// zero-width chars
const zeroWidth = '\u200B\u200C\u200D\uFEFF'

// punctuation to keep at start of word - #hastag, @atmention, underscore
// (not +4, -4, .4)
const prePunctuation = toHash(('#@_°' + zeroWidth).split(''))

// punctuation to keep at end of word - 88%, underscore, degrees/italian ordinal
const postPunctuation = toHash(('%_°' + zeroWidth).split(''))

const emoticons = toHash('<3 </3 <\\3 :^P :^p :^O :^3'.split(' '))

export { prePunctuation, postPunctuation, emoticons }
