const currencies = require('./currencies')

const ambig = {
  mark: true,
  sucre: true,
  leone: true,
  afghani: true,
  rand: true,
  try: true,
  mop: true,
  won: true,
  all: true,
  rub: true,
  eek: true,
  sit: true,
  bam: true,
  npr: true,
  leu: true,
}

let lex = {
  kronor: 'Currency',
}
currencies.forEach((o) => {
  if (o.iso && !ambig[o.iso]) {
    lex[o.iso] = ['Acronym', 'Currency']
  }
  let name = o.name
  if (name && !ambig[name]) {
    lex[name] = 'Currency'
    lex[name + 's'] = 'Currency'
  }
  if (o.dem) {
    let dem = o.dem
    lex[`${dem} ${name}`] = 'Currency'
    lex[`${dem} ${name}s`] = 'Currency'
  }
})

module.exports = lex
