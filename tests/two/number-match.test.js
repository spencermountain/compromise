import test from 'tape'
import nlp from './_lib.js'
const here = '[two/number-match] '

let arr = [
  ['¥', '#Currency'],
  ['pence', '#Currency'],
  ['seven', '#Value'],
  ['seventeen', '#Value'],
  ['twenty', '#Value'],
  ['thousand', '#Value'],
  ['eighteenth', '#Value'],
  ['tbsp', '#Unit'],
  ['425-1231', '#PhoneNumber'],
  ['823-425-1231', '#PhoneNumber'],
  ['823 425-1231', '#PhoneNumber'],
  ['(823) 425-1231', '#PhoneNumber'],
  ['+1-123-444-5655', '#PhoneNumber'],
  ['fifth', '#Value'],
  ['3 trainers', '#Value #Noun'],
  ['5 buses', '#Value #Noun'],
  ['101010101010101010101010101010101010101010', '#NumericValue'],
  ['one dream', '#Value #Singular'],
  ['two dreams', '#Value #Plural'],
  ['100+ rumours', '#Value #Plural'],

  ['16.125', '#Cardinal'],
  ['+160.125', '#Cardinal'],
  ['-0.1', '#Cardinal'],
  ['.13', '#Cardinal'],
  ['(127.54)', '#Cardinal'],
  // ['(127.54)', '#Money'],

  ['16.125th', '#Ordinal'],
  ['161,253th', '#Ordinal'],
  ['+160.125th', '#Ordinal'],
  ['-0.2nd', '#Ordinal'],
  ['(127.54th)', '#Ordinal'],

  ['-0.1%', '#Percent'],
  ['.1%', '#Percent'],
  ['+2,340.91%', '#Percent'],
  ['-2340%', '#Percent'],

  ['$-2340.01', '#Money'],
  ['-$2340', '#Money'],
  ['+$2340.01', '#Money'],
  ['$2340.01', '#Money'],
  ['£1,000,000', '#Money'],
  ['$19', '#Money'],
  ['($127.54)', '#Money'],
  ['2,000₽', '#Money'],
  ['2000₱', '#Money'],
  ['2000௹', '#Money'],
  ['₼2000', '#Money'],
  ['2.23₽', '#Money'],
  ['₺50', '#Money'],
  ['$47.5m', '#Money'],
  ['$47.5bn', '#Money'],
  // ['1,000,000p', '#Cardinal'],

  // ['10 + 9', '#Value #Symbol #Value'],
  // ['2 * 90 = 180', '#Value #Symbol #Value #Symbol #Value'],
  // ['one - seventy-six', '#Value #Symbol #Value'],
  ['five hundred feet', '#Value+ #Unit'],
  ['50 square feet', '#Value+ #Unit+'],
  ['90 hertz', '#Value #Unit'],
  ['two books', '#Value #Noun'],
  ['two hundred', '#Value #Value'],
  ['4 hundred and ten', '#Value+'],
  ['4 and a half million', '#Value+'],
  ['499 thousand', '#Value+'],
  ['499', '#Value'],
  ['4,899', '#Value'],
  // ['10.-200 ug/L', '#Value to #Value #Unit'],
  // ['10-200 ug/L', '#Value to #Value #Unit'],
  // ['0.5-0.2 mg/L', '#Value to #Value #Unit'],
  [`june 1992`, '#Month #Year'],
  [`before 1992`, 'before #Year'],
  [`1992 in astronomy`, '#Year in #Noun'],
  [`1992 dalmations`, '!#Year #Plural'],
  // numberrange
  ['it was 1-2 kg woooh', '#Noun #PastTense #NumberRange #NumberRange #NumberRange #Unit #Expression'],
  ['1-1', '#NumberRange #NumberRange #NumberRange'],
  ['12-12', '#NumberRange #NumberRange #NumberRange'],
  ['123-123', '#NumberRange #NumberRange #NumberRange'],
  ['1234-1234', '#NumberRange+'],

]
test('match:', function (t) {
  arr.forEach(function (a) {
    let [str, match] = a
    let doc = nlp(str).compute('tagRank')
    let tags = doc.json()[0].terms.map(term => term.tagRank[0])
    let m = doc.match(match)
    let msg = `'${(str + "' ").padEnd(20, ' ')}  - '${tags.join(', ')}'`
    t.equal(m.text(), doc.text(), here + msg)
  })
  t.end()
})