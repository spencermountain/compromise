const multiples =
  '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'
const here = 'fraction-tagger'

// plural-ordinals like 'hundredths' are already tagged as Fraction by compromise
const tagFractions = function (doc) {
  // hundred
  doc.match(multiples).tag('#Multiple', here)

  // half a penny
  doc.match('[(half|quarter)] of? (a|an)', 0).tag('Fraction', 'millionth')
  // two-halves
  doc.match('#Value (halves|halfs|quarters)').tag('Fraction', 'two-halves')
  // a fifth
  doc.match('a #Ordinal').tag('Fraction', 'a-quarter')

  // doc.debug()

  let values = doc.match('#Value+')
  // seven fifths
  values.if('#Ordinal$').tag('Fraction', '4-fifths')
  // seven quarters
  values.if('#Fraction$').tag('Fraction', '4-quarters')

  // doc.match('(#Value && !#Ordinal)+ (#Ordinal|#Fraction)').tag('Fraction', '4-fifths')
  // 12 and seven fifths
  // doc.match('#Value+ and #Value+ (#Ordinal|half|quarter|#Fraction)').tag('Fraction', 'val-and-ord')

  // fixups
  // doc.match('#Cardinal+? (second|seconds)').unTag('Fraction', '3 seconds')
  // doc.match('#Ordinal (half|quarter)').unTag('Fraction', '2nd quarter')
  // doc.match('#Ordinal #Ordinal+').unTag('Fraction')
  // doc.match('[#Cardinal+? (second|seconds)] of (a|an)', 0).tag('Fraction', here)
  // doc.match(multiples).tag('#Multiple', here)

  // //  '3 out of 5'
  // doc.match('#Cardinal+ out of every? #Cardinal').tag('Fraction', here)
  // // one and a half
  // doc.match('#Cardinal and a (#Fraction && #Value)').tag('Fraction', here)
  // fraction - 'a third of a slice'
  // TODO:fixme
  // m = doc.match(`[(#Cardinal|a) ${ordinals}] of (a|an|the)`, 0).tag('Fraction', 'ord-of')
  // tag 'thirds' as a ordinal
  // m.match('.$').tag('Ordinal', 'plural-ordinal')
  return doc
}
module.exports = tagFractions
