const { Unit } = require('../_units')

const onlySection = function(doc, context, section) {
  let d = null
  if (doc.found === false) {
    // do we have just a time?
    if (section.time !== null) {
      d = new Unit(context.today, null, context) // choose today
    }
    //do we just have a shift?
    if (Object.keys(section.shift).length > 0) {
      d = new Unit(context.today, null, context) // choose today
    }
  }
  return d
}
module.exports = onlySection
