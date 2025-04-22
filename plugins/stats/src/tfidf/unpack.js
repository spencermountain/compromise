import { unpack } from 'efrt'

const unzip = function (model) {
  const all = {}
  Object.keys(model).forEach(k => {
    model[k] = unpack(model[k])
    const num = Number(k)
    Object.keys(model[k]).forEach(w => {
      all[w] = num
    })
  })
  return all
}
export default unzip