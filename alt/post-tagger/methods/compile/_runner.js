// const compile = require('./_compile')

const findMatches = function (set, matches) {
  let maybe = new Set()
  Array.from(set).forEach(r => {
    if (matches.hasOwnProperty(r) === true) {
      matches[r].forEach(reg => maybe.add(reg))
    }
  })
  if (maybe.size === 0) {
    return []
  }
  let final = Array.from(maybe).filter(match => {
    // ensure every need is met in this match
    return match.needs.every(thing => set.has(thing))
  })
  console.log(maybe.size + ' > ' + final.length + ' possible matches\n')
  return final
}
