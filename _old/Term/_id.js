//this is a not-well-thought-out way to reduce our dependence on `object===object` stuff
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('')

//generates a unique id for this term
function makeId(str) {
  str = str || '_'
  let text = str + '-'
  for (let i = 0; i < 7; i++) {
    text += chars[Math.floor(Math.random() * chars.length)]
  }
  return text
}

module.exports = makeId
