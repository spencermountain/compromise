// convert british spellings into american ones
// built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
'use strict';

const patterns = [
  // ise -> ize
  {
    reg: /([^aeiou][iy])s(e|ed|es|ing)?$/,
    repl: '$1z$2'
  },
  // our -> or
  {
    reg: /(..)our(ly|y|ite)?$/,
    repl: '$1or$2'
  },
  // re -> er
  {
    reg: /([^cdnv])re(s)?$/,
    repl: '$1er$2'
  },
  // xion -> tion
  {
    reg: /([aeiou])xion([ed])?$/,
    repl: '$1tion$2'
  },
  //logue -> log
  {
    reg: /logue/,
    repl: 'log'
  },
  // ae -> e
  {
    reg: /([o|a])e/,
    repl: 'e'
  },
  //eing -> ing
  {
    reg: /e(ing|able)$/,
    repl: '$1'
  },
  // illful -> ilful
  {
    reg: /([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
    repl: '$1l$2'
  },
  {
    reg: /sation$/,
    repl: 'zation'
  },
  {
    reg: /isable$/,
    repl: 'izable'
  },
  {
    reg: /iliser$/,
    repl: 'ilizer'
  },
  {
    reg: /singly$/,
    repl: 'zingly'
  },
  {
    reg: /iniser$/,
    repl: 'inizer'
  },
  {
    reg: /uring$/,
    repl: 'oring'
  },
  {
    reg: /niser$/,
    repl: 'nizer'
  },
  {
    reg: /ising$/,
    repl: 'izer'
  },
  {
    reg: /fence/,
    repl: 'fense'
  },
  {
    reg: /(l|t|d)iser/,
    repl: '$1izer'
  },
  {
    reg: /euvre/,
    repl: 'euver'
  },
  {
    reg: /gramme/,
    repl: 'gram'
  },
  {
    reg: /outre/,
    repl: 'outer'
  },
  {
    reg: /isement/,
    repl: 'izement'
  },
  {
    reg: /anaes/,
    repl: 'anes'
  },
  {
    reg: /armour/,
    repl: 'armor'
  },
  {
    reg: /honour/,
    repl: 'honor'
  },
  {
    reg: /baulk/,
    repl: 'balk'
  },
  {
    reg: /behaviour/,
    repl: 'behavior'
  },
  {
    reg: /behove/,
    repl: 'behoove'
  },
  {
    reg: /labour/,
    repl: 'labor'
  },
  {
    reg: /biass/,
    repl: 'bias'
  },
  {
    reg: /alyser$/,
    repl: 'alyzer'
  },

  {
    reg: /centre/,
    repl: 'center'
  },
  {
    reg: /cheque/,
    repl: 'check'
  },
  {
    reg: /colour/,
    repl: 'color'
  },
  {
    reg: /^cosi/,
    repl: 'cozi'
  },
  {
    reg: /defence/,
    repl: 'defense'
  },
  {
    reg: /draught/,
    repl: 'draft'
  },
  {
    reg: /duell/,
    repl: 'duel'
  },
  {
    reg: /vour/,
    repl: 'vor'
  },
  {
    reg: /fibre/,
    repl: 'fiber'
  },
  {
    reg: /fillet/,
    repl: 'filet'
  },
  {
    reg: /fulfil/,
    repl: 'fulfill'
  },
  {
    reg: /gaol/,
    repl: 'jail'
  },
  {
    reg: /gauge/,
    repl: 'gage'
  },
  {
    reg: /grey/,
    repl: 'gray'
  },
  {
    reg: /licence/,
    repl: 'license'
  },
  {
    reg: /manoeuvre/,
    repl: 'maneuver'
  },
  {
    reg: /marvellous/,
    repl: 'marvelous'
  },
  {
    reg: /mould/,
    repl: 'mold'
  },
  {
    reg: /neighbour/,
    repl: 'neighbor'
  },
  {
    reg: /plough/,
    repl: 'plow'
  },
  {
    reg: /practise/,
    repl: 'practice'
  },
  {
    reg: /rumour/,
    repl: 'rumor'
  },
  {
    reg: /savour/,
    repl: 'savor'
  },
  {
    reg: /tranquill/,
    repl: 'tranquil'
  },
  {
    reg: /triall/,
    repl: 'trial'
  },
  {
    reg: /sceptic/,
    repl: 'skeptic'
  },
  {
    reg: /sulph/,
    repl: 'sulf'
  },
  {
    reg: /syphon/,
    repl: 'siphon'
  },
  {
    reg: /tonne/,
    repl: 'ton'
  },
  {
    reg: /anaesthetis/,
    repl: 'anesthetiz'
  },
];

const americanize = function(str) {
  for (let i = 0; i < patterns.length; i++) {
    if (str.match(patterns[i].reg)) {
      return str.replace(patterns[i].reg, patterns[i].repl);
    }
  }

  return str;
};

// console.log(americanize("synthesise") === "synthesize")
// console.log(americanize("synthesised") === "synthesized")

module.exports = americanize;
