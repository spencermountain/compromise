const lastBrace = /\{(?=[^{]*$)/ // split on the last { only
const comment = /\}[ \t]*#.*$/ // an optional '# comment' after the last {tags} block


// parse the spec output
const parseLine = function (line = '') {
  let [text, tags] = line.split(lastBrace) // eslint-disable-line prefer-const
  if (tags === undefined) {
    return { text: text.replace(/\s#.*$/, '').trimEnd(), tags: null } // no {tags} block on this line
  }
  tags = tags.replace(comment, '}') // drop the comment - only ever one, always last
  tags = tags.split(',').map(tag => tag.trim())
  const lastTag = tags[tags.length - 1]
  tags[tags.length - 1] = lastTag.replace(/\}$/, '')
  tags = tags.map(tag => tag.split('|').map(t => t.trim()))
  if (tags.length === 1 && tags[0].length === 1 && tags[0][0] === '') {
    tags = [] // empty '{}'; retain empty slots in nonempty lists
  }
  return { text, tags }
}

// make a match syntax looping through the arrays of tags
const toMatchString = function (tags, aliases) {
  // Slots accept tags and '.', never match-syntax quantifiers or groups.
  if (tags.some(slot => slot.some(tag => tag !== '.' && !/^!?#?[a-z][a-z0-9]*$/i.test(tag)))) {
    return null
  }
  return tags.map(arr => {
    arr = arr.map(str => {
      if (str === '.') {
        return '.'
      }
      const negative = str.startsWith('!')
      const tag = str.replace(/^!?#?/, '')
      const prefix = negative ? '!#' : '#'
      return prefix + (aliases[tag] || tag)
    })
    if (arr.length > 1) {
      return `(${arr.join(' && ')})`
    }
    return arr[0]
  }).join(' ')
}

// Apply only positive constraints; negatives remain assertions.
const applyTags = (doc, slots, aliases) => {
  const terms = doc.terms()
  // Tokenization can supply structural tags; literal slots replace them.
  doc.docs.flat().forEach(term => term.tags.clear())
  slots?.forEach((slot, i) => {
    const tags = slot.filter(tag => tag !== '.' && !tag.startsWith('!')).map(tag => {
      tag = tag.replace(/^#/, '')
      return aliases[tag] || tag
    })
    terms.eq(i).tag(tags, 'fromSpec')
  })
}

export { parseLine, toMatchString, applyTags }
