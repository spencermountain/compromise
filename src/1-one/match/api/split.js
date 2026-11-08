import { getDoc } from '../../pointers/api/lib/_lib.js'

const combine = function (left, right) {
  return [left[0], left[1], right[2]]
}

const addIds = function (ptr, view) {
  const [n, start, end] = ptr
  if (view.document[n]?.[start]) {
    ptr[3] ||= view.document[n][start].id
    if (view.document[n][end - 1]) {
      ptr[4] ||= view.document[n][end - 1].id
    }
  }
  return ptr
}

// split each match, then collect the pieces into pointers
const split = function (view, m, group, collect) {
  const { splitAll } = view.methods.one.pointer
  const splits = getDoc(m, view, group).fullPointer
  const all = splitAll(view.fullPointer, splits)
  const res = collect(all).filter(p => p).map(p => addIds(p, view))
  return view.update(res)
}

const methods = {}
// [before], [match], [after]
methods.splitOn = function (m, group) {
  return split(this, m, group, all => all.flatMap(o => [o.passthrough, o.before, o.match, o.after]))
}

// [before], [match after]
methods.splitBefore = function (m, group) {
  return split(this, m, group, all => {
    // repair matches to favor [match, after]
    // - instead of [before, match]
    for (let i = 0; i < all.length; i += 1) {
      // move a before to a preceding after
      if (!all[i].after && all[i + 1]?.before) {
        // ensure it's from the same original sentence
        if (all[i].match && all[i].match[0] === all[i + 1].before[0]) {
          all[i].after = all[i + 1].before
          delete all[i + 1].before
        }
      }
    }
    return all.flatMap(o => {
      // a, [x, b]
      if (o.match && o.after) {
        return [o.passthrough, o.before, combine(o.match, o.after)]
      }
      // a, [x], b
      return [o.passthrough, o.before, o.match]
    })
  })
}

// [before match], [after]
methods.splitAfter = function (m, group) {
  return split(this, m, group, all => all.flatMap(o => {
    if (o.before && o.match) {
      return [o.passthrough, combine(o.before, o.match), o.after]
    }
    return [o.passthrough, o.before, o.match, o.after]
  }))
}
methods.split = methods.splitAfter

export default methods
