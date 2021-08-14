/** return anything tagged as a phone number */
const phoneNumbers = function (n) {
  let m = this.splitAfter('@hasComma')
  m = m.match('#PhoneNumber+')
  if (typeof n === 'number') {
    m = m.get(n)
  }
  return m
}

/** return all cities, countries, addresses, and regions */
const places = function (n) {
  // don't split 'paris, france'
  let keep = this.match('(#City && @hasComma) (#Region|#Country)')
  // but split the other commas
  let m = this.not(keep).splitAfter('@hasComma')
  // combine them back together
  m = m.concat(keep)
  m.sort('index')
  m = m.match('#Place+')
  if (typeof n === 'number') {
    m = m.get(n)
  }
  return m
}

/** return all schools, businesses and institutions */
const organizations = function (n) {
  let m = this.clauses()
  m = m.match('#Organization+')
  if (typeof n === 'number') {
    m = m.get(n)
  }
  return m
}

//combine them with .topics() method
const entities = function (n) {
  let r = this.clauses()
  // Find people, places, and organizations
  let yup = r.people()
  yup = yup.concat(r.places())
  yup = yup.concat(r.organizations())
  let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father']
  yup = yup.not(ignore)
  //return them to normal ordering
  yup.sort('sequence')
  // yup.unique() //? not sure
  if (typeof n === 'number') {
    yup = yup.get(n)
  }
  return yup
}

export { phoneNumbers, places, organizations, entities }
