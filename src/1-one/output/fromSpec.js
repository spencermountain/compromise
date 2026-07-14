const lastBrace = /\{(?=[^{]*$)/ // split on the last { only

// parse the spec output
const parseLine = function (line = '') {
  let [text, tags] = line.split(lastBrace)
  if (tags === undefined) {
    return { text, tags: [] } // no {tags} block on this line
  }
  tags = tags.split(',').map(tag => tag.trim())
  let lastTag = tags[tags.length - 1]
  tags[tags.length - 1] = lastTag.replace(/\}$/, '')
  tags = tags.map(tag => tag.split('|').map(t => t.trim()))
  tags = tags.filter(arr => arr.some(t => t !== '')) // drop empty '{}'
  return { text, tags }
}

// make a match syntax looping through the arrays of tags
const toMatchString = function (tags, aliases) {
  return tags.map(arr => {
    arr = arr.map(str => {
      return '#' + (aliases[str] || str)
    })
    if (arr.length > 1) {
      return `(${arr.join(' && ')})`
    }
    return arr[0]
  }).join(' ')
}

// parse the adhoc output of out('spec')
// note: this(text), not this.tokenize().compute(hooks) - tokenize already
// splits contractions, so re-running hooks would split them twice
const fromSpec = function (spec) {
  let cleanText = spec.split('\n').filter(line => line.trim()).map(line => {
    return parseLine(line).text
  }).join('\n')
  return this(cleanText)
}

// rebuild spec-formatted tag list
const toTagList = function (tags) {
  return tags.map(arr => arr.join('|')).join(',')
}

// compare the tagged text output of out('spec')
const testSpec = function (spec, verbose = true, throwError = false) {
  let world = this.world()
  let aliases = {}
  // expand tag aliases
  let tagSet = world.model.one.tagSet
  Object.keys(tagSet).forEach(k => {
    if (tagSet[k].alias) {
      aliases[tagSet[k].alias] = k
    }
  })
  let failingLines = spec.split('\n').filter(line => line.trim()).map(line => {
    let { text, tags } = parseLine(line)
    // parse it
    let doc = this(text)
    // make compromise-compatible match string
    let matchStr = toMatchString(tags, aliases)
    let didMatch = doc.has(matchStr)
    if (verbose !== false) {
      let char = didMatch ? '✅' : '❌'
      console.log(`${char} ${text} {${toTagList(tags)}}`) //eslint-disable-line no-console
    }
    if (didMatch === false && throwError === true) {
      throw new Error(`❌ ${text} {${toTagList(tags)}}`)
    }
    return didMatch ? null : text
  }).filter(Boolean).join('\n')
  // return a doc of only the failing lines - empty means everything passed
  return this(failingLines)
}

export { fromSpec, testSpec }