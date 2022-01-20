import parseRange from './range/index.js'
import spacetime from 'spacetime'


const parse = function (doc, context) {
  // normalize context
  context = context || {}
  if (context.timezone === false) {
    context.timezone = 'UTC'
  }
  context.today = context.today || spacetime.now(context.timezone)
  context.today = spacetime(context.today, context.timezone)

  // normalize doc
  doc = doc.clone()
  doc.numbers().toNumber()

  // expand 'aug 20-21'
  doc.contractions().expand()

  // 'week-end'
  doc.replace('week end', 'weekend', true).tag('Date')
  // 'a up to b'
  doc.replace('up to', 'upto', true).tag('Date')
  // 'a year ago'
  if (doc.has('once (a|an) #Duration') === false) {
    doc.match('[(a|an)] #Duration', 0).replaceWith('1').compute('lexicon')
  }
  // jan - feb
  doc.match('@hasDash').insertAfter('to').tag('Date')

  let res = parseRange(doc, context)
  return res
}
export default parse
