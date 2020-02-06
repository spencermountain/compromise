let matches = require('./_always')
const parseSyntax = require('../../Doc/match/syntax')

matches = matches.map(a => {
  return {
    reg: parseSyntax(a[0]),
    group: a[1],
    tag: a[2],
    hint: a[3],
    tagSafe: a[4],
  }
})

const runAlways = function(doc) {
  matches.forEach(m => {
    // tagsafe
    if (m.tagSafe === true) {
      doc.match(m.reg, m.group).tagSafe(m.tag, m.hint)
    } else {
      doc.match(m.reg, m.group).tag(m.tag, m.hint)
    }
  })
}
module.exports = runAlways
