const parse = function (m) {
  const res = {}
  res.firstName = m.match('#First+')
  res.lastName = m.match('#Last+')
  res.honorific = m.match('#Hon+')

  const last = res.lastName
  const first = res.firstName
  if (!first.found || !last.found) {
    // let p = m.clone()
    // assume 'Mr Springer', or 'Vice President Springer' is a last-name
    if (!first.found && !last.found && m.has('^#Hon #Hon? .$')) {
      res.lastName = m.match('.$')
      return res
    }
  }
  return res
}
export default parse
