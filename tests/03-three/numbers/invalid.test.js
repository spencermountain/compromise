import test from 'tape'
import nlp from '../lib.js'
const here = '[three/numbers/invalid] '

// phrases that look like numbers, but do not parse to a usable value
// every one should produce no matches after .numbers().isValid()
const arr = [
  // repeated or descending multipliers
  'thousand thousand',
  'hundred hundred',
  'million thousand',
  'billion million',
  'trillion billion thousand',
  'two million thousand',
  'hundred thousand hundred',
  'thousand hundred',
  'million million million',
  'one point five billion million',
  'two thousand thousand',

  // ordinals of zero, negatives, or decimals
  '0th',
  '0.5th',
  '3.5th',
  '2.75th',
  '1.0th',
  '1.5st',
  '2.5nd',
  '0.75rd',
  '-1st',
  '-5th',
  '1,00th',

  // mismatched ordinal suffixes
  '1th',
  '2th',
  '3th',
  '1nd',
  '2st',
  '3st',
  '11st',
  '12nd',
  '13rd',
  '21th',
  '22th',
  '23th',
  '12st',
  '111st',
  '112nd',
  '113rd',

  // division by zero
  '1/0',
  '5/0',
  '0/0',
  '12/00',

  // malformed comma grouping
  '1,000,00',
  '1,0000',
  '10,00',
  '1,00',
  '12,34',
  '1,000,0',
  '1,,000',
  '1,000,,000',
  ',000',
  '1000,',

  // malformed decimals
  '1..5',
  '5..',
  '1.',
  '.',
  '..5',
  '.5.5',
  '5.5.5',
  '1.2.',
  '0.0.0',
  'point',

  // doubled signs
  '--5',
  '- -5',
  '+-5',
  '-+5',
  '++5',
  '-',
  '+',

  // doubled percent and currency symbols
  '5%%',
  '%5',
  '%',
  '$',
  '$$',
  '$$5',
  '5$$',

  // beyond safe integer range
  '99999999999999999999',
  '1000000000000000000000000',
  '1,000,000,000,000,000,000,000',
  'nine hundred quadrillion quadrillion',

  // vague plural quantities, not numbers
  'thousands',
  'thousands of people',
  'hundreds',
  'hundreds of thousands',
  'tens of thousands',
  'millions',
  'millions of dollars',
  'billions',
  'dozens',
  'dozens of',
  'several',
  'many',
  'umpteen',
  'umpteen times',
  'a handful',
  'a bunch',
  'lots',
  'zillion',
  'a zillion',
  'gazillion',
  'bajillion',
  'a gazillion',
  'halves',
  'quarters',
  'thirds',
  'fifths',

  // symbolic or placeholder values
  'nth',
  'the nth degree',
  'infinity',
  'NaN',
  'pi',
  'x',
  'n+1',
  'twentysomething',
  'umpteenth',
  'zillionth',

  // misspelled number words
  'nineth',
  'twelveth',
  'twentyth',
  'thirtyeth',
  'eleventy',
  'twelvety',
  'tenty',
  'oneteen',
  'twoteen',
  'fiveteen',
  'threety',
  'fivety',
  'elevendy',
  'hundredty',

  // suffix soup
  '#',
  '#th',
  'th',
  'st',
  '1st2nd',
  '12th34',
  '5th5',
  '3rdth',
  '1stth',
  '2ndnd',

  // not-quite-roman numerals
  'IIII',
  'VX',
  'IIIII',
  'IC',

  // empty
  '',
  ' ',
]

test('invalid-numbers:', function (t) {
  arr.forEach(str => {
    const res = nlp(str).numbers().isValid()
    t.deepEqual(res.out('array'), [], here + JSON.stringify(str))
  })
  t.end()
})
