// convert british spellings into american ones
// built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling

module.exports = function (str) {
  var patterns = [
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
    }
  ]

  for (var i = 0; i < patterns.length; i++) {
    if (str.match(patterns[i].reg)) {
      return str.replace(patterns[i].reg, patterns[i].repl)
    }
  }

  return str
}

// console.log(americanize("synthesise")=="synthesize")
// console.log(americanize("synthesised")=="synthesized")
