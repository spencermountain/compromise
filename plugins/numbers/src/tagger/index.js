const tagFractions = require('./fractions')
const tagMoney = require('./money')
const here = 'number-tag'

// improved tagging for numbers
const tagger = function (doc) {
  // add #Money + #Currency tags
  doc = tagMoney(doc)
  //  in the 400s
  doc.match('the [/[0-9]+s$/]').tag('#Plural', here)
  //half a million
  doc.match('half a? #Value').tag('Value', 'half-a-value') //(quarter not ready)
  //five and a half
  doc.match('#Value [and a (half|quarter)]', 0).tag('TextValue', 'value-and-a-half')
  // add #Fraction tags
  doc = tagFractions(doc)
  // two and two thirds
  doc.match('#Cardinal and #Fraction #Fraction').tag('Value', here)
}
module.exports = tagger
