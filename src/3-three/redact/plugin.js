const blockStr = '██████████'

const defaults = {
  people: true,
  emails: true,
  phoneNumbers: true,
  places: true,
  organizations: true,
  atMentions: true,
  acronyms: true,
  money: true,
  percentages: true,
  fractions: true,
  // off by default
  properNouns: false,
  dates: false,
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
  // off by default
  if (opts.properNouns !== false) {
    redactMatch(this.properNouns(), keep)
  }
  if (opts.dates !== false) {
    redactMatch(this.dates(), keep)
  }
  if (opts.pronouns !== false) {
    redactMatch(this.pronouns(), keep)
  }
  return this
}

const plugin = {
  api: function (View) {
    View.prototype.redact = redact
  }
}
export default plugin
