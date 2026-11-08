// mdast uses `link` for explicit links and autolinks. Parser positions distinguish
// bare/angle links from [labels](destinations), even when their visible text agrees.
const isAutolink = node => {
  if (node.type !== 'link' || node.children?.length !== 1 || node.children[0].type !== 'text') {
    return false
  }
  const outer = node.position
  const inner = node.children[0].position
  const start = inner?.start.offset - outer?.start.offset
  const end = outer?.end.offset - inner?.end.offset
  return (start === 0 && end === 0) || (start === 1 && end === 1)
}

export default isAutolink
