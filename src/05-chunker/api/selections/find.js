import { getNth } from '../_lib.js'

/** return anything tagged as a phone number */
const phoneNumbers = function (n) {
  let m = this.splitAfter('@hasComma')
  m = m.match('#PhoneNumber+')
  m = getNth(m, n)
  return m
}

/** return all schools, businesses and institutions */
const organizations = function (n) {
  let m = this.clauses()
  m = m.match('#Organization+')
  m = getNth(m, n)
  return m
}

//combine them with .topics() method
const entities = function (n) {
  let r = this.clauses()
  // Find people, places, and organizations
  let m = r.people()
  m = m.concat(r.places())
  m = m.concat(r.organizations())
  let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father']
  m = m.not(ignore)
  //return them to normal ordering
  m.sort('sequence')
  // yup.unique() //? not sure
  m = getNth(m, n)
  return m
}

export { phoneNumbers, organizations, entities }
