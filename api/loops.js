module.exports = {
  forEach: {
    desc: 'do something on each result independently',
    params: ['Function'],
    returns: 'Doc',
    example:
      "nlp('Larry, Curly, and Moe').people().forEach((m,i)=> m.people().toLowerCase() )\n//curly\n//larry\n//moe",
  },
  map: {
    desc: 'create a new array from these results',
    params: ['Function'],
    returns: 'Doc',
    example: "nlp('Larry, Curly, and Moe').people().map((m)=> m.out('normal'))\n// ['curly', 'larry', 'moe']",
  },
  filter: {
    desc: 'select only the results that return true for some function',
    params: ['Function'],
    returns: 'Doc',
    example: "nlp('Larry, Curly, and Moe').people().filter(m => m.out('normal')==='larry' ).length\n//1",
  },
  find: {
    desc: 'select only the first result that returns true',
    params: ['Function'],
    returns: 'Doc',
    example: "nlp('Larry, Curly, and Moe').people().find(m => m.out('normal')==='larry' ).out()\n//\"Larry,\"",
  },
  some: {
    desc: 'return true or false if there is one matching phrase ',
    params: ['Function'],
    returns: 'Boolean',
    example: "nlp('Larry, Curly, and Moe').people().some(m => m.out('normal')==='larry' )\n//true",
  },
  sort: {
    desc:
      'set a new ordering for the sentences/results. Accepts `alphabetical`, `chronological`, `length`, `wordcount`, `frequency`',
    returns: 'Doc',
    example: "nlp('Larry, Curly, and Moe').people().sort('alphabetical').out('array')\n//Curly, Larry, Moe",
  },
  random: {
    desc: 'sample a random section of n matches',
    returns: 'Doc',
    example: "nlp('one two three four').terms().random(2).out('array')\n//['four','one']",
  },
}
