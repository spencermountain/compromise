// i just made these up
const colorMap = {
  Noun: 'blue',

  Verb: 'green',
  Negative: 'green',

  Date: 'red',
  Value: 'red',

  Adjective: 'magenta',

  Preposition: 'cyan',
  Conjunction: 'cyan',
  Determiner: 'cyan',
  Adverb: 'cyan',
}

/** add a debug color to some tags */
const addColors = function (tags) {
  Object.keys(tags).forEach(k => {
    // assigned from plugin, for example
    if (tags[k].color) {
      tags[k].color = tags[k].color
      return
    }
    // defined above
    if (colorMap[k]) {
      tags[k].color = colorMap[k]
      return
    }
    tags[k].isA.some(t => {
      if (colorMap[t]) {
        tags[k].color = colorMap[t]
        return true
      }
      return false
    })
  })
  return tags
}

module.exports = addColors
