const lastBrace = /\{(?=[^{]*$)/ // split on the last { only
const comment = /\}[ \t]*#.*$/ // an optional '# comment' after the last {tags} block

const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'

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
  const cleanText = spec
    .split('\n')
    .filter(line => line.trim() && !/^\s*#/.test(line))
    .map(line => {
    return parseLine(line).text
  }).join('\n')
  return this(cleanText)
}

// rebuild spec-formatted tag list
const toTagList = function (tags) {
  const list = tags.map(arr => arr.join('|'))
  return dim(`{${list.join(',')}}`)
}

// compare the tagged text output of out('spec')
const testSpec = function (spec, verbose = true, throwError = false) {
  const nlp = this
  const world = nlp.world()
  const aliases = {}
  // expand tag aliases
  const tagSet = world.model.one.tagSet
  Object.keys(tagSet).forEach(k => {
    if (tagSet[k].alias) {
      aliases[tagSet[k].alias] = k
    }
  })
  const resultLines = spec
    .split('\n')
    .filter(line => line.trim() && !/^\s*#/.test(line))
    .map(line => {
      const { text, tags } = parseLine(line)
      if (tags === null) {
        if (verbose !== false) {
          console.log(`${green('✓')} ${green(dim(text))}`) //eslint-disable-line no-console
        }
        return text
      }
      // parse it
      const doc = nlp(text)
      // make compromise-compatible match string
      const matchStr = toMatchString(tags, aliases)
      const didMatch = doc.has(matchStr)
      if (verbose !== false) {
        if (didMatch === true) {
          console.log(`${green('✓')} ${green(dim(text))} ${toTagList(tags)}`) //eslint-disable-line no-console
        } else {
          const perTerm = matchStr.split(' ')
          let failure = ''
          const wrong = doc.terms().find((term, i) => !term.has(perTerm[i]))
          if (wrong.found) {
            // wrong.compute('tagRank')
            failure = `'${wrong.text('normal')}'`
            const tag = wrong.out('best-tag')
            if (tag) {
              failure += ` = ${tag}`
            }
          }
          console.log(`${red('✗')} ${text} ${toTagList(tags)} - ${red(failure)}`) //eslint-disable-line no-console
        }
      }
      if (didMatch === false && throwError === true) {
        throw new Error(`❌ ${text} ${toTagList(tags)}`)
      }
      return didMatch ? null : text
    })
    .filter(Boolean)
    .join('\n')
  // retain untagged sentences alongside any failing tagged lines
  return nlp(resultLines)
}

export { fromSpec, testSpec }
