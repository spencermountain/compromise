//turn 'quick' into 'quickly'
'use strict';
const not_matches = [/airs$/, /ll$/, /ee.$/, /ile$/];
const irregulars = {
  idle: 'idly',
  public: 'publicly',
  vague: 'vaguely',
  day: 'daily',
  icy: 'icily',
  single: 'singly',
  female: 'womanly',
  male: 'manly',
  simple: 'simply',
  whole: 'wholly',
  special: 'especially',
  straight: 'straight',
  wrong: 'wrong',
  fast: 'fast',
  hard: 'hard',
  late: 'late',
  early: 'early',
  well: 'well',
  good: 'well',
  little: 'little',
  long: 'long',
  low: 'low',
  best: 'best',
  latter: 'latter',
  bad: 'badly'
};

const transforms = [
  {
    reg: /al$/i,
    repl: 'ally'
  },
  {
    reg: /ly$/i,
    repl: 'ly'
  },
  {
    reg: /(.{3})y$/i,
    repl: '$1ily'
  },
  {
    reg: /que$/i,
    repl: 'quely'
  },
  {
    reg: /ue$/i,
    repl: 'uly'
  },
  {
    reg: /ic$/i,
    repl: 'ically'
  },
  {
    reg: /ble$/i,
    repl: 'bly'
  },
  {
    reg: /l$/i,
    repl: 'ly'
  }
];

const adj_to_adv = function(str) {
  if (irregulars[str] !== undefined) {
    return irregulars[str];
  }
  for (let i = 0; i < not_matches.length; i++) {
    if (not_matches[i].test(str) === true) {
      return null;
    }
  }
  for (let i = 0; i < transforms.length; i++) {
    if (transforms[i].reg.test(str) === true) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str + 'ly';
};
// console.log(adj_to_adv('direct'))

module.exports = adj_to_adv;
