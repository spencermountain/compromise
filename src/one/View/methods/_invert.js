const invert = function (all, not) {
  let byIndex = {}
  not.forEach(a => {
    byIndex[a[0]] = byIndex[a[0]] || []
    byIndex[a[0]].push(a)
  })
  let results = []
  all.forEach(a => {
    let n = a[0]
    if (!byIndex[n]) {
      results.push(a) //use the whole thing
    } else {
      let splits = byIndex[n] //assume these are sorted
      splits.forEach((split, i) => {
        // before the split
        let before = splits[i - 1]
        if (!before && split[1] > 0) {
          results.push([n, 0, split[1]])
        }
        // span the last one to this one
        if (before && before[2] < split[1]) {
          results.push([n, before[2], split[1]])
        }
        let after = splits[i + 1]
        //go to the end
        if (!after) {
          results.push([n, split[2], a[2]])
        }
      })
    }
  })

  return results
}
export default invert
