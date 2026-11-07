import compileAliases from '../../_aliases.js'

const toArr = function (input) {
  if (!input) {
    return []
  }
  if (typeof input === 'string') {
    return [input]
  }
  return input.slice()
}

const addImplied = function (tags) {
  const aliases = compileAliases(tags)
  const resolve = tag => aliases[tag] || tag
  // add an implicit entry for any tag we reference
  const ensure = tag => {
    if (!Object.hasOwn(tags, tag)) {
      tags[tag] = {}
    }
  }
  Object.keys(tags).forEach(k => {
    const o = tags[k]
    // support deprecated fmts
    if (o.isA) {
      o.is = o.isA
    }
    if (o.notA) {
      o.not = o.notA
    }
    if (typeof o.is === 'string') {
      o.is = resolve(o.is)
    }
    if (o.also) {
      o.also = toArr(o.also).map(resolve)
    }
    if (o.not) {
      o.not = toArr(o.not).map(resolve)
    }
    // add any implicit 'is' tags
    if (o.is && typeof o.is === 'string') {
      ensure(o.is)
    }
    // Additional parents need entries too, including parents introduced by plugins.
    toArr(o.also).forEach(ensure)
    // add any implicit 'not' tags
    toArr(o.not).forEach(ensure)
  })
  return tags
}


const validate = function (tags, already) {
  // Reciprocal links must reach previously registered tags too. Copy entries
  // before normalization so the existing compiled model remains untouched.
  tags = Object.fromEntries(Object.keys({ ...already, ...tags }).map(tag => [tag, { ...already[tag], ...tags[tag] }]))
  tags = addImplied(tags)

  // property validation
  Object.keys(tags).forEach(k => {
    const o = tags[k]
    if (o.aliases !== undefined) {
      o.aliases = toArr(o.aliases)
    }
    o.children = toArr(o.children)
    o.not = toArr(o.not)
    if (o.also) {
      o.also = toArr(o.also)
    }
  })
  // not links are bi-directional
  // add any incoming not tags
  Object.keys(tags).forEach(k => {
    const nots = tags[k].not || []
    nots.forEach(no => {
      if (tags[no] && tags[no].not && !tags[no].not.includes(k)) {
        tags[no].not.push(k)
      }
    })
  })
  return tags
}
export default validate
