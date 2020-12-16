const endS = /s$/

const slashForm = function (m) {
  let str = m.text('reduced')
  let found = str.match(/^([-+]?[0-9]+)\/([-+]?[0-9]+)(st|nd|rd|th)?s?$/)
  if (found && found[1] && found[0]) {
    return {
      numerator: Number(found[1]),
      denominator: Number(found[2]),
    }
  }
  return null
}

// parse '4 out of 4'
const textForm1 = function (m) {
  let found = m.match('[<num>#Value+] out of every? [<den>#Value+]')
  if (found.found !== true) {
    return null
  }
  let { num, den } = found.groups()
  num = num.numbers().get(0)
  den = den.numbers().get(0)
  if (typeof num === 'number' && typeof den === 'number') {
    return {
      numerator: num,
      denominator: den,
    }
  }
  return null
}

// parse 'a third'
const textForm2 = function (m) {
  let found = m.match('[<num>(#Cardinal|a)+] [<den>#Ordinal+]')
  if (found.found !== true) {
    return null
  }
  let { num, den } = found.groups()
  // quick-support for 'a third'
  if (num.has('a')) {
    num = 1
  } else {
    num = num.numbers().get(0)
  }
  // turn 'thirds' into third
  let str = den.text('reduced')
  if (endS.test(str)) {
    str = str.replace(endS, '')
    den.replaceWith(str)
  }
  // support 'one half' as '1/2'
  if (den.has('half')) {
    den = 2
  } else {
    den = den.numbers().get(0)
  }
  if (typeof num === 'number' && typeof den === 'number') {
    return {
      numerator: num,
      denominator: den,
    }
  }
  return null
}

const parseFraction = function (m) {
  return slashForm(m) || textForm1(m) || textForm2(m) || null
}
module.exports = parseFraction
