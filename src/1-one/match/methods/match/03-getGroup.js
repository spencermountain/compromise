// support returning a subset of a match
// like 'foo [bar] baz' -> bar
const getGroup = function (res, group) {
  const ptrs = []
  const byGroup = {}
  if (typeof group === 'number') {
    group = String(group)
  }
  if (group) {
    res.forEach(r => {
      if (r.groups[group]) {
        ptrs.push(r.groups[group])
      }
    })
  } else {
    res.forEach(r => {
      ptrs.push(r.pointer)
      Object.entries(r.groups).forEach(([k, ptr]) => {
        byGroup[k] ||= []
        byGroup[k].push(ptr)
      })
    })
  }
  return { ptrs, byGroup }
}
export default getGroup
