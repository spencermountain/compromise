module.exports = {
  data: {
    desc: 'return a handy array of meta-data for this subset. Default subset is sentences, but it can be anything.',
    example:
      "nlp('The stage was set for the Alan Parsons Project! Which I believe was some sort of hovercraft.').data()\n//[{normal:'the stage was set...'}]",
    returns: 'array',
  },
  found: {
    desc: 'is the match empty or not',
    returns: 'bool',
    example: "nlp('oh say can you see?').match('see').found\n//true",
  },
  all: {
    desc: 'zooms-out from a subset back to the whole input',
    returns: 'Doc',
    example: "nlp('this is yelling').verbs().toTitleCase().all().out()\n//this IS yelling",
  },
  debug: {
    desc: 'pretty-print the current selection to the console',
    returns: 'Doc',
    example: "nlp('wayne’s world, party time, excellent- weeeyooweeeyoo!').out()",
  },
  out: {
    desc:
      'render parsed data as an output. supports `text`, `normal`, `array`, `html`, `grid`, `color`, `debug`, `csv`',
    returns: 'Doc',
    example:
      "nlp('you might say there’s a little Uter in all of us').match('#Adjective uter').out('html')\n//<span><span class=\"nl-Adjective\">little</span>&nbsp;<span class=\"nl-Person nl-FirstName\">Uter</span></span>",
  },
  whitespace: {
    desc: 'set before or after whitespace on each match',
    returns: 'Doc',
    example: "nlp('We like Roy! We like Roy!').whitespace.before('   ').out()\n//We like Roy!   We like Roy!",
  },
  normalize: {
    desc:
      'transforms whitespace, case, punctuation, contractions and values, so that they are more standard and workable',
    returns: 'Doc',
    example:
      "nlp(' so... you like   DONUTS? have all the donuts in the WORLD!!!').normalize().sentences(0).out()\n//So you like donuts?",
  },
  length: {
    desc: 'how many individual matches in the result',
    returns: 'int',
    example: "nlp('jackie kennedy and aristotle onassis').people().length\n//2",
  },
  random: {
    desc: 'sample a random section of n matches',
    returns: 'Doc',
    example: "nlp('one two three four').terms().random(2).out('array')\n//['four','one']",
  },
  sort: {
    desc:
      'set a new ordering for the sentences/results. Accepts `alphabetical`, `chronological`, `length`, `wordcount`, `frequency`',
    returns: 'Doc',
    example: "nlp('Larry, Curly, and Moe').people().sort('alphabetical').out('array')\n//Curly, Larry, Moe",
  },
  forEach: {
    desc: 'do something on each result independently',
    returns: 'Doc',
    example:
      "nlp('Larry, Curly, and Moe').people().forEach((m,i)=> m.people().toLowerCase() )\n//curly\n//larry\n//moe",
  },
  map: {
    desc: 'create a new array from these results',
    returns: 'Doc',
    example: "nlp('Larry, Curly, and Moe').people().map((m)=> m.out('normal'))\n// ['curly', 'larry', 'moe']",
  },
  filter: {
    desc: 'select only the results that return true for some function',
    returns: 'Doc',
    example: "nlp('Larry, Curly, and Moe').people().filter(m => m.out('normal')==='larry' ).length\n//1",
  },
  find: {
    desc: 'select only the first result that returns true',
    returns: 'Doc',
    example: "nlp('Larry, Curly, and Moe').people().find(m => m.out('normal')==='larry' ).out()\n//\"Larry,\"",
  },
  reduce: {
    desc: 'combine the results of a function into one thing',
    returns: 'Doc',
    example:
      "nlp('Larry, Curly, and Moe').people().reduce((h,m) => {\n  var str=m.out('normal');\n  h[str]=true;\n  return h }, {})\n//{larry:true, curly:true, moe:true}",
  },
}
