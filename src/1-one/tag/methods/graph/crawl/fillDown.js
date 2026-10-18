import byDepth from './crawl.js'

// addTags supplies only exclusions, additional parents, and these scalar flags.
const inherit = (props, parent) => {
  if (parent.not) {
    props.not = new Set([...props.not, ...parent.not])
  }
  if (Array.isArray(parent.also) && (props.also === undefined || Array.isArray(props.also))) {
    props.also = parent.also.concat(props.also || [])
  } else if (props.also === undefined) {
    props.also = parent.also
  }
  if (props.is === undefined) {
    props.is = parent.is
  }
  if (props.novel === undefined) {
    props.novel = parent.novel
  }
  return props
}

const fillDown = root => {
  byDepth(root, (parent, child) => {
    child.props = inherit(child.props, parent.props)
  }, false)
}

export default fillDown
