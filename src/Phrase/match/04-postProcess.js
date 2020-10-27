const postProcess = function (terms, regs, matches) {
  if (!matches || matches.length === 0) {
    return matches
  }
  // ensure end reg has the end term
  let atEnd = regs.some(r => r.end)
  if (atEnd) {
    let lastTerm = terms[terms.length - 1]
    matches = matches.filter(({ match: arr }) => arr.indexOf(lastTerm) !== -1)
  }
  return matches
}
module.exports = postProcess
