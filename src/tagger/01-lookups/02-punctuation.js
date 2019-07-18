const email = /^\w+@\w+\.[a-z]{2,3}$/i //not fancy
const hashTag = /^#[a-z0-9_]{2,}$/i
const atMention = /^@\w{2,}$/
const urlA = /^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/i //with http/www
const urlB = /^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/i //http://mostpopularwebsites.net/top-level-domain
const romanNum = /^[IVXCM]+$/
const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/

const oneLetters = {
  a: true,
  i: true,
  //internet-slang
  u: true,
  r: true,
  c: true,
  k: true,
}

//
const checkPunctuation = function(terms, i, world) {
  let t = terms[i]
  let str = t.text
  //check titlecase (helpful)
  if (titleCase.test(str) === true) {
    t.tag('TitleCase', 'punct-rule', world)
  }
  //check hyphenation
  if (t.postText.indexOf('-') !== -1 && terms[i + 1] && terms[i + 1].preText === '') {
    t.tag('Hyphenated', 'has-hyphen', world)
  }
  //check one-letter acronyms like 'john E rockefeller'
  if (str.length === 1 && terms[i + 1] && /[A-Z]/.test(str) && !oneLetters[str.toLowerCase()]) {
    t.tag('Acronym', 'one-letter-acronym', world)
  }
  //roman numerals (not so clever right now)
  if (t.text.length > 1 && romanNum.test(t.text) === true) {
    t.tagSafe('RomanNumeral', 'is-roman-numeral', world)
  }
  //'100+'
  if (/[0-9]\+$/.test(t.text) === true) {
    t.tag('NumericValue', 'number-plus', world)
  }

  //joe@hotmail.com
  // if (email.test(str) === true) {
  //   t.tag('Email', 'web_pass', world)
  // }
  // // #fun #cool
  // if (hashTag.test(str) === true) {
  //   t.tag('HashTag', 'web_pass', world)
  // }
  // // @johnsmith
  // if (atMention.test(str) === true) {
  //   t.tag('AtMention', 'web_pass', world)
  // }
  // // www.cool.net
  // if (urlA.test(str) === true || urlB.test(str) === true) {
  //   t.tag('Url', 'web_pass', world)
  // }
}
module.exports = checkPunctuation
