export default [
  // #coolguy
  [/^#[a-z0-9_\u00C0-\u00FF]{2,}$/i, 'HashTag'],

  // @spencermountain
  [/^@\w{2,}$/, 'AtMention'],

  // period-ones acronyms - f.b.i.
  [/^([A-Z]\.){2}[A-Z]?/i, ['Acronym', 'Noun'], 'F.B.I'], //ascii-only

  // ending-apostrophes
  [/.{3}[lkmnp]in['‘’‛‵′`´]$/, 'Gerund', "chillin'"],
  [/.{4}s['‘’‛‵′`´]$/, 'Possessive', "flanders'"],
]
