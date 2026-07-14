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

// remove these specific tags when redacting, which may leak information
const hideTags = {
  people: ['MaleName', 'FemaleName', 'FirstName', 'LastName'],
  places: ['City', 'State', 'Country', 'Region'],
  organizations: ['SportsTeam', 'Company', 'School'],
}
hideTags.pronouns = [...hideTags.people, ...hideTags.places, ...hideTags.organizations]

// replace text with blockStr but keep tags
const redactMatch = function (m, blockStr, keep = true) {
  m = m.notIf('#Redacted')
  m.replaceWith(blockStr, keep)
  m.tag('Redacted')
  return m
}

const redact = function (opts = {}, blockStr = '██████████', keep = true) {
  opts = Object.assign({}, defaults, opts)
  if (opts.people !== false) {
    redactMatch(this.people(), blockStr, keep).unTag(hideTags.people)
  }
  if (opts.places !== false) {
    redactMatch(this.places(), blockStr, keep).unTag(hideTags.places)
  }
  if (opts.organizations !== false) {
    redactMatch(this.organizations(), blockStr, keep).unTag(hideTags.organizations)
  }
  if (opts.emails !== false) {
    redactMatch(this.emails(), blockStr, keep)
  }
  if (opts.money !== false) {
    redactMatch(this.money(), blockStr, keep)
  }
  if (opts.percentages !== false) {
    redactMatch(this.percentages(), blockStr, keep)
  }
  if (opts.fractions !== false) {
    redactMatch(this.fractions(), blockStr, keep)
  }
  if (opts.phoneNumbers !== false) {
    redactMatch(this.phoneNumbers(), blockStr, keep)
  }
  if (opts.atMentions !== false) {
    redactMatch(this.atMentions(), blockStr, keep)
  }
  if (opts.acronyms !== false) {
    redactMatch(this.acronyms(), blockStr, keep)
  }
  if (opts.urls !== false) {
    redactMatch(this.urls(), blockStr, keep)
  }
  // off by default
  if (opts.properNouns !== false) {
    redactMatch(this.properNouns(), blockStr, keep)
  }
  if (opts.dates !== false) {
    redactMatch(this.dates(), blockStr, keep)
  }
  if (opts.numbers !== false) {
    redactMatch(this.numbers(), blockStr, keep)
  }
  if (opts.pronouns !== false) {
    redactMatch(this.pronouns(), blockStr, keep).unTag(hideTags.pronouns)
  }
  return this
}

export default redact