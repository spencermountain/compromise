const here = 'fix-tagger'
//
const fixUp = function (doc) {
  //fixups
  if (doc.has('#Date')) {
    //first day by monday
    let oops = doc.match('#Date+ by #Date+')
    if (oops.found && !oops.has('^due')) {
      oops.match('^#Date+').unTag('Date', 'by-monday')
    }

    let d = doc.match('#Date+')

    //between june
    if (d.has('^between') && !d.has('and .')) {
      d.unTag('Date', here)
    }
    // log the hours
    if (d.has('(minutes|seconds|weeks|hours|days|months)') && !d.has('#Value #Duration')) {
      d.match('(minutes|seconds|weeks|hours|days|months)').unTag('Date', 'log-hours')
    }
    // about thanksgiving
    if (d.has('about #Holiday')) {
      d.match('about').unTag('#Date', 'about-thanksgiving')
    }
    // the day after next
    d.match('#Date+').match('^the').unTag('Date')
  }
  return doc
}
export default fixUp
