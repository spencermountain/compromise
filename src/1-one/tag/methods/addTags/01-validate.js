
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
  Object.keys(tags).forEach(k => {
    // support deprecated fmts
    if (tags[k].isA) {
      tags[k].is = tags[k].isA
    }
    if (tags[k].notA) {
      tags[k].not = tags[k].notA
    }
    // add any implicit 'is' tags
    if (tags[k].is && typeof tags[k].is === 'string') {
      if (!tags.hasOwnProperty(tags[k].is)) {
        tags[tags[k].is] = {}
      }
    }
    // Additional parents need entries too, including parents introduced by plugins.
    toArr(tags[k].also).forEach(parent => {
      if (!tags.hasOwnProperty(parent)) {
        tags[parent] = {}
      }
    })
    // add any implicit 'not' tags
    toArr(tags[k].not).forEach(excluded => {
      if (!tags.hasOwnProperty(excluded)) {
        tags[excluded] = {}
      }
    })
  })
  return tags
}


const validate = function (tags, already) {
  // Reciprocal links must reach previously registered tags too. Copy entries
  // before normalization so the existing compiled model remains untouched.
  tags = Object.fromEntries(Object.entries({ ...already, ...tags }).map(([tag, definition]) => [tag, { ...definition }]))
  tags = addImplied(tags)

  // property validation
  Object.keys(tags).forEach(k => {
    tags[k].children = toArr(tags[k].children)
    tags[k].not = toArr(tags[k].not)
    if (tags[k].also) {
      tags[k].also = toArr(tags[k].also)
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
