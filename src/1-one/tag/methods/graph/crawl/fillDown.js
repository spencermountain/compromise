import { isSet, isObject, isArray } from '../_lib.js'
import byDepth from './crawl.js'

// Only compatible collections are merged; explicit child values take precedence.
const kind = value => {
  if (isSet(value)) {
    return 'set'
  }
  if (isArray(value)) {
    return 'array'
  }
  if (isObject(value)) {
    return 'object'
  }
  return 'scalar'
}

const mergeDeep = (props, parent) => {
  Object.keys(parent).forEach(k => {
    if (props[k] !== undefined && kind(props[k]) !== kind(parent[k])) {
      return
    }
    // merge sets
    if (isSet(parent[k])) {
      const set = props[k] || new Set()
      props[k] = new Set([...set, ...parent[k]])
      return
    }
    // merge an object
    if (isObject(parent[k])) {
      const obj = props[k] || {}
      props[k] = Object.assign({}, parent[k], obj)
      return
    }
    //  concat an array
    if (isArray(parent[k])) {
      props[k] = parent[k].concat(props[k] || [])
      return
    }

    // just overwrite it
    if (props[k] === undefined) {
      props[k] = parent[k]
    }
  })
  return props
}

const fillDown = root => {
  byDepth(root, (parent, child) => {
    child.props = mergeDeep(child.props, parent.props)
  }, false)
}

export default fillDown
