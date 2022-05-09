// const growFastOr = function (obj, index) {
//   let or = obj.regs[index]
//   return Array.from(or.fastOr).map(str => {
//     let cpy = Object.assign({}, or)
//     delete cpy.fastOr
//     delete cpy.operator
//     cpy.word = str
//     return cpy
//   })
// }

// const growSlowOr = function (obj, index) {
//   let or = obj.regs[index]
//   return or.choices.map(regs => {
//     if (regs.length === 1) {
//       return regs[0]
//     }
//     return { choices: regs, operator: or.operator }
//   })
// }

// multiply matches with OR options, for cache-purposes
// const Old = function (matches) {
//   let all = []
//   matches.forEach(obj => {
//     console.log(obj)
//     // expand simple '(one|two)' matches
//     let foundOr = obj.regs.findIndex(reg => reg.operator === 'or' && reg.fastOr && !reg.optional && !reg.negative)
//     if (foundOr !== -1) {
//       let more = growFastOr(obj, foundOr)
//       more.forEach(mo => {
//         let newObj = Object.assign({}, obj) //clone
//         newObj.regs = obj.regs.slice(0) //clone
//         newObj.regs[foundOr] = mo
//         newObj._expanded = true
//         all.push(newObj)
//       })
//       return
//     }
//     // expand '(#Foo|two three)' matches
//     foundOr = obj.regs.findIndex(reg => reg.operator === 'or' && reg.choices && !reg.optional && !reg.negative)
//     if (foundOr !== -1) {
//       // obj.regs[foundOr]
//       let more = growSlowOr(obj, foundOr)
//       more.forEach(mo => {
//         let newObj = Object.assign({}, obj) //clone
//         newObj.regs = obj.regs.slice(0) //clone
//         newObj.regs[foundOr] = mo
//         newObj._expanded = true
//         all.push(newObj)
//       })
//       return
//     }
//     all.push(obj)
//   })
//   // console.dir(all, { depth: 7 })
//   return all
// }

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
      if (reg.operator === 'or') {
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
