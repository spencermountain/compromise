const here = 'number-tag'
const multiples =
  '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'

//support 'two thirds'
// (do this conservatively)
let ordinals = [
  'half',
  'third',
  'fourth',
  'quarter',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'hundredth',
  'thousandth',
  'millionth',
]
// add plural forms
let len = ordinals.length
for (let i = 0; i < len; i += 1) {
  ordinals.push(ordinals[i] + 's')
}
ordinals = `(${ordinals.join('|')})`

// improved tagging for numbers
const tagger = function (doc) {
  doc.match(multiples).tag('#Multiple', here)
  //  in the 400s
  doc.match('the [/[0-9]+s$/]').tag('#Plural', here)
  //half a million
  doc.match('half a? #Value').tag('Value', 'half-a-value') //(quarter not ready)
  //five and a half
  doc.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half')
  //one hundred and seven dollars
  doc.match('#Money and #Money #Currency?').tag('Money', 'money-and-money')
  // $5.032 is invalid money
  doc
    .match('#Money')
    .not('#TextValue')
    .match('/\\.[0-9]{3}$/')
    .unTag('#Money', 'three-decimal money')
  // cleanup currency false-positives
  doc.ifNo('#Value').match('#Currency #Verb').unTag('Currency', 'no-currency')
  // 6 dollars and 5 cents
  doc.match('#Value #Currency [and] #Value (cents|ore|centavos|sens)', 0).tag('Money', here)
  // maybe currencies
  let m = doc.match('[<num>#Value] [<currency>(mark|rand|won|rub|ore)]')
  m.group('num').tag('Money', here)
  m.group('currency').tag('Currency', here)

  // fraction - '3 out of 5'
  doc.match('#Cardinal+ out of every? #Cardinal').tag('Fraction', here)
  // fraction - 'a third of a slice'
  m = doc.match(`[(#Cardinal|a) ${ordinals}] of (a|an|the)`, 0).tag('Fraction', here)
  // tag 'thirds' as a ordinal
  m.match('.$').tag('Ordinal', 'plural-ordinal')
}
module.exports = tagger
