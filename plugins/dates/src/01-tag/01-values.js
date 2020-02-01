const here = 'date-values'
//
const values = function(doc) {
  if (doc.has('#Value')) {
    //june 5 to 7th
    doc.match('#Month #Value to #Value of? #Year?').tag('Date', here);
    //5 to 7th june
    doc.match('#Value to #Value of? #Month #Year?').tag('Date', here);
    //third week of may
    doc.match('#Value #Duration of #Date').tag('Date', here);
    //two days after
    doc.match('#Value+ #Duration (after|before|into|later|afterwards|ago)?').tag('Date', here);
    //two days
    doc.match('#Value #Date').tag('Date', here);
    //june 5th
    doc.match('#Date #Value').tag('Date', here);
    //tuesday at 5
    doc.match('#Date #Preposition #Value').tag('Date', here);
    //tomorrow before 3
    doc.match('#Date (after|before|during|on|in) #Value').tag('Date', here);
    //a year and a half
    doc.match('#Value (year|month|week|day) and a half').tag('Date', here);
    //5 and a half years
    doc.match('#Value and a half (years|months|weeks|days)').tag('Date', here);
    //on the fifth
    doc.match('on the #Ordinal').tag('Date', here);
  }
  return doc
}
module.exports = values
