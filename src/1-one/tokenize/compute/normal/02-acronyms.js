// do acronyms need to be ASCII?  ... kind of?
const acronyms = [
  /^([A-Z]\.)+[A-Z]?,?$/, //like N.D.A
  /^([a-z]\.)+[a-z]\.?$/, //like c.e.o
  /^[A-Z]\.,?$/, //like 'F.'
  /^[A-Z]{2,}('s|,)?$/, //like NDA
]

const isAcronym = str => acronyms.some(re => re.test(str))

const doAcronym = function (str) {
  if (isAcronym(str)) {
    str = str.replace(/\./g, '')
  }
  return str
}
export default doAcronym
