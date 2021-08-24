// turn a sub-match pointer into a full-document pointer
const toAbsolute = function (subs, refs) {
  let byN = {}
  refs.forEach(ref => {
    byN[ref[0]] = byN[ref[0]] || []
    byN[ref[0]].push(ref)
  })
  let abs = subs.map(sub => {
    let [n, start, end] = sub
    if (!byN[n]) {
      return sub //it's fine
    }
    let found = byN[n].find(ref => {
      // if(ref[1]
    })
  })
}
export default toAbsolute

let refs = [[0, 1, 3]]
let subs = [[0, 0, 1]]
console.log(toAbsolute(subs, refs))
