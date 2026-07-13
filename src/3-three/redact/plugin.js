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

const redact = function (opts = {}, keep = true) {
  opts = Object.assign({}, defaults, opts)
  if (opts.people !== false) {
    this.people().replaceWith(blockStr, keep)
  }
  if (opts.places !== false) {
    this.places().replaceWith(blockStr, keep)
  }
  if (opts.organizations !== false) {
    this.organizations().replaceWith(blockStr, keep)
  }
  if (opts.emails !== false) {
    this.emails().replaceWith(blockStr, keep)
  }
  if (opts.money !== false) {
    this.money().replaceWith(blockStr, keep)
  }
  if (opts.percentages !== false) {
    this.percentages().replaceWith(blockStr, keep)
  }
  if (opts.fractions !== false) {
    this.fractions().replaceWith(blockStr, keep)
  }
  if (opts.phoneNumbers !== false) {
    this.phoneNumbers().replaceWith(blockStr, keep)
  }
  if (opts.atMentions !== false) {
    this.atMentions().replaceWith(blockStr, keep)
  }
  if (opts.acronyms !== false) {
    this.acronyms().replaceWith(blockStr, keep)
  }
  // off by default
  if (opts.properNouns !== false) {
    this.properNouns().replaceWith(blockStr, keep)
  }
  if (opts.dates !== false) {
    this.dates().replaceWith(blockStr, keep)
  }
  if (opts.pronouns !== false) {
    this.pronouns().replaceWith(blockStr, keep)
  }
  return this
}

const plugin = {
  api: function (View) {
    View.prototype.redact = redact
  }
}
export default plugin
