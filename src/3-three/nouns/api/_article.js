import { setChunk, isPossessive, matchCase } from './_lib.js'

// choose 'a' or 'an' by the sound of the following word
const silentH = /^(hour|heir|honest|honou?r)/
// letters pronounced with a leading vowel - 'an FBI agent'
const anLetters = /^[aefhilmnorsx]/
const hardVowel = [
  /^onc?e/, // 'wu' sound of 'o'
  /^u[bcfhjkqrst][aeiou]/, // 'yu' sound of 'u'
  /^un[ai](?![mn])/, // 'unanimous', 'unicorn', but not 'unimportant'
  /^(eu|ewe)/,
]

const getArticle = function (m) {
  const str = m.text('normal')
  // a letter, said by its name - 'an x-ray'
  if (silentH.test(str) || /^[aefhilmnorsx]-/.test(str)) {
    return 'an'
  }
  // short acronyms are spelled-out, longer ones are said as a word - 'a NASA engineer'
  if (m.has('^#Acronym') && str.split(' ')[0].replace(/\W/g, '').length <= 3) {
    return anLetters.test(str) ? 'an' : 'a'
  }
  if (hardVowel.some(reg => reg.test(str))) {
    return 'a'
  }
  return /^[aeiou]/.test(str) ? 'an' : 'a'
}

// words that already do the job of an article
const hasDet = '(#Det|#Poss|#Val|#Pron|no|all|any|some|many|few|several|both|most|more|such|enough|which|whose|what)'

// describing-words may sit just outside our match - '[honest] men'
const withAdjectives = m => m.growLeft('(#Adj|#Adv)+')

// 'another dog' is 'an' and 'other', in one word
const hasOther = phrase => phrase.match('^other')

// is this a bare plural, in running text - 'she sells [seashells]'
const needsArticle = function (m, parsed) {
  if (parsed.determiner.found || m.has(hasDet) || isPossessive(m)) {
    return false
  }
  // names don't take one - 'she met Canadians'
  if (parsed.root.has('#ProperNoun$')) {
    return false
  }
  // the phrase-opener may sit just outside our match, too
  const before = withAdjectives(m).before()
  if (before.has(hasDet + '$')) {
    return false
  }
  // a lone fragment is not running text - 'seashells'
  return before.found || m.after().found
}

// 'honest men' -> 'an honest man'
const addArticle = function (m) {
  const phrase = withAdjectives(m)
  const other = hasOther(phrase)
  if (other.found) {
    other.replaceWith('another')
    return m
  }
  // in a shouted sentence, the article shouts too - 'I LOVE DOGS' -> 'I LOVE A DOG'
  const last = phrase.before().terms().last().text('trim')
  return setChunk(phrase.prepend(matchCase(last.length > 1 ? last : '', getArticle(phrase))))
}

// 'an honest man' -> 'honest men'
const removeArticle = function (m) {
  // the article may sit outside of our match
  const phrase = withAdjectives(m).growLeft('(a|an|another)')
  const article = phrase.match('^(a|an)')
  if (article.found) {
    return phrase.remove(article)
  }
  // 'another dog' -> 'other dogs'
  phrase.match('^another').replaceWith('other')
  return m
}

export { addArticle, removeArticle, needsArticle, withAdjectives }
