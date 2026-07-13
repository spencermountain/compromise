const lastBrace = /{(?=[^{]*$)/ // split on the last { only

// parse the spec output 
const parseLine = function (line = '') {
  let [text, tags] = line.split(lastBrace)
  tags = tags.split(',').map(tag => tag.trim())
  let lastTag = tags[tags.length - 1]
  tags[tags.length - 1] = lastTag.replace(/}$/, '')
  return { text, tags }
}

// parse the adhoc output of out('spec')
const fromSpec = function (spec) {
  let world = this.world()
  let cleanText = spec.split('\n').map(line => {
    return parseLine(line).text
  }).join('\n')
  return this.tokenize(cleanText).compute(world.hooks)
}

// compare the tagged text output of out('spec')
const testSpec = function (spec) {
  let world = this.world()
  let aliases = {}
  // expand tag aliases
  let tags = world.model.one.tagSet
  console.log(tags.MaleName)
  Object.keys(tags).forEach(k => {
    if (tags[k].alias) {
      aliases[tags[k].alias] = k
    }
  })
  let cleanText = spec.split('\n').map(line => {
    let { text, tags } = parseLine(line)
    tags = tags.map(tag => aliases[tag] || tag)
    let doc = this.tokenize(text).compute(world.hooks)
    let match = tags.map(tag => '#' + tag).join(' ')
    if (doc.has(match)) {
      console.log(`✅ ${text} {${tags.join(', ')}}`)
    } else {
      console.log(`❌ ${text} {${tags.join(', ')}}`)
    }
    return text
  }).join('\n')
  return this.tokenize(cleanText).compute(world.hooks)
}

export { fromSpec, testSpec }