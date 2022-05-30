// stich an array into another, replacing one element
function spliceArray(main, index, arrayToInsert) {
  main.splice(index, 1, ...arrayToInsert)
  return main
}

// enumerate any OR options
const getORs = function (reg) {
  if (reg.fastOr) {
    return Array.from(reg.fastOr).map(str => {
      return [{ word: str }]
    })
  }
  return reg.choices
}

// try keeping all other properties on the old reg
const combine = function (obj, reg) {
  let both = Object.assign({}, obj, reg)
  delete both.choices
  delete both.fastOr
  delete both.operator
  return both
}

const buildUp = function (matches) {
  let all = []
  matches.forEach(obj => {
    for (let i = 0; i < obj.regs.length; i += 1) {
      let reg = obj.regs[i]
      // (negative or is un-multipliable) - !(a|b|c)  -> "a" matches !b
      if (reg.operator === 'or' && !reg.negative === true) {
        let more = getORs(reg)
        more.forEach(r => {
          let tmp = Object.assign({}, obj)//clone
          tmp.regs = tmp.regs.slice(0)//clone
          r = r.map(main => combine(obj.regs[i], main))
          tmp.regs = spliceArray(tmp.regs, i, r)
          all.push(tmp)
        })
        return
      }
    }
    all.push(obj)
  })
  // console.dir(all, { depth: 5 })
  return all
}


export default buildUp
