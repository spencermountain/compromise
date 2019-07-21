//turn 'quick' into 'quickly'
const not_matches = [/airs$/, /ll$/, /ee.$/, /ile$/, /y$/]

const irregulars = {
  bad: 'badly',
  good: 'well',
  icy: 'icily',
  idle: 'idly',
  male: 'manly',
  public: 'publicly',
  simple: 'simply',
  single: 'singly',
  special: 'especially',
  straight: 'straight',
  vague: 'vaguely',
  whole: 'wholly',
}
const dontChange = ['best', 'early', 'hard', 'fast', 'wrong', 'well', 'late', 'latter', 'little', 'long', 'low'].reduce(
  (h, c) => {
    h[c] = true
    return h
  },
  {}
)

const transforms = [
  {
    reg: /al$/i,
    repl: 'ally',
  },
  {
    reg: /ly$/i,
    repl: 'ly',
  },
  {
    reg: /(.{3})y$/i,
    repl: '$1ily',
  },
  {
    reg: /que$/i,
    repl: 'quely',
  },
  {
    reg: /ue$/i,
    repl: 'uly',
  },
  {
    reg: /ic$/i,
    repl: 'ically',
  },
  {
    reg: /ble$/i,
    repl: 'bly',
  },
  {
    reg: /l$/i,
    repl: 'ly',
  },
]

const adj_to_adv = function(str) {
  if (irregulars.hasOwnProperty(str) === true) {
    return irregulars[str]
  }
  if (dontChange.hasOwnProperty(str) === true) {
    return str
  }
  for (let i = 0; i < not_matches.length; i++) {
    if (not_matches[i].test(str) === true) {
      return null
    }
  }
  for (let i = 0; i < transforms.length; i++) {
    if (transforms[i].reg.test(str) === true) {
      return str.replace(transforms[i].reg, transforms[i].repl)
    }
  }
  return str + 'ly'
}

module.exports = adj_to_adv
