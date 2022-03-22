const growFastOr = function (obj, index) {
  let or = obj.regs[index]
  return Array.from(or.fastOr).map(str => {
    let cpy = Object.assign({}, or)
    delete cpy.fastOr
    delete cpy.operator
    cpy.word = str
    return cpy
  })
}

const growSlowOr = function (obj, index) {
  let or = obj.regs[index]
  return or.choices.map(regs => {
    if (regs.length === 1) {
      return regs[0]
    }
    return { choices: regs, operator: or.operator }
  })
}

const buildUp = function (matches) {
  let all = []
  matches.forEach(obj => {
    // expand simple '(one|two)' matches
    let foundOr = obj.regs.findIndex(reg => reg.operator === 'or' && reg.fastOr && !reg.optional && !reg.negative)
    if (foundOr !== -1) {
      let more = growFastOr(obj, foundOr)
      more.forEach(mo => {
        let newObj = Object.assign({}, obj) //clone
        newObj.regs = obj.regs.slice(0) //clone
        newObj.regs[foundOr] = mo
        newObj._expanded = true
        all.push(newObj)
      })
      return
    }
    // expand '(#Foo|two three)' matches
    foundOr = obj.regs.findIndex(reg => reg.operator === 'or' && reg.choices && !reg.optional && !reg.negative)
    if (foundOr !== -1) {
      let more = growSlowOr(obj, foundOr)
      more.forEach(mo => {
        let newObj = Object.assign({}, obj) //clone
        newObj.regs = obj.regs.slice(0) //clone
        newObj.regs[foundOr] = mo //!fixme [mo]?
        newObj._expanded = true
        all.push(newObj)
      })
      return
    }
    all.push(obj)
  })
  return all
}

export default buildUp
