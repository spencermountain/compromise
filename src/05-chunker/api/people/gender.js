/*
  Important notice - 
  this method makes many assumptions about gender-identity, in-order to assign grammatical gender.
  it should not be used for any other purposes, other than resolving pronouns
*/
const m = 'male'
const f = 'female'

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
  // use first-name as signal-signal
  if (firstName.has('#FemaleName')) {
    return f
  }
  if (firstName.has('#MaleName')) {
    return m
  }
  // use honorics as gender-signal
  if (honorific.found) {
    let hon = honorific.text('normal')
    hon = hon.replace(/\./g, '') //clean it up a bit
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
