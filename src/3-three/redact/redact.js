const blockStr = '██████████'

const defaults = {
  people: true,
  places: true,
  organizations: true,
  acronyms: true,
  money: true,
  percentages: true,
  fractions: true,
  emails: true,
  phoneNumbers: true,
  atMentions: true,
  urls: true,
  // off by default
  properNouns: false,
  dates: false,
  numbers: false,
  pronouns: false,
}

// replace text with blockStr but keep tags
const redactMatch = function (m, keep = true) {
  m = m.notIf('#Redacted')
  m.replaceWith(blockStr, keep)
  m.tag('Redacted')
  return m
}

const redact = function (opts = {}, keep = true) {
  opts = Object.assign({}, defaults, opts)
  if (opts.people !== false) {
    redactMatch(this.people(), keep)
  }
  if (opts.places !== false) {
    redactMatch(this.places(), keep)
  }
  if (opts.organizations !== false) {
    redactMatch(this.organizations(), keep)
  }
  if (opts.emails !== false) {
    redactMatch(this.emails(), keep)
  }
  if (opts.money !== false) {
    redactMatch(this.money(), keep)
  }
  if (opts.percentages !== false) {
    redactMatch(this.percentages(), keep)
  }
  if (opts.fractions !== false) {
    redactMatch(this.fractions(), keep)
  }
  if (opts.phoneNumbers !== false) {
    redactMatch(this.phoneNumbers(), keep)
  }
  if (opts.atMentions !== false) {
    redactMatch(this.atMentions(), keep)
  }
  if (opts.acronyms !== false) {
    redactMatch(this.acronyms(), keep)
  }
  if (opts.urls !== false) {
    redactMatch(this.urls(), keep)
  }
  // off by default
  if (opts.properNouns !== false) {
    redactMatch(this.properNouns(), keep)
  }
  if (opts.dates !== false) {
    redactMatch(this.dates(), keep)
  }
  if (opts.numbers !== false) {
    redactMatch(this.numbers(), keep)
  }
  if (opts.pronouns !== false) {
    redactMatch(this.pronouns(), keep)
  }
  return this
}

export default redact