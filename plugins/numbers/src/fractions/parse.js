const endS = /s$/

let mapping = {
  half: 2,
  halve: 2,
  quarter: 4,
}

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
const nOutOfN = function (m) {
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

// parse 'five thirds'
const nOrinalth = function (m) {
  let found = m.match('[<num>(#Cardinal|a)+] [<dem>#Fraction+]')
  if (found.found !== true) {
    return null
  }
  let { num, dem } = found.groups()
  // quick-support for 'a third'
  if (num.has('a')) {
    num = 1
  } else {
    num = num.numbers().get(0)
  }
  // turn 'thirds' into third
  let str = dem.text('reduced')
  if (endS.test(str)) {
    str = str.replace(endS, '')
    dem.replaceWith(str)
  }
  // support 'one half' as '1/2'
  if (mapping.hasOwnProperty(str)) {
    dem = mapping[str]
  } else {
    dem = dem.numbers().get(0)
  }
  if (typeof num === 'number' && typeof dem === 'number') {
    return {
      numerator: num,
      denominator: dem,
    }
  }
  return null
}

// implied 1 in '100th of a', 'fifth of a'
const oneNth = function (m) {
  let found = m.match('^#Ordinal$')
  if (found.found !== true) {
    return null
  }
  // ensure it's '100th of a '
  if (m.lookAhead('^of .')) {
    let num = found.numbers().get(0)
    return {
      numerator: 1,
      denominator: num,
    }
  }
  return null
}

// 'half'
const named = function (m) {
  let str = m.text('reduced')
  if (mapping.hasOwnProperty(str)) {
    return { numerator: 1, denominator: mapping[str] }
  }
  return null
}

const parseFraction = function (m) {
  return named(m) || slashForm(m) || nOutOfN(m) || nOrinalth(m) || oneNth(m) || null
}
module.exports = parseFraction
