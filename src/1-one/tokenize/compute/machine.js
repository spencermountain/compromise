// 'machine' is a normalized form that looses human-readability
const doMachine = function (term) {
  let str = term.implicit || term.normal || term.text
  // remove apostrophes
  str = str.replace(/['’]s$/, '')
  str = str.replace(/s['’]$/, 's')
  //lookin'->looking (make it easier for conjugation)
  str = str.replace(/([aeiou][ktrp])in'$/, '$1ing')
  //turn re-enactment to reenactment
  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    str = str.replace('-', '')
  }

  //#tags, @mentions
  str = str.replace(/^[#@]/, '')
  if (str !== term.normal) {
    term.machine = str
  }
}
export default doMachine
