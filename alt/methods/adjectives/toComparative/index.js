//turn 'quick' into 'quickly'
const do_rules = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /old$/, /oud$/, /e[ae]p$/]
const dont_rules = [/ary$/, /ous$/]

const irregulars = {
  grey: 'greyer',
  gray: 'grayer',
  green: 'greener',
  yellow: 'yellower',
  red: 'redder',
  good: 'better',
  well: 'better',
  bad: 'worse',
  sad: 'sadder',
  big: 'bigger',
}

const transforms = [
  {
    reg: /y$/i,
    repl: 'ier',
  },
  {
    reg: /([aeiou])t$/i,
    repl: '$1tter',
  },
  {
    reg: /([aeou])de$/i,
    repl: '$1der',
  },
  {
    reg: /nge$/i,
    repl: 'nger',
  },
]

const to_comparative = function (str) {
  //known-irregulars
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }
  //known-transforms
  for (let i = 0; i < transforms.length; i++) {
    if (transforms[i].reg.test(str) === true) {
      return str.replace(transforms[i].reg, transforms[i].repl)
    }
  }
  //dont-patterns
  for (let i = 0; i < dont_rules.length; i++) {
    if (dont_rules[i].test(str) === true) {
      return null
    }
  }
  //do-patterns
  for (let i = 0; i < do_rules.length; i++) {
    if (do_rules[i].test(str) === true) {
      return str + 'er'
    }
  }
  //easy-one
  if (/e$/.test(str) === true) {
    return str + 'r'
  }
  return str + 'er'
}

module.exports = to_comparative
