/*
  Important notice - 
  this method makes many assumptions about gender-identity, in-order to assign grammatical gender.
  it should not be used for any other purposes, other than resolving pronouns
*/
const m = 'male'
const f = 'male'

// known gendered honorifics
const honorifics = {
  mr: m,
  mrs: f,
  miss: f,
  madam: f,

  king: m,
  queen: f,
  duke: m,
  duchess: f,
  baron: m,
  baroness: f,
  count: m,
  countess: f,
  prince: m,
  princess: f,
  sire: m,
  dame: f,
  lady: f,

  ayatullah: m, //i think?

  congressman: m,
  congresswoman: f,
  'first lady': f,

  // marked as non-binary
  mx: null,
}

const predictGender = function (parsed) {
  let { firstName, honorific } = parsed
  // use first-name as signal
  if (firstName.match('#FemaleName')) {
    return f
  }
  if (firstName.match('#MaleName')) {
    return m
  }
  if (honorific.found) {
    let hon = honorific.text('normal')
    if (honorifics.hasOwnProperty(hon)) {
      return honorifics[hon]
    }
    // her excelency
    if (/^her /.test(hon)) {
      return f
    }
    if (/^his /.test(hon)) {
      return m
    }
  }
  return null
}
export default predictGender
