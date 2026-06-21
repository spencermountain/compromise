const defaults = {
  people: true,
  emails: true,
  phoneNumbers: true,
  places: true,
  organizations: true,
  addresses: true,
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

const redact = function (opts = {}) {
  opts = Object.assign({}, defaults, opts)
  if (opts.people !== false) {
    this.people().replaceWith('██████████')
  }
  if (opts.places !== false) {
    this.places().replaceWith('██████████')
  }
  if (opts.organizations !== false) {
    this.organizations().replaceWith('██████████')
  }
  if (opts.addresses !== false) {
    this.addresses().replaceWith('██████████')
  }
  if (opts.emails !== false) {
    this.emails().replaceWith('██████████')
  }
  if (opts.money !== false) {
    this.money().replaceWith('██████████')
  }
  if (opts.percentages !== false) {
    this.percentages().replaceWith('██████████')
  }
  if (opts.fractions !== false) {
    this.fractions().replaceWith('██████████')
  }
  if (opts.phoneNumbers !== false) {
    this.phoneNumbers().replaceWith('███████')
  }
  if (opts.atMentions !== false) {
    this.atMentions().replaceWith('██████████')
  }
  if (opts.acronyms !== false) {
    this.acronyms().replaceWith('██████████')
  }

  // off by default
  if (opts.properNouns !== false) {
    this.properNouns().replaceWith('██████████')
  }
  if (opts.dates !== false) {
    this.dates().replaceWith('██████████')
  }
  if (opts.pronouns !== false) {
    this.pronouns().replaceWith('██████████')
  }

  return this
}

const plugin = {
  api: function (View) {
    View.prototype.redact = redact
  }
}
export default plugin
