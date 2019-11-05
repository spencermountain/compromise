module.exports = {
  text: {
    desc:
      'render parsed data as an output. supports `text`, `normal`, `array`, `html`, `grid`, `color`, `debug`, `csv`',
    returns: 'Doc',
    example: `nlp('you might say there’s a little Uter in all of us').match('#Adjective uter').out('html')\n//<span><span class=\`nl-Adjective\`>little</span>&nbsp;<span class=\`nl-Person nl-FirstName\`>Uter</span></span>`,
  },
  debug: {
    desc: 'pretty-print the current selection to the console',
    returns: 'Doc',
    example: `nlp('wayne’s world, party time, excellent- weeeyooweeeyoo!')//.debug()`,
  },
  out: { desc: 'some named output formats ', returns: 'Doc', example: '' },
  normalize: {
    desc:
      'transforms whitespace, case, punctuation, contractions and values, so that they are cleaner and more consistent',
    returns: 'Doc',
    example: `nlp(' so... you like   DONUTS? have all the donuts in the WORLD!!!').normalize().all().get(0).out()\n//So you like donuts?`,
  },
  json: {
    desc: 'return a handy array of meta-data for this subset. Default subset is sentences, but it can be anything.',
    example: `nlp('The stage was set for the Alan Parsons Project! Which I believe was some sort of hovercraft.').data()\n//[{normal:'the stage was set...'}]`,
    returns: 'Array',
  },
}
