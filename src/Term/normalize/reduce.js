/** reduced is one step further than clean */
const reduced = function(str) {
  // remove apostrophes
  str = str.replace(/['’]s$/, '')
  return str
}
module.exports = reduced
