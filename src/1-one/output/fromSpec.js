const lastBrace = /{(?=[^{]*$)/ // split on the last { only

// parse the spec output 
const parseLine = function (line = '') {
  let [text, tags] = line.split(lastBrace)
  tags = tags.split(',').map(tag => tag.trim())
  let lastTag = tags[tags.length - 1]
  tags[tags.length - 1] = lastTag.replace(/}$/, '')
  tags = tags.map(tag => tag.split('|').map(t => t.trim()))
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
const fromSpec = function (spec) {
  let world = this.world()
  let cleanText = spec.split('\n').map(line => {
    return parseLine(line).text
  }).join('\n')
  return this.tokenize(cleanText).compute(world.hooks)
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
  let tags = world.model.one.tagSet
  Object.keys(tags).forEach(k => {
    if (tags[k].alias) {
      aliases[tags[k].alias] = k
    }
  })
  let onlyFailing = spec.split('\n').map(line => {
    let { text, tags } = parseLine(line)
    // parse it
    let doc = this.tokenize(text).compute(world.hooks)
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
    return didMatch ? text : null // return it anyways
  }).filter(Boolean).join('\n')
  // return it anyways
  return this.tokenize(cleanText).compute(world.hooks)
}

export { fromSpec, testSpec }