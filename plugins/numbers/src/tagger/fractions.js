const multiples =
  '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'
const here = 'fraction-tagger'

// plural-ordinals like 'hundredths' are already tagged as Fraction by compromise
const tagFractions = function (doc) {
  // hundred
  doc.match(multiples).tag('#Multiple', here)

  // half a penny
  doc.match('[(half|quarter)] of? (a|an)', 0).tag('Fraction', 'millionth')
  // nearly half
  doc.match('#Adverb [half]', 0).tag('Fraction', 'nearly-half')
  // half the
  doc.match('[half] the', 0).tag('Fraction', 'half-the')
  // two-halves
  doc.match('#Value (halves|halfs|quarters)').tag('Fraction', 'two-halves')

  // ---ordinals as fractions---
  // a fifth
  doc.match('a #Ordinal').tag('Fraction', 'a-quarter')
  // seven fifths
  doc.match('(#Fraction && /s$/)').lookBefore('#Cardinal+$').tag('Fraction')
  // one third of ..
  doc.match('[#Cardinal+ #Ordinal] of .', 0).tag('Fraction', 'ordinal-of')
  // 100th of
  doc.match('[(#NumericValue && #Ordinal)] of .', 0).tag('Fraction', 'num-ordinal-of')
  // a twenty fifth
  doc.match('(a|one) #Cardinal?+ #Ordinal').tag('Fraction', 'a-ordinal')
  // doc.match('(a|one) [#Ordinal]', 0).tag('Fraction', 'a-ordinal')

  // values.if('#Ordinal$').tag('Fraction', '4-fifths')
  // seven quarters
  // values.tag('Fraction', '4-quarters')

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
  doc.match('#Cardinal+ out? of every? #Cardinal').tag('Fraction', here)
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
