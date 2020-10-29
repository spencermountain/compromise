// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const reset = '\x1b[0m'

const padEnd = function (str, width) {
  str = str.toString()
  while (str.length < width) {
    str += ' '
  }
  return str
}

function isClientSide() {
  return typeof window !== 'undefined' && window.document
}

// some nice colors for client-side debug
const css = {
  green: '#7f9c6c',
  red: '#914045',
  blue: '#6699cc',
  magenta: '#6D5685',
  cyan: '#2D85A8',
  yellow: '#e6d7b3',
  black: '#303b50',
}

const logClientSide = function (doc) {
  let tagset = doc.world.tags
  doc.list.forEach(p => {
    console.log('\n%c"' + p.text() + '"', 'color: #e6d7b3;')
    let terms = p.terms()
    terms.forEach(t => {
      let tags = Object.keys(t.tags)
      let text = t.text || '-'
      if (t.implicit) {
        text = '[' + t.implicit + ']'
      }
      let word = "'" + text + "'"
      word = padEnd(word, 8)
      let found = tags.find(tag => tagset[tag] && tagset[tag].color)
      let color = 'steelblue'
      if (tagset[found]) {
        color = tagset[found].color
        color = css[color]
      }
      console.log(`   ${word}  -  %c${tags.join(', ')}`, `color: ${color || 'steelblue'};`)
    })
  })
}

//cheaper than requiring chalk
const cli = {
  green: function (str) {
    return '\x1b[32m' + str + reset
  },
  red: function (str) {
    return '\x1b[31m' + str + reset
  },
  blue: function (str) {
    return '\x1b[34m' + str + reset
  },
  magenta: function (str) {
    return '\x1b[35m' + str + reset
  },
  cyan: function (str) {
    return '\x1b[36m' + str + reset
  },
  yellow: function (str) {
    return '\x1b[33m' + str + reset
  },
  black: function (str) {
    return '\x1b[30m' + str + reset
  },
}

const tagString = function (tags, world) {
  tags = tags.map(tag => {
    if (!world.tags.hasOwnProperty(tag)) {
      return tag
    }
    const c = world.tags[tag].color || 'blue'
    return cli[c](tag)
  })
  return tags.join(', ')
}

//output some helpful stuff to the console
const debug = function (doc) {
  if (isClientSide()) {
    logClientSide(doc)
    return doc
  }
  console.log(cli.blue('====='))
  doc.list.forEach(p => {
    console.log(cli.blue('  -----'))
    let terms = p.terms()
    terms.forEach(t => {
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
      let str = cli.blue('  ｜ ') + word + '  - ' + tagString(tags, doc.world)
      console.log(str)
    })
  })
  console.log('')
  return doc
}
module.exports = debug
