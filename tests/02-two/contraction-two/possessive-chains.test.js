import test from 'tape'
import nlp from '../lib.js'
const here = '[two/contraction-two/possessive-chains] '

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
  // a superlative
  ["the peak is the world's largest in terms of volume", "world's"],
  ["it was the world's tallest freestanding structure", "world's"],
  ["it is as funny as Bergman's finest", "bergman's"],
  // a preposition before a full name
  ["it is one of Keli McCarthy's best", "mccarthy's"],
  ["the treaties of the European Union's members", "union's"],
  // describing words joined together, or with a number
  ["today's financial and economic crisis grew", "today's"],
  ["Berlusconi's anachronistic and outrageous chauvinism", "berlusconi's"],
  ["the protagonist's original first name was Myron", "protagonist's"],
  ["Germany's lower borrowing costs helped", "germany's"],
  // a describing word used as the thing itself
  ["our nation's elderly would be forced out", "nation's"],
  ["America's poor climbed out of poverty", "america's"],
  ["Russia's powerful have their say", "russia's"],
  // an -ing word, then one thing
  ["SocGen's trading system failed", "socgen's"],
  ["Toronto's housing market set a record", "toronto's"],
  ["Byrne's acting ability stands out", "byrne's"],
  ["the sport's governing authority has never ruled", "sport's"],
  ["the IMF's managing director resigned", "imf's"],
  ["Enron's rating would have been cut", "enron's"],
  // an adverb, an -ed word, then one thing
  ["the liver's highly specialized tissue", "liver's"],
  ["Frank Baum's personally produced trilogy sold well", "baum's"],
  // a name
  ["I was always mama's angel", "mama's"],
  ["Jack Webb was TV's John Wayne", "tv's"],
  ["TV's Herman Munster co-starred with him", "tv's"],
  ["this country's King Michael abdicated", "country's"],
  // 'per'
  ["Australia's per capita GDP is high", "australia's"],
].map(a => [...a, '#Possessive'])

const contractions = [
  ["Mama's messy isn't she", "mama's", 'is'],
  ["the Firedrake's dead and done for", "firedrake's", 'is'],
  ["any old job's okay", "job's", 'is'],
  ["John's happiest at home", "john's", 'is'],
  ["John's busy writing letters", "john's", 'is'],
  ["the door's open come in", "door's", 'is'],
  ["In Paris, John's happy", "john's", 'is'],
  ["the problem is the car's dead", "car's", 'is'],
  // -ing words
  ["Roger's having a dinner thing", "roger's", 'is'],
  ["Richard's selling the place", "richard's", 'is'],
  ["everybody's watching", "everybody's", 'is'],
  ["the coffee's bubbling through", "coffee's", 'is'],
  ["the ceiling's getting shorter", "ceiling's", 'is'],
  ["Mary's playing tennis", "mary's", 'is'],
  ["John's watching TV", "john's", 'is'],
  ["Dad's driving trucks", "dad's", 'is'],
  ["the dog's chasing cats", "dog's", 'is'],
  ["Enron's losing money", "enron's", 'is'],
  // names
  ["the captain's John", "captain's", 'is'],
  ["my name's Dave", "name's", 'is'],
  // has
  ["John's clearly lost interest", "john's", 'has'],
  ["Mom's really made progress", "mom's", 'has'],
  ["he's kind of given up", "he's", 'has'],
  ["she's sort of given up", "she's", 'has'],
]

test('possessive before a chain of describing words', function (t) {
  ;[...possessives, ...contractions].forEach(([str, word, want]) => {
    t.equal(readAs(str, word), want, here + `${str} - ${word}`)
  })
  t.end()
})
