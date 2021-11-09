// reverse a string
const reverse = (str = '') => {
  return str.split('').reverse().join('')
}

const sort = function (arr) {
  let obj = {}
  arr.forEach(a => {
    obj[a[0]] = a[1]
  })
  let out = Object.entries(obj)
  out = out.sort((a, b) => {
    a = reverse(a[0])
    b = reverse(b[0])
    if (a > b) {
      return -1
    } else if (a < b) {
      return 1
    }
    return 0
  })
  return out
}
export default sort