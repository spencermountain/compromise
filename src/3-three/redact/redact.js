import { MaleName, FemaleName, First, Last, City, Country, Region, SportsTeam } from '../../2-two/preTagger/tagSet/_lib.js'
// key order is the order they are redacted in
const defaults = {
  people: true,
  places: true,
  organizations: true,
  emails: true,
  money: true,
  percentages: true,
  fractions: true,
  phoneNumbers: true,
  atMentions: true,
  acronyms: true,
  urls: true,
  // off by default
  properNouns: false,
  dates: false,
  numbers: false,
  pronouns: false,
}

// remove these specific tags when redacting, which may leak information
const hideTags = {
  people: [MaleName, FemaleName, First, Last],
  places: [City, 'State', Country, Region],
  organizations: [SportsTeam, 'Company', 'School'],
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
  opts = { ...defaults, ...opts }
  // each key is also the View method that finds them
  Object.keys(defaults).forEach(k => {
    if (opts[k] !== false) {
      const m = redactMatch(this[k](), blockStr, keep)
      if (hideTags[k]) {
        m.unTag(hideTags[k])
      }
    }
  })
  return this
}

export default redact