// convert american spellings into british ones
// built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
// (some patterns are only safe to do in one direction)
'use strict';
const exceptions = require('./exceptions').reduce(function(h, a) {
  h[a[1]] = a[0];
  return h;
}, {});

const patterns = [
  // ise -> ize
  {
    reg: /([^aeiou][iy])z(e|ed|es|ing|er)?$/,
    repl: '$1s$2'
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
    reg: /logue$/,
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
    reg: /ization/,
    repl: 'isation'
  },
  {
    reg: /izable/,
    repl: 'isable'
  },
  {
    reg: /orabl/,
    repl: 'ourabl'
  },
  {
    reg: /zingly/,
    repl: 'singly'
  },
  {
    reg: /ilizer/,
    repl: 'iliser'
  },
  {
    reg: /pedic/,
    repl: 'paedic'
  },
  {
    reg: /anesthes/,
    repl: 'anaesthes'
  },
  {
    reg: /ar(b|m|d)or/,
    repl: 'ar$1our'
  },
  {
    reg: /balk/,
    repl: 'baulk'
  },
  {
    reg: /behavior/,
    repl: 'behaviour'
  },
  {
    reg: /behove/,
    repl: 'behoove'
  },
  {
    reg: /canceled/,
    repl: 'cancelled'
  },
  {
    reg: /catalog/,
    repl: 'catalogue'
  },
  {
    reg: /meter/,
    repl: 'metre'
  },
  {
    reg: /center/,
    repl: 'centre'
  },
  {
    reg: /clamor/,
    repl: 'clamour'
  },
  {
    reg: /color/,
    repl: 'colour'
  },
  {
    reg: /defense/,
    repl: 'defence'
  },
  {
    reg: /endeavor/,
    repl: 'endeavour'
  },
  {
    reg: /favor/,
    repl: 'favour'
  },
  {
    reg: /flavor/,
    repl: 'flavour'
  },
  {
    reg: /filet/,
    repl: 'fillet'
  },
  {
    reg: /jail/,
    repl: 'gaol'
  },
  {
    reg: /gray/,
    repl: 'grey'
  },
  {
    reg: /^hematol/,
    repl: 'haematol'
  },
  {
    reg: /^hemo/,
    repl: 'haemo'
  },
  {
    reg: /^install/,
    repl: 'instal'
  },
  {
    reg: /mold/,
    repl: 'mould'
  },
  {
    reg: /neighbor/,
    repl: 'neighbour'
  },
  {
    reg: /odor/,
    repl: 'odour'
  },
  {
    reg: /^pedo/,
    repl: 'paedo'
  },
  {
    reg: /^pedia/,
    repl: 'paedia'
  },
  {
    reg: /^parlor/,
    repl: 'parlour'
  },
  {
    reg: /plow/,
    repl: 'plough'
  },
  {
    reg: /skeptic/,
    repl: 'sceptic'
  },
  {
    reg: /rumor/,
    repl: 'rumour'
  },
  {
    reg: /practice/,
    repl: 'practise'
  },
  {
    reg: /maneuver/,
    repl: 'manoeuvre'
  },
  {
    reg: /level(ed|er|ing)?$/,
    repl: 'levell$1'
  },
  {
    reg: /travel(ed|er|ing)?$/,
    repl: 'travell$1'
  },
  {
    reg: /tranquil/,
    repl: 'tranquill'
  },
  {
    reg: /tranquilize/,
    repl: 'tranquillise'
  },
  {
    reg: /vigor/,
    repl: 'vigour'
  },
  {
    reg: /fiber/,
    repl: 'fibre'
  },
  {
    reg: /drafts/,
    repl: 'draughts'
  },
  {
    reg: /disk/,
    repl: 'disc'
  },
  {
    reg: /uel(er|est|ed)/,
    repl: 'uell$1'
  },
  {
    reg: /cozi(er|est|es|ly)/,
    repl: 'cosi$1'
  },
  {
    reg: /colorize/,
    repl: 'colourise'
  },
  {
    reg: /honor/,
    repl: 'honour'
  },
  {
    reg: /abor(ed|ing)/,
    repl: 'abour$1'
  },
  {
    reg: /pedal(ed|ing)/,
    repl: 'pedall$1'
  },
  {
    reg: /shovel(ed|ing|er)/,
    repl: 'shovell$1'
  },
  {
    reg: /al(ed|ing|er)/,
    repl: 'all$1'
  },
  {
    reg: /el(ed|ing|er)/,
    repl: 'ell$1'
  },
  {
    reg: /ol(ed|ing|er)/,
    repl: 'oll$1'
  },
  {
    reg: /avor(ed|ing|er)/,
    repl: 'avour$1'
  },
  {
    reg: /anesth/,
    repl: 'anaesth'
  },
  {
    reg: /behoove/,
    repl: 'behove'
  },
  {
    reg: /sulfur/,
    repl: 'sulphur'
  },

];

const britishize = function(str) {
  if (exceptions[str]) {
    return exceptions[str];
  }
  let single = str.replace(/s$/, ''); //eww
  if (exceptions[single]) {
    return exceptions[single];
  }
  for (let i = 0; i < patterns.length; i++) {
    if (str.match(patterns[i].reg)) {
      return str.replace(patterns[i].reg, patterns[i].repl);
    }
  }
  return str;
};

// console.log(britishize("synthesize") === "synthesise")
// console.log(britishize("synthesized") === "synthesised")

module.exports = britishize;
