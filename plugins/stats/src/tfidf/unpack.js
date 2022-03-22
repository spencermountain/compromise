import { unpack } from 'efrt'

const unzip = function (model) {
  let all = {}
  Object.keys(model).forEach(k => {
    model[k] = unpack(model[k])
    let num = Number(k)
    Object.keys(model[k]).forEach(w => {
      all[w] = num
    })
  })
  return all
}
export default unzip