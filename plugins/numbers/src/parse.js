const toNumber = require('./toNumber')

// get a numeric value from this phrase
const parseNumber = function(p) {
  let str = p.text('reduced')
  //parse a numeric-number (easy)
  let arr = str.split(/^([^0-9]*)([0-9]*)([^0-9]*)$/)
  if (arr[2]) {
    let num = parseFloat(arr[2] || str)
    //ensure that num is an actual number
    if (typeof num !== 'number') {
      num = null
    }
    let suffix = arr[3] || ''
    if (suffix === 'st' || suffix === 'nd' || suffix === 'rd' || suffix === 'th') {
      suffix = ''
    }
    return {
      prefix: arr[1] || '',
      num: num,
      suffix: suffix,
    }
  }
  //parse a text-numer (harder)
  let num = toNumber(str)
  return {
    prefix: '',
    num: num,
    suffix: '',
  }
}
module.exports = parseNumber
