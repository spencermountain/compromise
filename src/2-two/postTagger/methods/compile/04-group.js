const groupBy = function (matches) {
  let byGroup = {}
  matches.forEach(obj => {
    obj.needs.forEach(need => {
      byGroup[need] = byGroup[need] || []
      byGroup[need].push(obj)
    })
  })
  return byGroup
}

export default groupBy
