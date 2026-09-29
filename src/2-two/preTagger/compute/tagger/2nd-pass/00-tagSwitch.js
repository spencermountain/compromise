const prefix = /^(under|over|mis|re|un|dis|semi)-?/

const tagSwitch = function (terms, i, model) {
  const switches = model.two.switches
  const term = terms[i]
  if (Object.hasOwn(switches, term.normal)) {
    term.switch = switches[term.normal]
    return
  }
  // support 'restrike' -> 'strike'
  if (prefix.test(term.normal)) {
    const stem = term.normal.replace(prefix, '')
    if (stem.length > 3 && Object.hasOwn(switches, stem)) {
      term.switch = switches[stem]
    }
  }
}
export default tagSwitch