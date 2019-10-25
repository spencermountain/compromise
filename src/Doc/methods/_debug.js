const tagset = require('../../world/tags')

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const reset = '\x1b[0m'

const padEnd = function(str, width) {
  str = str.toString()
  while (str.length < width) {
    str += ' '
  }
  return str
}

//cheaper than requiring chalk
const cli = {
  green: function(str) {
    return '\x1b[32m' + str + reset
  },
  red: function(str) {
    return '\x1b[31m' + str + reset
  },
  blue: function(str) {
    return '\x1b[34m' + str + reset
  },
  magenta: function(str) {
    return '\x1b[35m' + str + reset
  },
  cyan: function(str) {
    return '\x1b[36m' + str + reset
  },
  yellow: function(str) {
    return '\x1b[33m' + str + reset
  },
  black: function(str) {
    return '\x1b[30m' + str + reset
  },
}

const tagString = function(tags) {
  tags = tags.map(tag => {
    if (!tagset.hasOwnProperty(tag)) {
      return tag
    }
    const c = tagset[tag].color || 'blue'
    return cli[c](tag)
  })
  return tags.join(', ')
}

//output some helpful stuff to the console
const debug = function(doc) {
  console.log(cli.blue('====='))
  doc.list.forEach(p => {
    console.log(cli.blue('  -----'))
    p.terms().forEach(t => {
      let tags = Object.keys(t.tags)
      let text = t.text || '-'
      if (t.implicit) {
        text = '[' + t.implicit + ']'
      }
      if (typeof module !== undefined) {
        text = cli.yellow(text)
      }
      let word = "'" + text + "'"
      word = padEnd(word, 18)
      let str = cli.blue('  ｜ ') + word + '  - ' + tagString(tags)
      console.log(str)
    })
  })
  console.log('')
  return doc
}
module.exports = debug
