const bySlash = /\//g
const getDoc = function (pointer, document) {
  let found = []
  pointer.forEach(ptr => {
    let [s, n] = ptr.split(bySlash)
    console.log(s, n)
  })
  return 'hi'
}
module.exports = getDoc
