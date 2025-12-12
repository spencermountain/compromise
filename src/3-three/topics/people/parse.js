const parse = function (m) {
  const res = {}
  res.firstName = m.match('#FirstName+')
  res.lastName = m.match('#LastName+')
  res.honorific = m.match('#Honorific+')

  const last = res.lastName
  const first = res.firstName
  if (!first.found || !last.found) {
    // let p = m.clone()
    // assume 'Mr Springer' is a last-name
    if (!first.found && !last.found && m.has('^#Honorific .$')) {
      res.lastName = m.match('.$')
      return res
    }
  }
  return res
}
export default parse
