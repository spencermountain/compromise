import { pack } from 'efrt'

const hasNumber = /[0-9,;!:|¦]/
const hasPunct = /[.,/#!$%^&*;:{}=\-_`~()']/
const hasLetter = /[a-z]/

const zipUp = function (counts) {
  const byFreq = {}
  counts = Object.entries(counts)
  // counts = counts.filter(a => a[1] > 2)
  counts = counts.sort((a, b) => {
    if (a[1] > b[1]) {
      return 1
    } else if (a[1] < b[1]) {
      return -1
    }
    return 0
  })
  counts.forEach(a => {
    const [str, num] = a
    if (!str || hasNumber.test(str) || hasPunct.test(str) || !hasLetter.test(str)) {
      return
    }
    const k = String(num)
    byFreq[k] = byFreq[k] || []
    byFreq[k].push(str)
  })

  //compress each key
  Object.keys(byFreq).forEach(k => {
    byFreq[k] = pack(byFreq[k])
  })
  // console.log(byFreq)
  return byFreq
}
export default zipUp