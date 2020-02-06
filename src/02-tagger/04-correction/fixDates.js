const people = '(january|april|may|june|summer|autumn|jan|sep)' //ambiguous month-names
const preps = '(in|by|before|during|on|until|after|of|within|all)' //6
const verbs = '(may|march|sat)' //ambiguous month-verbs
const fixDates = function(doc) {
  //ambiguous month - person forms
  //by april
  doc
    .match(`${preps} [${people}]`, 0)
    .ifNo('#Holiday')
    .tag('Month', 'preps-month')

  //ambiguous month - verb-forms
  let verb = doc.if(verbs)
  if (verb.found === true) {
    //all march
    verb
      .match(`${preps} [${verbs}]`, 0)
      .tag('Date', 'in-month')
      .match('(may|march)')
      .tag('Month')
    //this march
    verb
      .match(`(next|this|last) [${verbs}]`, 0)
      .tag('Date', 'this-month')
      .match('(may|march)')
      .tag('Month')
    //with date
    verb
      .match(`[${verbs}] the? #Value`, 0)
      .tag('Date', 'march-5th')
      .match('(may|march)')
      .tag('Month')
    verb
      .match(`#Value of? [${verbs}]`, 0)
      .tag('Date', '5th-of-march')
      .match('(may|march)')
      .tag('Month')
    //nearby
    verb
      .match(`[${verbs}] .? #Date`, 0)
      .tag('Date', 'march-and-feb')
      .match('(may|march)')
      .tag('Month')
    verb
      .match(`#Date .? [${verbs}]`, 0)
      .tag('Date', 'feb-and-march')
      .match('(may|march)')
      .tag('Month')
  }

  return doc
}
module.exports = fixDates
