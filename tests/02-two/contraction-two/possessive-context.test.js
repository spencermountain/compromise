import test from 'tape'
import nlp from '../lib.js'
const here = '[two/contraction-two/possessive-context] '

// what one 's word was read as: '#Possessive', 'is', or 'has'
const readAs = (str, word) => {
  const terms = nlp(str).docs.flat()
  const i = terms.findIndex(t => t.text.toLowerCase() === word)
  if (i === -1) {
    return 'missing'
  }
  if (terms[i].implicit) {
    return terms[i + 1].implicit
  }
  if (terms[i].tags.has('Possessive')) {
    return '#Possessive'
  }
  return 'neither'
}

// [sentence, word, reading]
const possessives = [
  // before 'and', 'or', or a comma
  ["Kathy's and Mary's friend left", "kathy's"],
  ["John's or Mary's car is here", "john's"],
  ["we read Jackson's and Miller's argument", "jackson's"],
  ["men's and women's issues matter", "men's"],
  ["it was Kathy's, not mine", "kathy's"],
  ["we ate at Moe's, then left", "moe's"],
  // before another possessive noun
  ["Hamlet's mother's words were kind", "hamlet's"],
  ["Noah's son's boat sank", "noah's"],
  // before a capitalized noun
  ["today's Russian state is large", "today's"],
  ["the king's Court at Falkenstein met", "king's"],
  ["this school's Urbana campus is big", "school's"],
  // before a few describing words, then a noun
  ["the world's largest known invertebrate", "world's"],
  ["Manchester's massive new bar opened", "manchester's"],
  ["Wollstonecraft's most popular book sold well", "wollstonecraft's"],
  ["China's more muscular foreign policy worked", "china's"],
  // after a preposition
  ["he is one of Mozart's last", "mozart's"],
  ["details of Enron's questionable financial dealings emerged", "enron's"],
  ["we went to Moe's for lunch", "moe's"],
  ["a deal with Enron's growing financial crisis", "enron's"],
  ["a reform of America's training programs", "america's"],
  ["blamed for Venezuela's emaciated tax system", "venezuela's"],
  ["part of the region's aforementioned creative industry", "region's"],
  ["her attack on Burke's gendered language", "burke's"],
  ["a master's of science degree", "master's"],
  // before 'only', or a capitalized title
  ["he is Germany's only professor", "germany's"],
  ["she was her mother's only child", "mother's"],
  ["we read Jules Verne's The Mysterious Island", "verne's"],
].map(a => [...a, '#Possessive'])

const contractions = [
  ["Kathy's happy and Mary's sad", "kathy's", 'is'],
  ["Kathy's happy and Mary's sad", "mary's", 'is'],
  ["the captain's John", "captain's", 'is'],
  ["the chair's his", "chair's", 'is'],
  ["the city's ours until the fall", "city's", 'is'],
  ["John's her brother", "john's", 'is'],
  ["Everybody's waiting up to hear", "everybody's", 'is'],
  ["the car's waiting downstairs", "car's", 'is'],
  ["my shadow's dancing", "shadow's", 'is'],
  ["Racism's still alive", "racism's", 'is'],
  ["Love's a deck of cards", "love's", 'is'],
  ["my grandma's in the NBA", "grandma's", 'is'],
  ["I think John's eating dinner", "john's", 'is'],
  ["since Bob's here we can start", "bob's", 'is'],
  ["Amarillo's where I'll be", "amarillo's", 'is'],
  ["the food's really good", "food's", 'is'],
  ["John's happiest at home", "john's", 'is'],
  ["John's most likely late", "john's", 'is'],
  ["John's only joking", "john's", 'is'],
  ["my wife's a terrible cook", "wife's", 'is'],
  ["John's an owner of the bar", "john's", 'is'],
  ["Kathy's already home", "kathy's", 'is'],
  ["John's not good company", "john's", 'is'],
  ["the water's gone", "water's", 'has'],
  ["after John's gone we left", "john's", 'has'],
]

test('possessive or contraction, by context', function (t) {
  ;[...possessives, ...contractions].forEach(([str, word, want]) => {
    t.equal(readAs(str, word), want, here + `${str} - ${word}`)
  })
  t.end()
})
