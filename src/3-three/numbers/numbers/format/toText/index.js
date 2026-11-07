import toString from '../../_toString.js'
import { sequence, ones_mapping, tens_mapping } from './data.js'
import { ones } from '../../_words.js'
/**
 * turns an integer/float into.ber, like 'fifty-five'
 */

//turn number into an array of magnitudes, like [[5, million], [2, hundred]]
const breakdown_magnitudes = function (num) {
  let working = num
  const have = []
  sequence.forEach(a => {
    if (num >= a[0]) {
      const howmany = Math.floor(working / a[0])
      working -= howmany * a[0]
      if (howmany) {
        have.push({
          unit: a[1],
          count: howmany,
        })
      }
    }
  })
  return have
}

//turn numbers from 100-0 into their text
const breakdown_hundred = function (num) {
  const arr = []
  if (num > 100) {
    return arr //something bad happened..
  }
  tens_mapping.forEach(([word, val]) => {
    if (num >= val) {
      num -= val
      arr.push(word)
    }
  })
  //(hopefully) we should only have 20-0 now
  if (ones_mapping[num]) {
    arr.push(ones_mapping[num])
  }
  return arr
}

/** print-out 'point eight nine'*/
const handle_decimal = num => {
  //parse it out like a string, because js math is such shit
  const decimal = toString(num).match(/\.([0-9]+)/)
  if (!decimal) {
    return []
  }
  return ['point', ...[...decimal[1]].map(d => ones[d])]
}

/** turns an integer into a textual number */
const toText = function (obj) {
  let num = obj.num
  // handle zero, quickly
  if (num === 0 || num === '0') {
    return 'zero' // no?
  }
  //big numbers, north of sextillion, aren't gonna work well..
  //keep them small..
  if (num > 1e21) {
    num = toString(num)
  }
  let arr = []
  //handle negative numbers
  if (num < 0) {
    arr.push('minus')
    num = Math.abs(num)
  }
  //break-down into units, counts
  const units = breakdown_magnitudes(num)
  //build-up the string from its components
  units.forEach((u, i) => {
    let unit_name = u.unit
    if (unit_name === 'one') {
      unit_name = ''
      //put an 'and' in here
      if (arr.length > 1) {
        arr.push('and')
      }
    }
    // 'seven hundred' + 'forty nine thousand' -> 'seven hundred forty nine thousand'
    const next = units[i + 1]
    if (next && unit_name === 'hundred ' + next.unit) {
      unit_name = 'hundred'
    }
    arr = arr.concat(breakdown_hundred(u.count))
    arr.push(unit_name)
  })
  //also support decimals - 'point eight'
  arr = arr.concat(handle_decimal(num))
  //remove empties
  arr = arr.filter(s => s)
  if (arr.length === 0) {
    arr[0] = ''
  }
  return arr.join(' ')
}

export default toText

// console.log(to_text(-1000.8));
