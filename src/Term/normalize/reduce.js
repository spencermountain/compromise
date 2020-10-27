/** reduced is one step further than clean */
const reduced = function (str) {
  // remove apostrophes
  str = str.replace(/['’]s$/, '')
  str = str.replace(/s['’]$/, 's')
  return str
}
module.exports = reduced
